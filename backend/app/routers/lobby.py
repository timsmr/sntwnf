import sys
sys.path.append("..") # Adds higher directory to python modules path.
import datetime
from fastapi import Depends, FastAPI, status, APIRouter
from app.dbManager.dbManager import session
from app.dbManager.Entities import Guest, Lobby, User
from sqlalchemy import select
from fastapi.responses import JSONResponse
from app.routers.models.models import LobbyModel

router = APIRouter(
    prefix="/lobbies",
    tags=["lobbies"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_lobbies():
    return [i for i in session.query(Lobby)]


@router.get("/{lobby_id}")
def get_lobby(lobby_id: int):
    lobby = session.query(Lobby).filter_by(id=lobby_id).order_by(Lobby.id)
    return lobby.first()


@router.post("/create_lobby")
async def create_lobby(body: LobbyModel):
    print(body)
    created_lobby = Lobby(
        name=body.name,
        event_date=body.event_date,
        created=str(datetime.date.today()),
        started=body.is_started
    )
    print(created_lobby)
    session.add_all([created_lobby])
    session.commit()
    return JSONResponse(status_code=status.HTTP_200_OK)
