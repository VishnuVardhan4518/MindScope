import json

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.database.crud import (
    get_latest_assessment
)

from app.services.recommendations import (
    generate_recommendations
)


router = APIRouter(
    prefix="/api",
    tags=["Recommendations"]
)


@router.get("/recommendations")
def get_recommendations(
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        get_current_user
    )
):

    assessment = get_latest_assessment(
        db,
        current_user["user_id"]
    )

    if not assessment:

        raise HTTPException(
            status_code=404,
            detail="No assessment found"
        )


    try:

        data = json.loads(
            assessment.assessment_data
        )

    except (
        json.JSONDecodeError,
        TypeError
    ):

        data = {}


    recommendations = generate_recommendations(
        data,
        float(
            assessment.prediction_score
        )
    )


    return {
        "score":
            assessment.prediction_score,

        "recommendations":
            recommendations,

        "created_at":
            assessment.created_at.isoformat()
    }