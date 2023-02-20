from django.urls import path
from .views import TaskView, ListTaskView

'''
Define API Endpoints for this App
'''

app_name = 'task'
urlpatterns = [
    path('create/', TaskView.as_view(), name='create'),
    path('edit/<int:task_id>/', TaskView.as_view(), name='edit'),
    path('list/<int:user_id>/', ListTaskView.as_view(), name='list'),
]