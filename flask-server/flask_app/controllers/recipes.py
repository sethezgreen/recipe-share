from flask_app import app
from flask import request
from flask_app.models import recipe

# Create Recipe Route

@app.route('/recipes/create', methods=["POST"])
def create_recipe():
    recipe.Recipe.create_recipe(request.get_json())
    return ("success")

# Read Recipe Routes

@app.route('/recipes/<int:recipe_id>')
def read_recipe(recipe_id):
    one_recipe = recipe.Recipe.read_recipe_with_user(recipe_id)
    return (one_recipe)