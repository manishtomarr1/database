const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

//database

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/clasDB");
  console.log("connect to mongooDB");
}

const studentsSchema = {
  //create schema
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNumber: { type: Number, required: true },
};

const Student = mongoose.model("Student", studentsSchema); //create collection

const firstStudent = new Student({
  name: "Shivani Malik",
  class: "MBA",
  rollNumber: 45,
});

const secondStudent = new Student({
  name: "Surbhi Malik",
  class: "LLB",
  rollNumber: 44,
});

const students = [firstStudent, secondStudent];

//Student.insertMany(students)

const thirdStudent = new Student({
  name: "Manish Tomar",
  class: "MCA",
  rollNumber: 74,
});

//thirdStudent.save();

//databaseEnding

//node.js starting.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Add Operation in Database
app.post("/", function (req, res) {
  const studentName = req.body.studentName;
  const studentClass = req.body.studentClass;
  const StudentrollNumber = req.body.studentRollNumber;

  const studentdetails = new Student({
    name: studentName,
    class: studentClass,
    rollNumber: StudentrollNumber,
  });
  studentdetails.save();
  res.sendFile(__dirname + "/success.html");
});

//Update Operation in Database
app.post("/update", async function (req, res) {
  const studentName = req.body.studentName;
  const updationPart = req.body.selected;
  const updatedValue = req.body.updatedValue;

  //kis property ko change krna hai uske liye hmne dynamic value li.
  const filter ={}
  filter[updationPart] = updatedValue //aise json ko dynamic fill krte hain.
  //updationPart is the property of json and updatedValue is the value of that.

  //console.log(studentName, updationPart, updatedValue);

  const update = await Student.updateOne(
    { name: studentName },
    filter //filter is the updated value of that name.
  );
  console.log(update.modifiedCount, update.matchedCount);

  res.sendFile(__dirname + "/successUpdate.html");
});

//Delete Operation in database
app.post("/delete", async function (req, res) {
  const stuName = req.body.studentName;
  const del = await Student.deleteOne({ name: stuName });
  console.log(del.modifiedCount, del.matchedCount);
  res.sendFile(__dirname + "/successDelete.html");
});

//Fatch the data from Database
app.post("/find", async function (req, res) {
  const className = req.body.studentClassName;

  const find = await Student.find({ class: className });
  console.log(find); //give the array of all json object whose class is the class name.
  res.write('<h1>Students from Course ' + '<span>' + className + '</span>' + '<span> are :  </span>' + '<br>'+ '<br>' + '</h1')

  find.forEach(function (student) {
    console.log(student.name); // give the name of students whose class is MCA
    res.write('<h1>' + student.name + '</h1>') //this is how we can inject html in node.js
  });
  res.send();
});

app.post("/success", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
