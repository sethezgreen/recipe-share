import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Main from './views/Main'
import useToken from './components/useToken'

function App() {
  const { token, setToken } = useToken("")
  const [tokenId, setTokenId] = useState("")
  const [loggedUser, setLoggedUser] = useState({})
  const [followedUsers, setFollowedUsers] = useState()

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      setTokenId(decoded.sub.id)
      setLoggedUser(decoded.sub)
      if (decoded.sub.followed_users) {
        setFollowedUsers(decoded.sub.followed_users)
      }
    }
  },[token])

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main token={token} setToken={setToken} tokenId={tokenId} setTokenId={setTokenId} loggedUser={loggedUser} setLoggedUser={setLoggedUser} followedUsers={followedUsers} setFollowedUsers={setFollowedUsers}/>} />
      </Routes>
    </>
  )
}

export default App
