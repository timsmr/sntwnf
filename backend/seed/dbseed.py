import contextlib
import sys
#sys.path.append("../app") # Adds higher directory to python modules path.
from app.dbManager.Entities import Lobby, User, Guest, target_metadata
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.dbManager.dbManager import engine


def rewrite_db():
    clear_db()
    fill_db()
    get_all_db()


def fill_db():
    with Session(engine) as session:
        lobby1 = Lobby(
            name="First Lobby",
            event_date="11.06.2002",
            created="11.05.2002",
            started=True
        )
        lobby2 = Lobby(
            name="Second Lobby",
            event_date="13.12.2022",
            created="13.12.2021",
            started=False
        )
        user1 = User(
            name="Евген",
            email="aboba@aboba.com",
            preferences="хачу питсу",
            password="MNBVCXZ"
        )
        user2 = User(
            name="Олег",
            email="gmail@polka.com",
            preferences="кабачок хочеца",
            password="lkkjhhsdfpo"
        )
        guest1 = Guest(
            lobby_id=1,
            user_id=1,
            giving_to=2,
            is_host=False
        )
        guest2 = Guest(
            lobby_id=1,
            user_id=2,
            giving_to=1,
            is_host=True
        )
        guest3 = Guest(
            lobby_id=2,
            user_id=1,
            giving_to=2,
            is_host=False
        )
        guest4 = Guest(
            lobby_id=2,
            user_id=2,
            giving_to=1,
            is_host=True
        )
        session.add_all([lobby1, lobby2, user1, user2])
        session.commit()

        #session.add_all([guest1, guest2, guest3, guest4])

        #session.commit()
    print("filling db...")
    pass


def get_all_db():
    with Session(engine) as session:
        stmt = select(Lobby)
        for lobby in session.scalars(stmt):
            print(lobby)
        print("")
        stmt = select(User)
        for user in session.scalars(stmt):
            print(user)
        print("")
        stmt = select(Guest)
        for guest in session.scalars(stmt):
            print(guest)


def clear_db():
    meta = target_metadata

    with contextlib.closing(engine.connect()) as con:
        trans = con.begin()
        for table in reversed(meta.sorted_tables):
            con.execute(table.delete())
        trans.commit()


if __name__ == "__main__":
    rewrite_db()
