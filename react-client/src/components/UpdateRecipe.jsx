import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

const UpdateRecipe = (props) => {
    const {token, userId, recipeId, setEditing} = props
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [directions, setDirections] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [creatorId, setCreatorId] = useState("")
    const [errors, setErrors] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
            .then((res) => {
                setTitle(res.data.title)
                setDescription(res.data.description)
                setIngredients(res.data.ingredients)
                setDirections(res.data.directions)
                setPrepTime(res.data.prep_time)
                setCookTime(res.data.cook_time)
                setCreatorId(res.data.user_id)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        const updatedRecipe = {
            "recipe_id": recipeId,
            title,
            description,
            ingredients,
            directions,
            'prep_time': prepTime,
            'cook_time': cookTime,
            'user_id': creatorId
        }
        axios.post("http://localhost:5000/api/recipes/update", updatedRecipe, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setEditing(false)
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
    }
    
    return (
        <div>
            <button onClick={() => setEditing(false)} type='button'>Back to {title}</button>
            <h1>Update {title}</h1>
            <Form onSubmit={submitHandler} data-bs-theme="dark">
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type='text' value={title || ""} onChange={(e) => setTitle(e.target.value)} className='input'/>
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
                <button type='submit' className='submit-btn'>Update</button>
            </Form>
        </div>
    )
}

export default UpdateRecipe