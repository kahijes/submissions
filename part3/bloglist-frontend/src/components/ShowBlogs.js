import React from 'react'
// import Blog from './Blog'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const ShowBlogs = () => {
  const blogs = useSelector(state => state.blogs)
    .sort((a,b) => b.likes-a.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogsForm = () => (
    <Togglable buttonLabel='create'>
      <BlogForm />
    </Togglable>
  )
  return (

    <div id='blogList'>
      {blogsForm()}
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default ShowBlogs