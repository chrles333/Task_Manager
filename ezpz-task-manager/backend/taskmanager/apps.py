from django.apps import AppConfig

'''
Application configuration objects store metadata for an application. 
Explicitly typedd attributes are configured here. 
Others are set by Django and read-only.
'''

class TaskmanagerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'taskmanager'
