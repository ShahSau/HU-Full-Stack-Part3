const express = require('express');

const app = express();

let persons = [
    { id:1, name: 'Arto Hellas', number: '040-123456' },
    { id:2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3,name: 'Dan Abramov', number: '12-43-234345' },
    { id:4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

//fetching persons
app.get('/api/persons', (req,res)=>{
    res.json(persons)
})

//fetching info
app.get('/info', (req,res)=>{
    res.send(`<div><p>Phonebook has info for ${persons.length} people. </p>
   <p>${Date()}</p></div>`)
    
})

//fetching single resource
app.get('/api/persons/:id', (req,res)=>{
    const id = Number(req.params.id)
    console.log(id)
    const person = persons.find(p=> p.id === id)
    console.log(person)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

//deleting a resource
app.delete('/api/persons/:id', (req,res)=>{
    const id = Number(req.params.id)
    persons.filter(p=> p.id !== id)
    res.status(204).end()
})

const PORT = 3001;

app.listen(PORT);
console.log(`app started on ${PORT}`)