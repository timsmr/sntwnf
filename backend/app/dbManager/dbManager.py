from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from app.dbManager import env
import os


engine = create_engine(f'postgresql://{env.username}:{env.password}@localhost:5432/{env.db_name}')


session = Session(engine)


if __name__ == "__main__":
    print(env.username)
    print(env.password)
