from flask_api import api
from flask_api.config.mysqlconnection import connectToMySQL
from flask_api.models import recipe
from flask import jsonify
import re
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(api)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile
from flask_api.models.base_model import BaseModel
from flask_jwt_extended import create_access_token, unset_jwt_cookies, decode_token

# Remember 'fat models, skinny controllers' more logic should go in here rather than in your controller. Your controller should be able to just call a function from the model for what it needs, ideally.

class User(BaseModel):
    db = "recipe_share_schema" # database schema
    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    # Decode Token From Request
    @classmethod
    def decode_request_token(cls, access_token):
        bearer, _, token = access_token.partition(' ')
        token_decoded = decode_token(token)
        user_id = token_decoded['sub']['id']
        return user_id

    # Create Users

    @classmethod
    def create_user(cls, data):
        errorList = cls.validate_user(data)
        if len(errorList):
            return {'errors': errorList, 'hasErrors': True}
        data = data.copy()
        data['password'] = bcrypt.generate_password_hash(data['password'])
        query = """
                INSERT INTO users (username, first_name, last_name, email, password)
                VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s)
                ;"""
        user_id = connectToMySQL(cls.db).query_db(query, data)
        user_dict = {
            'id': user_id,
            'username': data['username'],
            'firstName': data['first_name'],
            'lastName': data['last_name'],
            'email': data['email'],
            'recipes': []
        }
        # make user dict with data from req and add user id
        # send this user dict as the identity
        access_token = create_access_token(identity=user_dict)
        return {'access_token': access_token, 'hasErrors': False}
    
    # Read All Users

    @classmethod
    def get_users(cls):
        query = """
            SELECT *
            FROM users
            ;"""
        return connectToMySQL(cls.db).query_db(query)
    
    @classmethod
    def get_user_with_recipes(cls, id):
        data = {'id': id}
        query = """
            SELECT *
            FROM users
            LEFT JOIN recipes
            ON recipes.user_id = %(id)s
            WHERE users.id = %(id)s
            ;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        # return results
        result = results[0]
        this_user = {
            'id': result['id'],
            'username': result['username'],
            'firstName': result['first_name'],
            'lastName': result['last_name'],
            'email': result['email'],
            'recipes': [],
            'followed_users': []
        }
        for result in results:
            if result['recipes.id']:
                one_recipe = {
                    'id': result['recipes.id'],
                    'title': result['title'],
                    'description': result['description'],
                    'ingredients': result['ingredients'],
                    'directions': result['directions'],
                    'prep_time': result['prep_time'],
                    'cook_time': result['cook_time'],
                    'created_at': result['recipes.created_at'].isoformat(),
                    'updated_at': result['recipes.updated_at'].isoformat(),
                    'user_id': result['user_id']
                }
                this_user['recipes'].append(one_recipe)
        return this_user
    

    # Test reading followers
    @classmethod
    def get_user_with_followed_users(cls, id):
        data = {'id': id}
        query = """
            SELECT *
            FROM users
            LEFT JOIN user_has_followed_users
            ON user_has_followed_users.user_id = %(id)s
            LEFT JOIN users AS followed_users
            ON followed_users.id = followed_user_id
            WHERE users.id = %(id)s
            ;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        result = results[0]
        this_user = {
            'id': result['id'],
            'username': result['username'],
            'firstName': result['first_name'],
            'lastName': result['last_name'],
            'email': result['email'],
            'recipes': [],
            'followed_users': []
        }
        for result in results:
            if result['followed_users.id']:
                one_followed_user = {
                    'id': result['followed_users.id'],
                    'username': result['followed_users.username'],
                    'firstName': result['followed_users.first_name'],
                    'lastName': result['followed_users.last_name'],
                    'email': result['followed_users.email']
                }
                this_user['followed_users'].append(one_followed_user)
        return this_user
    
    @classmethod
    def get_user_by_email(cls, email):
        data = {'email' : email}
        query = """
                SELECT *
                FROM users
                WHERE email = %(email)s
                ;"""
        result = connectToMySQL(cls.db).query_db(query, data)
        if result:
            this_user = {
                'id': result[0]['id'],
                'username': result[0]['username'],
                'email': result[0]['email'],
                'password': result[0]['password']
            }
            return this_user
        return False
    
    @classmethod
    def get_user_by_username(cls, username):
        data = {'username' : username}
        query = """
                SELECT *
                FROM users
                WHERE username = %(username)s
            ;"""
        result = connectToMySQL(cls.db).query_db(query, data)
        if result:
            return True
        return False
    
    @classmethod
    def get_user_by_id(cls, id):
        data = {'id': id}
        query ="""
                SELECT *
                FROM users
                WHERE id = %(id)s
            ;"""
        result = connectToMySQL(cls.db).query_db(query, data)
        if result:
            this_user = {
                'id': result[0]['id'],
                'username': result[0]['username'],
                'email': result[0]['email'],
                'password': result[0]['password']
            }
            return this_user
        return "error"
    
    # Follow another user
    @classmethod
    def follow_user(cls, token_from_request, id):
        user_id = cls.decode_request_token(token_from_request)
        data = {
            'user_id': user_id,
            'followed_user_id': id
        }
        query = """
                INSERT INTO user_has_followed_users (user_id, followed_user_id)
                VALUES (%(user_id)s, %(followed_user_id)s)
            ;"""
        connectToMySQL(cls.db).query_db(query, data)
        followed_user = cls.get_user_by_id(id)
        return followed_user
    
    # Delete Follow
    @classmethod
    def unfollow_user(cls, followed_user_id, token_from_request):
        user_id = cls.decode_request_token(token_from_request)
        data = {
            "user_id": user_id,
            "followed_user_id": followed_user_id
        }
        query = """
                DELETE FROM user_has_followed_users
                WHERE user_id = %(user_id)s AND followed_user_id = %(followed_user_id)s
            ;"""
        connectToMySQL(cls.db).query_db(query, data)
        return {"hasErrors": False}
    
    # Bookmark Recipe
    @classmethod
    def bookmark_recipe(cls, recipe_id, token_from_request):
        user_id = cls.decode_request_token(token_from_request)
        data = {
            "user_id": user_id,
            "recipe_id": recipe_id
        }
        query = """
                INSERT INTO bookmarked_recipes (user_id, recipe_id)
                VALUES (%(user_id)s, %(recipe_id)s)
            ;"""
        connectToMySQL(cls.db).query_db(query, data)
        bookmarked_recipe = recipe.Recipe.read_recipe_with_user(recipe_id)
        return bookmarked_recipe
    
    # Get User's Bookmarks
    @classmethod
    def get_users_bookmarks(cls, token_from_request):
        user_id = cls.decode_request_token(token_from_request)
        data = {"user_id": user_id}
        query = """
                SELECT *
                FROM bookmarked_recipes
                LEFT JOIN recipes
                ON recipes.id = bookmarked_recipes.recipe_id
                WHERE bookmarked_recipes.user_id = %(user_id)s
            ;"""
        results = connectToMySQL(cls.db).query_db(query, data)
        if results:
            return results
        return False

    # Delete Bookmark
    @classmethod
    def delete_bookmark(cls, recipe_id, token_from_request):
        user_id = cls.decode_request_token(token_from_request)
        data = {
            "user_id": user_id,
            "recipe_id": recipe_id
        }
        query = """
                DELETE FROM bookmarked_recipes
                WHERE user_id = %(user_id)s AND recipe_id = %(recipe_id)s
            ;"""
        connectToMySQL(cls.db).query_db(query, data)
        return True

    # JWT Login/Logout

    @classmethod
    def token(cls, data):
        this_user = cls.get_user_by_email(data['email'])
        if this_user:
            if bcrypt.check_password_hash(this_user['password'], data['password']):
                this_user_with_followed_users = cls.get_user_with_followed_users(this_user['id'])
                access_token = create_access_token(identity=this_user_with_followed_users)
                return {'access_token': access_token, 'hasErrors': False}
        return {'error': 'Invalid login information.', 'hasErrors': True}
    
    @classmethod
    def logout(cls):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response

    # Validation
    @staticmethod
    def validate_user(data):
        errorList = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if len(data['email']) < 1:
            errorList['emailLength'] = "Please enter an email."
        elif not EMAIL_REGEX.match(data['email']):
            errorList['emailValid'] = "Invalid email."
        if User.get_user_by_email(data['email']):
            errorList['emailTaken'] = "Email taken."
        if User.get_user_by_username(data['username']):
            errorList['usernameTaken'] = "This username is taken."
        if len(data['username']) < 2:
            errorList['usernameLength'] = "Username must be at least 2 characters."
        if len(data['first_name']) < 2:
            errorList['firstName'] = "First Name must be at least 2 characters."
        if len(data['last_name']) < 2:
            errorList['lastName'] = "Last Name must be at least 2 characters."
        if len(data['password']) < 8:
            errorList['password'] = "Password must be at least 8 characters."
        if data['password'] != data['confirm_password']:
            errorList['confirmPassword'] = "Passwords must match."
        return errorList