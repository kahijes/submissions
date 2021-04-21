import React, { useState, useEffect }  from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import { nanoid } from 'nanoid'
import axios from 'axios'

const App = () => {
  const [phonebookEntries, setPhonebookEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPhonebookEntries(response.data)
    })
  }, [])
  
  const filteredEntries = phonebookEntries.filter(entry => entry.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addInformation = (event) => {
    event.preventDefault()
    const checkName = function(entry) {
      return entry.name === newName
    }

    const result = phonebookEntries.find(checkName)
    if ( !(result=== undefined)) {
      window.alert(newName + ' is already added to phonebook')
      setNewName('')
      return
    }
    const phonebookObject = {
      name: newName,
      number: newNumber,
      id: nanoid()
    }
    setPhonebookEntries(phonebookEntries.concat(phonebookObject))
    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />      
      <h2>add a new</h2>
      <PersonsForm 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      addInformation={addInformation}
      />
      <h2>Numbers</h2>
      <Persons phonebook={filteredEntries} />
    </div>
  )
}

export default App