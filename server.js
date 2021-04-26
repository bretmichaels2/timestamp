// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('docs'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/docs/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/", (req, res) => {
  let resDate = new Date();
  res.json({ unix: resDate.valueOf(), utx: resDate.toUTCString() })
});

app.get("/api/:date?", (req, res) => {
  let reqString = req.params.date;
  let resDate;
  if (!/^\d{4}-/.test(reqString)) {
    resDate = new Date(parseInt(reqString));
  }
  if (resDate.getTime() !== resDate.getTime()) {
    res.json({ error: "Invalid Date"});
  }
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString})
});