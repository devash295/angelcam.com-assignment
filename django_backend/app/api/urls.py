# api/urls.py
from django.urls import path
from .endpoints.auth.auth import login
from .endpoints.camera.camera import get_shared_cameras, get_camera_recordings, get_camera_recording_stream, get_camera_streams

urlpatterns = [
    path('auth/login', login, name='login'),
    path('getSharedCameras', get_shared_cameras, name='getSharedCameras'),
    path("getCameraStreams/<int:camera_id>", get_camera_streams, name="getCameraStreams"),
    path('getCameraRecordings/<int:camera_id>', get_camera_recordings, name='getCameraRecordings'),
    path('getRecordingStream/<str:camera_id>', get_camera_recording_stream, name='get_camera_recording_stream'),
]
