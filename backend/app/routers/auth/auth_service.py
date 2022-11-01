from fastapi import HTTPException
from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt
from starlette import status

from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import UserEntity, GuestEntity, LobbyEntity
from app.routers.user.user_model import UserModel
from sqlalchemy import select


ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "secret"
JWT_REFRESH_SECRET_KEY = "refresh"
#JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']   # should be kept secret
#JWT_REFRESH_SECRET_KEY = os.environ['JWT_REFRESH_SECRET_KEY']    # should be kept secret


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService():
    def get_hashed_password(self, password: str) -> str:
        return password_context.hash(password)


    def verify_password(self, password: str, hashed_pass: str) -> bool:
        return password_context.verify(password, hashed_pass)


    def is_user_exist(self, email):
        if session.query(UserEntity).filter_by(email=email).order_by(UserEntity.id).first():
            return True
        else:
            return False

    def create_access_token(self, subject: Union[str, Any], expires_delta: int = None) -> str:
        if expires_delta is not None:
            expires_delta = datetime.utcnow() + expires_delta
        else:
            expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode = {"exp": expires_delta, "sub": str(subject)}
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
        return encoded_jwt

    def create_refresh_token(self, subject: Union[str, Any], expires_delta: int = None) -> str:
        if expires_delta is not None:
            expires_delta = datetime.utcnow() + expires_delta
        else:
            expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)

        to_encode = {"exp": expires_delta, "sub": str(subject)}
        encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
        return encoded_jwt

    def create_user(self, body: UserModel):
        if self.is_user_exist(body.email):
            return {"error": "user already exists"}
        created_guest = UserEntity(
            name=body.name,
            email=body.email,
            preferences=body.preferences,
            password=self.get_hashed_password(body.password)
        )
        session.add_all([created_guest])
        session.commit()
        return {"status": "ok"}


    def sign_in(self, form_data):
        user = session.query(UserEntity).filter_by(email=form_data.username).order_by(UserEntity.id).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect email or password"
            )
        hashed_pass = user.password
        if not self.verify_password(form_data.password, hashed_pass):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect email or password"
            )
        return {
            "access_token": self.create_access_token(user.email),
            "refresh_token": self.create_refresh_token(user.email),
        }




