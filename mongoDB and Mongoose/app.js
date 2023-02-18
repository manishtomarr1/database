const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB", () => {
  console.log(`Connected to MongoDB`);
});

const fruitSchema = new mongoose.Schema({
  //give the schema of the database.
  name: { type: String, required: [true, "check again the name field "] }, //means agar name nhi dia toh add nhi hoga error aa jaiga.
  rating: {
    type: Number,
    main: 1, //this is how we set validation to our database
    max: 10,
  },
  review: { type: String },
});

const Fruit = mongoose.model("Fruit", fruitSchema); //in the fruitDB we create the Fruit document.
//jb bhi kuch add krna hoga Fruit collection mae we use this Fruit jaise niche kia.
//esko model bolte hai mongoose ki language mae, sare function in model section of the docs of
//mongoose.
//component ka naam hoga fruits, kyuki wo automatically update ho jaiga i.e Fruit to fruits.

const fruit = new Fruit({
  //create the document inside the Fruit collection
  name: "peach",
  rating: 7,
  review: "bhot bhetreen subha subha khaali pet khao gaal laal krega!",
});
//fruit.save(); //because har bar apple apple save krta rahega.

const peopleSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", peopleSchema);
const people = new Person({
  name: "manish",
  age: 23,
});

//people.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "khao dba k! bukhar mae sbse bdhya hota hai!",
});

const banana = new Fruit({
  name: "banana",
  rating: 8,
  review: "gaat fula dega",
});

const orange = new Fruit({
  name: "orange",
  rating: 6,
  review: "jee saaf krne mae kargar",
});

// that is hoe we save the data in bulk in any database
// ek bar insert krke comment kr dia jo bar bar na ho save wohi data
// Fruit.insertMany([kiwi,banana,orange], function (err){ //callback function use to insure the data is saved or not
//     if (err){
//         console.log(err)
//     }
//     else {
//         console.log("data saved sucessufully!")
//     }
// })

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close(); //for closing the connection

    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

//updating
Fruit.updateOne(
  { _id: "63f10aa3235e3865d1ea0c6c" },
  { name: "grapes" },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("updated");
    }
  }
);

//deleting
Fruit.deleteOne({ name: "grapes" }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("delete");
  }
});

//relationship and embedding
//we have a person colllection in which we have one document that is manish if we want to
//add the favourite food of that person then
//1-create a favourite food in people's schema and type is fruit schema, jaise uppar kia.
const guvava = new Fruit({
  name: "guvava",
  rating: 10,
  review: "kabzi nhi lagne de!",
});
//guvava.save();

const sheetal = new Person({
  name: "sheetal",
  age: 56,
  favouriteFruit: guvava,
});
//sheetal.save();

const litchi = new Fruit({
  name: "litchi",
  rating: 10,
  review: "pappu chacha k gher mae hai paid!",
});

Person.updateOne(
  { _id: "63f113f4abaf0c8fbf2b559b" },
  { favouriteFruit: litchi },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("updated");
    }
  }
);
