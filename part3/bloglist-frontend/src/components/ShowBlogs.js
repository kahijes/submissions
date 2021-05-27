import React from 'react'
import Blog from './Blog'
const ShowBlogs = ({ blogs, handleLike, handleDelete, user }) => {

  return(
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  handleLike={handleLike} handleDelete={handleDelete} user={user}/>
      )}
    </div>
  )
}

export default ShowBlogs