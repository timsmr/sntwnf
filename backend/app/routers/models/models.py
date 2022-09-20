from pydantic import BaseModel


class LobbyModel(BaseModel):
    name: str
    event_date: str
    is_started: bool


class UserModel(BaseModel):
    name: str
    email: str
    preferences: str
    password: str


class GuestModel(BaseModel):
    lobby_id: int
    user_id: int
    giving_to: int
    is_host: bool
