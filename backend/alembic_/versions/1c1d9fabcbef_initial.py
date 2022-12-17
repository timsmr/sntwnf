"""initial

Revision ID: 1c1d9fabcbef
Revises: 
Create Date: 2022-12-15 11:52:57.903345

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c1d9fabcbef'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Lobby',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=True),
    sa.Column('event_date', sa.String(), nullable=True),
    sa.Column('created', sa.String(), nullable=True),
    sa.Column('started', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_Lobby_id'), 'Lobby', ['id'], unique=False)
    op.create_table('user_account',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('preferences', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('token', sa.String(), nullable=True),
    sa.Column('expireDate', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_index(op.f('ix_user_account_id'), 'user_account', ['id'], unique=False)
    op.create_table('guest',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('lobby_name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('giving_to', sa.Integer(), nullable=True),
    sa.Column('is_host', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['giving_to'], ['user_account.id'], ),
    sa.ForeignKeyConstraint(['lobby_name'], ['Lobby.name'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['user_account.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_guest_id'), 'guest', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_guest_id'), table_name='guest')
    op.drop_table('guest')
    op.drop_index(op.f('ix_user_account_id'), table_name='user_account')
    op.drop_table('user_account')
    op.drop_index(op.f('ix_Lobby_id'), table_name='Lobby')
    op.drop_table('Lobby')
    # ### end Alembic commands ###