from django.urls import path
from .views import ResourceView, ListGroupResourceView, ListUserResourceView

'''
Define API Endpoints for this App
'''

app_name = 'resource'
urlpatterns = [
    path('resource/create/', ResourceView.as_view(), name='create'),
    path('resource/edit/', ResourceView.as_view(), name='edit'),
    path('resource/<int:user_id>/', ListUserResourceView.as_view(), name='list-user'),
    path('resource/<int:group_id>/', ListGroupResourceView.as_view(), name='list-group'),
]