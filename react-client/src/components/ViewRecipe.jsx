import axios from 'axios'
import '../css/viewrecipe.css'
import React, { useEffect, useState } from 'react'
import UpdateRecipe from './UpdateRecipe'

const ViewRecipe = (props) => {
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState({})
    const [editing, setEditing] = useState(false)
    const {recipeId, setRecipeId, setUserId, token, tokenId} = props
    
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

    const usernameOnClick = (e, id) => {
        e.stopPropagation()
        setUserId(id)
        setRecipeId("")
    }
    
    return (
        <div className='recipe-page'>
            {
                editing? 
                    <UpdateRecipe recipeId={recipeId} setEditing={setEditing} token={token}/>:
                    <>
                        <header className='recipe-header'>
                            <h1 className='recipe-title'>{recipe.title}</h1>
                            <p>{user.first_name} {user.last_name} <span className='blue-hover pointer-hover' onClick={(e) => usernameOnClick(e, recipe.user_id)}>(@{user.username})</span></p>
                        </header>
                        <div className='recipe-times'>
                            <div className='time-section'>
                                <p>Prep Time:</p>
                                <p>{recipe.prep_time} min</p>
                            </div>
                            <div className='time-section'>
                                <p>Cook Time:</p>
                                <p>{recipe.cook_time} min</p>
                            </div>
                            <div className='time-section'>
                                <p>Total Time:</p>
                                <p>{recipe.prep_time + recipe.cook_time} min</p>
                            </div>
                        </div>
                        <section>
                            <p>{recipe.description}</p>                            
                        </section>
                        <section>
                            <p className='sub-heading'>Ingredients</p>
                            <p className='recipe-list'>{recipe.ingredients}</p>
                        </section>
                        <section>
                            <p className='sub-heading'>Directions</p>
                            <p className='recipe-list'>{recipe.directions}</p>
                        </section>
                        {
                            tokenId == recipe.user_id?
                            <div className='recipe-btns'>
                                <button onClick={() => setEditing(true)}>edit</button>
                                <button onClick={() => deleteButtonOnClick()}>delete</button>
                            </div>:
                            null
                        }
                    </>
            }
        </div>
    )
}

export default ViewRecipe