from django.http import Http404
from django.contrib.sessions.models import Session
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status

from .serializers import ProfileSerializer, ProfileUpdateSerializer, ConnectionRequestSerializer
from .models import Profile, Connection
from account.models import Account
from task.models import Task
from group.models import Group

import datetime

def getUserIdFromSessionKey(request):
    ''' Returns a unique user id for the corresponding input django session.
    
    Parameters
    ----------
    request : django session key of current user

    Returns
    -------
    user_id : unique user id for the given session
    '''

    session = Session.objects.get(session_key=request.session.session_key)
    user_id = session.get_decoded().get('_auth_user_id')
    return user_id

def get_profile(user_id):
    ''' Returns the profile for the corresponding input user id.
    
    Parameters
    ----------
    user_id : primary id of user in system

    Raises
    ------
    HTTP404 : If no corresponding profile for the user id

    Returns
    -------
    profile : profile linked to the given user id
    '''

    profile = None
    try:
        profile = Profile.objects.get(account_id=user_id)
    except Profile.DoesNotExist:
        raise Http404
    return profile

def get_account(user_id):
    ''' Returns the account for the corresponding input user id.
    
    Parameters
    ----------
    user_id : primary id of user in system

    Raises
    ------
    HTTP404 : If no corresponding account for the user id

    Returns
    -------
    account : account linked to the given user id
    '''

    account = None
    try:
        account = Account.objects.get(id=user_id)
    except Account.DoesNotExist:
        raise Http404
    return account

class ProfileView(generics.GenericAPIView):
    '''
    ProfileView is the data that will be delivered 
    with urls linked to ProfileView.
    '''

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        account = get_account(user_id)
        self.check_object_permissions(self.request, account)

        profile = get_profile(user_id)
        self.check_object_permissions(self.request, profile)

        if not profile:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        data = {}
        data['email'] = account.email
        data['first_name'] = account.first_name
        data['last_name'] = account.last_name
        data['bio'] = profile.bio
        data['id'] = user_id
        return Response(data, status=status.HTTP_200_OK)
    
    def calculateAvailabilityLevel(self, account_id):
        ''' Returns an availability level for the corresponding account.
    
        Calculation based on:
        - assigned tasks
        - task states    | 'Not started' = 3, 'Blocked' = 2, 'In Progress' = 1, 'Completed' = 0
        - task deadlines | multiplier = 14 days - days left

        Parameters
        ----------
        account_id : id of the account to calculate the availability level for

        Returns
        -------
        level : calculated availability level for account
        '''

        task_list = Task.objects.filter(assignee=account_id)
        task_calculation_list = []
        
        for task in task_list:
            task_state = self.getTaskStateMultiplier(task)
            task_days_left = self.getDeadlineMultiplier(task)
            task_calculation_list.append((task_state * task_days_left) / 42)

        level = 0
        if len(task_calculation_list):
            level = int(sum(task_calculation_list) / len(task_calculation_list) * 100)
        return level
    
    def getTaskStateMultiplier(self, task: Task):
        task_state_dict = {
            'Not Started':3,
            'Blocked':2,
            'In Progress':1,
            'Completed':0
        }
        return task_state_dict[task.status]
    
    def getDeadlineMultiplier(self, task: Task):
        days_left = task.deadline - datetime.date.today()
        task_deadline_limit = 14 
        if days_left.days >= task_deadline_limit:
            return task_deadline_limit

        return task_deadline_limit - days_left.days

