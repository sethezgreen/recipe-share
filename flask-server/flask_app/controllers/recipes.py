from flask_app import app
from flask import request
from flask_app.models import recipe

# Create Recipe Route

@app.route('/api/recipes/create', methods=["POST"])
def create_recipe():
    newRecipe = recipe.Recipe.create_recipe(request.json)
    # need create method to return recipe object rather than id
    return "success", 201

# Read Recipe Routes

@app.route('/api/recipes/<int:recipe_id>')
def read_recipe(recipe_id):
    one_recipe = recipe.Recipe.read_recipe_with_user(recipe_id)
    return (one_recipe), 200