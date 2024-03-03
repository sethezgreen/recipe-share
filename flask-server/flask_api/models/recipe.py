from flask_api.config.mysqlconnection import connectToMySQL
from flask_api.models import user
from flask_api.models.base_model import BaseModel

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

    # Could add parse recipe data method to return json of recipe

    # Create Recipe
    
    @classmethod
    def create_recipe(cls, data):
        errorList = cls.validate_recipe (data)
        if len(errorList):
            return {'errors': errorList, 'hasErrors': True}
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
        if len(data['prep_time']) < 1:
            errorList['prepTime'] = "Please enter a prep time."
        elif int(data['prep_time']) < 1:
            errorList['prepTime'] = "Prep time must be greater than 0."
        if len(data['cook_time']) < 1:
            errorList['cookTime'] = "Please enter a cook time."
        elif int(data['cook_time']) < 1:
            errorList['cookTime'] = "Cook time must be greater than 0."
        return errorList