from flask_api import api
from flask import request, get_flashed_messages
import json
from datetime import datetime, timezone, timedelta
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required, create_access_token
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
@jwt_required()
def read_users():
    all_users = user.User.get_users()
    return (all_users)

# Token Refresh

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


# JWT Login Route

@api.route('/api/login', methods=["POST"])
def token():
    potential_token = user.User.token(request.json)
    if potential_token:
        return potential_token
    return get_flashed_messages(), 401

@api.route('/api/logout', methods=["POST"])
def logout():
    return user.User.logout()