from rest_framework import serializers
from .models import Project, ProjectManager, Employees

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'ProjectManager', 'employees', 'start_date', 'end_date','comments', 'status')

class ProjectManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectManager
        fields = ('id', 'name')        

class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('id', 'name')