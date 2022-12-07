from pydantic import BaseModel


class LobbyModel(BaseModel):
    name: str
    event_date: str
    is_started: bool