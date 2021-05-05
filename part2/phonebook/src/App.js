import React, { useState, useEffect }  from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import { nanoid } from 'nanoid'
import phonebookService from './communication/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [phonebookEntries, setPhonebookEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(0)
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
        errorMessagePopup(`Added ${newName}`, false)
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

  const errorMessagePopup = (message, type) => {
      setErrorMessage(message)
      setErrorType(type)
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)}, 2000)
  }

  const changeNumber = (result) => {
    if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
      result.number = newNumber;
      phonebookService
        .update(result.id, result)
        .then(returnedEntry => {
        errorMessagePopup(`Changed ${newName}`, false)
        setPhonebookEntries(phonebookEntries.map(entry => entry.id === returnedEntry.id ? returnedEntry : entry));
        })
        .catch(error => errorMessagePopup(`Information of ${newName} has already been removed from the server`, true))
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} type={errorType}/>
      <Filter value={newFilter} handleFilterChange={handleFilterChange} />      
      <h1>add a new</h1>
      <PersonsForm 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      addInformation={addInformation}
      />
      <h1>Numbers</h1>
      <Persons phonebook={filteredEntries} handleDelete={handleDelete}/>
    </div>
  )
}

export default App