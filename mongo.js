const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide atleast node mongo.js <password> to display all data"
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://root:${password}@cluster0.jnmyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);
const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
if (process.argv[3] !== undefined && process.argv[4] !== undefined) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook :");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}