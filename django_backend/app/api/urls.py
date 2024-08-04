# api/urls.py
from django.urls import path
from api.endpoints.auth import login
from api.endpoints.camera import get_shared_cameras

urlpatterns = [
    path('auth/login', login, name='login'),
    path('getSharedCameras', get_shared_cameras, name='getSharedCameras'),
]
