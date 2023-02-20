from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, logout, login
from account.serializers import (RegistrationSerializer,
                                 AccountLoginSerializer, AccountLogoutSerializer)
from account.models import Account
from rest_framework.authtoken.models import Token
from account.validators import valid_email
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django_rest_passwordreset.signals import reset_password_token_created
from django.conf import settings
from rest_framework.generics import CreateAPIView
from rest_framework import status, permissions
from django.core.exceptions import ObjectDoesNotExist

from profile.models import Profile

'''
RegisterView is the data that will be delivered with
urls linked to RegisterView
'''


class RegisterView(CreateAPIView):
    serializer_class = RegistrationSerializer
    queryset = Account.objects.all()
    permission_classes = (permissions.AllowAny,)

    # Response received upon post request to RegisterView
    def post(self, request):
        data = {}
        # Use key 'email' to find its value
        email = request.data.get('email', '0').lower()
        # Check that email received is unique
        if valid_email(email) != None:
            data['error_message'] = 'Email is already in use!'
            data['response'] = 'ERROR'
            # If the email is not unique, respond with the following messages
            return Response(data, status=status.HTTP_403_FORBIDDEN)

        # Serialize the received data to extract away all the key:values needed
        # to create an Account
        serializer = RegistrationSerializer(data=request.data)
        # Check if all the key:value fields required to registers are valid
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'Registration successful!'
        # If there are invalid or missing fields, return an error message
        # to the client
        else:
            data['response'] = 'ERROR'
            data['error_message'] = 'Invalid details'
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)

        # Use key 'password' to find its value
        password = request.data.get('password', '0')
        # Authenticate the client using the 'email' and 'password' passed
        account = authenticate(email=email, password=password)
        if account:
            try:
                # Check if token already exists for created account
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                # Create a token using account, if account is new
                token = Token.objects.create(user=account)
            # Set data fields to respond back with
            data['user_id'] = account.pk
            data['token'] = token.key
            # Create a profile for the account
            profile = Profile.objects.create(account=account)
            profile.save()
            login(request, account)
        # Unable to authenticate account, so return an error message
        else:
            data['response'] = 'ERROR'
            data['error_message'] = 'Invalid email or password'
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)

        return Response(data)


'''
LoginView is the data that will be delivered with
urls linked to LoginView
'''


class LoginView(APIView):
    serializer_class = AccountLoginSerializer
    queryset = Account.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        res = {}
        username = request.data.get('email')
        password = request.data.get('password')
        # Authenticate the received 'email' and 'password' to
        # find the relevant account
        account = authenticate(email=username, password=password)
        if account:
            # Log the user in
            login(request, account)
            # Get session token
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            res['response'] = 'Successful login!'
            res['user_id'] = account.pk
            res['email'] = account.email
            res['token'] = token.key
        # Unable to find account with 'email' and 'password'
        else:
            res['response'] = 'ERROR'
            res['error_message'] = 'Invalid email or password'
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        return Response(res)


'''
LogoutView is the data that will be delivered with
urls linked to LogoutView
'''


class LogoutView(APIView):
    serializer_class = AccountLogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass

        logout(request)
        return Response('Successfully Logged Out!', status=status.HTTP_200_OK)

# RESET PASSWORD


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "http://localhost:3000/resetpassword/{}".format(reset_password_token.key)
    }
    # render email text
    email_html_message = render_to_string('user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'user_reset_password.txt', context)
    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Stonkr Backend"),
        # message:
        email_plaintext_message,
        # from:
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
