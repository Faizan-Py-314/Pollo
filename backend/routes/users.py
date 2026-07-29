from datetime import timedelta, UTC
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from datebase import get_db
from fastapi.security import OAuth2PasswordRequestForm
from auth import hash_password, verify_password, create_access_token, CurrentUser
import models
from schemas import UserCreate, UserResponse, Token
from config import settings

router = APIRouter()

@router.post('', response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Annotated[Session, Depends(get_db)]):

    result = db.execute(select(models.User).where(models.User.username == user.username))
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username Already Exist')

    result = db.execute(select(models.User).where(models.User.email == user.email))
    existing_email = result.scalars().first()

    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email Already Exist")

    new_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post('/token', response_model=Token)
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Annotated[Session, Depends(get_db)]):

    result = db.execute(select(models.User).where(models.User.email == form_data.username))
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Incorrect email or password', headers={'WWW-Authenticate': 'Bearer'})

    access_token_expire = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token({'sub': str(user.id)}, access_token_expire)

    return Token(access_token=access_token, token_type='Bearer')

@router.get('/me', response_model=UserResponse)
def get_current_user(current_user: CurrentUser):
    return current_user