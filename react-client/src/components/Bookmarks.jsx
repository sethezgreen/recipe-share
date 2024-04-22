import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import axios from 'axios'
import BackButton from './BackButton'

const Bookmarks = (props) => {
    const {token} = props
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/api/users/bookmarks', {headers: {Authorization: `Bearer ${token}`}})
                .then((res) => {
                    console.log(res)
                    setRecipes(res.data)
                })
                .catch((err) => console.log(err))
        }
    },[token])

    return (
        <>
            <div className='content-header'>
                <BackButton />
            </div>
            <h1>Your Bookmarked Recipes:</h1>
            {
                recipes[0]?
                <Feed recipes={recipes} />:
                <p>Bookmark a recipe to find it here!</p>
            }
        </>
    )
}

export default Bookmarks