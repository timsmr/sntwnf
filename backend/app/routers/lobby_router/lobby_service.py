from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import LobbyEntity
import datetime
from app.routers.lobby_router.lobby_model import LobbyModel
from app.dbManager.Entities import GuestEntity 

class LobbyService(BaseService):
    def create_lobby(self,):
        pass