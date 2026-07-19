# AgriSmart AI

Agri Smart AI is an AI-powered farming assistant built to help farmers detect crop diseases and get smart agricultural advice.

## What it includes

- `app.py` — Flask backend with `/health`, `/analyze`, and `/uploads/<filename>` routes.
- `index.html` — upload page with image preview and backend connectivity.
- `results.html` — displays diagnosis results and the uploaded photo.
- `fronend.js` — frontend logic for backend health, uploads, and navigation.
- `css/style.css` — page styling and responsive layout.
- `Dockerfile` — container deployment support.
- `.github/workflows/ci.yml` — GitHub Actions configuration for build and lint checks.
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

3. Open the app in your browser:

```text
http://127.0.0.1:5000
```

> Do not open `index.html` directly from the file system. The application must be accessed through the Flask backend server for uploads and result pages to work correctly.

## Usage

- Upload a crop photo on the home page.
- The frontend sends the image to the backend `/analyze` route.
- The backend saves the photo and returns a diagnosis result with an image URL.
- `results.html` displays the diagnosis and the uploaded photo.

## Deploying with Docker

1. Build the Docker image:

```powershell
docker build -t agrismart-ai .
```

2. Run the container:

```powershell
docker run -p 5000:5000 agrismart-ai
```

3. Open the app in your browser:

```text
http://127.0.0.1:5000
```

## GitHub Actions (CI)

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that:

- checks out the repository
- sets up Python 3.13
- installs dependencies
- syntax-checks `app.py`
- builds the Docker image

If the repo is on GitHub, push your branch and Actions will run automatically.

## GitHub Pages deployment

The repository also includes a Pages workflow at `.github/workflows/deploy-pages.yml` that publishes the static front end from the repository root. Once the workflow runs on the `main` branch, the site is available at:

```text
https://<your-github-username>.github.io/Agri-Smart-Ai/
```

If you want the site to use a custom domain, add a `CNAME` file in the repository root with your domain name.

## Notes

- The frontend uses the backend server origin for API requests.
- Uploaded images are saved to the `uploads/` folder.
- Docker is optional but useful for consistent deployment.

