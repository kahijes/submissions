import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE': {
    return state.concat(action.data.createdBlog)
  }
  case 'DELETE': {
    const deleted = action.data.blog
    const stateCopy = state.map(a => ({ ...a }))
    return stateCopy.filter(b => b.id !== deleted.id)
  }
  case 'LIKE': {
    const likedBlog = action.data.blog
    return state.map(b => b.id === likedBlog.id ? likedBlog : b)
  }
  case 'INIT_BLOGS': {
    return action.data.blogs
  }
  case 'COMMENT': {
    const updatedBlog = action.data.blog
    return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)


  }

  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const votedBlog = await blogService.updateBlog(blog)
    dispatch({
      type: 'LIKE',
      data: {
        blog: votedBlog
      }
    })

  }
}

export const deleteBlog = (toBeDeleted) => {
  return async dispatch => {
    dispatch({
      type: 'DELETE',
      data: {
        blog: toBeDeleted
      }
    })
  }
}

export const createBlog  = (blog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: {
        createdBlog
      }
    })

  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: {
        blogs: blogs
      }
    })
  }
}

export const handleComment = (blogId, comment) => {
  return async dispatch => {
    console.log(blogId)
    const commentedBlog = await blogService.commentBlog(comment, blogId)
    console.log(commentedBlog, 'c blog')
    dispatch({
      type: 'COMMENT',
      data: {
        blog: commentedBlog
      }
    })
  }
}














export default blogReducer