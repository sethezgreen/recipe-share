import React from 'react'

const RecipeCard = (props) => {
    const { recipe, setRecipeId, usernameOnClick } = props

    return (
        <div className='recipe-card' onClick={() => setRecipeId(recipe.id)}>
            <div className='top'>
                <h3 className='blue-hover'><u>{recipe.title}</u></h3>
                {
                    usernameOnClick?
                    <p>Posted By: <span className='blue-hover' onClick={(e) => usernameOnClick(e, recipe.user_id)}>@{recipe.user.username}</span></p>:
                    null
                }
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
    )
}

export default RecipeCard