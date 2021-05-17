// adapted from https://www.freecodecamp.org/learn/apis-and-microservices#basic-node-and-express

var express = require('express');
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post("/name", (req, res) => {

    let firstname = req.body.first;
    let lastname = req.body.last;

    res.send({name: firstname + " " + lastname});

});

module.exports = app;
