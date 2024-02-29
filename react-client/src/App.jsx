import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Main from './views/Main'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((res) => {
        setUsers(res.data)
        console.log('users res:')
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="app">
      <Main />
      <h1>Users</h1>
      {
        users.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
