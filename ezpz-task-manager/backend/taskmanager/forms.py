from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User

class CustomUserCreationForm(UserCreationForm):
    '''
    Django form called for creating a user in the system
    '''

    class Meta:
        model = User
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):
    '''
    Django form called for updating the details of an existing user in the system
    '''

    class Meta:
        model = User
        fields = ('email',)