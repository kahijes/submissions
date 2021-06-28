const defaultNotification = { toShow: false, text: '', color: '' }
let timeoutID

const notificationReducer = (state = defaultNotification, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    return {
      toShow: action.data.toShow,
      text: action.data.text,
      color: action.data.color
    }
  }

  case 'SET_VISIBILITY': {
    return {
      ...state,
      toShow: action.data.toShow
    }
  }
  default:
    return state
  }
}

const addNotification = (text, color) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      text: text,
      color: color,
      toShow: true
    }
  }
}

export const setNotification = (text, color, time) => {
  clearTimeout(timeoutID)
  return async dispatch => {
    dispatch(addNotification(text, color))
    timeoutID = setTimeout(() => {
      dispatch(setVisibility(false))
    }, time*1000)
  }
}

export const setVisibility = (show) => {
  return {
    type: 'SET_VISIBILITY',
    data: {
      toShow: show
    }

  }
}

export default notificationReducer