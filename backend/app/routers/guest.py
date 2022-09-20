import sys
sys.path.append("..") # Adds higher directory to python modules path.
from fastapi import Depends, FastAPI, status, APIRouter
from app.dbManager.dbManager import session
from app.dbManager.Entities import Guest, Lobby, User
from app.routers.models.models import GuestModel
from fastapi.responses import JSONResponse



router = APIRouter(
    prefix="/guests",
    tags=["guests"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_guests():
    return [i for i in session.query(Guest)]


@router.get("/{guest_id}")
def get_guest(guest_id: int):
    return session.query(Guest).filter_by(id=guest_id).order_by(Guest.id).first()


@router.post("/create_guest")
async def create_guest(body: GuestModel):
    created_guest = Guest(
        lobby_id=body.lobby_id,
        user_id=body.user_id,
        giving_to=body.giving_to,
        is_host=body.is_host
    )
    session.add_all([created_guest])
    session.commit()
    return JSONResponse(content=status.HTTP_200_OK)