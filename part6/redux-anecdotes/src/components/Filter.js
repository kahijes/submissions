import React from 'react'
import {filterChange} from '../reducers/filterReducer'
import {connect} from 'react-redux'


const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter