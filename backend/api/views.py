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
    serializer_class = EmployeesSerializer

    def list(self, request):
        queryset = Employees.objects.all()  # 动态获取数据
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save()  # 保存新数据到数据库
            return Response(serializers.data, status=201)
        else:
            return Response(serializers.errors, status=400)


class ProjectManagerViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.AllowAny]
    serializer_class = ProjectManagerSerializer

    def list(self, request):
        queryset = ProjectManager.objects.all()  # 动态获取数据
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=201)
        else:
            return Response(serializers.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            project = ProjectManager.objects.get(pk=pk)  # 动态获取数据
            serializers = self.serializer_class(project)
            return Response(serializers.data)
        except ProjectManager.DoesNotExist:
            return Response({'error': 'Project Manager not found'}, status=404)

    def update(self, request, pk=None):
        try:
            project = ProjectManager.objects.get(pk=pk)
            serializers = self.serializer_class(project, data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=201)
            else:
                return Response(serializers.errors, status=400)
        except ProjectManager.DoesNotExist:
            return Response({'error': 'Project Manager not found'}, status=404)

    def destroy(self, request, pk=None):
        try:
            project = ProjectManager.objects.get(pk=pk)
            project.delete()
            return Response(status=204)
        except ProjectManager.DoesNotExist:
            return Response({'error': 'Project Manager not found'}, status=404)


class ProjectViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = Project.objects.all()  # 动态获取数据
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=201)
        else:
            return Response(serializers.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            project = Project.objects.get(pk=pk)  # 动态获取数据
            serializers = self.serializer_class(project)
            return Response(serializers.data)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)

    def update(self, request, pk=None):
        try:
            project = Project.objects.get(pk=pk)
            serializers = self.serializer_class(project, data=request.data)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=201)
            else:
                return Response(serializers.errors, status=400)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)

    def destroy(self, request, pk=None):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(status=204)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)