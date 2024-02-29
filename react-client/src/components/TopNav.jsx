import React from 'react'
import './topnav.css'

function TopNav() {
    
    
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
            </div>
        </div>
    )
}

export default TopNav