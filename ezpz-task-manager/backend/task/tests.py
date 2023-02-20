from django.test import Client, TransactionTestCase
from django.urls import reverse

import datetime

'''
Test Class to verify the completeness of our implementation, mainly used during early prototying.
'''

class TestTaskView(TransactionTestCase):
    reset_sequences = True

    def setUp(self):
        self.client_1 = Client()
        self.client_2 = Client()
        self.client_register_info_1 = {'email':'a@g.com', 'password':'alexkang',
                        'first_name':'alex', 'last_name':'kang'}
        self.client_register_info_2 = {'email':'b@g.com', 'password':'mattyhan',
                        'first_name':'matty', 'last_name':'han'}

        self.client_1.post(reverse('account:register'), self.client_register_info_1)
        self.client_2.post(reverse('account:register'), self.client_register_info_2)
        
        self.task_info = {
            'group_id':'1',
            'title':'Task One',
            'description':'A short description',
            'deadline':'2023-06-12', # Must be YYYY-MM-DD
            'status':'Blocked',
            'assignee':'',
        }
    
    def test_create_task(self):
        response = self.client_1.post(reverse('task:create'), self.task_info)
        self.assertEqual(response.status_code, 201)
    
    def test_create_task_without_correct_fields(self):
        task_bad_info = {
            'group_id':'1',
            'title':'Task One',
            'deadline':'',
            'status':'Not Started',
            'assignee':''
        }
        response = self.client_1.post(reverse('task:create'), task_bad_info)
        self.assertEqual(response.status_code, 400)
    
    def test_edit_task(self):
        task_edit_info = {
            'title':'',
            'description':'A long description',
            'deadline':'2022-12-06', # Must be YYYY-MM-DD
            'status':'Completed',
            'assignee':'2',
        }       

        response = self.client_1.post(reverse('task:create'), self.task_info)
        response = self.client_1.put(reverse('task:edit', kwargs={'task_id':1}), \
                                            task_edit_info, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_get_invalid_task_id(self):
        response = self.client_1.get(reverse('task:edit', kwargs={'task_id':1}))
        self.assertEqual(response.status_code, 400)

    def test_edit_non_existing_task(self):
        response = self.client_1.put(reverse('task:edit', kwargs={'task_id':1}), \
                                            self.task_info, content_type='application/json')
        self.assertEqual(response.status_code, 400)
   
    def test_view_task_assigned_to_user(self):
        task_info_extra_1 = {
            'group_id':'2',
            'title':'Task Two',
            'description':'A long description',
            'deadline':'2023-06-13', # Must be YYYY-MM-DD
            'status':'Completed',
            'assignee':'1',
        }

        task_info_extra_2 = {
            'group_id':'3',
            'title':'Task Three',
            'description':'A mid description',
            'deadline': '',
            'status':'In Progress',
            'assignee':'',
        }
        
        expected_task_infos = [
            {
                'id':1,
                'title':'Task One',
                'deadline':datetime.date(2023, 6, 12)
            },
            {
                'id':2,
                'title':'Task Two',
                'deadline':datetime.date(2023, 6, 13)
            },
            {
                'id':3,
                'title':'Task Three',
                'deadline':None
            },
        ]

        response = self.client_1.post(reverse('task:create'), self.task_info)
        self.assertEqual(response.status_code, 201)
        response = self.client_1.post(reverse('task:create'), task_info_extra_1)
        self.assertEqual(response.status_code, 201)
        response = self.client_1.post(reverse('task:create'), task_info_extra_2)
        self.assertEqual(response.status_code, 201)
        
        response = self.client_1.get(reverse('task:list', kwargs={'user_id':1}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(list(response.data), expected_task_infos)