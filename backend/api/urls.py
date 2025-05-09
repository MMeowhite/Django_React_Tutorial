from django.urls import path
from .views import home, check

urlpatterns = [
    path('home/', home)
]