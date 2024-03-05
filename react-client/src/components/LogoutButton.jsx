import React from 'react'
import axios from 'axios'
import useToken from './useToken'

const LogoutButton = (props) => {
    const {removeToken} = useToken()
    const {logoutCallback} = props

    const logout = () => {
        axios.post('http://localhost:5000/api/logout')
            .then((res) => {
                console.log(res)
                removeToken()
                logoutCallback()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <button onClick={logout} >Logout</button>
    )
}

export default LogoutButton