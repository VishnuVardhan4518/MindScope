import json

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.crud import (
    get_latest_assessment as fetch_latest_assessment,
    get_user_assessments
)
from app.database.database import get_db


router = APIRouter(
    prefix="/api",
    tags=["History"]
)


# ============================================================
# GET USER ASSESSMENT HISTORY
# ============================================================

@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        get_current_user
    )
):

    assessments = get_user_assessments(
        db,
        current_user["user_id"]
    )

    return [
        {
            "id": assessment.id,

            "prediction_score":
                assessment.prediction_score,

            "assessment_data":
                json.loads(
                    assessment.assessment_data
                )
                if assessment.assessment_data
                else {},

            "created_at":
                assessment.created_at.isoformat()
        }

        for assessment in assessments
    ]


# ============================================================
# GET LATEST USER ASSESSMENT
# ============================================================

@router.get("/latest-assessment")
def get_latest_assessment_api(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        get_current_user
    )
):

    assessment = fetch_latest_assessment(
        db,
        current_user["user_id"]
    )

    if not assessment:

        raise HTTPException(
            status_code=404,
            detail="No assessment found"
        )

    try:

        assessment_data = json.loads(
            assessment.assessment_data
        )

    except (
        json.JSONDecodeError,
        TypeError
    ):

        assessment_data = {}

    return {
        "id": assessment.id,

        "prediction_score":
            assessment.prediction_score,

        "assessment_data":
            assessment_data,

        "created_at":
            assessment.created_at.isoformat()
    }
