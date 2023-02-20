from rest_framework import serializers
from account.models import Account

'''
RegistrationSerializer represents the key:value pair
expected from the client to register the user
'''


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        account = Account(
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'].capitalize(),
            last_name=self.validated_data['last_name'].capitalize(),
        )
        account.set_password(self.validated_data['password'])
        account.save()

        return account


'''
AccoutLoginSerializer represents the key:value pair
expected from the client to log the user in
'''


class AccountLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'password']


'''
AccoutLogoutSerializer represents the key:value pair
expected from the client to log the user out
'''


class AccountLogoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = []


'''
AccoutLoginSerializer represents the key:value pair
expected from the client to update the user account
'''


class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'first_name', 'last_name']
