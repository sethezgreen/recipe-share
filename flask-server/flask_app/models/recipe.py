from flask import jsonify
import json
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import user
from flask_app.models.base_model import BaseModel

class Recipe(BaseModel):
    db = "recipe_share_schema"
    def __init__(self, data):
        self.id = data['id']
        self.title = data['title']
        self.description = data['description']
        self.ingredients = data['ingredients']
        self.directions = data['directions']
        self.prep_time = data['prep_time']
        self.cook_time = data['cook_time']
        # self.total_time = int(data['prep_time']) + int(data['cook_time'])
        # self.img = data['img']
        # self.link = data['link']
        # self.rating = data['rating']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']
        self.user = None

    # Create Recipe
    
    @classmethod
    def create_recipe(cls, data):
        recipe_data = {
            'title': data['title'],
            'description': data['description'],
            'ingredients': data['ingredients'],
            'directions': data['directions'],
            'prep_time': data['prep_time'],
            'cook_time': data['cook_time'],
            'user_id': data['user_id']
        }
        query = """
                INSERT INTO recipes (title, description, ingredients, directions, prep_time, cook_time, user_id)
                VALUES (%(title)s, %(description)s, %(ingredients)s, %(directions)s, %(prep_time)s, %(cook_time)s, %(user_id)s)
            ;"""
        # will use session for user_id
        recipe_id = connectToMySQL(cls.db).query_db(query, recipe_data)
        return recipe_id
    
    # Read one Recipe

    @classmethod
    def read_recipe_with_user(cls, recipe_id):
        data = {
            'id' : recipe_id
        }
        query = """
                SELECT *
                FROM recipes
                JOIN users 
                ON users.id = user_id
                WHERE recipes.id = %(id)s
            ;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        print(f"results from DB: {results}")
        result = results[0]
        one_recipe = cls(result)
        # change datetime to isoformat in the recipe
        one_recipe.created_at = one_recipe.created_at.isoformat()
        one_recipe.updated_at = one_recipe.updated_at.isoformat()
        one_recipe.user = user.User({
            'id': result['users.id'],
            'username': result['username'],
            'first_name': result['first_name'],
            'last_name': result['last_name'],
            'email': result['email'],
            'password': result['password'],
            # may need to leave password out
            'created_at': result['users.created_at'].isoformat(),
            'updated_at': result['users.updated_at'].isoformat()
        })

        # Recipe object to JSON
        one_recipeJSON = one_recipe.toJson()
        return one_recipeJSON
    
    # Read all recipes

    @classmethod
    def read_all_recipes_with_user(cls):
        query = """
                SELECT *
                FROM recipes
                JOIN users
                ON users.id = recipes.user_id
            ;"""
        results = connectToMySQL(cls.db).query_db(query)
        all_recipes = []
        for result in results:
            one_recipe = cls(result)
            one_recipe.created_at = one_recipe.created_at.isoformat()
            one_recipe.updated_at = one_recipe.updated_at.isoformat()
            one_recipe.user = user.User({
            'id': result['users.id'],
            'username': result['username'],
            'first_name': result['first_name'],
            'last_name': result['last_name'],
            'email': result['email'],
            'password': result['password'],
            # may need to leave password out
            'created_at': result['users.created_at'].isoformat(),
            'updated_at': result['users.updated_at'].isoformat()
        })
            one_recipeJSON = one_recipe.toJson()
            print(f"one recipe JSON {one_recipeJSON}")
            all_recipes.append(one_recipeJSON)
            # need to convert the all_recipes list to JSON
        return all_recipes
    
    # Update Recipe

    @classmethod
    def update_recipe(cls, data):
        query = """
                UPDATE recipes
                SET
                    title = %(title)s,
                    description = %(description)s,
                    ingredients = %(ingredients)s,
                    directions = %(directions)s,
                    prep_time = %(prep_time)s,
                    cook_time = %(cook_time)s
                WHERE id = %(recipe_id)s
            ;"""
        result = connectToMySQL(cls.db).query_db(query, data)
        # need to return updated object
        return True
    
    # Delete Recipe

    @classmethod
    def delete_recipe(cls, recipe_id):
        data = {"id": recipe_id}
        query = """
                DELETE
                FROM recipes
                WHERE id = %(id)s
            ;"""
        return connectToMySQL(cls.db).query_db(query, data)