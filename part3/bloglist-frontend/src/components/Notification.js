import React from 'react'

const Notification = (props) => {
  if (props.errorMessage === null) {
    return null
  }

  else if (props.color === 'Red') {
    return (
      <div className='error'>
        {props.errorMessage}
      </div>
    )
  }

  return (
    <div className='success'>
      {props.errorMessage}
    </div>
  )
}

export default Notification