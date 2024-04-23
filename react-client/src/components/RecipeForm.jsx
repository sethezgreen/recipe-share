import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'

const RecipeForm = (props) => {
    const {token} = props
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [directions, setDirections] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [errors, setErrors] = useState([])
    
    const submitHandler = (e) => {
        e.preventDefault()

        const newRecipe = {
            title,
            description,
            ingredients,
            directions,
            'prep_time': prepTime,
            'cook_time': cookTime
        }
        axios.post("http://localhost:5000/api/recipes/create", newRecipe, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
    }

    return (
        <>
            <div className='content-header-container'>
                <BackButton />
            </div>
            <div className='recipe-form'>
                <h1>Post a New Recipe</h1>
                <Form onSubmit={submitHandler} data-bs-theme="dark">
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type='text' value={title || ""} onChange={(e) => setTitle(e.target.value)} className='input' autoFocus/>
                        {
                            errors.title?
                            <Form.Text>{errors.title}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as='textarea' rows={3} value={description || ""} onChange={(e) => setDescription(e.target.value)} className='input'/>
                        {
                            errors.description?
                            <Form.Text>{errors.description}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredients:</Form.Label>
                        <Form.Control as='textarea' rows={3} value={ingredients || ""} onChange={(e) => setIngredients(e.target.value)} className='input'/>
                        {
                            errors.ingredients?
                            <Form.Text>{errors.ingredients}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Directions:</Form.Label>
                        <Form.Control as='textarea' rows={3} value={directions || ""} onChange={(e) => setDirections(e.target.value)} className='input'/>
                        {
                            errors.directions?
                            <Form.Text>{errors.directions}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prep Time:</Form.Label>
                        <Form.Control type='number' value={prepTime || ""} onChange={(e) => setPrepTime(e.target.value)} className='input'/>
                        {
                            errors.prepTime?
                            <Form.Text>{errors.prepTime}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CookTime:</Form.Label>
                        <Form.Control type='number' value={cookTime || ""} onChange={(e) => setCookTime(e.target.value)} className='input'/>
                        {
                            errors.cookTime?
                            <Form.Text>{errors.cookTime}</Form.Text>:
                            null
                        }
                    </Form.Group>
                    <button type='submit' className='submit-btn'>Create</button>
                </Form>
            </div>
        </>
    )
}

export default RecipeForm