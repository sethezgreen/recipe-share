import React, { useState } from 'react'
import '../css/main.css'
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
        <div className='main-view'>
            <div id='border'></div>
            <div className='main-content'>
            <SideNav token={token} toggleModal={toggleModal} logoutCallback={logoutCallback} loggedUser={loggedUser} setUserId={setUserId}/>
            {
                creating?
                <div className='content-div'>
                    <div className='content-header-container'>
                        <button onClick={()=> setCreating(false)} className='content-header'>Back to Feed</button>
                    </div>
                    <RecipeForm token={token} setCreating={setCreating}/>
                </div>:
                recipeId?
                <div className='content-div'>
                    <div className='content-header-container'>
                        <button onClick={()=> setRecipeId("")} className='content-header'>Back to Feed</button>
                    </div>
                    <ViewRecipe recipeId={recipeId} token={token} tokenId={tokenId} setRecipeId={setRecipeId} setUserId={setUserId}/>
                </div>:
                userId?
                <div className='content-div'>
                    {/* <div className='content-header-container'>
                        
                    </div> */}
                    <ViewUser id={userId} setUserId={setUserId} setRecipeId={setRecipeId} tokenId={tokenId} token={token}/>
                </div>:
                <div className='content-div'>
                    <div className='content-header-container'>
                        <header className='content-header'>
                            {/* <h3 className='background-border-rad primary'>Feed</h3> */}
                            <h3 className=''>Feed</h3>
                            {
                                token?
                                <button onClick={() => setCreating(true)} className='background-border-rad accent pointer-hover mobile-hidden'>post recipe</button>:
                                <button onClick={() => toggleModal()} className='background-border-rad accent mobile-hidden'>Log in to post a recipe</button>
                            }
                        </header>
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