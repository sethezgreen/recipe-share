import React, { useState } from 'react'
import axios from 'axios'

const RecipeForm = (props) => {
    const {userId, token} = props
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
                    <label>Title:</label>
                    <input type="text" value={title || ""} onChange={(e) => setTitle(e.target.value)}/>
                    {
                        errors.title?
                        <p>{errors.title}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description || ""} onChange={(e) => setDescription(e.target.value)}/>
                    {
                        errors.description?
                        <p>{errors.description}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Ingredients:</label>
                    <input type="text" value={ingredients || ""} onChange={(e) => setIngredients(e.target.value)}/>
                    {
                        errors.ingredients?
                        <p>{errors.ingredients}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Directions:</label>
                    <input type="text" value={directions || ""} onChange={(e) => setDirections(e.target.value)}/>
                    {
                        errors.directions?
                        <p>{errors.directions}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Prep Time:</label>
                    <input type="number" value={prepTime || ""} onChange={(e) => setPrepTime(e.target.value)}/>
                    {
                        errors.prepTime?
                        <p>{errors.prepTime}</p>:
                        null
                    }
                </div>
                <div>
                    <label>Cook Time:</label>
                    <input type="number" value={cookTime || ""} onChange={(e) => setCookTime(e.target.value)}/>
                    {
                        errors.cookTime?
                        <p>{errors.cookTime}</p>:
                        null
                    }
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default RecipeForm