import datetime
from rest_framework import serializers
from .models import Availabilities
from task.models import Task

'''
CreateAvailabilitiesSerializer calculates the availability of
an user with the validated_data that is passed in
'''


class CreateAvailabilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availabilities
        fields = ['account_id', 'availability_level']

    def create(self, validated_data):
        account_id = validated_data.get('account_id')

        availabilities = Availabilities()
        # Check if availabilities has already been created
        # If it has replace it with the latest calculation
        try:
            availabilities = Availabilities.objects.get(account_id=account_id)
        except Availabilities.DoesNotExist:
            None

        # Set availability object with account_id passed
        availabilities.account_id = account_id
        availabilities.availability_level = self.calculateAvailabilityLevel(
            account_id.id)

        # Save new availability calculated
        availabilities.save()
        return availabilities

    def calculateAvailabilityLevel(self, account_id):
        # Get all the tasks that an assignee currently has
        task_list = Task.objects.filter(assignee=account_id)
        task_calculation_list = []
        # Calculation based on:
        # - assigned tasks
        # - task states    | 'Not started' = 4, 'Blocked' = 2,
        #                    'In Progress' = 1, 'Completed' = 0
        # - task deadlines | multiplier = 14 days - days left

        # Loop through each task and calculate its task weighting
        # in terms of availabilitiy level
        for task in task_list:
            task_state = self.getTaskStateMultiplier(task)
            task_days_left = self.getDeadlineMultiplier(task)
            task_calculation_list.append((task_state * task_days_left))

        # Get the summation of the task weighting
        level = 0
        if len(task_calculation_list):
            level = sum(task_calculation_list)
        return level

    # The state of the task is used to calculate its weighting
    # on availabilities
    def getTaskStateMultiplier(self, task: Task):
        task_state_dict = {
            'Not Started': 4,
            'Blocked': 2,
            'In Progress': 1,
            'Completed': 0
        }
        return task_state_dict[task.status]

    # The number of days left from two weeks time is used to calcualte
    # its weight on availabilities
    def getDeadlineMultiplier(self, task: Task):
        days_left = task.deadline - datetime.date.today()
        task_deadline_limit = 14
        if days_left.days >= task_deadline_limit:
            return task_deadline_limit

        return task_deadline_limit - days_left.days
