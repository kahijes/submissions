import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBlog = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const setToken = newToken =>  {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    console.log(response)
    return response.data
  }
  catch (error) {
    console.error(error)
  }
}

const commentBlog = async (comment, blogId) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    // console.log(blogId)
    // console.log(`${baseUrl}/${blogId}/comments`)
    // console.log(comment)
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment: comment }, config)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const exportables = { getAll, setToken, create, updateBlog, deleteBlog, commentBlog }
export default exportables

