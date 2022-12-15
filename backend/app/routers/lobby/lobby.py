import sys
sys.path.append("../..") # Adds higher directory to python modules path.
from fastapi import APIRouter
from app.dbManager.Entities import LobbyEntity, GuestEntity
from app.routers.lobby.lobby_model import LobbyDevModel
from app.routers.lobby.lobby_service import LobbyDevService

router = APIRouter(
    prefix="/dev_lobbies",
    tags=["dev_lobbies"],
    responses={404: {"description": "Not found"}},
)
service = LobbyDevService()

@router.get("/")
async def get_lobbies():
    return service.get_all_rows(entity=LobbyEntity)


@router.get("/{lobby_id}")
def get_lobby(lobby_id: int):
    return service.get_row(entity=LobbyEntity, id=lobby_id)


@router.post("/create_lobby")
async def create_lobby(body: LobbyDevModel):
    service.add_row(body=body)
    return {"status": "ok"}


@router.delete("/delete_lobby/{lobby_id}")
async def delete_lobby(lobby_id: int):
    service.delete_row(entity=LobbyEntity, id=lobby_id)
    return {"status": "ok"}


@router.get("/lobby_guests/{lobby_id}")
async def get_lobby_guests(lobby_id: int):
    return service.get_lobby_guests(lobby_id=lobby_id)


@router.get("/lobby_host/{lobby_id}")
async def get_lobby_host(lobby_id: int):
    return service.get_lobby_host(lobby_id=lobby_id)


@router.post("/mix_recievers/{lobby_id}")
async def shuffle_gift_recievers(lobby_id: int):
    service.shuffle_gift_recievers(lobby_id=lobby_id)
    return service.get_lobby_guests(lobby_id=lobby_id)
