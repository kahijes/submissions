import React from 'react'
// import userService from '../services/users'
// import User from './User'
import { useSelector } from 'react-redux'
import  { Link } from 'react-router-dom'

const UsersList = () => {
  // const [users, setUsers] = useState({})

  // useEffect(() => {
  //   (async () => {
  //     const usersFromServer = await userService.getUsers()
  //     console.log(usersFromServer)
  //     console.log('tööööklkks')
  //     setUsers(usersFromServer)
  //   })()
  // }, [])
  const users = useSelector(state => state.allUsers)
  if (users === null) {
    return null
  }
  return (
    <div id='user-list'>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Number of blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(u => {
              return (
                <tr key={u.id}>
                  <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                  <td>{ u.blogs.length }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UsersList