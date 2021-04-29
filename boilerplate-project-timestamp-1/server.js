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
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// CASE NO INPUTTED DATE
app.get("/api/", function (req, res) {

  let utc = new Date().toUTCString();
  res.json({unix: Date.now(), utc: utc});

});

// CASE INPUTTED DATE
app.get("/api/:date", function (req, res) {

  // store value of :date
  let date = req.params.date;
  let dateFormat1 = /\d\d\d\d-\d\d-\d\d/;
  let dateFormat2 = /\d\d\d\d\d\d\d\d\d\d\d\d\d/;
  let dateFormat3 = /\d\d\s\w+\s\d\d\d\d/;


  // first case to see if date is in both regex 
  if(dateFormat1.test(date) || dateFormat2.test(date) || dateFormat3.test(date)){

    // check to see if value of date is in xxxx-xx-xx format
    // or dd-month-yyyy format
    if (dateFormat1.test(date) || dateFormat3.test(date)){

      try {
        utc = new Date(date).toUTCString();
        unix = new Date(date).getTime();
        res.json({unix: unix.valueOf(), utc: utc});
      } catch(error) {
          res.json({ error : "Invalid Date" });
        };
    }

    // check to see if value of date is in xxxxxxxxxxxxx format
    if (dateFormat2.test(date)){
        unix = new Date(parseInt(date)).getTime();
        utc = new Date(unix).toUTCString();
        res.json({unix: unix.valueOf(), utc: utc});
    }
  }

      // otherwise output error
    else {
      res.json({ error : "Invalid Date" });
    } 
});
