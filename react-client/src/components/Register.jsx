import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        <>
            <h2>Register</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    {
                        errors.usernameLength ||
                        errors.usernameTaken?
                        <div>
                            <Form.Text>{errors.usernameLength}</Form.Text>
                            <Form.Text>{errors.usernameTaken}</Form.Text>
                        </div>:
                        null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    {
                        errors.firstName ?
                        <Form.Text>{errors.firstName}</Form.Text>:
                        null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    {
                        errors.lastName ?
                        <Form.Text>{errors.lastName}</Form.Text>:
                        null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {
                        errors.emailLength || errors.emailValid || errors.emailTaken?
                        <div>
                            <Form.Text>{errors.emailLength}</Form.Text>
                            <Form.Text>{errors.emailValid}</Form.Text>
                            <Form.Text>{errors.emailTaken}</Form.Text>
                        </div>:
                        null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {
                        errors.password ?
                        <Form.Text>{errors.password}</Form.Text>:
                        null
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    {
                        errors.confirmPassword ?
                        <Form.Text>{errors.confirmPassword}</Form.Text>:
                        null
                    }
                </Form.Group>
                <Button variant='primary' type='submit'>Register</Button>
            </Form>
        </>
    )
}

export default Register