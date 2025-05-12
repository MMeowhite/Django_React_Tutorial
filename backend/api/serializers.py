from rest_framework import serializers
from .models import Project, ProjectManager

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'ProjectManager', 'start_date', 'end_date', 'comments', 'status')

class ProjectManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectManager
        fields = ('id', 'name')        
