import React, { useEffect, useState } from 'react'
import '../css/sidenav.css'
import LogoutButton from './LogoutButton'

const SideNav = (props) => {
    const { token, toggleModal, logoutCallback, loggedUser, setUserId } = props
    const [followedUsers, setFollowedUsers] = useState([])
    
    useEffect(() => {
        setFollowedUsers(loggedUser.followed_users)
    }, [followedUsers])

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
                        followedUsers?
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