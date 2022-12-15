from sqlalchemy import update
from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import LobbyEntity
import datetime
from app.routers.lobby_router.lobby_model import LobbyInfoModel, LobbyModel, GuestModel
from app.dbManager.Entities import GuestEntity 

class LobbyService(BaseService):
    def create_lobby(self, body: LobbyModel, current_user):
        if session.query(LobbyEntity).filter_by(name=body.lobby_name).order_by(LobbyEntity.id).first():
            return {"error": "lobby already exists"}
        created_lobby = LobbyEntity(
            name=body.lobby_name,
            event_date=body.event_date,
            created=str(datetime.date.today()),
            started=body.is_started
        )
        session.add_all([created_lobby])
        session.commit()
        lobby_owner = GuestEntity(
            lobby_name = body.lobby_name,
            user_id=current_user.id,
            is_host=True
        )
        session.add_all([lobby_owner])
        session.commit()
        
        return {"lobby": session.query(LobbyEntity).filter_by(name=body.lobby_name).order_by(LobbyEntity.id).first()}
    
    def add_new_guest(self, body: GuestModel, current_user):
        if not session.query(LobbyEntity).filter_by(name=body.lobby_name).order_by(LobbyEntity.id).first():
            return {"error": "no lobby with this name"}
        if session.query(GuestEntity).filter_by(user_id=current_user.id, lobby_name=body.lobby_name).first():
            return {"error": "guest is already created"}
        new_guest = GuestEntity(
            lobby_name = body.lobby_name,
            user_id = current_user.id,
            is_host=False
        )
        session.add_all([new_guest])
        session.commit()
        return {"guest": session.query(GuestEntity).filter_by(user_id=current_user.id).filter_by(lobby_name=body.lobby_name).first()}
    
    def change_lobby(self, body: LobbyInfoModel):
        session.execute(update(LobbyEntity).
                        where(LobbyEntity.name == body.lobby_name).
                        values(
                            event_date = body.event_date
                            )
                        )
        session.commit()
        return {"lobby": session.query(LobbyEntity).filter_by(name=body.lobby_name).order_by(LobbyEntity.id).first()}