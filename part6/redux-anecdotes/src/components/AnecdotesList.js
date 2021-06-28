import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { voteAnecdote }  from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesList = (props) => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  filteredAnecdotes.sort(function (a, b) {
    return b.votes - a.votes
  })

  // const setNotification = (message) => {
  //   dispatch(addNotification(message))

  //   setTimeout(() => {
  //     dispatch(setVisibility(false))
  //   }, 5000)
  // } 

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    const likedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    // const votedAnecdote = await anecdoteService.voteAnecdote(id, likedAnecdote)
    // dispatch(initializeAnecdotes(anecdotes.map(a => a.id === id ? votedAnecdote : a)))
    dispatch(voteAnecdote(id, likedAnecdote))
    dispatch(setNotification(`you voted for ${anecdote.content}`, 2))
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