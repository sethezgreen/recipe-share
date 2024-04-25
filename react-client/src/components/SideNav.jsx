import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/sidenav.css'
import LogoutButton from './LogoutButton'
import axios from 'axios'

const SideNav = (props) => {
    const { token, toggleModal, logoutCallback, loggedUser, followedUsers, setFollowedUsers } = props
    const navigate = useNavigate()
    
    useEffect(() => {
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
                <>
                <div className='side-nav-content'>
                    <div className='user-info-container'>
                        <p className='accent font-larger font-weight'>@{loggedUser.username}</p>
                        <Link className='color-secondary blue-hover pointer-hover' to={`/user/${loggedUser.id}`}>
                            My Recipes
                        </Link>
                        <Link className='color-secondary blue-hover pointer-hover' to={`/bookmarks`}>
                            Bookmarked Recipes
                        </Link>
                    </div>
                    <div>
                        <p>Following:</p>
                        <div className='following-container'>
                            {
                                followedUsers[0]?
                                followedUsers.map((followed_user) => (
                                    <p key={followed_user.id} className='blue-hover pointer-hover' onClick={() => navigate(`/user/${followed_user.id}`)}>@{followed_user.username}</p>
                                )):
                                <p>Follow someone to add</p>
                            }
                        </div>

                    </div>
                </div>
                    <LogoutButton logoutCallback={logoutCallback} className='logout-btn'/>
                </>:
            <div>
                <p>Log in to view Account Details</p>
                <button onClick={toggleModal}>Login</button>
            </div>
            }
            
        </div>
    )
}

export default SideNav