class ProfileUpdateView(generics.GenericAPIView):
    '''
    ProfileUpdateView is the data that will be delivered 
    with urls linked to ProfileUpdateView.
    '''

    serializer_class = ProfileUpdateSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def put(self, request, user_id):
        account = get_account(user_id)
        self.check_object_permissions(self.request, account)

        profile = get_profile(user_id)
        self.check_object_permissions(self.request, profile)

        email = request.data.get('email', account.email)
        password = request.data.get('password', 'password')
        first_name = request.data.get('first_name', account.first_name)
        last_name = request.data.get('last_name', account.last_name)
        bio = request.data.get('bio', profile.bio)

        # User is trying to change to an email already being used
        try:
            Account.objects.get(email=email)
        except Account.DoesNotExist:
            raise Http404

        account.email = email
        account.first_name = first_name
        account.last_name = last_name

        if password != 'password':
            account.set_password(password)
        account.save()

        profile.bio = bio
        profile.save()

        return Response(status=status.HTTP_200_OK)

    def get_profile(self, user_id):
        ''' Returns the profile for the corresponding input user id.
        
        Parameters
        ----------
        user_id : primary id of user in system

        Raises
        ------
        HTTP404 : If no corresponding profile for the user id

        Returns
        -------
        profile : profile linked to the given user id
        '''
        profile = None

        try:
            profile = Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            raise Http404
        
        self.check_object_permissions(self.request, profile)
        return profile
    
    def get_account(self, user_id):
        ''' Returns the account for the corresponding input user id.
        
        Parameters
        ----------
        user_id : primary id of user in system

        Raises
        ------
        HTTP404 : If no corresponding account for the user id

        Returns
        -------
        account : account linked to the given user id
        '''
        account = None
        try:
            account = Account.objects.get(id=user_id)
        except Account.DoesNotExist:
            raise Http404
        
        self.check_object_permissions(self.request, account)
        return account

    def get_duplicates(self, user, user_id):
        profile = Profile.objects.filter(user_id=user_id)
        return profile.filter(user_id=user_id)

class GetConnectionRequestsView(generics.GenericAPIView):
    '''
    GetConnectionRequestsView is the data that will be delivered 
    with urls linked to GetConnectionRequestsView.
    '''

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        data = {}
        account = get_account(user_id)
        profile = Profile.objects.get(account=account)    
        queryset = Connection.objects.connection_requests_received(profile)
        requests = []
        seen_emails = []

        for connection_request in queryset:
            # queryset contains the profile id of the sender
            # use this to find the account id of the sender and append to requests
            sender_profile_id = connection_request['sender_id']
            sender_profile = Profile.objects.get(pk=sender_profile_id)
            sender_account = sender_profile.account

            if sender_account.email not in seen_emails:
                requests.append({
                    'sender_id': sender_account.id,
                    'email': sender_account.email,
                    'name': sender_account.first_name + ' ' + sender_account.last_name,
                })
                seen_emails.append(sender_account.email)
            
        is_empty = False
        if len(requests) == 0:
            is_empty = True

        data['incoming_connection_requests'] = requests
        data['is_empty'] = is_empty 

        return Response(data, status=status.HTTP_200_OK)

class GetConnectionsView(generics.GenericAPIView):
    '''
    GetConnectionsView is the data that will be delivered 
    with urls linked to GetConnectionsView.
    '''

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        data = {}
        profile = get_profile(user_id)
        self.check_object_permissions(self.request, profile)

        if not profile:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = Connection.objects.connections_accepted(profile)
        requests = []

        for accepted_connection in queryset:
            # queryset contains the profile id of the sender
            # use this to find the account id of the sender and append to requests
            sender_profile_id = accepted_connection['sender_id']
            sender_profile = Profile.objects.get(pk=sender_profile_id)
            sender_account = sender_profile.account

            requests.append({
                'sender_id': sender_account.id,
                'email': sender_account.email,
                'name': sender_account.first_name + ' ' + sender_account.last_name,
            })

        is_empty = False
        if len(requests) == 0:
            is_empty = True

        data['connections'] = requests
        data['is_empty'] = is_empty 

        return Response(data, status=status.HTTP_200_OK)

class SendConnectionRequestView(generics.GenericAPIView):
    '''
    SendConnectionRequestView is the data that will be delivered 
    with urls linked to SendConnectionRequestView.
    '''

    serializer_class = ConnectionRequestSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {}
     
        sender_profile_id = request.data.get('sender')
        receiver_profile_id = request.data.get('receiver')

        # User cannot send connection request to themselves
        if sender_profile_id == receiver_profile_id:
            data['response'] = 'ERROR'
            data['error_message'] = 'Cannot request yourself'
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        sender_account = Account.objects.get(email=sender_profile_id)
        receiver_account = Account.objects.get(email=receiver_profile_id)
        sender = Profile.objects.get(account=sender_account)
        receiver = Profile.objects.get(account=receiver_account)
        
        c1 = Connection.objects.filter(sender=sender,receiver=receiver)
        c2 = Connection.objects.filter(sender=receiver,receiver=sender)
        
        if len(list(c1) + list(c2)):
            data['response'] = 'Connection request already sent!'
            return Response(data)
        
        connection = Connection.objects.create(sender=sender, receiver=receiver, status='send')
        data['response'] = 'Connection request sent!'
        
        return Response(data)

