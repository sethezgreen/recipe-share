import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Main from './views/Main'
import useToken from './components/useToken'
import Login from './components/Login'
import Register from './components/Register'

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

  const { token, setToken } = useToken()

  return (
    <div className="app">
      {/* <Header token={removeToken}/> */}
        {/* {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} /> */}
          <>
            <Routes>
              <Route exact path="/dashboard" element={<Main token={token}/>} />
              <Route path='/' element={<Login setToken={setToken}/>}/>
              <Route path='/register' element={<Register setToken={setToken} />}/>
            </Routes>
          </>
    </div>
  )
}

export default App
