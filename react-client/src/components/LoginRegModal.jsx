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
                <div className='dsp-grid'>
                    <Register setToken={setToken} toggleModal={toggleModal}/>
                    <button className='register-btn' onClick={() => setRegistering(false)}>Back to Login</button>
                </div>:
                <div className='dsp-grid'>
                    <Login setToken={setToken} toggleModal={toggleModal}/>
                    <button className='register-btn' onClick={() => setRegistering(true)}>Need an account?</button>
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