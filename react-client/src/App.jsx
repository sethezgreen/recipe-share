import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Main from './views/Main'
import useToken from './components/useToken'
import Login from './components/Login'

function App() {
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/users')
  //     .then((res) => {
  //       setUsers(res.data)
  //       console.log('users res:')
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  const { token, removeToken, setToken } = useToken()

  return (
    <div className="app">
      {/* <Main /> */}
      {/* <h1>Users</h1>
      {
        users.map((user) => (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        ))
      } */}
      {/* <Header token={removeToken}/> */}
        {/* {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} /> */}
          <>
            <Routes>
              <Route exact path="/dashboard" element={<Main token={token} setToken={setToken}/>} />
              <Route path='/' element={<Login setToken={setToken}/>}/>
            </Routes>
          </>
    </div>
  )
}

export default App
