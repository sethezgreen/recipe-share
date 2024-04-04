import React from 'react'
import RecipeCard from './RecipeCard'

const Feed = (props) => {
    const { recipes, setRecipeId, usernameOnClick } = props

    return (
        <>
            {
                recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} setRecipeId={setRecipeId} usernameOnClick={usernameOnClick}/>
                ))
            }
        </>
    )
}

export default Feed