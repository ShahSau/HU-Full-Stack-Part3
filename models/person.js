const mongoose = require("mongoose");
const url = process.env.MONGODB_URI
const uniqueValidator = require('mongoose-unique-validator');
mongoose
  .connect(url)
  .then((result) => {
    console.log("conncected to mongoDb");
  })
  .catch((error) => {
    console.log("error connecting to mongoDb", error.message);
  });
  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, 
      unique: true 
    },
    date: Date,
    number: {
      type: String,
      required: true
    },
  });
  personSchema.plugin(uniqueValidator);
  personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  module.exports = mongoose.model("Person", personSchema);