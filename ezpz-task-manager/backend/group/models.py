from unittest.util import _MAX_LENGTH
from django.db import models
from account.models import Account


'''
Group is the object based representation of the fields in the database
'''

class Group(models.Model):

    name = models.CharField(max_length = 100)
    members = models.ManyToManyField(Account)
    pending_members = models.ManyToManyField(Account, related_name='pending')
    






