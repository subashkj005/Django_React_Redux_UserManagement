from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        
class UserlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        
class UserRegSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length = 150)
    password = serializers.CharField(max_length = 100, write_only=True)
    
    def create(self, validated_data):
        user = Profile.objects.create(
            username = validated_data['username'],
            password = validated_data['password']
        )
        
        return user