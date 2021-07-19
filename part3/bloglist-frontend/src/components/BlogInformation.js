import React, { useState } from 'react'
import { likeBlog, deleteBlog, handleComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Comments from './Comments'
import { useHistory } from 'react-router-dom'

const BlogInformation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs).find(b => b.id === id)
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const showRemove = { display: user.username === blog.user.username ? '' : 'none' }

  const handleDelete = async toBeRemoved => {
    if (window.confirm(`Remove blog ${toBeRemoved.title} by ${toBeRemoved.author}`)){
      try {
        await blogService.deleteBlog(toBeRemoved.id)
        dispatch(deleteBlog(toBeRemoved))
        history.push('/')
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

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  const newComment = (event) => {
    event.preventDefault()
    const blogID = blog.id
    dispatch(handleComment(blogID, comment))
  }

  const blogWithInformation = () => (
    <div className='blogWithInformation'>
      <a href={`${blog.url}`}>{blog.url}</a>
      <div>likes {blog.likes} <button id='like-button' onClick={ () => {blog.likes++;handleLike(blog)} }>like</button></div>
      <div>{blog.user.name}</div>
      <div id='delete-button' style={showRemove}>
        <button onClick={ () => {handleDelete(blog)} }>remove</button>
      </div>
      <h1>comments</h1>

      <form onSubmit={ newComment } >
        <div>
          <input
            type='text'
            id='comment'
            value={comment}
            name='comment'
            onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>submit</button>
        </div>
      </form>

      <Comments comments={blog.comments}/>
    </div>
  )

  return (
    blogWithInformation()
  )
}

export default BlogInformation