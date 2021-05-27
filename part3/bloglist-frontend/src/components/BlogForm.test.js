import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm ', () => {

  const handlePost = jest.fn()

  const component = render(
    <BlogForm handlePost={handlePost} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'author test' }
  })
  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(url, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(handlePost.mock.calls).toHaveLength(1)
  expect(handlePost.mock.calls[0][0].author).toBe('author test')
  expect(handlePost.mock.calls[0][0].url).toBe('test url')
  expect(handlePost.mock.calls[0][0].title).toBe('test title')

})