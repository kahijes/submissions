import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    return action.data.user
  }
  case 'INITIALIZE_USER': {
    return action.data.user
  }
  default:
    return state
  }
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch({
        type:  'INITIALIZE_USER',
        data: {
          user: user
        }
      })
      blogService.setToken(user.token)
    }
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: {
      user: user
    }
  }
}

export default userReducer