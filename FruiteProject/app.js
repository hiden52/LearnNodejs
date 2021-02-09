const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    required: [true, "Please Add a name of fruit!"],
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "KA",
  rating: 7,
  review: "crunchy!",
});

//fruit.save();

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", peopleSchema);

const grapes = new Fruit ({
    name: "Grapes",
    rating: 10,
    review: "The best fruit!!"
});
grapes.save();

Person.updateOne(
    { name : "Jane" }, 
    { favoriteFruit : grapes },
    err => {
        if(err) console.log(err);
        else console.log("It successfully updated!");
    }
);

//person.save()

const kiwi = new Fruit({
  name: "Kiwi",
  score: 6,
  review: "Gold kiwi is more delicious",
});
const banana = new Fruit({
  name: "Banana",
  score: 8,
  review: "Banana is good for body",
});
const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "The best fruit for juice",
});

// Fruit.insertMany([kiwi, orange, banana], err => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// })

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('fruits');
//     // Insert some documents
//     collection.insertMany([
//       {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     });
//   }

// Fruit.updateOne(
//   { _id: "602274f916750a353a55ac7d" },
//   { name: "NoJame" },
//   (err) => {
//     if (err) console.log(err);
//   }
// );

Fruit.deleteMany({name: "KA"}, err => {
    if(err) console.log(err);
});

Fruit.find((err, fruits) => {
  if (err) console.log(err);
  else {
    console.log(fruits);
    fruits.forEach((foundFruit) => {
      console.log(foundFruit.name);
    });
    mongoose.connection.close();
  }
});

//   const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('fruits');
//     // Find some documents
//     collection.find({}).toArray(function(err, fruits) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(fruits)
//       callback(fruits);
//     });
//   }
