require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.static('build'))
// app.use(morgan('tiny'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));
const Person = require('./models/person')
let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  { id: 5, name: 'Mhhd hfhfhhf', number: '35-20-6422222' }
];


//fetching persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons =>{
    res.json(persons);
  })
})

//fetching info
app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${persons.length} people. </p>
     <p>${Date()}</p></div>`);
  });

//fetching single resource
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  console.log(person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//deleting a resource
app.delete("/api/persons/:id",(req,res,next)=>{
  Person.findByIdAndRemove(req.params.id)
  .then(result=>{
    console.log(result)
    res.status(204).end()
  })
  .catch(error=> {
    next(error);
  })
})


//creating a person data
// function integerId(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log(body);
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: "name or number or both  missing",
    });
  }
  // creating an instance of Person object
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save()
  .then((savedandformated) => {
    res.json(savedandformated);
  })
  .catch(error=>{
    next(error)
  })
});

morgan.token("person", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT ||3001;

app.listen(PORT);
console.log(`app started on ${PORT}`);