import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LogoutButton = (props) => {
    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:5000/api/logout')
            .then((res) => {
                props.token()
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <button onClick={logout}>logout</button>
    )
}

export default LogoutButton