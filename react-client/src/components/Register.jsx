import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {
    const navigate = useNavigate()
    const {setToken} = props
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        console.log("submitted")
        e.preventDefault()
        const newUser = {
            username,
            'first_name': firstName,
            'last_name': lastName,
            email,
            password,
            'confirm_password': confirmPassword
        }
        axios.post('http://localhost:5000/api/users/create', newUser)
            .then((res) => {
                console.log(res)
                setToken(res.data.access_token)
                navigate('/dashboard')
                // need to set token upon registering
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
    }
    
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {
                        errors.email?
                        <p>{errors.email}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register