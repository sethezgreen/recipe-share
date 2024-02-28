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

@app.route('/api/recipes')
def read_all_recipes():
    all_recipes = recipe.Recipe.read_all_recipes_with_user()
    return (all_recipes), 200

# Update Recipe Route

@app.route('/api/recipe/update', methods = ["POST"])
def update_recipe():
    recipe.Recipe.update_recipe(request.json)
    # need to return updated object
    return "success", 201

# Delete Recipe Route

@app.route('/api/recipe/delete/<int:recipe_id>', methods = ["DELETE"])
def delete_recipe(recipe_id):
    recipe.Recipe.delete_recipe(recipe_id)
    return {}, 204