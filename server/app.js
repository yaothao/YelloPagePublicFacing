const express = require("express");

const app = express()

const port = 3001
const fs = require("fs");
const path = require("path");
var async = require('async')
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'patlUm7qqzKCqWyAZ.e73eb79e938567976f68bcdd1c1541311c46cc428abe1e1080e9732c3c7258de'
});
var base = Airtable.base('appw8q4h7vrBErGRJ');
var table = base.table('tblqbLm0jCiPSO7Jl');

app.get('/firstpage', async (req, res) => {
    // let fetch = await fetchFirstPage();
    // console.log(fetch);
    // res.json({message: fetch})
    // fetchPromise
    //     .then((object) => {
    //         res.json({ data: object })
    //         console.log(object)
    //     })
    //     .catch(err => res.status(404).json({ noitemsfound: 'No items found' }));
    var result;
    table.select({view: 'Grid view'}).all().then(records => {
        result = records.map((record) => {
            return record['fields'];
        })
        console.log(result.length);
        res.json(result);
    }).catch(err => {
        res.json({ message: 'could not find data' });
    })
});

app.get('/search', (req, res, next) => {
  const filteredId = []
  const searctTerm = new RegExp(req.query.search, "g");

  try {
    const jsonString = fs.readFileSync("./data_fts.json");
    const webs = JSON.parse(jsonString);
    for (const [ObjectId, desc] of Object.entries(webs)) {
      var matchInstance = 0;
      for (const [tag, value] of Object.entries(desc)) {
          for (var i = 0; i < value.length; i++) {
            matchedObject = value[i].match(searctTerm);
            if (matchedObject) {
              matchInstance += matchedObject.length;
            }
          }
      }
      if (matchInstance != 0) {
        filteredId.push({ id : ObjectId, matchInstance : matchInstance});
      } 
    }

    filteredId.sort(function(a,b){return b.matchInstance - a.matchInstance});

    var returnObject = [];

    filteredId.forEach(item => returnObject.push(item.id));

    res.json(returnObject);
  } catch (err) {
    console.log(err);
    next(err);
    return;
  }
})

app.get('/selectTag', async (req, res) => {
    const query = req.query.term;
    console.log(query);
    const regex = '^.*([' + query + ']){2,}.*$';
    var result;
    const start = Date.now();
    table.select({
        view: 'Grid view',
        filterByFormula: `OR(REGEX_MATCH( {category}, '${regex}'), REGEX_MATCH( {book_name}, '${regex}'), REGEX_MATCH( {url_name}, '${regex}'))`
    }).firstPage().then(records => {
        result = records.map((record) => {
            return record['fields'];
        })
        console.log(`running seach time: ${Math.floor((Date.now() - start) / 1000)}`)
        res.json(result)
    }).catch(err => {
        res.json({ message: 'could not find data', error: err });
    })
})
