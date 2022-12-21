from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomUser

app_name = 'users'

urlpatterns = [
    path('<int:pk>/', CustomUser.as_view(), name="get_user"),
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
