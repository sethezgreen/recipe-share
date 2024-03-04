import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './views/Main'
import useToken from './components/useToken'
import Login from './components/Login'
import Register from './components/Register'
import RecipeForm from './components/RecipeForm'
import ViewRecipe from './components/ViewRecipe'
import UpdateRecipe from './components/UpdateRecipe'

function App() {
  const { token, setToken } = useToken()
  const [userId, setUserId] = useState("")

  return (
    <div className="app">
            <Routes>
              <Route exact path="/dashboard" element={<Main token={token}/>} />
              <Route path='/' element={<Login setToken={setToken} setUserId={setUserId}/>}/>
              <Route path='/register' element={<Register setToken={setToken} />}/>
              <Route path='/create/recipe' element={<RecipeForm userId={userId}/>}/>
              <Route path='/recipe/:id' element={<ViewRecipe />} />
              <Route path='/recipe/update/:id' element={<UpdateRecipe />}/>
            </Routes>
    </div>
  )
}

export default App
