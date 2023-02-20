from rest_framework.views import APIView
from rest_framework.response import Response

from task.models import Task
from profile.models import Profile, Connection

from datetime import datetime

class SearchView(APIView):
    '''
    SearchView is the data that will be delivered 
    with urls linked to SearchView.
    '''

    def post(self, request, user_id):
        task_id = request.data['id']
        task_title = request.data['name']
        task_firstname = request.data['firstname']
        task_lastname = request.data['lastname']
        task_deadline = request.data['deadline']
        task_desc = request.data['task_description']

        tasks = []
        for task_obj in Task.objects.all():
            # search for tasks based on given filter
            if task_id != "" and (int(task_id) != task_obj.pk):
                continue
            if (task_title.lower() not in task_obj.title.lower()):
                continue
            if (task_desc.lower() not in task_obj.description.lower()):
                continue
            if task_deadline and task_obj.deadline != datetime.strptime(task_deadline, "%Y-%m-%d").date():
                continue

            assignee_obj = task_obj.assignee

            if (task_firstname.lower() not in assignee_obj.first_name.lower()):
                continue
            if (task_lastname.lower() not in assignee_obj.last_name.lower()):
                continue

            # retreive fields of filtered task and append to list of tasks
            task_info = {
                'id': task_obj.pk,
                'group_id': task_obj.group_id,
                'group_name': task_obj.group.name,
                'title': task_obj.title,
                'desc': task_obj.description,
                'deadline': task_obj.deadline,
                'assignee_name': assignee_obj.first_name + " " + assignee_obj.last_name,
                'assignee_email': assignee_obj.email,
                'assignee_id': assignee_obj.id,
                'status': task_obj.status
            }
            tasks.append(task_info)

        profile = Profile.objects.get(account=user_id)
        queryset = Connection.objects.connections_accepted(profile)
        friends = [q['sender_id'] for q in queryset] + [profile.id]
        response = [t for t in tasks if t['assignee_id'] in friends]
        return Response(response)