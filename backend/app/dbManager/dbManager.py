from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from os import environ
db_username = environ.get("DB_USER", "postgres")
db_password = environ.get("DB_PASSWORD", "password")
db_name = environ.get("DB_NAME", "santa")

db_host = "localhost"
sqlalchemy_url = f'postgresql://{db_username}:{db_password}@{db_host}:5432/{db_name}'
engine = create_engine(sqlalchemy_url)


session = Session(engine)




