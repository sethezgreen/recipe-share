from flask_api import api
from flask import request, get_flashed_messages
from flask_api.models import user

# Test route

@api.route('/test')
def test():
    return "modularized"


# Create User Route

@api.route('/api/users/create', methods=["POST"])
def create_user():
    # newUser = user.User.create_user(request.get_json())
    # need to edit create_user to return user object rather than id
    if user.User.create_user(request.json):
        return 201
    return get_flashed_messages()

# Read Users Route

@api.route('/api/users')
def read_users():
    all_users = user.User.get_users()
    return (all_users)