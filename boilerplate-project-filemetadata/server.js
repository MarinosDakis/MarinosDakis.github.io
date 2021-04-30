/*
Adapted from:
https://www.npmjs.com/package/multer
https://scotch.io/tutorials/express-file-uploads-with-multer
https://mongoosejs.com/docs/tutorials/findoneandupdate.html
https://www.youtube.com/watch?v=rqV7lRPPSL4&ab_channel=GaneshH
*/
var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer  = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// file object to store information
let fileObject = {};

// create post request because of form and passing multer into it
app.post("/api/fileanalyse", multer().single("upfile"), function (req, res) {

// store the values from the file and output json
fileObject.name = req.file.originalname;
fileObject.type = req.file.mimetype;
fileObject.size = req.file.size;
res.json(fileObject);
});

