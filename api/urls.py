from django.urls import path
from .views import get_routes, get_lobbies_data, get_guests_data, manage_guest, manage_lobby

urlpatterns = [
    path('', get_routes, name='routes'),
    path('lobby/', get_lobbies_data, name='lobbies'),
    path('guest/', get_guests_data, name='guests'),
    path('lobby/<str:pk>', manage_lobby, name='lobby'),
    path('guest/<int:pk>', manage_guest, name='guest'),
]
