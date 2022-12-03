import sys
sys.path.append("../..") # Adds higher directory to python modules path.
from fastapi import APIRouter
from app.dbManager.Entities import UserEntity
from app.routers.user.user_model import UserModel
from app.routers.user.user_service import UserService


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)

service = UserService()

@router.get("/")
def get_users():
    return service.get_all_rows(entity=UserEntity)


@router.get("/{user_id}")
def get_user(user_id: int):
    return service.get_row(entity=UserEntity, id=user_id)


@router.delete("/delete_user/{user_id}")
async def delete_lobby(user_id: int):
    service.delete_row(entity=UserEntity, id=user_id)
    return {"status": "ok"}


@router.get("/active_lobbies/{user_id}")
async def get_active_lobbies(user_id: int):
    return service.get_active_lobbies(user_id=user_id)