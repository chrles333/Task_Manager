from django.forms.models import model_to_dict

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CreateResourceSerializer
from .serializers import CreateResourceSerializer, UpdateResourceSerializer
from .models import Resource
from group.models import Group
from account.models import Account

def getGroupResources(group_id):
    ''' Returns a list of information regarding the
    resources for the group with the corresponding id.
    
    Parameters
    ----------
    group_id : id of group to retreive resources from

    Returns
    -------
    response : list of information regarding the groups resources
        (id, rel_id, title, body)
    '''

    resources = Resource.objects.filter(group=group_id)
    
    response = []
    for idx, resource_obj in enumerate(resources):
        response.append({
            'id': resource_obj.id,
            'rel_id': idx + 1,
            'title' : resource_obj.title,
            'body' : resource_obj.body,
        })
    return response

class ListGroupResourceView(APIView):
    '''
    ListGroupResourceView is the data that will be delivered
    with urls linked to ListGroupResourceView.
    '''

    def get(self, request, group_id):
        data = getGroupResources(group_id)

        response = {'resources' : data, 'group_name': Group.objects.get(pk=group_id).name}
        return Response(response, status=status.HTTP_200_OK)

class ListUserResourceView(APIView):
    '''
    ListUserResourceView is the data that will be delivered
    with urls linked to ListUserResourceView.
    '''

    def get(self, request, user_id):
        user_acc = Account.objects.get(id=user_id)
        
        groups = []
        queryset = Group.objects.filter(members__in = [user_acc])
        for group_obj in queryset:
            groups.append({
                'group_id': group_obj.id,
                'group_name': group_obj.name,
                'resources': getGroupResources(group_obj.id),
            })

        response = {'resources': groups}
        return Response(response, status=status.HTTP_200_OK)

class ResourceView(generics.GenericAPIView):
    '''
    ResourceView is the data that will be delivered
    with urls linked to ResourceView.
    '''

    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        context = {'creator_id':request.data['creator_id'], 'group_id':request.data['group_id']}
        serializer = CreateResourceSerializer(data=request.data, context=context)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
            
    def put(self, request, resource_id=None, **kwargs):
        if not resource_id:
            return Response('Must pass resource_id', status=status.HTTP_404_NOT_FOUND)
        try:
            Resource.objects.get(pk=resource_id)
        except Resource.DoesNotExist:
            return Response('resource_id not found', status=status.HTTP_400_BAD_REQUEST)
        
        context = {'resource_id':resource_id}
        serializer = UpdateResourceSerializer(data=request.data, context=context)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request, resource_id=None, **kwargs):
        if not resource_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            Resource.objects.get(pk=resource_id)
        except Resource.DoesNotExist:
            return Response('resource_id not found', status=status.HTTP_400_BAD_REQUEST)

        resource = Resource.objects.get(pk=resource_id)
        resource_dict = model_to_dict(resource, fields=['title', 'body', 'group', 'creator'])
        resource_dict['group'] = Group.objects.get(pk=resource_dict['group']).id
        resource_dict['creator'] = Account.objects.get(pk=resource_dict['creator']).email
        
        return Response(resource_dict, status=status.HTTP_200_OK)