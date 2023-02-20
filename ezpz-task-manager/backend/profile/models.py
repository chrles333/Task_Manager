from django.db import models

from account.models import Account

class Profile(models.Model):
    '''
    Profile provides the accessible fields of a user's profile
    '''

    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, default='', max_length=250)
    connections = models.ManyToManyField(Account, related_name='connections', blank=True)

    def get_connections(self):
        ''' 
        Returns all current connections to the corresponding profile 
        '''

        return self.connections.all()

    def get_connections_count(self):
        '''
        Returns the number of current connections to the corresponding profile
        '''

        return self.connections.all().count()

    def __str__(self):
        return str(self.account)

# Status options for a connection requests
STATUS_CHOICES = (
    ('send', 'send'),
    ('accepted', 'accepted'),
)

class ConnectionManager(models.Manager):
    '''
    ConnectionManager provides helper methods to filter and 
    generate a queryset of connections from a user
    '''

    def connection_requests_received(self, receiver):
        '''
        Returns a queryset containing all connection requests received by the user
        '''

        queryset = Connection.objects.filter(receiver=receiver, status='send').values()
        return queryset

    def connection_requests_sent(self, sender):
        '''
        Returns a queryset containing all connection requests sent by the user
        '''

        queryset = Connection.objects.filter(sender=sender, status='send').values()
        return queryset
    
    def connections_accepted(self, receiver):
        '''
        Returns a queryset containing all accepted connection requests 
        that were sent and received by the user
        '''

        q1 = list(Connection.objects.filter(receiver=receiver, status='accepted').values())
        q2 = list(Connection.objects.filter(sender=receiver, status='accepted').values())

        for q in q2:
            q['sender_id'],q['receiver_id'] =  q['receiver_id'],q['sender_id']

        return q1 + q2

class Connection(models.Model):
    '''
    Connection provides the accessible fields of a connection sent from a user
    It contains a information about the sender, receiver and the
    status of the connection (send, accepted)
    '''

    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)

    objects = ConnectionManager()

    def __str__(self):
        return f"{self.sender}-{self.receiver}-{self.status}"