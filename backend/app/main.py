import uvicorn
from fastapi import FastAPI, Depends
from fastapi.responses import HTMLResponse
import sys
sys.path.append("..") # Adds higher directory to python modules path.
from fastapi.security import OAuth2PasswordBearer
from app.routers.lobby import lobby
from app.routers.guest import guest
from app.routers.user import user
from app.routers.auth_router import auth
from app.routers.lobby_router import lobby_router
from app.dbManager.dbManager import engine
from sqlalchemy_utils import database_exists
from alembic.config import Config
from alembic import command

app = FastAPI()
app.include_router(lobby.router)
app.include_router(user.router)
app.include_router(guest.router)
app.include_router(auth.router)
app.include_router(lobby_router.router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")




@app.get("/")
async def get():
    return {"start_message": 'hello world',
            str(engine.url): str(database_exists(engine.url))}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

