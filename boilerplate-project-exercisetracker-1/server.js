/* adapted from: 
https://mongoosejs.com/docs/schematypes.html
https://www.youtube.com/watch?v=ANfJ0oGL2Pk&ab_channel=GaneshH
*/

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
let mongodb = require('mongodb');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

// create schema
const { Schema } = mongoose;

  // schema for their exercises
  const exerciseSchema_exercise = new Schema({
    description: {type: String, required: true},
    duration: {type: Number, min: 1},
    date: {type: String}
  });

  // schema for users
  const exerciseSchema_user  = new Schema({
    username: {type: String, required: true},
    log: [exerciseSchema_exercise]
    });

// create model
let exer_user = mongoose.model("exer_user", exerciseSchema_user);
let EXERCISE = mongoose.model("EXERCISE", exerciseSchema_exercise);

// STEP 1
// create post to /api/users
app.post("/api/users", bodyParser.urlencoded({extended: false}), function (req, res) {

    //console.log(req.body.username);

    let input = req.body.username;

    // see if user is already in database
    exer_user.findOne({username: input}, (err, found) => {
        if(err) console.log(err);
        if(found) res.json({error: "User already in database"});

        // create new user for database
        else {
          let newUser = new exer_user({username: input});
          newUser.save((err, saved) => {
            if(err) console.log(err);
            else {
              res.json({username: saved.username, _id: saved._id});
            }
          });
        }
    }); 
 });

// STEP 2
// show list of all users
app.get("/api/users", function (req, res) {

   exer_user.find({}, function(err, array){
      if(err) return res.json({error: "Array could not be found"});
      res.json(array);
    });
});

// STEP 3
app.post("/api/users/:_id/exercises", bodyParser.urlencoded({extended: false}), function (req, res) {

  // if not date is returned
  if (req.body.date === '') {
    req.body.date = new Date().toISOString().substring(0, 10);
  }

  // create exercise object that is to be pushed into the log array of user
  let exerciseLog = new EXERCISE({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date
  });

  // stop warning
    mongoose.set('useFindAndModify', false); 

  // Pushing exercise collection onto the log array of user
  exer_user.findOneAndUpdate({_id: req.params._id}, {$push: {log: exerciseLog}}, {upsert: true, new: true}, (err, updated) => {

      // return the json object with the data values
      res.json({
        _id: updated._id,
        username: updated.username,
        date: new Date(exerciseLog.date).toDateString(),
        duration: exerciseLog.duration,
        description:exerciseLog.description
      });
    });
  });

// STEP 4, 5, 6, 7
// return document with all info from query
app.get("/api/users/:_id/logs", (req, res) => {

  exer_user.findOne({_id: req.params._id}, (err, array) => {
    if (err) console.log(err);
    else {

      // adding limit parameters [7]
      // check to see if any query parameters exist for limit
      // This section was taken directly from: https://www.youtube.com/watch?v=ANfJ0oGL2Pk&ab_channel=GaneshH

      let resObj = array
      
      if(req.query.from || req.query.to){
        
        let fromDate = new Date(0)
        let toDate = new Date()
        
        if(req.query.from){
          fromDate = new Date(req.query.from)
        }
        
        if(req.query.to){
          toDate = new Date(req.query.to)
        }
        
        fromDate = fromDate.getTime()
        toDate = toDate.getTime()
        
        resObj.log = resObj.log.filter((EXERCISE) => {
          let sessionDate = new Date(EXERCISE.date).getTime()
          
          return sessionDate >= fromDate && sessionDate <= toDate
          
        });
      }
      
      if(req.query.limit){
        resObj.log = resObj.log.slice(0, req.query.limit)
      }
      // end of taken snippet


      // returning object with data values and adding a field to it [5/6]
      let obj = {};
      obj._id = array._id;
      obj.username = array.username;
      obj.log = array.log;
      obj.count = array.log.length;
      res.json(obj);

    } // end else
  });
});