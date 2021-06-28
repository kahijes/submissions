import React, { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import { useDispatch, useSelector  } from 'react-redux'

import {
  Switch, Route, Link, useRouteMatch }
  from 'react-router-dom'

import Notification from './components/Notification'
import ShowLogin from './components/ShowLogin'
import ShowBlogs from './components/ShowBlogs'
import UsersList from './components/UsersList'
import LoggedUser from './components/LoggedUser'
import UserInformation from './components/UserInformation'

let mounted = true
const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    if (mounted) {
      dispatch(initializeBlogs())
      dispatch(initializeUser())
      dispatch(initializeAllUsers())
    }
    return () => mounted = false
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.allUsers)

  useEffect(() => {
    mounted = true
    if (mounted) {
      dispatch(initializeAllUsers())
    }
    return () => mounted = false
  }, [blogs.length])

  const showLogin = () => (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <ShowLogin />
    </div>
  )

  const match = useRouteMatch('/users/:id')
  const userToShow = match
    ? users.find(u => u.id === match.params.id)
    : null

  if (user === null) {
    return(
      showLogin()
    )
  }
  const padding = { padding: 5 }
  return (
    <div>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <h2>blogs</h2>
      <Notification />
      <LoggedUser />
      <Switch >
        <Route path='/users/:id'>
          <UserInformation user={userToShow}/>
        </Route>
        <Route path='/users'>
          <UsersList/>
        </Route>
        <Route path='/'>
          <ShowBlogs/>
        </Route>
      </Switch>
    </div>
  )
}

export default App