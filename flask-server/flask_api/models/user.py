from flask_api import api
from flask_api.config.mysqlconnection import connectToMySQL
from flask import jsonify
import re
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(api)
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile
from flask_api.models.base_model import BaseModel
from flask_jwt_extended import create_access_token, unset_jwt_cookies

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
        #What needs to be added here for class association?

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
        access_token = create_access_token(identity=data['email'])
        return {'access_token': access_token, 'hasErrors': False, 'user_id': user_id}
    
    # Read All Users

    @classmethod
    def get_users(cls):
        query = """
            SELECT *
            FROM users
            ;"""
        return connectToMySQL(cls.db).query_db(query)
    
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
            this_user = cls(result[0])
            this_user.created_at = this_user.created_at.isoformat()
            this_user.updated_at = this_user.updated_at.isoformat()
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
    
    # JWT Login/Logout

    @classmethod
    def token(cls, data):
        this_user = cls.get_user_by_email(data['email'])
        if this_user:
            if bcrypt.check_password_hash(this_user.password, data['password']):
                access_token = create_access_token(identity=data['email'])
                return {'access_token': access_token, 'hasErrors': False, 'user_id': this_user.id}
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
            errorList['lastName'] = "Last Name be at least 2 characters."
        if len(data['password']) < 8:
            errorList['password'] = "Password must be at least 8 characters."
        if data['password'] != data['confirm_password']:
            errorList['confirmPassword'] = "Passwords must match."
        return errorList