import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const UserInformation = () => {
  const id = useParams().id
  const user = useSelector(state => state.allUsers).find(u => u.id === id)
  if (!user) {
    return (
      null
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(b => {
          return(
            <li key={b.id}>{b.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserInformation