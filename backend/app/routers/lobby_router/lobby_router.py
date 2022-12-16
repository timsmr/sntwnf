import sys
sys.path.append("../..") #Adds higher directory to python modules path.
from fastapi import APIRouter, Depends
from app.dbManager.Entities import LobbyEntity, GuestEntity
from app.routers.lobby_router.lobby_service import LobbyService
from app.routers.auth_router.auth_model import TokenModel
from app.routers.lobby_router.lobby_model import LobbyInfoModel, LobbyModel, GuestModel

router = APIRouter(
    prefix="/lobby",
    tags=["lobby"],
    responses={404: {"description": "Not found"}},
)

service = LobbyService()


@router.post("/create_lobby")
async def create_lobby(body: LobbyModel, current_user: TokenModel = Depends(service.get_current_user)):
    return service.create_lobby(body, current_user)


@router.post("/add_guest")
async def add_guest(body: GuestModel, current_user: TokenModel = Depends(service.get_current_user)):
    return service.add_new_guest(body, current_user)


@router.post("/change_lobby")
async def change_lobby(body: LobbyInfoModel):
    return service.change_lobby(body)