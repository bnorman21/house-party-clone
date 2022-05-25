from django.contrib import admin
from django.urls import path, include
from .views import RoomView, JoinRoom, UserInRoom
from .views import CreateRoomView
from .views import GetRoom

urlpatterns = [
    path('create-room', CreateRoomView.as_view()),
    path('view-room', RoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view())
]
