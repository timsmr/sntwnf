from pydantic import BaseModel


class LobbyDevModel(BaseModel):
    name: str
    event_date: str
    is_started: bool