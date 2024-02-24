from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Test route

@app.route("/test")
def test():
    return "success"

if __name__ == "__main__":
    app.run(debug=True)