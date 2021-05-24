
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
      setBlogs( blogs )
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


  const handlePost = async (event) => {
    event.preventDefault()

    const blog = {
      author: author,
      title: title,
      url: url
    }

    const createdBlog = await blogService
      .create(blog)

    setBlogs(blogs.concat(createdBlog))
    messagePopUp('Green', `a new blog ${title} by ${author}`)
    setAuthor('')
    setUrl('')
    setTitle('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type='text'
        value={username}
        name='Username'
        onChange={({target}) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>login</button>
  </form>
  )
  
  const blogsForm = () => (
    <form onSubmit={handlePost}>
      <div>
        title:
        <input
        type="text" 
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
        type="text" 
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        type="text" 
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div> 
      } 
    </div>
  )
}

export default App