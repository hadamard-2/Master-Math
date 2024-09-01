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


if __name__ == "__main__":
    app.run(debug=True)
