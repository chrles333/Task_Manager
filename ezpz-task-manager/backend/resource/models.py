from django.db import models

from account.models import Account
from group.models import Group

class Resource(models.Model):
    '''
    Resource provides the accessible fields of a resource created in a group
    It contains a information about the title, body, group, 
    and creator of the resource
    '''

    title   = models.CharField(max_length=50, blank=False, null=False)
    body    = models.CharField(max_length=2000, blank=False, null=False) 
    group   = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='group_id')
    creator = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='creator_id')

    def __str__(self):
        return self.title