import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const notificationText = () => {
      if (props.notification.toShow) {
        return props.notification.text
      }
      return null
    }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = notificationText()

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

  const mapStateToProps = (state) => {
    return {
      notification: state.notification
    }
  }

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification