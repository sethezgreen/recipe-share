import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()

        const loginUser = {email, password}
        axios.post('http://localhost:5000/api/login', loginUser)
            .then((res) => {
                console.log(res)
                props.setToken(res.data.access_token)
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })

        setEmail("")
        setPassword("")
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                {
                    errors.length > 0?
                    <p>{errors}</p>:
                    null
                }
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login