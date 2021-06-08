const initialFilter = { toShow: false, text: ''}
let timeoutID

const notificationReducer = (state = initialFilter , action) => {
  switch(action.type) {
    case 'TOGGLE_VISIBILITY': {
      return {
        ...state,
        toShow: action.data.toShow
      }
    }
    case 'ADD': {
      return {
        toShow: action.data.toShow,
        text: action.data.text
      }
    }
    default:
      return state
  }
} 

export const setVisibility = (show) => {
  return {
    type: 'TOGGLE_VISIBILITY',
    data: {toShow: show}
  }
}

export const addNotification = (message) => {
  return {
    type: 'ADD',
    data: {
      text: message,
      toShow: true}
  }
}


export const setNotification = (text, time) => {
  clearTimeout(timeoutID)
  return async dispatch => {
    dispatch(addNotification(text))
    // clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(setVisibility(false))
    }, time*1000)
  }
}


export default notificationReducer