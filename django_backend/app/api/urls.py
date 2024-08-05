# api/urls.py
from django.urls import path
from .endpoints.auth.auth import login
from .endpoints.camera.camera import get_shared_cameras, get_camera_recordings

urlpatterns = [
    path('auth/login', login, name='login'),
    path('getSharedCameras', get_shared_cameras, name='getSharedCameras'),
    path('getCameraRecordings/<int:camera_id>', get_camera_recordings, name='getCameraRecordings'),
]
