import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data)
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="app">
      {
        users.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
            <p>{user.first_name}</p>
            <p>{user.email}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
