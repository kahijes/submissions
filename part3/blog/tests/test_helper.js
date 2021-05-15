const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test',
    author: 'test',
    url: 'ww',
    likes: 10,
    user: '609fb248818a8021ddae59db'
  },
  {
    title: 'test1',
    author: 'test2',
    url: '2',
    likes: 10,
    user: '609fb248818a8021ddae59db'
  }
]

const initialUsers = [
  {
    username: 'fortesting',
    name: 'hehe hauskaa',
    passwordHash: '$2b$10$ee48cx7zfqLGuOfLjUBZyeQD6yGaYyCzFZDBs42OLV0/n5pQz17Lm',
    blogs: []
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'willbedeleted' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers

}