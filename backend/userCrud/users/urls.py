from django.urls import path, include
from . import views

urlpatterns = [
   path('users/', views.home, name='home'),
   path('users/<int:id>/', views.user_edit, name='user-edit'),
   path('createUser/', views.user_registration, name='user_register'),
   path('deleteuser/', views.delete_user, name='delete_user'),
   path('userlogin/', views.userlogin, name='user_login'),
]
