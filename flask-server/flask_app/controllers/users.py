from flask_app import app
from flask import request
from flask_app.models import user

# Test route

@app.route('/test')
def test():
    return "modularized"


# Create User Route

@app.route('/users/create', methods=["POST"])
def create_user():
    user.User.create_user(request.get_json())
    return ("success")

# Read Users Route

@app.route('/users')
def read_users():
    all_users = user.User.get_users()
    return (all_users)