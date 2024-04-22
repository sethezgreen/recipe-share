import React from 'react'
import RecipeCard from './RecipeCard'

const Feed = (props) => {
    const { recipes, usernameOnClick } = props

    return (
        <>
            {
                recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} usernameOnClick={usernameOnClick}/>
                ))
            }
        </>
    )
}

export default Feed