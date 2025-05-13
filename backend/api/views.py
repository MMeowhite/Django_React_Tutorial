from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from .models import *

# Create your views here.
def home(request):
    return HttpResponse("Hello, world. You're at the home page by using django.")

class EmployeesViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.AllowAny]
    queryset = Employees.objects.all()
    serializer_class = EmployeesSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save() # Save the new project to the database
            return Response(serializers.data, status=201) # Return a 201 Created response with the serialized data
        else:
            return Response(serializers.errors, status=400) # Return a 400 Bad Request response with the validation errors


class ProjectManagerViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.AllowAny]
    queryset = ProjectManager.objects.all()
    serializer_class = ProjectManagerSerializer

    def list(self, request):
        # This method handles GET requests to retrieve a list of projects
        # It uses the queryset defined in the viewset to get all projects
        # The queryset is a Django QuerySet object that represents a collection of database records 
        # The queryset is defined in the viewset and can be filtered or paginated as needed
        # The serializer_class is a Django REST framework serializer that defines how to convert the queryset into JSON format

        queryset = self.queryset 
        # You can filter or paginate the queryset here if needed
        # For example, you can filter by status:
        # queryset = queryset.filter(status='active')
        # Or paginate the queryset:   
        # The many=True argument indicates that we are serializing a list of objects
        # If you are serializing a single object, you would not use many=True
        # The serializer will convert the queryset into a JSON response
        serializer = self.serializer_class(queryset, many=True)


        # The serializer.data will return the serialized data in a format that can be returned in the response
        # The Response object will convert the data into JSON format
        # and set the appropriate content type for the response
        # The Response object will automatically set the content type to application/json
        # The Response object will also handle any errors that occur during serialization
        return Response(serializer.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save() # Save the new project to the database
            return Response(serializers.data, status=201) # Return a 201 Created response with the serialized data
        else:
            return Response(serializers.errors, status=400) # Return a 400 Bad Request response with the validation errors

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk) # Get the project with the given primary key (pk)
        serializers = self.serializer_class(project)
        return Response(serializers.data)

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializers = self.serializer_class(project, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=201)
        else:
            return Response(serializers.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            project = self.queryset.get(pk=pk)
            project.delete()
            return Response(status=204) # Return a 204 No Content response after deleting the project
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404) # Return a 404 Not Found response if the project does not exist


class ProjectViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        # This method handles GET requests to retrieve a list of projects
        # It uses the queryset defined in the viewset to get all projects
        # The queryset is a Django QuerySet object that represents a collection of database records 
        # The queryset is defined in the viewset and can be filtered or paginated as needed
        # The serializer_class is a Django REST framework serializer that defines how to convert the queryset into JSON format

        queryset = self.queryset 
        # You can filter or paginate the queryset here if needed
        # For example, you can filter by status:
        # queryset = queryset.filter(status='active')
        # Or paginate the queryset:   
        # The many=True argument indicates that we are serializing a list of objects
        # If you are serializing a single object, you would not use many=True
        # The serializer will convert the queryset into a JSON response
        serializer = self.serializer_class(queryset, many=True)


        # The serializer.data will return the serialized data in a format that can be returned in the response
        # The Response object will convert the data into JSON format
        # and set the appropriate content type for the response
        # The Response object will automatically set the content type to application/json
        # The Response object will also handle any errors that occur during serialization
        return Response(serializer.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save() # Save the new project to the database
            return Response(serializers.data, status=201) # Return a 201 Created response with the serialized data
        else:
            return Response(serializers.errors, status=400) # Return a 400 Bad Request response with the validation errors

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk) # Get the project with the given primary key (pk)
        serializers = self.serializer_class(project)
        return Response(serializers.data)

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializers = self.serializer_class(project, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=201)
        else:
            return Response(serializers.errors, status=400)

    def destroy(self, request, pk=None):
        try:
            project = self.queryset.get(pk=pk)
            project.delete()
            return Response(status=204) # Return a 204 No Content response after deleting the project
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404) # Return a 404 Not Found response if the project does not exist