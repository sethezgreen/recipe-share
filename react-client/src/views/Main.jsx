import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import '../css/main.css'
import SideNav from '../components/SideNav'
import LoginRegModal from '../components/LoginRegModal'

const Main = (props) => {
    const {token, setToken, tokenId, setTokenId, loggedUser, setLoggedUser, modal, setModal} = props
    // const [modal, setModal] = useState(false)
    const [followedUsers, setFollowedUsers] = useState([])

    // useEffect(() => {
    //     if (token) {
    //         axios.get('http://localhost:5000/api/users/bookmarks', {headers: {Authorization: `Bearer ${token}`}})
    //             .then((res) => {
    //                 console.log(res)
    //                 setBookmarks(res.data)
    //             })
    //             .catch((err) => console.log(err))
    //     }
    // },[token])

    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const logoutCallback = () => {
        setToken("")
        setTokenId("")
        setLoggedUser({})
        setFollowedUsers([])
        alert("logout successful")
    }

    return (
        <div className='main-view'>
            <div id='border'></div>
            <div className='main-content'>
            <SideNav token={token} toggleModal={toggleModal} logoutCallback={logoutCallback} loggedUser={loggedUser}  followedUsers={followedUsers} setFollowedUsers={setFollowedUsers} />
            <div className='content-div'>
                <Outlet />
            </div>
            </div>

            {
                modal && (
                    <LoginRegModal setToken={setToken} toggleModal={toggleModal}/>
                )
            }
        </div>
    )
}

export default Main