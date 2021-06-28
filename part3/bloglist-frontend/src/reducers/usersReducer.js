import userService from '../services/users'
const initialState = []
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_ALL_USERS': {
    return action.data.users
  }

  default:
    return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    const listOfUsers = await userService.getUsers()
    dispatch({
      type: 'INITIALIZE_ALL_USERS',
      data: {
        users: listOfUsers
      }
    })
  }
}


export default usersReducer