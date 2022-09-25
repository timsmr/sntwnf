import sys
sys.path.append("../..") # Adds higher directory to python modules path.
from fastapi import APIRouter
from app.dbManager.Entities import LobbyEntity
from app.routers.lobby.lobby_model import LobbyModel
from app.routers.lobby.lobby_service import LobbyService

router = APIRouter(
    prefix="/lobbies",
    tags=["lobbies"],
    responses={404: {"description": "Not found"}},
)
service = LobbyService()

@router.get("/")
def get_lobbies():
    return service.get_all_rows(entity=LobbyEntity)


@router.get("/{lobby_id}")
def get_lobby(lobby_id: int):
    return service.get_row(entity=LobbyEntity, id=lobby_id)


@router.post("/create_lobby")
async def create_lobby(body: LobbyModel):
    service.add_row(body=body)
    return {"status": "ok"}
