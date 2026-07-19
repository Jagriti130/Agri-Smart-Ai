from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def mock_analysis(file_name: str):
    return {
        "disease": "Early Blight",
        "crop": "Tomato",
        "confidence": 0.92,
        "advice": """
        समस्या: Early Blight (फफूंद रोग)
        उपाय:
        1. नीम का तेल या बाविस्टिन स्प्रे करें
        2. प्रभावित पत्तियां हटा दें
        3. NPK खाद संतुलित मात्रा में डालें
        """.strip(),
        "filename": file_name,
    }


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "AgriSmart AI"})


@app.route("/analyze", methods=["POST"])
def analyze_crop():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No image selected"}), 400

    safe_name = file.filename.replace(" ", "_")
    filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{safe_name}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    result = mock_analysis(filename)
    result["imageUrl"] = f"{request.host_url.rstrip('/')}/uploads/{filename}"
    return jsonify(result)


@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route('/')
def serve_index():
    return app.send_static_file('index.html')


@app.route('/results.html')
def serve_results():
    return app.send_static_file('results.html')


@app.route('/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
