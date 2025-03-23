from flask import Flask, request, jsonify
import os
import shutil
import uuid
from pathlib import Path
from analyze import analyze_image
from description import describe_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload/", methods=["POST"])
def upload_image():
    print(request)
    print(request.files)
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        # Generate a unique filename if needed
        filename = file.filename if file.filename else f"{uuid.uuid4()}.jpg"
        file_path = Path(UPLOAD_FOLDER) / filename

        # Save the file
        file.save(file_path)

        # Call the analysis function
        analysis, score = analyze_image(str(file_path))

        # Call the description function
        description = describe_image(str(file_path), analysis)
        print({"result": analysis, "description": description, "score": score})
        os.remove(file_path)

        return jsonify({"result": analysis, "description": description, "score": score})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    host_ip = "0.0.0.0"  # Allows access from LAN
    app.run(host=host_ip, port=8000, debug=True)
