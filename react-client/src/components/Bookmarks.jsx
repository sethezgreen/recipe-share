import React from 'react'
import Feed from './Feed'

const Bookmarks = (props) => {
    const {recipes, setRecipeId} = props

    return (
        <>
            <h1>Your Bookmarked Recipes:</h1>
            <Feed recipes={recipes} setRecipeId={setRecipeId}/>
        </>
    )
}

export default Bookmarks