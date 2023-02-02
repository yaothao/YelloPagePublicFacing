const express = require("express");

const app = express()

const port = 3001

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
        res.json(result)
    }).catch(err => {
        res.json({ message: 'could not find data' });
    })
    
});

app.get('/selectTag', async (req, res) => {
    const query = req.query;
    table.select({
        view: 'Grid view',
        filterByFormula: "SEARCH(‘2000’, ARRAYJOIN({year_published}, ' '))"
    }).firstPage().then(records => {
        console.log(records)
        result = records.map((record) => {
            return record['fields'];
        })
        res.json(result)
    }).catch(err => {
        res.json({ message: 'could not find data' });
    })
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

function fetchFirstPage() {
 
}

