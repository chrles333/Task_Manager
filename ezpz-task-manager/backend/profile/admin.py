from django.contrib import admin
from profile.models import Profile, Connection

'''
Django authentication for each Model specified in this app
'''

admin.site.register(Profile)
admin.site.register(Connection)

'''
Django authentication representation for a Profile
'''

class ProfileInline(admin.StackedInline):
    model = Profile