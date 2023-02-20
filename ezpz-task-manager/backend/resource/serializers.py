from django.core.exceptions import BadRequest

from rest_framework import serializers

from .models import Resource
from account.models import Account
from group.models import Group

class CreateResourceSerializer(serializers.ModelSerializer):
    '''
    CreateResourceSerializer represents the key:value pair expected
    from the client to create a resource
    '''

    class Meta:
        model = Resource
        fields = ['title', 'body']
    
    def create(self, validated_data):
        resource = Resource()
        
        resource.title          = validated_data.get('title')
        resource.body           = validated_data.get('body')
        resource.group          = Group.objects.get(pk=self.context['group_id'])
        resource.creator        = Account.objects.get(pk=self.context['creator_id'])
        
        resource.save()
        return resource
        
class UpdateResourceSerializer(serializers.ModelSerializer):
    '''
    UpdateResourceSerializer represents the key:value pair expected
    from the client to update an existing resource
    '''

    _title       = serializers.CharField(max_length=50, required=False)
    _body        = serializers.CharField(max_length=2000, required=False)

    class Meta:
        model = Resource
        fields = ['_title', '_body']
     
    def create(self, validated_data):
        resource_id, resource = self.context['resource_id'], None

        try:
            resource = Resource.objects.get(pk=resource_id)
        except Resource.DoesNotExist:
            raise BadRequest('resource_id does not exist')

        title, body = validated_data.get('title'), validated_data.get('body')
        
        if title:
            resource.title = title
        if body:
            resource.body = body
        
        resource.save()
        return resource