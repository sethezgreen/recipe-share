import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewRecipe = (props) => {
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState({})
    const {recipeId} = props
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
            .then((res) => {
                setRecipe(res.data)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    
    return (
        <div>
            <h1>{recipe.title}</h1>
            <h2>Posted By: {user.first_name} {user.last_name} (@{user.username})</h2>
            <p>Description: {recipe.description}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Directions: {recipe.directions}</p>
            <p>Prep Time: {recipe.prep_time} min</p>
            <p>Cook Time: {recipe.cook_time} min</p>
            <p>Total Time: {recipe.prep_time + recipe.cook_time} min</p>
            <Link to={`/recipe/update/${recipe.id}`}>edit</Link>
        </div>
    )
}

export default ViewRecipe