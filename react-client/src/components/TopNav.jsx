import React from 'react'
import '../css/topnav.css'
import LogoutButton from './LogoutButton'

function TopNav(props) {
    const { toggleModal, token, logoutCallback } = props

    const codeButtonOnClick = () => {
        window.open("https://github.com/sethezgreen/solo-project", "_blank", "noreferrer")
    }
    
    return (
        <div className='top-nav'>
            {/* <button onClick={() => codeButtonOnClick()}>Code</button> */}
            <div>
                {
                    token?
                    <LogoutButton logoutCallback={logoutCallback}/>:
                    <button onClick={toggleModal}>Login</button>
                }
            </div>
        </div>
    )
}

export default TopNav