import React from 'react'
import '../css/sidenav.css'

const SideNav = (props) => {
    const { token } = props

    return (
        <div className='side-nav'>
            {
                token?
                <div>
                    <p>My Recipes</p>
                    <p>Bookmarked Recipes</p>
                    <p>Following:</p>
                    <div>
                        <p>Person 1</p>
                        <p>Person 2</p>
                    </div>
                </div>:
            <p>Log in to view</p>
            }
            
        </div>
    )
}

export default SideNav