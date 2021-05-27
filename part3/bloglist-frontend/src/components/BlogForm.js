import React, { useState } from 'react'

const BlogForm = ({ handlePost }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    event.preventDefault()

    const blog = {
      author: author,
      title: title,
      url: url
    }

    handlePost(blog)
    setAuthor('')
    setUrl('')
    setTitle('')

  }

  return (
    <div>
      <form onSubmit={ newBlog }>
        <div >
        title:
          <input
            id='title'
            type="text"
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div >
        author
          <input
            id='author'
            type="text"
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            type="text"
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm