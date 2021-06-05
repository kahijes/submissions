import React from 'react'
import { useSelector } from 'react-redux'
// import notificationReducer from '../reducers/notificationReducer'

const Notification = () => {

  const notification = useSelector(state => {
      if (state.notification.toShow) {
        return state.notification.text
      }
      return null
    })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return(
      <div style={style}>
        {notification}
      </div>
    )
  }

    return (
      <div></div>
    )
  }


export default Notification