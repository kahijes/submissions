import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoggedUser = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{user.name} logged in
        <button onClick={ () => {
          window.localStorage.clear()
          dispatch(setUser(null))
        }}>
        logout
        </button></p>

    </div>
  )
}

export default LoggedUser