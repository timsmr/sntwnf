from pydantic import BaseModel


class LobbyModel(BaseModel):
    lobby_name: str
    event_date: str
    is_started: bool
    
class GuestModel(BaseModel):
    lobby_name: str