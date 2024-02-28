import json

class BaseModel:
    """
    The jsonify method used in your controller cannot convert a class object to JSON. 
    So, before returning the object to the React app, we need to convert it to a dictionary.
    """
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)