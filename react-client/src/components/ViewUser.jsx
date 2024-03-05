import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/feed.css'
import RecipeCard from './RecipeCard'

const ViewUser = (props) => {
    const {id, setRecipeId} = props
    const [user, setUser] = useState({})
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then((res) => {
                setUser(res.data)
                setRecipes(res.data.recipes)
            })
            .catch((err) => console.log(err))
    },[])
    
    return (
        <div>
            <h1>{user.firstName} {user.lastName} (@{user.username})</h1>
            <h2>Recipes:</h2>
            <div className='feed'>
                {
                    recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} setRecipeId={setRecipeId}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ViewUser