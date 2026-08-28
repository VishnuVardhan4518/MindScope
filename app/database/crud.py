import json

from sqlalchemy.orm import Session

from app.database.models import Assessment, User


def create_user(
    db: Session,
    email: str,
    password_hash: str
):

    user = User(
        email=email,
        password_hash=password_hash
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_user_by_email(
    db: Session,
    email: str
):

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def create_assessment(
    db: Session,
    user_id: int,
    prediction_score: float,
    assessment_data: dict
):

    assessment = Assessment(
        user_id=user_id,
        prediction_score=prediction_score,
        assessment_data=json.dumps(
            assessment_data
        )
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return assessment


def get_user_assessments(
    db: Session,
    user_id: int
):

    return (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id
        )
        .order_by(
            Assessment.created_at.desc()
        )
        .all()
    )


def get_latest_assessment(
    db: Session,
    user_id: int
):

    return (
        db.query(Assessment)
        .filter(
            Assessment.user_id == user_id
        )
        .order_by(
            Assessment.created_at.desc()
        )
        .first()
    )
