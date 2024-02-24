from flask_app import app

# Test route

@app.route('/test')
def test():
    return "modularized"