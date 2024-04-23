import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main';
import useToken from './components/useToken';
import MainFeed from './components/MainFeed';
import ViewUser from './components/ViewUser';
import RecipeForm from './components/RecipeForm';
import NotFound from './views/NotFound';
import Bookmarks from './components/Bookmarks';
import ViewRecipe from './components/ViewRecipe';
import UpdateRecipe from './components/UpdateRecipe';

function App() {
  const { token, setToken } = useToken("")
  const [tokenId, setTokenId] = useState("")
  const [loggedUser, setLoggedUser] = useState({})
  const [modal, setModal] = useState(false)


  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      sessionStorage.setItem('tokenId', decoded.sub.id)
      setTokenId(decoded.sub.id)
      setLoggedUser(decoded.sub)
    }
  },[token])

  const toggleModal = () => {
    setModal(!modal)
}

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Main token={token} setToken={setToken} tokenId={tokenId} setTokenId={setTokenId} loggedUser={loggedUser} setLoggedUser={setLoggedUser} modal={modal} setModal={setModal} />}>
          <Route path='' element={<MainFeed token={token} toggleModal={toggleModal} />}/>
          <Route path='user/:userId' element={<ViewUser tokenId={tokenId} />}/>
          <Route path='recipe/new' element={<RecipeForm token={token} />}/>
          <Route path='bookmarks' element={<Bookmarks token={token} />}/>
          <Route path='recipe/:recipeId' element={<ViewRecipe token={token} tokenId={tokenId} />}/>
          <Route path='recipe/edit/:recipeId' element={<UpdateRecipe token={token} />}/>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
