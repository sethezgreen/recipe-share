import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ViewRecipe = () => {
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState({})
    const {id} = useParams()
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${id}`)
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
            <Link to={`/recipe/update/${recipe.id}`}>edit</Link>
        </div>
    )
}

export default ViewRecipe