from django.contrib.sessions.models import Session
from group.models import Group
from .serializers import CreateTaskSerializer
from django.forms.models import model_to_dict
from django.db.models import F

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CreateTaskSerializer, UpdateTaskSerializer
from .models import Task
from account.models import Account

def getUserIdFromSessionKey(request):
    ''' Returns a unique user id for the corresponding input django session.
    
    Parameters
    ----------
    request : django session key of current user

    Returns
    -------
    user_id : unique user id for the given session
    '''

    if not request.session.session_key:
        request.session.save()
    
    session = Session.objects.get(session_key=request.session.session_key)
    user_id = session.get_decoded().get('_auth_user_id')
    return user_id
 
def transformTaskToShortDict(task):
    ''' Extracts and returns fields from the task object as a dictionary structure

    Parameters
    ----------
    task : task object representing a single task in the system

    Returns
    -------
    task_dict : dictionary representation of a django task object
    '''

    task_dict = {
        'task_id':task.id,
        'title':task.title,
        'deadline':task.deadline,
    }
    return task_dict
    
def trasnformListOfTasksToShortDict(tasks):
    ''' Converts a list of django task objects into a list of tasks in dictionary format

    Parameters
    ----------
    tasks : list of django task objects

    Returns
    -------
    task_list_dict : list of tasks in dictionary format + sorted based on deadline field
    '''

    task_list_dict = []
    for task in tasks:
        task_dict = transformTaskToShortDict(task)
        task_list_dict.append(task_dict)
    return sorted(task_list_dict, key=lambda d: d['deadline'])

class TaskView(generics.GenericAPIView):
    '''
    TaskView is the data that will be delivered 
    with urls linked to TaskView.
    '''

    serializer_class = CreateTaskSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        context = {k:v for k,v in request.data.items() if k in ['creator_id', 'assignee_id', 'group_id']}
        serializer = CreateTaskSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def put(self, request, task_id=None, **kwargs):
        if not task_id:
            return Response('Must pass task_id', status=status.HTTP_404_NOT_FOUND)
        try:
            Task.objects.get(pk=task_id)
        except Task.DoesNotExist:
            return Response('task_id not found', status=status.HTTP_400_BAD_REQUEST)
        
        context= {'task_id': task_id, 'assignee_id': request.data['assignee_id']}       
        serializer = UpdateTaskSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, task_id=None, **kwargs):
        if not task_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            Task.objects.get(pk=task_id)
        except Task.DoesNotExist:
            return Response('task_id not found', status=status.HTTP_400_BAD_REQUEST)

        task = Task.objects.get(pk=task_id)
        task_dict = model_to_dict(task, fields=['title', 'description', 'deadline', \
                                          'assignee', 'status', 'creator'])
        task_dict['assignee'] = Account.objects.get(pk=task_dict['assignee']).email
        task_dict['creator'] = Account.objects.get(pk=task_dict['creator']).email
        
        return Response(task_dict, status=status.HTTP_200_OK)

class ListTaskView(generics.GenericAPIView):
    '''
    ListTaskView is the data that will be delivered 
    with urls linked to ListTaskView.
    '''

    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id, **kwargs):
        user_email = Account.objects.get(pk=user_id)
        task_list = Task.objects.filter(assignee=user_email).order_by(F('deadline').asc(nulls_last=True))

        task_list = list(task_list.values('id', 'title', 'deadline', 'status', 'group')) 
        for t in task_list:
            t['group_name'] = Group.objects.get(id=t['group']).name

        return Response(task_list, status=status.HTTP_200_OK)


class ListGroupTaskView(APIView):
    '''
    ListGroupTaskView is the data that will be delivered 
    with urls linked to ListGroupTaskView.
    '''
    
    def get(self, request, group_id):
        tasks = sorted([i for i in Task.objects.all() if i.group_id == group_id], key=lambda x: x.id)
        list_resp = []
        
        for idx, task_obj in enumerate(tasks):
            task_info = {
                'id': task_obj.id,
                'rel_id': idx + 1,
                'title' : task_obj.title,
                'description' : task_obj.description,
                'deadline' : task_obj.deadline,
                'assignee' : task_obj.assignee.email,
                'assignee_name' : task_obj.assignee.first_name + " " + task_obj.assignee.last_name,
                'status' : task_obj.status,
                'creator_id' : task_obj.creator.email,
            }
            list_resp.append(task_info)

        return Response(list_resp, status=status.HTTP_200_OK)