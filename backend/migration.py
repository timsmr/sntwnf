from app.dbManager.dbManager import engine
from alembic.config import Config
from alembic import command


if __name__ == "__main__":
    with engine.begin() as connection:
        print("da eto engine")
        alembic_cfg = Config("alembic.ini")
        alembic_cfg.attributes['connection'] = connection
        command.upgrade(alembic_cfg, "head")