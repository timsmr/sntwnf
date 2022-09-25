from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.dbManager.Entities import UserEntity
from app.routers.user.user_model import UserModel


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
