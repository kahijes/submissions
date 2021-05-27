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
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const exportables = { getAll, setToken, create, updateBlog, deleteBlog }
export default exportables

