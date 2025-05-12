from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter() # Create a router object

# The router will automatically generate the URL patterns for the viewset
# The viewset will handle the CRUD operations for the Project model
# The basename is used to create the URL names for the viewset
router.register(r'project', ProjectViewSet, basename='project') # Register the viewset with the router
router.register(r'projectmanager', ProjectManagerViewSet, basename='projectmanager') # Register the viewset with the router

urlpatterns = router.urls # This will automatically generate the URL patterns for the viewset

# urlpatterns = [
#     path('home/', home)
# ]