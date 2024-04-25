import { Outlet, useNavigate } from 'react-router-dom'
import '../css/main.css'
import SideNav from '../components/SideNav'
import LoginRegModal from '../components/LoginRegModal'

const Main = (props) => {
    const navigate = useNavigate()
    const {token, setToken, tokenId, setTokenId, loggedUser, setLoggedUser, modal, setModal, followedUsers, setFollowedUsers} = props

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
        navigate('/')
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