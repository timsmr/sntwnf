import sys

sys.path.append("../..")  # Adds higher directory to python modules path.
from fastapi import APIRouter, Depends
from app.routers.auth.auth_service import AuthService
from fastapi import FastAPI, status, HTTPException
from fastapi.responses import RedirectResponse
from app.routers.user.user_model import UserModel
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from app.routers.auth.auth_model import TokenModel

from uuid import uuid4

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)

service = AuthService()


@router.post("/create_user")
async def create_user(body: UserModel):
    return service.create_user(body=body)


@router.post('/login', summary="Create access and refresh tokens for user")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return service.sign_in(form_data)


@router.get("/me")
async def read_users_me(current_user: TokenModel = Depends(service.get_current_user)):
    return current_user
