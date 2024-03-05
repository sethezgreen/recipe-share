import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'

const LoginRegModal = (props) => {
    const {setToken, toggleModal} = props
    const [registering, setRegistering] = useState(false)

    return (
        <div>
            <div className='overlay' onClick={toggleModal}></div>
            <div className='modal-content'>
            {
                registering?
                <Register setToken={setToken} toggleModal={toggleModal}/>:
                <div>
                    <Login setToken={setToken} toggleModal={toggleModal}/>
                    <button onClick={() => setRegistering(true)}>Need an account?</button>
                </div>
            }
                <button className='close-modal' onClick={toggleModal}>
                    close
                </button>
            </div>
        </div>
    )
}

export default LoginRegModal