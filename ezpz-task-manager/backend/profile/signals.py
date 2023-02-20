from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Connection

@receiver(post_save, sender=Connection)
def post_save_add_to_connections(sender, created, instance, **kwargs):
    ''' Add sender and receiver of the instance connection to the 
    list of connections in profile

    Parameters
    ----------
    sender : profile of user who sent request
    created : profile of user who received request
    instance : contains access to both sender and receiver for a given connection
    kwargs :
    '''
    
    _sender = instance.sender
    _receiver = instance.receiver
    
    if instance.status == 'accepted':
        _sender.connections.add(_receiver.account)
        _receiver.connections.add(_sender.account)

        _sender.save()
        _receiver.save()