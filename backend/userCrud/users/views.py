from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_superuser:
                return Response({"message": "superuser"})
            else:
                return Response({"message": "ordinary_user"})
        else:
            return Response({"message": "not_authenticate"})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def home(request):
    users = Profile.objects.all()
    serialize = UserlistSerializer(users, many = True)
    return Response(serialize.data)

@api_view(['POST'])
def user_registration(request):
    serializer = UserlistSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer(serializer.errors, status=status.HTTP_400_BAD_REQUEST))

@api_view(['PUT'])
def user_edit(request, id):
    data = request.data
    user = Profile.objects.get(id=id)
    
    serializer = ProfileSerializer(user, data=data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Image upload successfully'}, status=status.HTTP_200_OK) 

    else:
        print(serializer.errors)
        return Response({'message':'No image received'}, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def delete_user(request):
    data = request.data
    try:
        user = Profile.objects.get(id=data.get('id'))
        user.delete()
        message = {'message': 'success'}
        return Response(message)
    except:
        message = {'message' : 'not deleted'}
        return Response(message)
        
@api_view(['POST'])
def userlogin(request):
    data = request.data
    try:
        user = Profile.objects.get(email = data['email'] )
        serializer = UserlistSerializer(user)
        print('getting user')
        if user.password == data['password'] :
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'message' : 'login_success',
                'access' : str(refresh.access_token),
                'refresh' : str(refresh),
                'user' : serializer.data})
            # message = {'message' : 'login_success', 'user': serializer.data }
            # return Response(message,status=status.HTTP_202_ACCEPTED)
        else:
            message = {'message' : 'password_incorrect' }
            return Response(message,status=status.HTTP_403_FORBIDDEN)   
    except: 
        message = {'message' : 'user_not_found'}
        return Response(message,status=status.HTTP_404_NOT_FOUND)
    
