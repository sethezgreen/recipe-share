import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/feed.css'

const ViewUser = (props) => {
    const {id} = props
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
            {
                recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-card'>
                        <div className='top'>
                            <h3 className='blue-hover'>{recipe.title}</h3>
                        </div>
                        <p>Description: {recipe.description}</p>
                        <div className='main'>
                            <div>
                                <p>Ingredients:</p>
                                <p>{recipe.ingredients}</p>
                            </div>
                            <div>
                                <p>Directions:</p>
                                <p>{recipe.directions}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewUser