from flask import Flask, jsonify
from flask_cors import CORS
from pyswip import Prolog

app = Flask(__name__)
CORS(app)
prolog = Prolog()

prolog.consult("./inference_engine/learning_path.pl")
prolog.consult("./explanation/module_activation.pl")


@app.route("/api/unlocked_modules", methods=["GET"])
def get_unlocked_modules():
    result = list(prolog.query("unlocked_modules(Modules)"))
    if result:
        modules = result[0].get("Modules", [])
        return jsonify({"modules": modules})
    return jsonify({"modules": []})


def capitalize_course_name(course_name):
    stop_words = [
        "a",
        "an",
        "and",
        "at",
        "but",
        "by",
        "for",
        "in",
        "into",
        "it",
        "of",
        "on",
        "or",
        "to",
        "the",
        "to",
        "with",
    ]

    words = course_name.split("_")
    capitalized_words = []
    for word in words:
        if word not in stop_words:
            capitalized_words.append(word.capitalize())
        else:
            capitalized_words.append(word)
    return " ".join(capitalized_words)


@app.route("/api/prerequisites/<course_name>", methods=["GET"])
def get_prerequisites(course_name):
    result = list(
        prolog.query(
            f"prerequisites('{capitalize_course_name(course_name)}', Prerequisites)"
        )
    )
    if result:
        prerequisites = result[0].get("Prerequisites", [])
        return jsonify({"prerequisites": prerequisites})
    return jsonify({"prerequisites": []})

@app.route("/api/update_mastery_level", methods=["POST"])
def update_mastery_level():
    data = request.json
    module_name = data.get("module_name")
    new_level = data.get("mastery_level")

    if not module_name or new_level is None:
        return jsonify({"error": "Invalid data provided"}), 400

    # Call Prolog to update the mastery level
    prolog_query = f"update_mastery_level('{capitalize_course_name(module_name)}', {new_level})"
    result = list(prolog.query(prolog_query))

    if result:
        return jsonify({"status": "success"}), 200
    return jsonify({"error": "Failed to update mastery level"}), 500


if __name__ == "__main__":
    app.run(debug=True)
