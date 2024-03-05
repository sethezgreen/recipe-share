import React from 'react'
import RecipeCard from './RecipeCard'

const Feed = (props) => {
    const { recipes, setRecipeId, usernameOnClick } = props

    return (
        <div className='feed'>
            {
                recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} setRecipeId={setRecipeId} usernameOnClick={usernameOnClick}/>
                ))
            }
        </div>
    )
}

export default Feed