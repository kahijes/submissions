import React from 'react'
import ShowEntry from './ShowEntry'

const Persons = ({ phonebook }) => {
    return (
    <div>
    <ul>
    {phonebook.map(entry => 
        <ShowEntry entry={entry} key={entry.id} />
        )}
    </ul>
    </div> )
}

export default Persons