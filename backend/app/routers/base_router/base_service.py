from app.dbManager.dbManager import session

class BaseService():
    def get_all_rows(self, entity):
        return [i for i in session.query(entity)]

    def get_row(self, entity, id):
        return session.query(entity).filter_by(id=id).order_by(entity.id).first()
