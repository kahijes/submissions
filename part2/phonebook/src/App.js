import React, { useState, useEffect }  from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import { nanoid } from 'nanoid'
import phonebookService from './communication/phonebook'

const App = () => {
  const [phonebookEntries, setPhonebookEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const filteredEntries = phonebookEntries.filter(entry => entry.name.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    phonebookService
      .getAll()
      .then(phonebookFromServer => {
        setPhonebookEntries(phonebookFromServer)
      })
  },[])

  const addInformation = (event) => {
    event.preventDefault()

    const result = phonebookEntries.find(entry => entry.name === newName)
      if(!(result===undefined))  {
        changeNumber(result)
        return
      }

    const phonebookObject = {
      name: newName,
      number: newNumber,
      id: nanoid()
    }
    phonebookService
      .create(phonebookObject)
      .then(returnedEntry => {
        setPhonebookEntries(phonebookEntries.concat(returnedEntry))
        setNewNumber('')
        setNewName('')
      })
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
  const handleDelete = (id, name) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      phonebookService
      .deleteEntry(id)
      setPhonebookEntries(phonebookEntries.filter(entry => id !== entry.id))
    }
  }

  const changeNumber = (result) => {
    if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
      result.number = newNumber
      phonebookService
        .update(result.id, result)
        .then(returnedEntry => {
        setPhonebookEntries(phonebookEntries.map(entry => entry.id === returnedEntry.id ? returnedEntry : entry));
        })
    }
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
      <Persons phonebook={filteredEntries} handleDelete={handleDelete}/>
    </div>
  )
}

export default App