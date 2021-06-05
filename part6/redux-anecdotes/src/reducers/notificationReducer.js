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
// const removeNotification = () => {
//   return {
//     type: 'REMOVE'
//   }
// }



export default notificationReducer