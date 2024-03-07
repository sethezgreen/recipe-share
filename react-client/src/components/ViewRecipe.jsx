import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UpdateRecipe from './UpdateRecipe'

const ViewRecipe = (props) => {
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState({})
    const [editing, setEditing] = useState(false)
    const {recipeId, setRecipeId, token, tokenId} = props
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
            .then((res) => {
                setRecipe(res.data)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [editing])

    const deleteButtonOnClick = () => {
        axios.delete(`http://localhost:5000/api/recipes/delete/${recipeId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setRecipeId("")
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    
    return (
        <div className='recipe-page'>
            {
                editing? 
                    <UpdateRecipe recipeId={recipeId} setEditing={setEditing} token={token}/>:
                    <div>
                        <h1>{recipe.title}</h1>
                        <h2>Posted By: {user.first_name} {user.last_name} (@{user.username})</h2>
                        <p>Description: {recipe.description}</p>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Directions: {recipe.directions}</p>
                        <p>Prep Time: {recipe.prep_time} min</p>
                        <p>Cook Time: {recipe.cook_time} min</p>
                        <p>Total Time: {recipe.prep_time + recipe.cook_time} min</p>
                        {
                            tokenId == recipe.user_id?
                            <div>
                                <button onClick={() => setEditing(true)}>edit</button>
                                <button onClick={() => deleteButtonOnClick()}>delete</button>
                            </div>:
                            null
                        }
                    </div>
            }
        </div>
    )
}

export default ViewRecipe