import React from 'react'
import '../css/sidenav.css'

const SideNav = (props) => {
    const { token, loggedUser, setUserId } = props

    return (
        <div className='side-nav'>
            {
                token?
                <div>
                    <p className='accent font-larger font-weight'>@{loggedUser.username}</p>
                    <p className='blue-hover pointer-hover' onClick={() => setUserId(loggedUser.id)}><u>My Recipes</u></p>
                    <p className='green-hover pointer-hover'><u>Bookmarked Recipes</u></p>
                    <p>Following:</p>
                    {
                        loggedUser.followed_user?
                        loggedUser.followed_users.map((followed_user) => (
                            <p key={followed_user.id} className='blue-hover pointer-hover' onClick={() => setUserId(followed_user.id)}>{followed_user.username}</p>
                        )):
                        <p>Follow someone to add</p>
                    }
                </div>:
            <p>Log in to view Account Details</p>
            }
            
        </div>
    )
}

export default SideNav