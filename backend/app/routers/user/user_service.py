from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import UserEntity, GuestEntity, LobbyEntity
from app.routers.user.user_model import UserModel
from sqlalchemy import select


class UserService(BaseService):
    def add_row(self, body: UserModel):
        created_guest = UserEntity(
            name=body.name,
            email=body.email,
            preferences=body.preferences,
            password=body.password
        )
        session.add_all([created_guest])
        session.commit()

    def get_active_lobbies(self, user_id: int):
        statement = select(LobbyEntity)\
            .outerjoin(GuestEntity)\
            .filter(GuestEntity.user_id == user_id)
        return session.execute(statement).all()

