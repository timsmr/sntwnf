from fastapi import HTTPException
from app.dbManager.dbManager import session
from starlette import status
from app.dbManager.Entities import UserEntity

class BaseService():
    def get_all_rows(self, entity):
        return [i for i in session.query(entity)]

    def get_row(self, entity, id):
        return session.query(entity).filter_by(id=id).order_by(entity.id).first()


    def delete_row(self, entity, id):
        session.query(entity).filter_by(id=id).delete()
        return True

    def get_current_user(self, token):
        user = session.query(UserEntity).filter_by(token=token).order_by(UserEntity.id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user