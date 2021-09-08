const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));
let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];


//fetching persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

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
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons.filter((p) => p.id !== id);
  res.status(204).end();
});


//creating a person data
function integerId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (req, res) => {
  const body = req.body;
  console.log(body);
  const name_array = persons.map((person) => person.name);
  if (!body.name || !body.number) {
    res.status(400).json({
      error: "either name or number is missing",
    });
  }else if (name_array.includes(body.name)) {
    res.status(400).json({
      error: "name must be unique",
    });
  }else {const person = {
    id: integerId(1, 100000000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
}
});

morgan.token("person", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

const PORT = 3001;

app.listen(PORT);
console.log(`app started on ${PORT}`);