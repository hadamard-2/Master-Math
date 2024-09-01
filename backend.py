from flask import Flask, jsonify
from flask_cors import CORS
from pyswip import Prolog

app = Flask(__name__)
CORS(app)
prolog = Prolog()

# Consult the Prolog file
prolog.consult("./inference_engine/learning_path.pl")


@app.route("/unlocked_modules", methods=["GET"])
def get_unlocked_modules():
    result = list(prolog.query("unlocked_modules(Modules)"))
    if result:
        modules = result[0]["Modules"]
        return jsonify({"modules": modules})
    return jsonify({"modules": []})


if __name__ == "__main__":
    app.run()
