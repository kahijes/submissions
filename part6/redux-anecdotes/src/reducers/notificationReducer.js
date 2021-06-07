const initialFilter = { toShow: false, text: ''}

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
  return async dispatch => {
    dispatch(addNotification(text))
    
    setTimeout(() => {
      dispatch(setVisibility(false))
    }, time*1000)
  }
}


export default notificationReducer