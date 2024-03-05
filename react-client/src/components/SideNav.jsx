import React from 'react'
import '../css/sidenav.css'

const SideNav = (props) => {
    const { token, loggedUser, setUserId } = props

    return (
        <div className='side-nav'>
            {
                token?
                <div>
                    <p className='accent font-larger'>@{loggedUser.username}</p>
                    <p className='blue-hover pointer-hover' onClick={() => setUserId(loggedUser.id)}><u>My Recipes</u></p>
                    <p className='green-hover pointer-hover'><u>Bookmarked Recipes</u></p>
                    <p>Following:</p>
                    <div>
                        <p>Person 1</p>
                        <p>Person 2</p>
                    </div>
                </div>:
            <p>Log in to view Account Details</p>
            }
            
        </div>
    )
}

export default SideNav