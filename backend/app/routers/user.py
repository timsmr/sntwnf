import sys
sys.path.append("..") # Adds higher directory to python modules path.
from fastapi import Depends, FastAPI, status, APIRouter
from app.dbManager.dbManager import session
from app.dbManager.Entities import Guest, Lobby, User
from app.routers.models.models import UserModel
from fastapi.responses import JSONResponse



router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"},
               200: {"description": "Success"}},
)


@router.get("/")
def get_users():
    return [i for i in session.query(User)]


@router.get("/{user_id}")
def get_user(user_id: int):
    return session.query(User).filter_by(id=user_id).order_by(User.id).first()


@router.post("/create_user")
async def create_user(body: UserModel):
    created_guest = User(
        name=body.name,
        email=body.email,
        preferences=body.preferences,
        password=body.password
    )
    session.add_all([created_guest])
    session.commit()
    return JSONResponse(content=status.HTTP_200_OK)
