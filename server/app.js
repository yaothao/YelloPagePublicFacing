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
        res.json(result)
    }).catch(err => {
        res.json({ message: 'could not find data' });
    })
    
});

app.get('/search', (req, res) => {
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

    console.log(returnObject);
    res.json(returnObject);
  } catch (err) {
    console.log(err);
    return;
  }
})

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

app.get("/api/images", (req, res) => {
  const imageByteList = getImagesInDir(req.query.dir)
  res.json({imageByteList})
    
});

app.get("/api/stream", (req, res) => {
  var dir = req.query.dir;
  console.log('in the beginning')
  res.writeHead(200, {
    'Content-Type': 'text/event-stream', // set content type to text/event-stream
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const files = fs.readdirSync(dir, { withFileTypes: true });
  const images = files.filter((file) => {
    if (file.isDirectory()) {
      return false;
    } else {
      const ext = path.extname(file.name).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif";
    }
  });

  images.forEach((file) => {
    const filePath = path.join(dir, file.name);
    const readStream = fs.createReadStream(filePath);
    read
  })

  res.end()
});


function base64_encode(file) {
  return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
}

function getImagesInDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const images = files.filter((file) => {
    if (file.isDirectory()) {
      return true;
    } else {
      const ext = path.extname(file.name).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif";
    }
  });
  const imageByteList = images.map((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      return getImagesInDir(filePath);
    } else {
      return base64_encode(filePath);
    }
  });
  return imageByteList;
}

function getImages(directory) {
  fs.readdir(directory, function (err, files) {
    var image_byte = "data:image/gif;base64,";
    async.eachSeries(files, function (file, callback) {
      var currentFile = path.join(directory, file);
      fs.stat(currentFile, function (err, stats) {
        if (stats.isDirectory()) { return getImages(currentFile); } // (2)

        var stream = fs.createReadStream(currentFile).on('end')
          .on('data', function (data) { 
            image_byte += data.toString('base64'); });
      });
    }, function () {
      stream.pip(res)
      res.end(); // (5)
    });
  });
}

