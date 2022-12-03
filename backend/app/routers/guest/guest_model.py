from pydantic import BaseModel


class GuestModel(BaseModel):
    lobby_id: int
    user_id: int
    is_host: bool