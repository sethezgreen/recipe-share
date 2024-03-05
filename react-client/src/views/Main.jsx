import React, { useState } from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import Feed from '../components/Feed'
import { Link } from 'react-router-dom'
import ViewRecipe from '../components/ViewRecipe'
import ViewUser from '../components/ViewUser'
import Login from '../components/Login'
import SideNav from '../components/SideNav'

const Main = (props) => {
    const {token, setToken, tokenId} = props
    const [recipeId, setRecipeId] = useState("")
    const [userId, setUserId] = useState("")
    const [modal, setModal] = useState(false)
    
    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='main_view'>
            <TopNav toggleModal={toggleModal}/>
            <div className='main-content'>
            <SideNav token={token}/>
            {
                recipeId?
                <div className='content-div'>
                    <button onClick={()=> setRecipeId("")}>Back to Feed</button>
                    <ViewRecipe recipeId={recipeId} token={token} tokenId={tokenId}/>
                </div>:
                userId?
                <div className='content-div'>
                    <button onClick={()=> setUserId("")}>Back to Feed</button>
                    <ViewUser id={userId}/>
                </div>:
                <div className='content-div'>
                    <div className='dsp-flex'>
                        <h3 className='background-border-rad'>Feed</h3>
                        {
                            token?
                            <Link to={'http://localhost:5173/create/recipe'} className='background-border-rad'>add recipe</Link>:
                            <p className='background-border-rad'>Log in to add a recipe</p>
                        }
                    </div>
                    <Feed token={token} setRecipeId={setRecipeId} setUserId={setUserId}/>
                </div>
            }
            </div>

            {
                modal && (
                    <div>
                        <div className='overlay' onClick={toggleModal}></div>
                        <div className='modal-content'>
                            <Login setToken={setToken} setModal={setModal}/>
                            <button className='close-modal' onClick={toggleModal}>
                                close
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Main