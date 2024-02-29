from flask_api import api
from flask_api.config.mysqlconnection import connectToMySQL
from flask import flash, session, jsonify
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
    def create_user(cls, user_data):
        if not cls.validate_user(user_data):
            return False
        user_data = user_data.copy()
        user_data['password'] = bcrypt.generate_password_hash(user_data['password'])
        query = """
                INSERT INTO users (username, first_name, last_name, email, password)
                VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s)
                ;"""
        user_id = connectToMySQL(cls.db).query_db(query, user_data)
        session['user_id'] = user_id # starts with the user logged in after registering
        # could also save something like user_name in session here
        return user_id
    
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
        if bcrypt.check_password_hash(this_user.password, data['password']):
            access_token = create_access_token(identity=data['email'])
            return {"access_token": access_token}
        flash("Invalid Login Information")
        return False
    
    @classmethod
    def logout(cls):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response

    # Validation
    @staticmethod
    def validate_user(data):
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        is_valid = True
        if len(data['email']) < 1:
            flash("Email required.")
            is_valid = False
        elif not EMAIL_REGEX.match(data['email']):
            flash("Invalid email.")
            is_valid = False
        if User.get_user_by_email(data['email']):
            flash("Email taken.")
            is_valid = False
        if User.get_user_by_username(data['username']):
            flash("This username is taken.")
            is_valid = False
        if len(data['username']) < 2:
            flash("Username must be at least 2 characters.")
            is_valid = False
        if len(data['first_name']) < 2:
            flash("First Name must be at least 2 characters.")
            is_valid = False
        if len(data['last_name']) < 2:
            flash("Last Name be at least 2 characters.")
            is_valid = False
        if len(data['password']) < 8:
            flash("Password must be at least 8 characters.")
            is_valid = False
        if data['password'] != data['confirm_password']:
            flash("Passwords must match.")
            is_valid = False
        return is_valid