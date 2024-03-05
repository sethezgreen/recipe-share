import React from 'react'
import '../css/topnav.css'
import LogoutButton from './LogoutButton'
import useToken from './useToken'

function TopNav(props) {
    const { removeToken } = useToken() 
    const { toggleModal } = props
    
    return (
        <div className='top-nav'>
            <button>About</button>
            <form>
                {/* need search icon */}
                <input type="search" name="" id="" />
            </form>
            <div>
                <button>DarkMode</button>
                <button onClick={toggleModal}>Profile</button>
                <LogoutButton token={removeToken}/>
            </div>
        </div>
    )
}

export default TopNav