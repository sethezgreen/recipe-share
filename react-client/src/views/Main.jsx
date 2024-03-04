import React, { useState } from 'react'
import './main.css'
import TopNav from '../components/TopNav'
import Feed from '../components/Feed'
import { Link } from 'react-router-dom'
import ViewRecipe from '../components/ViewRecipe'
import ViewUser from '../components/ViewUser'

const Main = (props) => {
    const {token} = props
    const [recipeId, setRecipeId] = useState("")
    const [userId, setUserId] = useState("")
    
    return (
        <div className='main_view'>
            <TopNav />
            <div>
            {/* sidenav component */}
            {
                recipeId?
                <div>
                    <button onClick={()=> setRecipeId("")}>Back to Feed</button>
                    <ViewRecipe recipeId={recipeId}/>
                </div>:
                userId?
                <div>
                    <button onClick={()=> setUserId("")}>Back to Feed</button>
                    <ViewUser id={userId}/>
                </div>:
                <div>
                    <h3>Feed</h3>
                    <Link to={'http://localhost:5173/create/recipe'}>add recipe</Link>
                    <Feed token={token} setRecipeId={setRecipeId} setUserId={setUserId}/>
                </div>
            }
            </div>
        </div>
    )
}

export default Main