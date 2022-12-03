from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
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
from sqlalchemy import select, update

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
ALGORITHM = "HS256"
JWT_SECRET_KEY = "secret"
# JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']   # should be kept secret


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")




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
        expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode = {"exp": expires_delta, "sub": str(subject)}
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
        return encoded_jwt

    def create_user(self, body: UserModel):
        if self.is_user_exist(body.email):
            return {"error": "user already exists"}
        created_guest = UserEntity(
            name=body.name,
            email=body.email,
            preferences=body.preferences,
            password=self.get_hashed_password(body.password),
            token=self.create_access_token(body.email),
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
        session.execute(update(UserEntity).
                        where(UserEntity.email == form_data.username).
                        values(token=self.create_access_token(user.email),
                               expireDate=datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
                        )
        return {
            "access_token": self.create_access_token(user.email)
        }

    def get_current_user(self, token):
        user = session.query(UserEntity).filter_by(token=token).order_by(UserEntity.id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user


