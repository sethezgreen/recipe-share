import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/feed.css'
import '../css/viewuser.css'
import Feed from './Feed'
import { useParams } from 'react-router-dom'
import BackButton from './BackButton'

const ViewUser = (props) => {
    const { tokenId, token, followedUsers, setFollowedUsers} = props
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${userId}`)
            .then((res) => {
                setUser(res.data)
                setRecipes(res.data.recipes)
            })
            .catch((err) => console.log(err))
    },[])

    const followOnClick = () => {
        axios.post(`http://localhost:5000/api/users/follow/${user.id}`, "", {headers: {"Authorization": `Bearer ${token}`}})
            .then((res) => {
                setFollowedUsers([...followedUsers, res.data])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const unfollowOnClick = () => {
        axios.delete(`http://localhost:5000/api/users/unfollow/${user.id}`, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
            // update followedUsers list
            setFollowedUsers(followedUsers.filter((followedUser) => followedUser.id != user.id))
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <>
        {
            tokenId == userId?
            <div className="profile-header-container">
                <BackButton />
                <h1>Your Recipes:</h1>
            </div>:
            <div className='profile-header-container'>
                <BackButton />
                <div className='profile-header'>
                    <h1>{user.firstName} {user.lastName} (@{user.username})</h1>
                    {
                        token?
                            (followedUsers.filter((followedUser) => followedUser.id == id)[0])?
                            <button onClick={() => unfollowOnClick()}>Unfollow</button>:
                            <button onClick={() => followOnClick()}>Follow</button>:
                        null
                    }
                </div>
                <p>Recipes:</p>
            </div>
        }
            <Feed recipes={recipes} />
        </>
    )
}

export default ViewUser