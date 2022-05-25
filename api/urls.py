from django.urls import path, re_path
from .views import *

urlpatterns = [
    path('', get_routes, name='routes'),
    path('lobby/', get_lobbies, name='lobbies'),
    path('guest/', get_guests, name='guests'),
    path('lobby/<str:pk>/', manage_lobby, name='lobby'),
    path('guest/<int:pk>/', manage_guest, name='guest'),
    path('lobby/<str:pk>/guest/', get_guests_lobby, name='guest_list'),
    path('lobby/<str:pk>/shuffle/', shuffle_lobby, name='shuffle'),
]
