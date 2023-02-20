from account.models import Account
from django.db import models

'''
Availabilities is the object based representation in the database
'''


class Availabilities(models.Model):
    # An availability will be paired to an account as a foreign key
    account_id = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='account_id')
    # The availability level of the account
    availability_level = models.IntegerField(default=0)

    def __str__(self):
        return f"[{self.account_id}] Availability_level: {self.availability_level}"
