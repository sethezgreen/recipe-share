import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = (props) => {
    const {setToken, toggleModal} = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()

        const loginUser = {email, password}
        axios.post('http://localhost:5000/api/login', loginUser)
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
            <h2>Login</h2>
            <Form onSubmit={submitHandler}>
                {
                    errors.length > 0?
                    <Form.Text>{errors}</Form.Text>:
                    null
                }
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant='primary' type='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default Login