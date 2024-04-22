import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
    const { recipe, usernameOnClick } = props;
    const navigate = useNavigate()

    const recipeCardOnClick = () => {
        navigate(`recipe/${recipe.id}`)
    }

    return (
    <div className='recipe-card' onClick={() => recipeCardOnClick()}>
        <img id="recipe-img" src="/placeholder.jpg" alt="placeholder image" />
        <div className="recipe-card-content">
            <div className='top'>
                <h3 className='blue-hover'><u>{recipe.title}</u></h3>
                {
                    usernameOnClick?
                    <p>Posted By: <span className='blue-hover' onClick={(e) => usernameOnClick(e, recipe.user_id)}>@{recipe.user.username}</span></p>:
                    null
                }
            </div>
            <div className="line-clamp">
                <p>Description: {recipe.description}</p>
            </div>
        </div>
    </div>
    );
};

export default RecipeCard;
