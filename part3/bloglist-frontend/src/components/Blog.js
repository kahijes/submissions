import React, { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [showInfo, setShowInfo] = useState(false)
  const showRemove = { display: user.username === blog.user.username ? '' : 'none' }
  const dispatch = useDispatch()

  const handleDelete = async toBeRemoved => {
    if (window.confirm(`Remove blog ${toBeRemoved.title} by ${toBeRemoved.author}`)){
      try {
        await blogService.deleteBlog(toBeRemoved.id)
        dispatch(deleteBlog(toBeRemoved))
        return
      } catch (error) {
        dispatch(setNotification('Not authorized to delete', 'Red', 5))
      }
    }
    return
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const justTheTitle = () => (
    <div style={blogStyle} className='justTheTitle'>
      <p>{blog.title} by {blog.author}
        <button id='show-button' onClick={ () => setShowInfo(!showInfo) }>show</button></p>
    </div>
  )
  const blogWithInformation = () => (
    <div style={blogStyle} className='blogWithInformation'>
      <p>{blog.title} <button onClick={() => setShowInfo(!showInfo) }>hide</button></p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button id='like-button' onClick={ () => {blog.likes++;handleLike(blog)} }>like</button></p>
      <p>{blog.user.name}</p>
      <div id='delete-button' style={showRemove}>
        <button onClick={ () => {handleDelete(blog)} }>remove</button>
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