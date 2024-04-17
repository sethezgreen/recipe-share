import React, { useEffect, useState } from 'react'
import '../css/sidenav.css'
import LogoutButton from './LogoutButton'
import axios from 'axios'

const SideNav = (props) => {
    const { token, toggleModal, logoutCallback, loggedUser, setUserId, followedUsers, setFollowedUsers } = props
    
    useEffect(() => {
        // axios request to setFollowedUsers list
        axios.get(`http://localhost:5000/api/users/${sessionStorage.getItem('tokenId')}/followed_users`)
            .then((res) => {
                setFollowedUsers(res.data.followed_users)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [token])

    return (
        <div className='side-nav mobile-hidden'>
            {
                token?
                <div>
                    <p className='accent font-larger font-weight'>@{loggedUser.username}</p>
                    <p className='blue-hover pointer-hover' onClick={() => setUserId(loggedUser.id)}><u>My Recipes</u></p>
                    <p className='blue-hover pointer-hover'><u>Bookmarked Recipes</u></p>
                    <p>Following:</p>
                    {
                        followedUsers[0]?
                        followedUsers.map((followed_user) => (
                            <p key={followed_user.id} className='blue-hover pointer-hover' onClick={() => setUserId(followed_user.id)}>@{followed_user.username}</p>
                        )):
                        <p>Follow someone to add</p>
                    }
                    <LogoutButton logoutCallback={logoutCallback}/>
                </div>:
            <>
            <p>Log in to view Account Details</p>
            <button onClick={toggleModal}>Login</button>
            </>
            }
            
        </div>
    )
}

export default SideNav