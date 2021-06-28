import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const ShowBlogs = ({ handleLike, handleDelete }) => {
  const blogs = useSelector(state => state.blogs)
    .sort((a,b) => b.likes-a.likes)
  const user = useSelector(state => state.user)

  const blogsForm = () => (
    <Togglable buttonLabel='create'>
      <BlogForm />
    </Togglable>
  )
  return (

    <div id='blogList'>
      {blogsForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  handleLike={handleLike} handleDelete={handleDelete} user={user}/>
      )}
    </div>
  )
}

export default ShowBlogs