from rest_framework import serializers

from profile.models import Profile, Connection

class ProfileSerializer(serializers.ModelSerializer):
    '''
    ProfileSerializer represents the key:value pair expected
    from the client to create a profile
    '''

    user_id = serializers.ReadOnlyField(source='user_id.email')

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['connections']

class ProfileUpdateSerializer(serializers.ModelSerializer):
    '''
    ProfileUpdateSerializer represents the key:value pair expected
    from the client to update a user's profile
    '''

    email                   = serializers.EmailField(max_length=60)
    password                = serializers.CharField(style={'input_type': 'password'})
    first_name              = serializers.CharField(max_length=50)
    last_name               = serializers.CharField(max_length=50)

    class Meta:
        model = Profile
        fields = ['email', 'password', 'first_name', 'last_name', 'bio']
    
class ConnectionRequestSerializer(serializers.ModelSerializer):
    '''
    ConnectionRequestSerializer represents the key:value pair expected
    from the client to send a connection request to another user
    '''

    class Meta:
        model = Connection
        fields = ['sender', 'receiver']