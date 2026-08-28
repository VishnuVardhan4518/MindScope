# Student Mental Health Prediction

FastAPI project for predicting a student mental health score from lifestyle, academic, and social media usage inputs.

## Run Locally

```powershell
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

Prediction API:

```text
POST http://127.0.0.1:8000/predict
```
