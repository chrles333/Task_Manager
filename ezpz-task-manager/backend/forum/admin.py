from django.contrib import admin
from forum.models import Question, Response

'''
Django authentication for each Model specified in this app
'''


admin.site.register(Question)
admin.site.register(Response)