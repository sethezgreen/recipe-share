from flask_api.config.mysqlconnection import connectToMySQL
from flask_api.models import user
from flask_api.models.base_model import BaseModel
from flask_jwt_extended import decode_token

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
        
    # Decode Token From Request
    @classmethod
    def decode_request_token(cls, access_token):
        bearer, _, token = access_token.partition(' ')
        token_decoded = decode_token(token)
        userId = token_decoded['sub']['id']
        return userId

    # Create Recipe
    
    @classmethod
    def create_recipe(cls, data, token_from_request):
        errorList = cls.validate_recipe(data)
        if len(errorList):
            return {'errors': errorList, 'hasErrors': True}
        recipe_data = {
            'title': data['title'],
            'description': data['description'],
            'ingredients': data['ingredients'],
            'directions': data['directions'],
            'prep_time': data['prep_time'],
            'cook_time': data['cook_time'],
            'user_id': cls.decode_request_token(token_from_request)
        }
        query = """
                INSERT INTO recipes (title, description, ingredients, directions, prep_time, cook_time, user_id)
                VALUES (%(title)s, %(description)s, %(ingredients)s, %(directions)s, %(prep_time)s, %(cook_time)s, %(user_id)s)
            ;"""
        recipe_id = connectToMySQL(cls.db).query_db(query, recipe_data)
        return {'recipe_id': recipe_id, 'hasErrors': False}
    
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
        one_recipe = {
            'id': result['id'],
            'title': result['title'],
            'description': result['description'],
            'ingredients': result['ingredients'],
            'directions': result['directions'],
            'prep_time': result['prep_time'],
            'cook_time': result['cook_time'],
            'created_at': result['created_at'].isoformat(),
            'updated_at': result['updated_at'].isoformat(),
            'user_id': result['user_id'],
            'user': {
                'id': result['users.id'],
                'username': result['username'],
                'first_name': result['first_name'],
                'last_name': result['last_name'],
                'email': result['email'],
                'created_at': result['users.created_at'].isoformat(),
                'updated_at': result['users.updated_at'].isoformat()
            }
        }
        return one_recipe
    
    # Read all recipes

    @classmethod
    def read_all_recipes_with_user(cls):
        query = """
                SELECT *
                FROM recipes
                JOIN users
                ON users.id = recipes.user_id
                ORDER BY recipes.created_at DESC
            ;"""
        results = connectToMySQL(cls.db).query_db(query)
        all_recipes = []
        for result in results:
            one_recipe = {
                'id': result['id'],
                'title': result['title'],
                'description': result['description'],
                'ingredients': result['ingredients'],
                'directions': result['directions'],
                'prep_time': result['prep_time'],
                'cook_time': result['cook_time'],
                'created_at': result['created_at'].isoformat(),
                'updated_at': result['updated_at'].isoformat(),
                'user_id': result['user_id'],
                'user': {
                    'id': result['users.id'],
                    'username': result['username'],
                    'first_name': result['first_name'],
                    'last_name': result['last_name'],
                    'email': result['email'],
                    'created_at': result['users.created_at'].isoformat(),
                    'updated_at': result['users.updated_at'].isoformat()
                }
            }
            all_recipes.append(one_recipe)
        return all_recipes
    
    # Read User Id of Recipe
    @classmethod
    def get_user_id_of_recipe(cls, recipe_id):
        data = {'id': recipe_id}
        query = """
            SELECT user_id
            FROM recipes
            WHERE id = %(id)s
            ;"""
        result = connectToMySQL(cls.db).query_db(query, data)
        user_id = result[0]['user_id']
        return user_id
    
    # Update Recipe

    @classmethod
    def update_recipe(cls, data, token_from_request):
        userId = cls.decode_request_token(token_from_request)
        if userId != data['user_id']:
            return {'errors': 'unauthorized user', 'hasErrors': True}
        errorList = cls.validate_recipe(data)
        if len(errorList):
            return {'errors': errorList, 'hasErrors': True}
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
        connectToMySQL(cls.db).query_db(query, data)
        return {'hasErrors': False}
    
    # Delete Recipe

    @classmethod
    def delete_recipe(cls, recipe_id, token_from_request):
        userId = cls.decode_request_token(token_from_request)
        if userId != cls.get_user_id_of_recipe(recipe_id):
            return {'errors': 'unauthorized user', 'hasErrors': True}
        data = {"id": recipe_id}
        query = """
                DELETE
                FROM recipes
                WHERE id = %(id)s
            ;"""
        connectToMySQL(cls.db).query_db(query, data)
        return {'hasErrors': False}
    
    @staticmethod
    def validate_recipe(data):
        errorList = {}
        if len(data['title']) < 2:
            errorList['title'] = "Title must be at least 2 characters."
        if len(data['description']) < 2:
            errorList['description'] = "Please enter a description."
        if len(data['ingredients']) < 2:
            errorList['ingredients'] = "Please enter the ingredients."
        if len(data['directions']) < 2:
            errorList['directions'] = "Please enter the directions."
        if isinstance(data['prep_time'], int):
            if int(data['prep_time']) < 1:
                errorList['prepTime'] = "Prep time must be greater than 0."
        elif len(data['prep_time']) < 1:
            errorList['prepTime'] = "Please enter a prep time."
        if isinstance(data['cook_time'], int):
            if int(data['cook_time']) < 1:
                errorList['cookTime'] = "Cook time must be greater than 0."
        elif len(data['cook_time']) < 1:
            errorList['cookTime'] = "Please enter a cook time."
        return errorList