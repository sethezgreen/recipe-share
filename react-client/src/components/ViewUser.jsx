import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/feed.css'
import Feed from './Feed'

const ViewUser = (props) => {
    const {id, setRecipeId, tokenId, token} = props
    const [user, setUser] = useState({})
    const [recipes, setRecipes] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then((res) => {
                setUser(res.data)
                setRecipes(res.data.recipes)
            })
            .catch((err) => console.log(err))
    },[])

    const followOnClick = () => {
        axios.post(`http://localhost:5000/api/users/follow/${user.id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <>
        {
            tokenId == id?
            <h1>Your Recipes:</h1>:
            <div>
                <div>
                <h1>{user.firstName} {user.lastName} (@{user.username})</h1>
                {/* <button onClick={() => followOnClick()}>Follow</button> */}
                </div>
                <p>Recipes:</p>
            </div>
        }
            <Feed recipes={recipes} setRecipeId={setRecipeId}/>
        </>
    )
}

export default ViewUser