from django.urls import path
from search.views import SearchView

'''
Define API Endpoints for this App
'''

urlpatterns = [
    path('search/<int:user_id>/', SearchView.as_view())
]