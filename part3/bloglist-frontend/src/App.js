import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import ShowBlogs from './components/ShowBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('')
  const noteFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
      })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handlePost = async (blog) => {
    noteFormRef.current.toggleVisibility()
    const createdBlog = await blogService
      .create(blog)

    setBlogs(blogs.concat(createdBlog))
    messagePopUp('Green', `a new blog ${blog.title} by ${blog.author}`)
  }

  const messagePopUp = (color, message) => {
    setErrorMessage(message)
    setNotificationColor(color)
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationColor(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      messagePopUp('Red', 'wrong username or password')
    }
  }

  const handleDelete = async toBeRemoved => {
    if (window.confirm(`Remove blog ${toBeRemoved.title} by ${toBeRemoved.author}`)){
      try {
        await blogService.deleteBlog(toBeRemoved.id)
        setBlogs(blogs.filter(blog => toBeRemoved.id !== blog.id))
      } catch (error) {
        messagePopUp('Red', 'Not authorized to delete')
      }
    }
    return
  }
  const handleLike = async (blog) => {
    const updatedBlog = await blogService.updateBlog(blog)
    console.log(updatedBlog)
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
      />
    </Togglable>
  )

  const blogsForm = () => (
    <Togglable buttonLabel='create' ref={noteFormRef}>
      <BlogForm handlePost={handlePost}/>
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification color={notificationColor} errorMessage={errorMessage} />
      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} logged-in
            <button onClick={ () => {
              window.localStorage.clear()
              setUser(null)
            }}>
            logout
            </button></p>
          {blogsForm()}
          <ShowBlogs blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} user={user}/>
        </div>
      }
    </div>
  )
}

export default App