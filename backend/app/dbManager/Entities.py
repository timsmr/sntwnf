from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String, Sequence
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Boolean


Base = declarative_base()


class LobbyEntity(Base):
    __tablename__ = "Lobby"

    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    name = Column(String(30))
    event_date = Column(String)
    created = Column(String)
    started = Column(Boolean)

    def __repr__(self):
        return f"Lobby(id={self.id!r}, name={self.name!r})"


class UserEntity(Base):
    __tablename__ = "user_account"

    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    name = Column(String(30))
    email = Column(String)
    preferences = Column(String)
    password = Column(String)

    def __repr__(self):
        return f"User(id={self.id!r}, name={self.name!r})"


class GuestEntity(Base):
    __tablename__ = "guest"

    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    lobby_id = Column(Integer, ForeignKey("Lobby.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user_account.id"), nullable=False)
    giving_to = Column(Integer, ForeignKey("user_account.id"), nullable=False)
    is_host = Column(Boolean)

    def __repr__(self):
        return f"Guest(id={self.user_id!r}, giving to {self.giving_to!r})"


target_metadata = Base.metadata

