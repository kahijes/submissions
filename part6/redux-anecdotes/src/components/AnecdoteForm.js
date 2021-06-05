import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, setVisibility } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const setNotification = (message) => {
    dispatch(addNotification(message))

    setTimeout(() => {
      dispatch(setVisibility(false))
    }, 5000)
  } 

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    setNotification(`'${content}' was created`)

  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>
        <input
          name='anecdote'
          type='text'
        />
      </div>
      <button>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm