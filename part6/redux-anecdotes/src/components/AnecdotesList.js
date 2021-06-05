import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote }  from '../reducers/anecdoteReducer'
import { addNotification, setVisibility } from '../reducers/notificationReducer'

const AnecdotesList = (props) => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  filteredAnecdotes.sort(function (a, b) {
    return b.votes - a.votes
  })

  const setNotification = (message) => {
    dispatch(addNotification(message))

    setTimeout(() => {
      dispatch(setVisibility(false))
    }, 5000)
  } 

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const liked = anecdotes.find(a => a.id === id).content
    setNotification(`you liked '${liked}'`)
  }


  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    )}
    </div>
  )
}
export default AnecdotesList