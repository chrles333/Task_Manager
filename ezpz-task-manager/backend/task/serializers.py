from django.core.exceptions import BadRequest

from rest_framework import serializers

from .models import Task
from account.models import Account
from group.models import Group

class CreateTaskSerializer(serializers.ModelSerializer):
    '''
    CreateTaskSerializer represents the key:value pair expected
    from the client to create a task
    '''

    class Meta:
        model = Task
        fields = ['title', 'description', 'deadline', 'status', 'id']
    
    def create(self, validated_data):
        task = Task()
              
        task.title = validated_data.get('title')
        task.description = validated_data.get('description')
        task.deadline = validated_data.get('deadline')
        task.status = validated_data.get('status')

        group_id = int(self.context['group_id'])
        task.group = Group.objects.get(id=group_id)
        
        creator_id = self.context['creator_id']
        task.creator = Account.objects.get(email=creator_id)
        
        assignee_id = self.context['assignee_id']
        if not assignee_id:
            task.assignee = Account.objects.get(email=self.context['creator_id'])
        else:
            task.assignee = Account.objects.get(email=assignee_id)
            
        task.save()
        return task
        
class UpdateTaskSerializer(serializers.ModelSerializer):
    '''
    UpdateTaskSerializer represents the key:value pair expected
    from the client to update a task
    '''
    
    _title = serializers.CharField(max_length=100, required=False)
    _description = serializers.CharField(max_length=2000, required=False)

    class Meta:
        model = Task
        fields = ['_title', '_description', 'deadline', 'status', 'id']
     
    def create(self, validated_data):
        task_id = self.context['task_id']
        task = None

        try:
            task = Task.objects.get(pk=task_id)
        except Task.DoesNotExist:
            raise BadRequest('task_id does not exist')

        title = validated_data.get('title')
        description = validated_data.get('description')
        deadline = validated_data.get('deadline')
        assignee = self.context['assignee_id']
        status = validated_data.get('status')
        
        if not title:
            title = task.title
        if not description:
            description = task.description
        if not deadline:
            deadline = task.deadline
        if assignee:
            task.assignee = Account.objects.get(email=assignee)
            
        task.title = title
        task.description = description
        task.deadline = deadline
        task.status = status
        
        task.save()
        return task