describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cypresstest',
      password: 'testpassword',
      name: 'Cypress Test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'cypresstest', password: 'testpassword' })
    })


    it('a new blog can be created', function() {

      cy.createBlog({
        author: 'cypress author',
        url: 'cypress_test_url',
        likes: 10,
        title: 'cypress title'
      })

      cy.contains('cypress title by cypress author')
    })

    it('a blog can be liked', function() {

      cy.createBlog({
        author: 'cypress author',
        url: 'cypress_test_url',
        likes: 10,
        title: 'cypress title'
      })

      cy.get('#show-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('user can delete blog', function() {
      cy.createBlog({
        author: 'cypress delete',
        url: 'cypress_test_url',
        likes: 0,
        title: 'deleted title'
      })
      cy.get('#show-button').click()
      cy.get('#delete-button').click()

      cy.visit('http://localhost:3000')
      cy.contains('cypress delete').should('not.exist')

    })

  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  describe('Login', function() {
    it('the user can login with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('cypresstest')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Cypress Test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('fail')
      cy.get('#password').type('fail')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username')

      cy.get('html').should('not.contain', 'Cypress Test logged in')
    })
  })
})