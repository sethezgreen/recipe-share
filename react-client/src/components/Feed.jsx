import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../css/feed.css'
import { Link, useNavigate } from 'react-router-dom'

const Feed = (props) => {
    const {token, setRecipeId, setUserId} = props
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then((res) => {
                setRecipes(res.data)
                // console.log(`response data: ${res.data[0]["title"]}`)
                console.log("recipe res")
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [token])

    const usernameOnClick = (e, id) => {
        e.stopPropagation()
        setUserId(id)
    }

    return (
        <div className='feed'>
            {
                recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-card' onClick={() => setRecipeId(recipe.id)}>
                        <div className='top'>
                            <h3 className='blue-hover'><u>{recipe.title}</u></h3>
                            <p >Posted By: <span className='blue-hover' onClick={(e) => usernameOnClick(e, recipe.user_id)}>@{recipe.user.username}</span></p>
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

export default Feed