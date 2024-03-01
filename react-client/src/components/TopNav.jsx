import React from 'react'
import './topnav.css'
import LogoutButton from './LogoutButton'
import useToken from './useToken'

function TopNav() {
    const { removeToken } = useToken() 
    
    return (
        <div className='top-nav'>
            <button>About</button>
            <form>
                {/* need search icon */}
                <input type="search" name="" id="" />
            </form>
            <div>
                <button>DarkMode</button>
                <button>Profile</button>
                <LogoutButton token={removeToken}/>
            </div>
        </div>
    )
}

export default TopNav