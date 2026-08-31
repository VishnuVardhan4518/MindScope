# MindScope

> Predict student mental health scores from lifestyle, academic, and social-media usage using a lightweight FastAPI service.

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]() [![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)]() [![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)]()

Table of contents
- About
- Features
- Quickstart
- API
- Example requests
- Project structure
- Model & data
- Development
- Contributing
- License
- Contact

About
-----
MindScope is a small FastAPI project that exposes an HTTP API to predict a student's mental health score based on input features such as lifestyle habits, academic metrics, and social media usage. It is intended as a starting point for research experiments, demo apps, or coursework.

Features
--------
- FastAPI-based HTTP API with auto-generated OpenAPI docs (/docs)
- Simple prediction endpoint (/predict)
- Example client usage (curl and Python)
- Extensible: swap or retrain the underlying ML model

Quickstart
----------
Prerequisites
- Python 3.8+
- pip

Install and run locally
```bash
git clone https://github.com/VishnuVardhan4518/MindScope.git
cd MindScope
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open the app:
- API root: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- Redoc: http://127.0.0.1:8000/redoc

API
---
POST /predict
- Description: Predicts a mental health score (and optional category) for a student from structured inputs.
- Content-Type: application/json
- Response: JSON with prediction and any metadata

Example request body (update fields to match your actual model's schema):
```json
{
  "age": 20,
  "gender": "female",
  "sleep_hours_per_night": 6.5,
  "exercise_hours_per_week": 2,
  "study_hours_per_day": 4,
  "gpa": 3.4,
  "classes_missed_per_month": 1,
  "social_media_hours_per_day": 3
}
```

Example response:
```json
{
  "mental_health_score": 68.2,
  "category": "moderate",
  "model_version": "v1.0",
  "timestamp": "2026-08-31T12:34:56Z"
}
```

Note: The field names and response format above are examples. Make sure they match the Pydantic model and the trained model input your repo uses.

Example requests
----------------
curl
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{"age":20,"gender":"female","sleep_hours_per_night":6.5,"exercise_hours_per_week":2,"study_hours_per_day":4,"gpa":3.4,"social_media_hours_per_day":3}'
```

Python (requests)
```python
import requests

payload = {
    "age": 20,
    "gender": "female",
    "sleep_hours_per_night": 6.5,
    "exercise_hours_per_week": 2,
    "study_hours_per_day": 4,
    "gpa": 3.4,
    "social_media_hours_per_day": 3
}

r = requests.post("http://127.0.0.1:8000/predict", json=payload)
print(r.json())
```

Project structure
-----------------
A suggested project layout:
```
MindScope/
├─ app/
│  ├─ main.py          # FastAPI app and route registration
│  ├─ api.py           # route handlers (e.g., /predict)
│  ├─ models.py        # Pydantic request/response schemas
│  ├─ ml/              # model load, preprocessing, inference code
│  └─ utils.py         # helpers
├─ data/               # (optional) sample datasets, splits
├─ models/             # pretrained model artifacts (e.g., model.pkl)
├─ requirements.txt
└─ README.md
```

Model & data
------------
- Model artifact: store trained model files under `models/` (e.g., `models/model.pkl`) and load them at app startup.
- Data: keep sample data and preprocessing scripts in `data/` and `notebooks/`.
- Retraining: include a training script or notebook and document the exact preprocessing pipeline and feature set to maintain reproducibility.

Development
-----------
Formatting & linting
- Use black / flake8 / isort as preferred.

Testing
- Add unit tests for preprocess functions and endpoint integration tests.
- Example: pytest + requests or httpx for test client.

Environment
- Add a `.env` or settings module for configuration (model path, log level, allowed hosts).

Deployment
----------
- Containerize with Docker for portability.
- Use an ASGI server (uvicorn/gunicorn with uvicorn workers) for production.
- Example Dockerfile (basic):
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Contributing
------------
Contributions are welcome. A minimal contributing workflow:
1. Fork the repo
2. Create a branch: git checkout -b feature/my-feature
3. Add tests for new behavior
4. Open a PR describing changes

License
-------
This project is licensed under the MIT License. See LICENSE for details.

Contact
-------
Maintainer: Vishnu Vardhan (or replace with your preferred contact)
Project: https://github.com/VishnuVardhan4518/MindScope

Notes & next steps
------------------
- Update the example request/response so field names match your actual Pydantic models and ML inputs.
- Add model metadata (version, training data, metrics) to improve reproducibility.
- If you want, I can commit this README directly to your repository (create/update README.md). Just tell me to proceed.
