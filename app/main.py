import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

from app.database.database import Base, engine
from app.database import models
from app.routes.auth import router as auth_router
from app.routes.history import router as history_router
from app.routes.prediction import router as prediction_router
from app.routes.insights import router as insights_router

from app.routes.recommendations import (
    router as recommendations_router
)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY is not configured in .env"
    )


app = FastAPI(
    title="MindScope",
    description="Student Mental Health Prediction System",
    version="1.0.0"
)


app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY,
    session_cookie="mindscope_session",
    max_age=60 * 60 * 24 * 7,
    same_site="lax",
    https_only=False
)
app.include_router(
    insights_router
)

app.include_router(
    recommendations_router
)


Base.metadata.create_all(
    bind=engine
)


app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


templates = Jinja2Templates(
    directory="templates"
)


def get_page_user(request: Request):

    user_id = request.session.get("user_id")

    if not user_id:
        return None

    return {
        "user_id": user_id,
        "email": request.session.get("email")
    }


app.include_router(
    auth_router
)


app.include_router(
    history_router
)


app.include_router(
    prediction_router
)


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request,
        "index.html",
    )


@app.get("/assessment")
def assessment_page(request: Request):

    user = get_page_user(request)

    if not user:
        return RedirectResponse(
            url="/login",
            status_code=303
        )

    return templates.TemplateResponse(
        request,
        "assessment.html",
        {
            "request": request,
            "user": user
        }
    )


@app.get("/dashboard")
def dashboard_page(request: Request):

    user = get_page_user(request)

    if not user:
        return RedirectResponse(
            url="/login",
            status_code=303
        )

    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {
            "request": request,
            "user": user
        }
    )


@app.get("/insights")
def insights_page(request: Request):

    user = get_page_user(request)

    if not user:
        return RedirectResponse(
            url="/login",
            status_code=303
        )

    return templates.TemplateResponse(
        request,
        "insights.html",
        {
            "request": request,
            "user": user
        }
    )


@app.get("/recommendations")
def recommendations_page(request: Request):

    user = get_page_user(request)

    if not user:
        return RedirectResponse(
            url="/login",
            status_code=303
        )

    return templates.TemplateResponse(
        request,
        "recommendations.html",
        {
            "request": request,
            "user": user
        }
    )


@app.get("/history")
def history_page(request: Request):

    user = get_page_user(request)

    if not user:
        return RedirectResponse(
            url="/login",
            status_code=303
        )

    return templates.TemplateResponse(
        request,
        "history.html",
        {
            "request": request,
            "user": user
        }
    )


@app.get("/resources")
def resources(request: Request):
    return templates.TemplateResponse(
        request,
        "resources.html",
    )


@app.get("/about")
def about(request: Request):
    return templates.TemplateResponse(
        request,
        "about.html",
    )

@app.get("/login")
def login_page(request: Request):
    return templates.TemplateResponse(
        request,
        "login.html",
    )


@app.get("/signup")
def signup_page(request: Request):
    return templates.TemplateResponse(
        request,
        "signup.html",
    )
