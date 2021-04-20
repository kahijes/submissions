import React from 'react'

const ShowEntry = ({ entry, id}) => {
  return (
    <div>
    <li key={id}>{entry.name} {entry.number}</li>
    </div>
  )
}

export default ShowEntry