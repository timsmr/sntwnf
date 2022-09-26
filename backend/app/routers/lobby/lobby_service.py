from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import LobbyEntity
import datetime
from app.routers.lobby.lobby_model import LobbyModel
from app.dbManager.Entities import GuestEntity
class LobbyService(BaseService):
    def add_row(self, body: LobbyModel):
        created_lobby = LobbyEntity(
            name=body.name,
            event_date=body.event_date,
            created=str(datetime.date.today()),
            started=body.is_started
        )
        session.add_all([created_lobby])
        session.commit()
        return True

    def get_lobby_guests(self, lobby_id: int):
        return session.query(GuestEntity).filter_by(lobby_id=lobby_id).order_by(GuestEntity.id).all()


    def get_lobby_host(self, lobby_id: int):
        return session.query(GuestEntity).filter_by(lobby_id=lobby_id, is_host=True).all()
