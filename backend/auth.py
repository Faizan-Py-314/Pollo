from datetime import datetime, UTC, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
import jwt
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from config import settings

from datebase import get_db
import models

password_hash = PasswordHash.recommended()

oauth2_sheme = OAuth2PasswordBearer('api/users/token')

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    encode_to = data.copy()
    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_minutes)

    encode_to.update({'exp': expire})
    encode_jwt = jwt.encode(
        encode_to,
        settings.secret_key.get_secret_value(),
        algorithm=settings.algorithm
    )

    return encode_jwt

def verify_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            settings.algorithm,
            options={'require': ['exp', 'sub']}
        )
    except jwt.InvalidTokenError:
        return None
    else:
        return payload.get('sub')


def get_current_user(token: Annotated[str, Depends(oauth2_sheme)], db: Annotated[Session, Depends(get_db)]):

    user_id = verify_access_token(token)

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid or expired token", headers={"WWW-Authenticate": "Bearer"})

    try:
        user_id_int = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid or expired token", headers={"WWW-Authenticate": "Bearer"})

    result = db.execute(select(models.User).where(models.User.id == user_id_int))
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid or expired token", headers={"WWW-Authenticate": "Bearer"})

    return user

CurrentUser = Annotated[models.User, Depends(get_current_user)]

