from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User

class UserSerializer(serializers.ModelSerializer):
    '''
    UserSerializer represents the key:value pair expected
    from the client to create a user
    '''

    class Meta:
        model = User
        field = ('first_name', 'last_name', 'email', 'password')

class RegisterSerializer(serializers.Serializer):
    '''
    RegisterSerializer represents the key:value pair expected
    from the client to register an account in the system
    '''

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())], 
        required=True
    )
        
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        new_user = User.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        new_user.set_password(validated_data['password'])
        new_user.save()

        return new_user

class UserTokenSerializer(serializers.Serializer):
    '''
    UserTokenSerializer represents the key:value pair expected
    from the client to validate their credentials against the system

    Validation is performed on the email and password fields
    '''

    email = serializers.EmailField(
        label="email",
        write_only=True
    )

    password = serializers.CharField(
        label="password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, request):
        email = request.get('email')
        password = request.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            if not user:
                msg = 'Access denied: wrong email or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "email" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        
        request['user'] = user
        return request