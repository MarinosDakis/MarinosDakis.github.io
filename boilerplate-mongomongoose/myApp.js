require('dotenv').config();
let mongodb = require('mongodb');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

  const personSchema  = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
    });

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {

let Marinos = new Person({name: "Marinos", age: 21, favoriteFoods: ["pizza", "pasta"]});

   Marinos.save(function(err, data) {
     if (err) return console.error(err);
     done(null, data);
   });
};

  arrayOfPeople = [
    {name: "Henry", age:40, favoriteFoods:"milk, cheese"},
    {name: "Sally", age:29, favoriteFoods:"grapes, apples"}]; 

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, people) {
        if (err) return console.error(err);
        done(null, people);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, found){
    if (err) return console.error(err);
      done(null, found);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foundOne){
    if (err) return console.error(err);
      done(null, foundOne);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, foundID){
    if (err) return console.error(err);
      done(null, foundID);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // find person
  Person.findById(personId, function(err, foundID){
  if (err) return console.error(err);
     
  // add food to end of array of found person   
  foundID.favoriteFoods.push(foodToAdd);

  // save the updated person
  foundID.save(function(err, updated) {
     if (err) return console.error(err);
     done(null, updated);
   });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, function (err, updated){
     if (err) return console.error(err);
     done(null, updated);
  });
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, function(err, deleted){
     if (err) return console.error(err);
     done(null, deleted);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({name: nameToRemove}, function(err, completed){
     if (err) return console.error(err);
     done(null, completed);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // find people with certain food
  Person.find({favoriteFoods: foodToSearch})
        // sort them
        .sort({name: 1})
        // limit
        .limit(2)
        // hide property of age
        .select({age: 0})
        // exec
        .exec(function(err, result){
          if (err) return console.error(err);
          done(null, result);
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
