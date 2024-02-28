from flask_app import app
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
import re
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
from flask_app.models.base_model import BaseModel
# The above is used when we do login registration, flask-bcrypt should already be in your env check the pipfile

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
        print(user_data)
        # if not cls.validate_user(user_data):
        #     return False
        user_data = user_data.copy()
        user_data['password'] = bcrypt.generate_password_hash(user_data['password'])
        query = """
                INSERT INTO users (username, first_name, last_name, email, password)
                VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s)
                ;"""
        user_id = connectToMySQL(cls.db).query_db(query, user_data)
        # session['user_id'] = user_id # starts with the user logged in after registering
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