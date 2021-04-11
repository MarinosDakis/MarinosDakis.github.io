/*
Adapted from:
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-serve-json-on-a-specific-route/301517
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-serve-static-assets/301518
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-serve-json-on-a-specific-route/301517
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-use-the-env-file/301521
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-implement-a-root-level-request-logger-middleware/301514
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-chain-middleware-to-create-a-time-server/301510
https://learn.zybooks.com/zybook/CUNYCSCI355AbramovSpring2021/chapter/16/section/3
https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-use-body-parser-to-parse-post-requests/301520
 */

var express = require('express');
const bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended: false}));

app.post("/name", (req, res) => {

 let firstname = req.body.first;
 let lastname = req.body.last;

 res.send({name: firstname + " " + lastname});

});

module.exports = app;





























module.exports = app;
