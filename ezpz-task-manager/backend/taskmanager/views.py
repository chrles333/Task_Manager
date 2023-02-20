from django.contrib.auth import login, logout
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token

from .serializers import RegisterSerializer, UserSerializer, UserTokenSerializer
from .models import User

class Users(viewsets.ModelViewSet):
    '''
    Users is the data that will be delivered 
    with urls linked to Users.
    '''

    serializer_class = UserSerializer
    queryset = User.objects.all()

class Register(CreateAPIView):
    '''
    Register is the data that will be delivered 
    with urls linked to Register.
    '''

    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

class Login(APIView):
    '''
    Login is the data that will be delivered 
    with urls linked to Login.
    '''

    serializer_class = UserTokenSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserTokenSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,

        }, status=status.HTTP_201_CREATED)

class Logout(APIView):
    '''
    Logout is the data that will be delivered 
    with urls linked to Logout.
    '''

    serializer_class = None
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass

        logout(request)
        return Response(status=status.HTTP_200_OK)