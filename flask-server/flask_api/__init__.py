from flask import Flask
from flask_cors import CORS

api = Flask(__name__)
CORS(api, supports_credentials=True)

api.secret_key = "The first rule of secret key is... keep your recipes safe" 