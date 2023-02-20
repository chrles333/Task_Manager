from django.urls import path
from .views import ProfileView, ProfileUpdateView

'''
Define API Endpoints for this App
'''

app_name = 'profile'
urlpatterns = [
    path('view/<int:user_id>/', ProfileView.as_view(), name='view'),
    path('update/<int:user_id>/', ProfileUpdateView.as_view(), name='update'),
]