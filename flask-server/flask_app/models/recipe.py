from flask_app import app
import json
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import user

class Recipe:
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

    # To JSON method
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

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
        result = results[0]
        one_recipe = cls(result)
        one_recipe.user = user.User({
            'id': result['users.id'],
            'username': result['username'],
            'first_name': result['first_name'],
            'last_name': result['last_name'],
            'email': result['email'],
            'password': result['password'],
            'created_at': result['users.created_at'],
            'updated_at': result['users.updated_at']
        })

        # Recipe object to JSON
        recipeJSONData = json.dumps(one_recipe.toJson(), indent=4)
        print(recipeJSONData)
        # error for datetime
        return