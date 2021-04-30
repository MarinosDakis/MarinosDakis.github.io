/*
Adapted from:
https://www.youtube.com/watch?v=dvCIN_pav8o&ab_channel=GaneshH
https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let mongodb = require('mongodb');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

// create schema
const { Schema } = mongoose;

  const urlSchema  = new Schema({
    url: {type: String, required: true},
    shortUrl: {type: Number}
    });

// create model
let Urls = mongoose.model("Urls", urlSchema);

// create post request because of form
app.post("/api/shorturl", bodyParser.urlencoded({extended: false}), function (req, res) {

// for warning
mongoose.set('useFindAndModify', false); 

// JSON object to store
let responseObj = {};

// regex taken from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
// check to see if value entered is valid
let regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

if(!regex.test(req.body.url)) {
  res.json({error: "Invalid URL"});
  return;
}

// add extracted url from body-parser body to the response object
 responseObj.original_url = req.body.url;

// create variable to store default short url
let shorty = 1;


// adapted from: https://www.youtube.com/watch?v=dvCIN_pav8o&ab_channel=GaneshH

// find document with highest short url value and update it
  Urls.findOne({})
    .sort({shortUrl: "desc"}) //desc
    .exec((err, result) => {
      if (!err && result != undefined) shorty = result.shortUrl + 1;

      // finds entry that already exists in our url and updates it with new short url value. Otherwise if it doesn't exist it gets created.
      if(!err){
          Urls.findOneAndUpdate(
            {url: req.body.url},
            {url: req.body.url, shortUrl: shorty},
            {new: true, upsert: true},
            (err, success) => {
                if (!err){
                  responseObj["short_url"] = success.shortUrl;
                  res.json(responseObj);
            }
          }
        );
      }
  });
});

// redirect values inputted
app.get("/api/shorturl/:shortValue", function(req, res) {
  
  let short_value = req.params.shortValue;
  
  Urls.findOne({shortUrl: short_value}, function(err, foundOne){
    if (err) return req.json({error:"value not in database"});
      else res.redirect(foundOne.url);
  });
});