import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterChange} from '../reducers/filterReducer'

const Filter = () => {
  // const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const filter = event.target.value

    dispatch(filterChange(filter))
    
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter