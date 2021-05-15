const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const api = supertest(app)
const mongoose = require('mongoose')



describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fortesting2',
      name: 'hehe xd hauskaa',
      password: 'te232323',
      blogs: []
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'fortesting',
      name: 'hehe hauskaa',
      password: 'testpassword',
      blogs: []
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('test for fail if not given username', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'hehe hauskaa',
      password: 'salainen',
      blogs: []
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})