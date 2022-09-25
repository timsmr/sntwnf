import sys
sys.path.append("../..") # Adds higher directory to python modules path.
from fastapi import APIRouter
from app.dbManager.Entities import GuestEntity
from app.routers.guest.guest_model import GuestModel
from app.routers.guest.guest_service import GuestService


router = APIRouter(
    prefix="/guests",
    tags=["guests"],
    responses={404: {"description": "Not found"}},
)
service = GuestService()


@router.get("/")
def get_guests():
    return service.get_all_rows(entity=GuestEntity)


@router.get("/{guest_id}")
def get_guest(guest_id: int):
    return service.get_row(entity=GuestEntity, id=guest_id)


@router.post("/create_guest")
async def create_guest(body: GuestModel):
    service.add_row(body=body)
    return {"status": "ok"}