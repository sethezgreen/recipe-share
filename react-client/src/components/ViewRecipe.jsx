import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/viewrecipe.css'
import BackButton from './BackButton'

const ViewRecipe = (props) => {
    const navigate = useNavigate()
    const {token, tokenId} = props
    const {recipeId} = useParams()
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState({})
    const [bookmarks, setBookmarks] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
            .then((res) => {
                setRecipe(res.data)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(`http://localhost:5000/api/users/bookmarks`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setBookmarks(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteButtonOnClick = () => {
        axios.delete(`http://localhost:5000/api/recipes/delete/${recipeId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                navigate(`/user/${tokenId}`)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const usernameOnClick = (e, id) => {
        e.stopPropagation()
        navigate(`/user/${id}`)
    }

    const bookmarkOnClick = () => {
        axios.post(`http://localhost:5000/api/users/bookmark/recipe/${recipeId}`, "", {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setBookmarks([...bookmarks, res.data])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const unBookmarkOnClick = () => {
        axios.delete(`http://localhost:5000/api/users/bookmark/delete/${recipeId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setBookmarks(bookmarks.filter((bookmark) => bookmark.id != recipeId))
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <>
            <div className='content-header-container'>
                <BackButton />
            </div>
            <div className='recipe-page'>
                <header className='recipe-header'>
                    <h1 className='recipe-title'>{recipe.title}</h1>
                        {
                            token?
                                (bookmarks.filter((bookmark) => bookmark.id == recipeId)[0])?
                                <button onClick={() => unBookmarkOnClick()} className='bookmark-btn'>UnBookmark</button>:
                                <button onClick={() => bookmarkOnClick()} className='bookmark-btn'>Bookmark</button>:
                                null
                            }
                </header>
                <p>By: {user.first_name} {user.last_name} <span className='blue-hover pointer-hover' onClick={(e) => usernameOnClick(e, recipe.user_id)}>(@{user.username})</span></p>
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
                        <button onClick={() => navigate(`/recipe/edit/${recipe.id}`)}>edit</button>
                        <button onClick={() => deleteButtonOnClick()}>delete</button>
                    </div>:
                    null
                }
            </div>
        </>
    )
}

export default ViewRecipe