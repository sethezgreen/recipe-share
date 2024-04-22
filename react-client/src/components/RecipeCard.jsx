import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
    const { recipe, setRecipeId } = props;
    const navigate = useNavigate()

    const usernameOnClick = (e) => {
        e.stopPropagation()
        navigate(`/user/${recipe.user_id}`)
    }

    return (
    <div className='recipe-card' onClick={() => setRecipeId(recipe.id)}>
        <img id="recipe-img" src="/placeholder.jpg" alt="placeholder image" />
        <div className="recipe-card-content">
            <div className='top'>
                <h3 className='blue-hover'><u>{recipe.title}</u></h3>
                {
                    usernameOnClick?
                    <p>Posted By: <span className='blue-hover' onClick={(e) => usernameOnClick(e)}>@{recipe.user.username}</span></p>:
                    null
                }
            </div>
            <div className="line-clamp">
                <p>Description: {recipe.description}</p>
            </div>
            {/* <div className='main'>
                <div className='recipe-info'>
                    <p>Ingredients:</p>
                    <p>{recipe.ingredients}</p>
                </div>
                <div className='recipe-info'>
                    <p>Directions:</p>
                    <p>{recipe.directions}</p>
                </div>
            </div> */}
        </div>
    </div>
    );
};

export default RecipeCard;
