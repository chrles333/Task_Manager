from django.contrib import admin
from .models import Resource

'''
Django authentication for each Model specified in this app
'''

admin.site.register(Resource)