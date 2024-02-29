import axios from 'axios'
import React, { useState, useEffect } from 'react'

function Feed() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then((res) => {
                setRecipes(res.data)
                // console.log(`response data: ${res.data[0]["title"]}`)
                console.log("recipe res")
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='feed'>
            {
                recipes.map((recipe) => (
                    <div key={recipe.id}>
                        {/* <p>{recipe.title}</p>
                        <p>{recipe.cook_time}</p> */}
                        <p>{recipe}</p>
                        <p>{recipe.title}</p>
                    </div>
                ))
            }
            <p>{recipes}</p>
        </div>
    )
}

export default Feed