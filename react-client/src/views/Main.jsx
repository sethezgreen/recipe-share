import React, { useState } from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import MainFeed from '../components/MainFeed'
import ViewRecipe from '../components/ViewRecipe'
import ViewUser from '../components/ViewUser'
import SideNav from '../components/SideNav'
import RecipeForm from '../components/RecipeForm'
import LoginRegModal from '../components/LoginRegModal'

const Main = (props) => {
    const {token, setToken, tokenId, setTokenId, loggedUser, setLoggedUser} = props
    const [recipeId, setRecipeId] = useState("")
    const [userId, setUserId] = useState("")
    const [modal, setModal] = useState(false)
    const [creating, setCreating] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const logoutCallback = () => {
        setToken("")
        setTokenId("")
        setLoggedUser({})
        alert("logout successful")
    }

    return (
        <div className='main_view'>
            <TopNav toggleModal={toggleModal} token={token} logoutCallback={logoutCallback}/>
            <div className='main-content'>
            <SideNav token={token} loggedUser={loggedUser} setUserId={setUserId}/>
            {
                creating?
                <div className='content-div'>
                    <button onClick={()=> setCreating(false)}>Back to Feed</button>
                    <RecipeForm token={token} setCreating={setCreating}/>
                </div>:
                recipeId?
                <div className='content-div'>
                    <button onClick={()=> setRecipeId("")}>Back to Feed</button>
                    <ViewRecipe recipeId={recipeId} token={token} tokenId={tokenId} setRecipeId={setRecipeId}/>
                </div>:
                userId?
                <div className='content-div'>
                    <button onClick={()=> setUserId("")}>Back to Feed</button>
                    <ViewUser id={userId} setRecipeId={setRecipeId} tokenId={tokenId} token={token}/>
                </div>:
                <div className='content-div'>
                    <div className='dsp-flex'>
                        <h3 className='background-border-rad primary'>Feed</h3>
                        {
                            token?
                            <button onClick={() => setCreating(true)} className='background-border-rad accent'>add recipe</button>:
                            <button onClick={() => toggleModal()} className='background-border-rad accent'>Log in to add a recipe</button>
                        }
                    </div>
                    <MainFeed token={token} setRecipeId={setRecipeId} setUserId={setUserId}/>
                </div>
            }
            </div>

            {
                modal && (
                    <LoginRegModal setToken={setToken} toggleModal={toggleModal}/>
                )
            }
        </div>
    )
}

export default Main