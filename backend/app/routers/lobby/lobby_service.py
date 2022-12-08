from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import LobbyEntity
import datetime
from app.routers.lobby.lobby_model import LobbyDevModel
from app.dbManager.Entities import GuestEntity
from app.service.helper_functions import if_appropriate_recievers, define_recievers
import random
class LobbyDevService(BaseService):
    def add_row(self, body: LobbyDevModel):
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

    def shuffle_gift_recievers(self, lobby_id: int):
        guests = self.get_lobby_guests(lobby_id=lobby_id)
        users_list = [guest.user_id for guest in guests]

        recievers_list = sorted(users_list, key=lambda k: random.random())

        while not if_appropriate_recievers(users_list, recievers_list):
            recievers_list = sorted(users_list, key=lambda k: random.random())

        guests = define_recievers(guests, recievers_list)

        session.add_all([guest for guest in guests])
        session.commit()
        return True