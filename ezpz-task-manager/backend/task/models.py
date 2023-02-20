from django.db import models

from account.models import Account
from group.models import Group

class Task(models.Model):
    '''
    Task provides the accessible fields of a task created by a user
    It contains a information about the title, description, deadline, 
    group id, assignee, creator, and status of the task

    Tasks are assigned to the creator by default
    Tasks can be assigned to another task master if they are connected
    to the creator
    '''

    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=2000, blank=False, null=False)
    deadline = models.DateField('dead line', blank=True, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='group')
    assignee = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name='assignee')
    creator = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='creator')

    default_status = 'Not Started'
    STATUS_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Blocked', 'Blocked'),
        ('Completed', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,
                              default=default_status, null=False)

    def __str__(self):
        return self.title