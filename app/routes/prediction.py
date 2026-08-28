from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.crud import create_assessment
from app.database.database import get_db
from app.services.predictor import predict_mental_health


router = APIRouter()


class StudentData(BaseModel):
    age: int = Field(..., ge=10, le=100)
    gender: Literal["Male", "Female"]
    country: str
    academic_level: Literal["Undergraduate", "Graduate", "High School"]
    most_used_platform: Literal[
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat",
    ]
    purpose_of_use: Literal["Networking", "Education", "Entertainment", "News"]
    avg_daily_usage_hours: float = Field(..., ge=0, le=24)
    daily_unlocks: int = Field(..., ge=0)
    study_hours: float = Field(..., ge=0, le=24)
    physical_activity_hours: float = Field(..., ge=0, le=24)
    sleep_hours_per_night: float = Field(..., ge=0, le=24)
    stress_level: Literal["Medium", "Low", "Very High", "High"]


class PredictionResponse(BaseModel):
    predicted_mental_health_score: float


@router.post("/predict", response_model=PredictionResponse)
def predict(
    data: StudentData,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        score = predict_mental_health(data)

        create_assessment(
            db=db,
            user_id=current_user["user_id"],
            prediction_score=score,
            assessment_data=data.model_dump()
        )

        return PredictionResponse(
            predicted_mental_health_score=score
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
