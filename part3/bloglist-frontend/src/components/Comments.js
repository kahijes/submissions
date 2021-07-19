import React from 'react'
const Comments = ({ comments }) => {
  if (!comments) {
    return null
  }
  return (
    <div>
      <ul>
        {
          comments.map(c => (
            <li key={Math.floor(Math.random() * 10000)}>{c}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Comments