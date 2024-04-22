import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../css/feed.css'
import Feed from './Feed'
import { useNavigate } from 'react-router-dom'

const MainFeed = (props) => {
    const {token, setRecipeId, toggleModal} = props
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then((res) => {
                setRecipes(res.data)
            })
            .catch(err => console.log(err))
    }, [token])

    const usernameOnClick = (e, id) => {
        e.stopPropagation()
        navigate(`/user/${id}`)
    }

    return (
        <>
            <div className='content-header-container'>
                <header className='content-header'>
                    <h3 className=''>Feed</h3>
                    {
                        token?
                        <button onClick={() => navigate('/recipe/new')} className='background-border-rad accent pointer-hover mobile-hidden'>post recipe</button>:
                        <button onClick={() => toggleModal()} className='background-border-rad accent mobile-hidden'>Log in to post a recipe</button>
                    }
                </header>
            </div>
            <Feed recipes={recipes} setRecipeId={setRecipeId} usernameOnClick={usernameOnClick}/>
        </>
    )
}

export default MainFeed