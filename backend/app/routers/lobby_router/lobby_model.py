from pydantic import BaseModel


class LobbyModel(BaseModel):
    lobby_name: str
    event_date: str
    is_started: bool
    
class LobbyInfoModel(BaseModel):
    lobby_name: str
    event_date: str    

class GuestModel(BaseModel):
    lobby_name: str