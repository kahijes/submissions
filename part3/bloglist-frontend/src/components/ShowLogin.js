
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
// import BlogForm from './BlogForm'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router'

const ShowLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      console.log(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      history.push('/')
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'Red', 5))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='login'>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </Togglable>
    </div>
  )
}

export default ShowLogin