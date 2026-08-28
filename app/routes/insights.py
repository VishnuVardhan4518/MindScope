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

from app.services.insights import (
    generate_insights
)


router = APIRouter(
    prefix="/api",
    tags=["Insights"]
)


@router.get("/insights")
def get_insights(
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


    insights = generate_insights(
        data,
        float(
            assessment.prediction_score
        )
    )


    return {
        "score":
            assessment.prediction_score,

        "insights":
            insights,

        "created_at":
            assessment.created_at.isoformat()
    }