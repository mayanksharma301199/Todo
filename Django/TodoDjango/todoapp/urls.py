from django.urls import path
from . import views
from rest_framework_jwt.views import verify_jwt_token
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [path('login', views.LogIn, name="login"),
               path('signup', views.SignUp, name="signup"),
               path('dashboard', views.Dashboard, name="dashboard"),]