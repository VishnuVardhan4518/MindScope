from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from app.database.database import get_db
from app.database.crud import create_user, get_user_by_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


password_hash = PasswordHash.recommended()


class SignupRequest(BaseModel):

    email: EmailStr
    password: str


@router.post("/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    existing_user = get_user_by_email(
        db,
        data.email
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    hashed_password = password_hash.hash(
        data.password
    )


    user = create_user(
        db=db,
        email=data.email,
        password_hash=hashed_password
    )


    return {
        "message": "User created successfully",
        "user_id": user.id,
        "email": user.email
    }


class LoginRequest(BaseModel):

    email: EmailStr
    password: str


@router.post("/login")
def login(
    request: Request,
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = get_user_by_email(
        db,
        data.email
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_valid = password_hash.verify(
        data.password,
        user.password_hash
    )

    if not password_valid:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    request.session["user_id"] = user.id
    request.session["email"] = user.email

    return {
        "message": "Login successful",
        "user_id": user.id,
        "email": user.email
    }

@router.post("/logout")
def logout(request: Request):

    request.session.clear()

    return {
        "message": "Logged out successfully"
    }
