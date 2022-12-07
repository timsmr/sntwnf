import sys
sys.path.append("../..") #Adds higher directory to python modules path.
from fastapi import APIRouter
from app.dbManager.Entities import LobbyEntity, GuestEntity

router = APIRouter(
    prefix="/lobby",
    tags=["lobby"],
    responses={404: {"description": "Not found"}},
)
