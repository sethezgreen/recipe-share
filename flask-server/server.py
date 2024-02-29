from flask_api import api
from flask_api.controllers import users, recipes

if __name__=="__main__":   
    api.run(debug=True) 