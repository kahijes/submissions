
import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'
import Search from './components/Search'


const App = () => {
  const [newSearch, setSearch] = useState('')
  const [listOfCountries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  const filteredCountries = listOfCountries.filter(entry => entry.name.toLowerCase().includes(newSearch.toLowerCase()))
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const handleButtonClick = (name) => setSearch(name)
  
  return(
    <div>
      <Search handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <ShowCountries countries={filteredCountries} handleButtonClick={handleButtonClick} />
    </div>
  )
}

export default App