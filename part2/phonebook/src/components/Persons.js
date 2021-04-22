import React from 'react'
import ShowEntry from './ShowEntry'

const Persons = ({ phonebook, handleDelete }) => {
    return (
    <div>
    <ul>
    {phonebook.map(entry => 
        <ShowEntry entry={entry} key={entry.id} handleDelete={handleDelete} />
        )}
    </ul>
    </div> )
}

export default Persons