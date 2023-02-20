from django.urls import path
from .views import SubmitQuestion, SubmitResponse, GetPosts

'''
Define API Endpoints for this App
'''

app_name = 'forum'
urlpatterns = [
    path('getPosts/<int:group_id>/', GetPosts.as_view(), name='getPosts'),
    path('postQuestion/', SubmitQuestion.as_view(), name='postQuestion'),
    path('postResponse/', SubmitResponse.as_view(), name='postResponse'),
]