class AcceptConnectionRequestView(generics.GenericAPIView):
    '''
    AcceptConnectionRequestView is the data that will be delivered 
    with urls linked to AcceptConnectionRequestView.
    '''

    serializer_class = ConnectionRequestSerializer 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {}

        sender_profile_id = request.data.get('sender')
        receiver_profile_id = request.data.get('receiver')

        sender_account = Account.objects.get(email=sender_profile_id)
        receiver_account = Account.objects.get(email=receiver_profile_id)
        sender = Profile.objects.get(account=sender_account)
        receiver = Profile.objects.get(account=receiver_account)

        connection = get_object_or_404(Connection, sender=sender, receiver=receiver)
        if connection.status == 'send':
            connection.status = 'accepted'
            connection.save()

        data['response'] = 'Connection request accepted!'
        data['name'] = sender_account.first_name + ' ' + sender_account.last_name
        
        return Response(data)

class DeclineConnectionRequestView(generics.GenericAPIView):
    '''
    DeclineConnectionRequestView is the data that will be delivered 
    with urls linked to DeclineConnectionRequestView.
    '''

    serializer_class = ConnectionRequestSerializer 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {}

        sender_profile_id = request.data.get('sender')
        receiver_profile_id = request.data.get('receiver')

        sender_account = Account.objects.get(email=sender_profile_id)
        receiver_account = Account.objects.get(email=receiver_profile_id)
        sender = Profile.objects.get(account=sender_account)
        receiver = Profile.objects.get(account=receiver_account)

        connection = get_object_or_404(Connection, sender=sender, receiver=receiver)
        connection.delete()

        data['response'] = 'Connection request declined!'
        
        return Response(data)


class ProfileConnectionsView(generics.GenericAPIView):
    '''
    ProfileConnectionsView is the data that will be delivered 
    with urls linked to ProfileConnectionsView.
    '''

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        profile = get_profile(user_id)
        self.check_object_permissions(self.request, profile)

        if not profile:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = Connection.objects.connections_accepted(profile)
        connections = [q['sender_id'] for q in queryset] + [profile.id]
        response = []
        total_tasks = []

        for sender_profile_id in connections:
            # queryset contains the profile id of the sender
            # use this to find the account id of the sender and append to friend_ids
            sender_profile = Profile.objects.get(pk=sender_profile_id)
            sender_account = sender_profile.account
            sender_tasks = Task.objects.filter(assignee=sender_account.id)

            dist = {'Not Started':0, 'In Progress':0, 'Completed':0 ,'Blocked':0}
            dist_keys = dist.keys()

            for t in sender_tasks:
                s = t.status
                if s in dist_keys:
                    dist[s] += 1

            sum_tasks = sum(dist.values())
            total_tasks.append(sum_tasks)
            response.append({
                'sender_id': sender_account.id,
                'sender_email': sender_account.email,
                'sender_name': sender_account.first_name + ' ' + sender_account.last_name,
                'tasks_not_started': dist['Not Started'],
                'tasks_in_progress': dist['In Progress'],
                'tasks_completed': dist['Completed'],
                'tasks_blocked': dist['Blocked'],
                'tasks_total': sum_tasks,
                'avail': sum_tasks,
            })

        max_avail = max(total_tasks)
        for r in response:
            if max_avail != 0:
                r['avail'] *= 100 / max_avail 

        return Response(response, status=status.HTTP_200_OK)

def getTasks(user_id):
    ''' Returns a list of tasks currently assigned to the taskmaster with the input user_id.
    
    Parameters
    ----------
    user_id : account id of user in system

    Returns
    -------
    Response
        task_list : list of assigned tasks ('id', 'title', 'deadline', 'status', 'group')
        status    : HTTP_200_OK
    '''
    
    user_email = Account.objects.get(pk=user_id)
    task_list = Task.objects.filter(assignee=user_email).order_by(F('deadline').asc(nulls_last=True))

    task_list = list(task_list.values('id', 'title', 'deadline', 'status', 'group')) 
    for t in task_list:
        t['group_name'] = Group.objects.get(id=t['group']).name

    return Response(task_list, status=status.HTTP_200_OK)