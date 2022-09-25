from pydantic import BaseModel


class GuestModel(BaseModel):
    lobby_id: int
    user_id: int
    giving_to: int
    is_host: bool