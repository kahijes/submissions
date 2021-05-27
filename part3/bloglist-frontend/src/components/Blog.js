import React, { useState } from 'react'



const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const showRemove = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const justTheTitle = () => (
    <div style={blogStyle}>
      <p>{blog.title}
        <button onClick={ () => setShowInfo(!showInfo) }>show</button></p>
    </div>
  )

  const blogWithInformation = () => (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={() => setShowInfo(!showInfo) }>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={ () => {blog.likes++; handleLike(blog)} }>like</button></p>
      <p>{blog.user.name}</p>
      <div style={showRemove}>
        <button onClick={ () => handleDelete(blog) }>remove</button>
      </div>
    </div>
  )

  if (showInfo === false) {
    return (
      justTheTitle()
    )}

  return (
    blogWithInformation()
  )
}

export default Blog