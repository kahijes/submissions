import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDom } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component
  let mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 0,
      user: { username: 'test' }
    }

    component = render(
      <Blog blog={blog} user={{ username: 'test' }} handleLike={mockHandler}/>
    )
  
  })
  test('renders author and title by default, not url nor likes', () => {


    const div = component.container.querySelector('.justTheTitle')
    expect(div).toHaveTextContent('test author')
    expect(div).toHaveTextContent('test title')
    expect(div).not.toHaveTextContent('test url')
    expect(div).not.toHaveTextContent(0)
  })

  test('after clicking, all information is shown', () => {

    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogWithInformation')
    expect(div).toHaveTextContent('test author')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('test url')
    expect(div).toHaveTextContent(0)
  })

  test('clicking twice results in clickhandler called twice', () => {

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
    // const div = component.container.querySelector('.blogWithInformation')
    // expect(div).toHaveTextContent('2')

  })
})
