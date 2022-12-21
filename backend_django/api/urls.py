from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    path('', get_routes, name='routes'),
    path('lobby/', LobbyList.as_view(), name='lobbies'),
    path('guest/', GuestList.as_view(), name='guests'),
    path('lobby/<str:pk>/', LobbyDetail.as_view(), name='lobby'),
    path('guest/<int:pk>/', GuestDetail.as_view(), name='guest'),
    path('lobby/<str:pk>/guest/', LobbyGuests.as_view(), name='guest_list'),
    path('lobby/<str:pk>/shuffle/', Shuffle_lobby.as_view(), name='shuffle'),
]
