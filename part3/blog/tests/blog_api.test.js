const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const jwt = require('jsonwebtoken')
let token

beforeEach(async () => {
  const response  = await api
    .post('/api/login')
    .send({
      username: 'fortesting',
      password: 'testpassword'
    })
  token = response.body.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    blog.user = decodedToken.id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('all tests', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      author: 'testing',
      title: 'some_title',
      url: 'some_url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtTheEnd.map(n => n.author)
    expect(authors).toContain('testing')

  })

  test('api returns the correct amount of blogs', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('likes defaults to 0', async () => {
    const newBlog = {
      author: 'maybeLikes0',
      title: 'some title',
      url: 'some url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const with0 = blogsAtEnd.find(n => n.author === 'maybeLikes0')
    expect(with0.likes).toBe(0)

  })

  test('without url or title response is 400', async () => {
    const newBlog = {
      author: 'pekka'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const toBeDeleted = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const authors = blogsAtEnd.map(a => a.author)
    expect(authors).not.toContain(toBeDeleted.author)
  })

  test('blog information can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const toBeUpdated = blogsAtStart[0]

    const updatedBlog = {
      title: toBeUpdated.title,
      author: 'has it been updated',
      url: toBeUpdated.url,
      likes: toBeUpdated.likes
    }
    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(updatedBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map(a => a.author)
    expect(authors).toContain('has it been updated')

  })

  test('id is defined', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const initialBlog = blogsAtStart[0]
    expect(initialBlog.id).toBeDefined()
  })

  test('401 if token is not provided', async () => {
    const newBlog = {
      author: 'testing',
      title: 'some_title',
      url: 'some_url'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})


afterAll(() => {
  mongoose.connection.close()
})