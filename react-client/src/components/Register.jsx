import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {
    const {setToken, toggleModal} = props
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
                toggleModal()
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
    }
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {
                        errors.usernameLength || errors.usernameTaken?
                        <div>
                            <p>{errors.usernameLength}</p>
                            <p>{errors.usernameTaken}</p>
                        </div>:
                        null
                    }
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {
                        errors.firstName?
                        <p>{errors.firstName}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {
                        errors.lastName?
                        <p>{errors.lastName}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {
                        errors.emailLength || errors.emailValid || errors.emailTaken?
                        <div>
                            <p>{errors.emailLength}</p>
                            <p>{errors.emailValid}</p>
                            <p>{errors.emailTaken}</p>
                        </div>:
                        null
                    }
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        errors.password?
                        <p>{errors.password}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {
                        errors.confirmPassword?
                        <p>{errors.confirmPassword}</p>:
                        null
                    }
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register