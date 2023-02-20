from django.test import Client, TransactionTestCase
from django.urls import reverse

'''
Test Class to verify the completeness of our implementation, mainly used during early prototying.
'''

class TestProfileView(TransactionTestCase):
    reset_sequences = True
    
    def test_profile_for_correct_info_upon_register(self):
        client = Client()
        client_register_info = {'email':'a@g.com', 'password':'alexkang',
                        'first_name':'alex', 'last_name':'kang'}
        client_expected_profile_info = {'email':'a@g.com',
                        'first_name':'alex', 'last_name':'kang',
                        'bio':''}

        response = client.post(reverse('account:register'), client_register_info)
        response = client.get(reverse('profile:view', kwargs={'user_id':1}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, client_expected_profile_info)

    def test_update_someone_elses_profile(self):
        client = Client()
        client_register_info_1 = {'email':'b@g.com', 'password':'mattyhan',
                        'first_name':'matty', 'last_name':'han'}
        client_register_info_2 = {'email':'a@g.com', 'password':'alexkang',
                        'first_name':'alex', 'last_name':'kang'}
        client_expected_change_info = {'email':'a@g.com',
                        'first_name':'borris', 'last_name':'johnson',
                        'bio':'Nothing'}

        response = self.client.post(reverse('account:register'), client_register_info_1)
        response = client.post(reverse('account:register'), client_register_info_2)
        response = client.put(reverse('profile:update', kwargs={'user_id':1}), client_expected_change_info)
        self.assertEqual(response.status_code, 404)
    
    def test_update_personal_profile(self):
        client = Client()
        client_register_info = {'email':'b@g.com', 'password':'mattyhan',
                        'first_name':'matty', 'last_name':'han'}
        client_update_info = {'email':'a@g.com',
                        'first_name':'alex', 'last_name':'kang', 'bio':'New bio who this?'}

        response = client.post(reverse('account:register'), client_register_info)
        response = client.put(reverse('profile:update', kwargs={'user_id':1}),
                            client_update_info, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = client.get(reverse('profile:view', kwargs={'user_id':1}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, client_update_info)