from django.contrib import admin
from .models import Task

'''
Register access to Task related functionality in the django admin page
'''

admin.site.register(Task)