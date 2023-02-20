from django.urls import path
from group.views import CreateGroupView, InviteMemberView, GetGroupsView, GetGroupMembersView

'''
Define API Endpoints for this App
'''

urlpatterns = [
    path('group/create/', CreateGroupView.as_view()),
    path('group/invite/', InviteMemberView.as_view()),
    path('group/<int:user_id>/', GetGroupsView.as_view()),
    path('group/members/<int:group_id>/', GetGroupMembersView.as_view())
]