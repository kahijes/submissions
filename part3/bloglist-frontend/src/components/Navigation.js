import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const padding = { padding: 5 }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <div className='navigation'>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/users'>users</Link>
      <a><b>{user.name}</b> logged in</a>
      <button className='button-logout' onClick={ () => {
        window.localStorage.clear()
        dispatch(setUser(null))
      }}>
      logout
      </button>
    </div>
  )
}

export default Navigation