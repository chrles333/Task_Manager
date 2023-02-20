from django.db import models
from account.models import Account
from django.utils import timezone

'''
Question is the object based representation of the fields in the database
'''


class Question(models.Model):
    # Each question belongs to a group
    # There can be many question for each group
    group_id = models.IntegerField(null=False)
    # Each question has one author
    # The same author can write many questions
    author = models.ForeignKey(
        Account, null=False, on_delete=models.CASCADE, related_name='question_creator_id')
    # The rest are fields associated to writing a question on the forum
    title = models.CharField(max_length=200, null=False)
    body = models.TextField(null=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


'''
Response is the object based representation of the fields in the database
'''


class Response(models.Model):
    # Each response belongs to a group
    group_id = models.IntegerField(null=False)
    # Each response has one author
    # Each author can write many responses
    author = models.ForeignKey(
        Account, null=False, on_delete=models.CASCADE, related_name='response_creator_id')
    # Each response is linked to a question
    # Each question can have many responses
    question = models.ForeignKey(
        Question, null=False, on_delete=models.CASCADE)
    # The rest are fields associated to writing a response to a question
    body = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body
