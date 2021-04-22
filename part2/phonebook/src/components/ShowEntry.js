import React from 'react'

const ShowEntry = ({ entry, id, handleDelete}) => {
  return (
    <div>
    <li key={id}>{entry.name} {entry.number}
    <button onClick={ () => handleDelete(entry.id, entry.name) }>
    delete
    </button></li>
    </div>
  )
}

export default ShowEntry