var express = require('express');
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post("/", (req, res) => {

  let firstname = req.body.first;
  let lastname = req.body.last;

  res.send({name: firstname + " " + lastname});

}); 

 module.exports = app;
