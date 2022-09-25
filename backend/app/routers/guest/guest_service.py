from app.dbManager.dbManager import session
from app.routers.base_router.base_service import BaseService
from app.routers.guest.guest_model import GuestModel
from app.dbManager.Entities import GuestEntity


class GuestService(BaseService):
    def add_row(self, body: GuestModel):
        created_guest = GuestEntity(
            lobby_id=body.lobby_id,
            user_id=body.user_id,
            giving_to=body.giving_to,
            is_host=body.is_host
        )
        session.add_all([created_guest])
        session.commit()
        return True
