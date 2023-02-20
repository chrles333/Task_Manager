from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser

'''
MyAccountManager is the factory class for creating users and super users
utilising the Account class
'''


class MyAccountManager(BaseUserManager):
    # Function called to create a user with basic permissions
    def create_user(self, email, password, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    # Function called to create a user with super user permissions
    def create_superuser(self, email, password, first_name, last_name, **extra_fields):
        # Setting super user permissions
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_admin', True)

        return self.create_user(email, password, first_name, last_name, **extra_fields)


'''
Account is the skeleton of a user.
It contians fields and permissions.
'''


class Account(AbstractUser):
    # Fields that can be set
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    # Permissions that can be set
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    # Turning off usernames, as Account uses emails as credentials for identification
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = MyAccountManager()

    # Object tag-line for better identification in the data base
    def __str__(self):
        return self.email

    # Getting the permission of the Account
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # Checking if Account has permissions
    def has_module_perms(self, app_label):
        return True
