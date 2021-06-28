import React from 'react'
// import userService from '../services/users'
// import { useSelector, useDispatch } from 'react-redux'

const User = (user) => {
  return (
    <div>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </div>
  )
}

export default User