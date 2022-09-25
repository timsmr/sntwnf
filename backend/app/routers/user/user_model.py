from pydantic import BaseModel


class UserModel(BaseModel):
    name: str
    email: str
    preferences: str
    password: str
    is_active: bool = False