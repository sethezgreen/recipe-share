import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Main from './views/Main'
import useToken from './components/useToken'
import Login from './components/Login'
import Register from './components/Register'
import RecipeForm from './components/RecipeForm'

function App() {
  const { token, setToken } = useToken("")
  const [tokenId, setTokenId] = useState("")

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      setTokenId(decoded.sub)
    }
  },[token])

  return (
    <div className="app">
            <Routes>
              <Route exact path="/dashboard" element={<Main token={token} setToken={setToken} tokenId={tokenId}/>} />
              <Route path='/' element={<Login setToken={setToken}/>}/>
              <Route path='/register' element={<Register setToken={setToken} />}/>
              {/* <Route path='/create/recipe' element={<RecipeForm userId={userId} token={token}/>}/> */}
            </Routes>
    </div>
  )
}

export default App
