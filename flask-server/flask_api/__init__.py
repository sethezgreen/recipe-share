from flask import Flask
from datetime import timedelta
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

api = Flask(__name__)
CORS(api, supports_credentials=True)
jwt = JWTManager(api)

# load dotenv variables
load_dotenv()

api.secret_key = os.getenv("api.secret_key")
api.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)