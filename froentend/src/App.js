import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/Persons"
import Success from "./components/Success"
import ErrorMessage from "./components/ErrorMessage"
const App = () => {

  useEffect(() => {
    console.log('effect')
    personService 
    .getAll()
    .then(allPersons=>
      setPersons(allPersons))
    .catch(error => console.log(error));
      
  }, [])

  // creating person hook
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '38-23-6423122' }
  ]) 


  // creating states for name, number and search
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearchs] = useState("");

  //Creating success hook
  const[ successMessage, setSuccessMessage] = useState(null)
 //creating error hook
 const[ errorMessage, setErrorMessage] = useState(null)

  const name_array = persons.map((person) => person.name);

  // event handler for adding name
  const handleNewName = (event) => {
      setNewName(event.target.value);
    }


  // event handler for adding number
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // event handler for updating search parameter
  const updateSearch = (event) => {
    setSearchs(event.target.value);
  };

  // adding new person to the person list
  const addName = (event) => {
    event.preventDefault();

    const newObj = {
      name: newName,
      number: newNumber,
    };
    if (name_array.includes(newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const already_name =persons.find(name=>name.name === newName)
        const new_Obj = {...already_name, number : newNumber}
        console.log(already_name.id)
        personService
        .update(already_name.id, new_Obj)
        .then(new_data=>{
          setPersons(persons.map(person=> person.id!==already_name.id ? person : new_data))
          setSuccessMessage(`Added ${newName}`)
          setTimeout(()=>{
            setSuccessMessage(null)
          },5000)
        })
        .catch(error=>{
          console.log(error)
          setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(()=>{
              setErrorMessage(null)
              setNewName(newName)
              setNewNumber("-")
            },5000)
            setPersons(persons.filter(person=> person.id!== already_name.id ))
        })
        setNewName("")
        setNewNumber("")
      }else{
        setNewName("")
        setNewNumber("")
      }

    }
    else{ 
    personService
    .create(newObj)
    .then(newPerson=>
      setPersons(persons.concat(newPerson))
      )
      setSuccessMessage(`Added ${newName}`)
          setTimeout(()=>{
            setSuccessMessage(null)
          },5000)
    setNewName("")
    setNewNumber("")
  };
}
  //creating a function for delete person
  const deletePerson =(event)=>{
    if (window.confirm(`Are you sure, you want to delete ${event.name}`)) {
      console.log('it works!!!');
      personService
      .deletePersons(event.id)
      let filter_persons2 = filter_persons.filter(person=> person.id !== event.id)
      setPersons(filter_persons2)

    }
    console.log(persons)
  }

  let filter_persons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={successMessage}/>
      <ErrorMessage message={errorMessage}/> 
      <Filter
        text={"filter shown with"}
        search={search}
        updateSearch={updateSearch}
      />

      <h2>Add a new</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handlenewName={handleNewName}
        handlenewNumber={handleNewNumber}
        name={"name : "}
        number={"number : "}
      />
      <h2>Numbers</h2>
      {filter_persons.map((person) => (
        <Person key={Math.random()} name={person.name} number={person.number} onClick={()=>deletePerson(person)}/>
      ))}
    </div>
  );
};

export default App;