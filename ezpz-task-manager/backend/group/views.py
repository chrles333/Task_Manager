from django.http import Http404
from rest_framework.views import APIView
from group.models import Group
from rest_framework.response import Response
from rest_framework import generics, status
from account.models import Account

'''
CreateGroupView: Create new instance of a group
#   frontend resp: {group_name: group_name, creator_id: user_id}
#   backend  resp: group_id
'''
class CreateGroupView(APIView):

    def post(self, request):
        group_name = request.data['group_name']
        creator_id = request.data['creator_id']

        creator_account_obj = Account.objects.get(id = creator_id)
        if not creator_account_obj:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        group_object = Group.objects.create(name = group_name)
        group_object.members.add(creator_account_obj)
        group_object.save()

        group_id = group_object.id
        print(group_id)
        return Response(group_id, status = status.HTTP_200_OK)


'''
InviteMemberView: Invite new member to a group
#   frontend resp: {group_id: group_id, email: member_email}
#   backend  resp: 200
'''
class InviteMemberView(APIView):
    
    def post(self, request):
        group_id = request.data['group_id']
        member_email = request.data['email']

        group_obj = Group.objects.get(id = group_id)
        account_obj = Account.objects.get(email = member_email)

        if not group_obj or not account_obj:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if account_obj.id in [i.id for i in group_obj.members.all()]:
            return Response(status=status.HTTP_200_OK)
        if account_obj.id in [i.id for i in group_obj.pending_members.all()]:
            return Response(status=status.HTTP_200_OK)
        
        group_obj.pending_members.add(account_obj)
        group_obj.save()

        return Response(status=status.HTTP_200_OK)


'''
RespondToInviteView: Accept/Decline invitation to group
#   frontend resp: {group_id: group_id, email: member_email}
#   backend  resp: 200
'''
class RespondToInviteView(APIView):
    
    def post(self, request):
        group_id = request.data['group_id']
        member_email = request.data['email']
        has_accepted = request.data['has_accepted']

        group_obj = Group.objects.get(id = group_id)
        account_obj = Account.objects.get(email = member_email)

        if not group_obj or not account_obj:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if account_obj.id not in [i.id for i in group_obj.pending_members.all()]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if has_accepted:
            group_obj.members.add(account_obj)
            
        group_obj.pending_members.remove(account_obj)
        group_obj.save()

        return Response(status=status.HTTP_200_OK)

'''
GetGroupsView: Get list of groups user is a member of
#   frontend resp: params - user_id
#   backend  resp: [{group_id, group_id, group_name: group_name}, ...]
'''
class GetGroupsView(APIView):
    
    def get(self, request, user_id):
        user_acc = get_account(user_id)
        groups = []
        for group_obj in Group.objects.filter(members__in = [user_acc]):
            group_info = {}
            group_info['status'] = 'member'
            group_info['group_id'] = group_obj.id
            group_info['group_name'] = group_obj.name
            group_info['group_members'] = list(group_obj.members.all().values_list('first_name', flat=True))
            groups.append(group_info)
        
        return Response(groups)
    

'''
GetPendingGroupsView: Get list of groups user has been invited to
#   frontend resp: params - user_id
#   backend  resp: [{group_id, group_id, group_name: group_name}, ...]
'''
class GetPendingGroupsView(APIView):
    
    def get(self, request, user_id):
        user_acc = get_account(user_id)

        groups = []
        for group_obj in Group.objects.filter(pending_members__in = [user_acc]):
            group_info = {}
            group_info['group_id'] = group_obj.id
            group_info['group_name'] = group_obj.name
            group_info['group_members'] = list(group_obj.members.all().values_list('first_name', flat=True))
            groups.append(group_info)
        
        return Response(groups)
    
'''
Helper method to return the Account object provided a user id
'''
def get_account(user_id):
    account = None
    try:
        account = Account.objects.get(id=user_id)
    except Account.DoesNotExist:
        raise Http404
    
    return account



'''
GetGroupMembersView: Get list of group members in a group
#   frontend resp: params - group_id
#   backend  resp: [{member_id: user_id, member_name: user_fullname}, ...]
'''
class GetGroupMembersView(APIView):
    
    def get(self, request, group_id):
        members = []
        group_obj = Group.objects.get(id = group_id)
        for member_obj in group_obj.members.all():
            member_info = {}
            member_info['member_email'] = member_obj.email
            member_info['member_id'] = member_obj.id
            member_info['member_name'] = member_obj.first_name + ' ' + member_obj.last_name
            member_info['member_status'] = "member"
            members.append(member_info)
            
        for member_obj in group_obj.pending_members.all():
            member_info = {}
            member_info['member_email'] = member_obj.email
            member_info['member_id'] = member_obj.id
            member_info['member_name'] = member_obj.first_name + ' ' + member_obj.last_name
            member_info['member_status'] = "pending"
            members.append(member_info)

        return Response(members)

