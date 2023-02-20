"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from profile.views import ProfileView, ProfileUpdateView, GetConnectionRequestsView, GetConnectionsView, SendConnectionRequestView, AcceptConnectionRequestView, DeclineConnectionRequestView
from group.views import CreateGroupView, InviteMemberView, GetGroupsView, GetGroupMembersView, RespondToInviteView
from task.views import TaskView, ListTaskView, ListGroupTaskView
from resource.views import ResourceView, ListUserResourceView, ListGroupResourceView


from profile.views import ProfileView, ProfileUpdateView, GetConnectionRequestsView, GetConnectionsView, SendConnectionRequestView, AcceptConnectionRequestView, DeclineConnectionRequestView, ProfileConnectionsView
from group.views import CreateGroupView, InviteMemberView, GetGroupsView, GetGroupMembersView, GetPendingGroupsView
from task.views import TaskView, ListTaskView, ListGroupTaskView
from search.views import SearchView
from forum.views import SubmitQuestion, SubmitResponse, GetPosts
from availabilities.views import AvailabilitiesView
router = routers.DefaultRouter()


'''
System-Wide API Endpoints 
'''

### EXAMPLE URL PATTERNS ###
# after running python manage.py runserver you can navigate to:
# - http://localhost:8000/api/todos
# - http://localhost:8000/admin
urlpatterns = [
    path('app/', admin.site.urls),
    path('api/', include(router.urls)),

    # API urls
    path('auth/', include('account.urls')),
    path('profile/', include('profile.urls')),
    path('task/', include('task.urls')),
    path('forum/', include('forum.urls')),
    # Profile
    path('getProfile/<int:user_id>/', ProfileView.as_view()),
    path('updateProfile/<int:user_id>/', ProfileUpdateView.as_view()),
    # Connections
    path('getConnectionRequests/<int:user_id>/', GetConnectionRequestsView.as_view()),
    path('getAcceptedConnections/<int:user_id>/', GetConnectionsView.as_view()),
    path('sendConnectionRequest/', SendConnectionRequestView.as_view()),
    path('acceptConnectionRequest/', AcceptConnectionRequestView.as_view()),
    path('declineConnectionRequest/', DeclineConnectionRequestView.as_view()),
    # Group
    path('group/create/', CreateGroupView.as_view()),
    path('group/invite/', InviteMemberView.as_view()),
    path('group/<int:user_id>/', GetGroupsView.as_view()),
    path('group/pending/<int:user_id>/', GetPendingGroupsView.as_view()),
    path('group/members/<int:group_id>/', GetGroupMembersView.as_view()),
    path('group/respond/', RespondToInviteView.as_view()),
    # Task
    path('getProfile/<int:user_id>/', ProfileView.as_view()),
    path('updateProfile/<int:user_id>/', ProfileUpdateView.as_view()),
    path('task/create/<int:group_id>', TaskView.as_view()),
    path('task/edit/<int:task_id>/', TaskView.as_view()),
    path('task/list/<int:user_id>/', ListTaskView.as_view()),
    path('task/group/<int:group_id>/', ListGroupTaskView.as_view()),
    # Resource
    path('resource/create/', ResourceView.as_view()),
    path('resource/edit/', ResourceView.as_view()),
    path('resource/getUser/<int:user_id>/', ListUserResourceView.as_view()),
    path('resource/getGroup/<int:group_id>/', ListGroupResourceView.as_view()),
    path('search/<int:user_id>/', SearchView.as_view()),
    path('getPosts/<int:group_id>/', GetPosts.as_view()),
    path('postQuestion/', SubmitQuestion.as_view()),
    path('postResponse/', SubmitResponse.as_view()),
    path('availability/', AvailabilitiesView.as_view()),

    path('getAvailabilities/<int:user_id>/', ProfileConnectionsView.as_view()),


]
