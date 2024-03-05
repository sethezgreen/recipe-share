import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../css/feed.css'
import Feed from './Feed'

const MainFeed = (props) => {
    const {token, setRecipeId, setUserId} = props
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then((res) => {
                setRecipes(res.data)
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
        <Feed recipes={recipes} setRecipeId={setRecipeId} usernameOnClick={usernameOnClick}/>
    )
}

export default MainFeed