import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {


  const notification = useSelector(state => state.notification)


  if (notification.text === '' || notification.toShow === false) {
    return null
  }

  else if (notification.color === 'Red') {
    return (
      <div className='error'>
        {notification.text}
      </div>
    )
  }

  return (
    <div className='success'>
      {notification.text}
    </div>
  )
}

export default Notification