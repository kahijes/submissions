import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE': {
    return state.concat(action.data.createdBlog)
  }
  case 'DELETE': {
    const deleted = action.data.blog
    return state.slice(0).filter(b => b.id !== deleted.id)
  }
  case 'LIKE': {
    const likedBlog = action.data.blog
    if (likedBlog) {
      const updatedBlogs = state.map(b => b.id === likedBlog.id ? likedBlog : b)
      return updatedBlogs}
    return state
  }
  case 'INIT_BLOGS': {
    return action.data.blogs
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














export default blogReducer