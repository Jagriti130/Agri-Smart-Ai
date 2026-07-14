# AgriSmart AI

A simple crop health diagnosis demo using a Flask backend and a static frontend.

## What it includes

- `app.py` — Flask backend with `/health`, `/analyze`, and `/uploads/<filename>` routes.
- `index.html` — upload page with image preview and backend connectivity.
- `results.html` — displays diagnosis results and the uploaded photo.
- `fronend.js` — frontend logic for backend health, uploads, and navigation.
- `css/style.css` — page styling and responsive layout.
- `requirements.txt` — Python dependencies.

## Setup

1. Install Python dependencies:

```powershell
cd "C:\Users\Jagriti\OneDrive\Desktop\hp"
pip install -r requirements.txt
```

2. Start the backend server:

```powershell
python app.py
```

3. Run a local frontend server from the project folder:

```powershell
python -m http.server 8000
```

4. Open the frontend in a browser:

```text
http://127.0.0.1:8000/index.html
```

## Usage

- Upload a crop photo on the home page.
- The frontend sends the image to the backend `/analyze` route.
- The backend returns a diagnosis and an image URL.
- `results.html` displays the results and the uploaded image.

## Deploying with Docker

1. Build the Docker image:

```powershell
docker build -t agrismart-ai .
```

2. Run the container:

```powershell
docker run -p 5000:5000 agrismart-ai
```

4. Open the app in your browser through the backend server:

```text
http://127.0.0.1:5000
```

> Do not open `index.html` directly from the file system. The app should be accessed through the Flask backend server so the upload and results flow works correctly.

## GitHub Actions (CI)

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- checks out the repository
- sets up Python 3.13
- installs dependencies
- syntax-checks `app.py`
- builds the Docker image

If your repository is on GitHub, push the branch and Actions will run automatically.

## Notes

- The frontend uses the backend URL `http://127.0.0.1:5000`.
- The backend allows cross-origin requests via `flask-cors`.
- Uploaded images are saved in the `uploads/` folder.

## GitHub

Add this repository to GitHub if you want to track it there:

```powershell
git init
git add .
git commit -m "Add AgriSmart AI backend and frontend"
```

Then create a remote repository and push your code.
