import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/feed.css'
import '../css/viewuser.css'
import Feed from './Feed'

const ViewUser = (props) => {
    const {id, setUserId, setRecipeId, tokenId, token, followedUsers, setFollowedUsers} = props
    const [user, setUser] = useState({})
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then((res) => {
                setUser(res.data)
                setRecipes(res.data.recipes)
            })
            .catch((err) => console.log(err))
    },[])

    const followOnClick = () => {
        axios.post(`http://localhost:5000/api/users/follow/${user.id}`, "", {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                console.log(`followed users before new user: ${followedUsers}`)
                setFollowedUsers(...followedUsers, res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    console.log(`followed users after new user: ${followedUsers}`)

    const unfollowOnClick = () => {
        axios.delete(`http://localhost:5000/api/users/unfollow/${user.id}`, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
            console.log(res)
            // update followedUsers list
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <>
        {
            tokenId == id?
            <div className="profile-header-container">
                <button onClick={()=> setUserId("")} className='content-header'>Back to Feed</button>
                <h1>Your Recipes:</h1>
            </div>:
            <div className='profile-header-container'>
                <button onClick={()=> setUserId("")} className='content-header'>Back to Feed</button>
                <div className='profile-header'>
                    <h1>{user.firstName} {user.lastName} (@{user.username})</h1>
                    // fix logic for displaying unfollow button
                    {
                        token?
                            (user.username in followedUsers)?
                            <button onClick={() => unfollowOnClick()}>Unfollow</button>:
                            <button onClick={() => followOnClick()}>Follow</button>:
                        null
                    }
                </div>
                <p>Recipes:</p>
            </div>
        }
            <Feed recipes={recipes} setRecipeId={setRecipeId}/>
        </>
    )
}

export default ViewUser