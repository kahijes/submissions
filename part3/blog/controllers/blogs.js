const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await  Blog
    .findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token || !request.user.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || '',
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: request.user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
  response.json(populatedBlog)

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const toBeDeleted = await Blog.findById(request.params.id)
    const jsonUser = toBeDeleted.user.toString()
    if (jsonUser === request.user.id) {
      request.user.blogs.filter(b => b.id !== toBeDeleted.id)
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(200).end()
    }
    response.status(401).end()
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {

    if (!request.token || !request.user.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const toBeCommented = await Blog.findById(request.params.id)
    const comment = request.body.comment
    const updatedCommented = await Blog.findOneAndUpdate(
      { _id: toBeCommented.id },
      { $push: { comments: comment } }, { new: true }
    ).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedCommented).status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const toBeUpdatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }

  try { const updatedBlog  = await Blog.findByIdAndUpdate(request.params.id, toBeUpdatedBlog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog).status(204).end()}
  catch (error) {
    next(error)
  }
})

module.exports = blogsRouter