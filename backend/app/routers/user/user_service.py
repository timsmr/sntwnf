from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import UserEntity, GuestEntity, LobbyEntity
from app.routers.user.user_model import UserModel
from sqlalchemy import select


class UserService(BaseService):


    def get_active_lobbies(self, user_id: int):
        statement = select(LobbyEntity)\
            .outerjoin(GuestEntity)\
            .filter(GuestEntity.user_id == user_id)
        return session.execute(statement).all()

