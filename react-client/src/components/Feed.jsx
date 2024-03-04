import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../css/feed.css'
import { Link, useNavigate } from 'react-router-dom'

const Feed = (props) => {
    const {token} = props
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes', {headers: {Authorization: 'Bearer' + token}}) // authorization headers not working
            .then((res) => {
                setRecipes(res.data)
                // console.log(`response data: ${res.data[0]["title"]}`)
                console.log("recipe res")
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [token])

    const recipeOnClick = (id) => {
        navigate(`/recipe/${id}`)
    }

    return (
        <div className='feed'>
            {
                recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-card' onClick={() => recipeOnClick(recipe.id)}>
                        <div className='top'>
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                            <p>Posted By: {recipe.user.username}</p>
                        </div>
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