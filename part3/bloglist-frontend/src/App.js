import React, { useEffect } from 'react'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import { useDispatch, useSelector  } from 'react-redux'
import { Switch, Route }from 'react-router-dom'

import Notification from './components/Notification'
import ShowLogin from './components/ShowLogin'
import ShowBlogs from './components/ShowBlogs'
import UsersList from './components/UsersList'
import UserInformation from './components/UserInformation'
import BlogInformation from './components/BlogInformation'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])
  console.log('1')

  const user = useSelector(state => state.user)
  const showLogin = () => (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <ShowLogin />
    </div>
  )
  if (user === null) {
    return(
      showLogin()
    )
  }

  return (
    <div>
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <Switch >
        <Route path='/users/:id'>
          <UserInformation />
        </Route>
        <Route path='/users'>
          <UsersList/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogInformation />
        </Route>
        <Route path='/'>
          <ShowBlogs/>
        </Route>
      </Switch>
    </div>
  )
}

export default App