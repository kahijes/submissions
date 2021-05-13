const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test',
    author: 'test',
    url: 'ww',
    likes: 10
  },
  {
    title: 'test1',
    author: 'test2',
    url: '2',
    likes: 10
  }
]

const nonExistingId = async () => {
  const blog = new Blog({author: 'willbedeleted'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}