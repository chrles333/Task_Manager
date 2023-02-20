from account.models import Account

'''
Validates whether the email passed has already been used
'''

def valid_email(email):
    account = None
    try:
        account = Account.objects.get(email=email)
    except Account.DoesNotExist:
        return None
    if account != None:
        return email
