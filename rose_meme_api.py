'''
Created on Nov 1, 2013

@author: FrancisMeng
'''
from protorpc import remote
from google.appengine.ext import endpoints
from models import Meme
@endpoints.api(name='rosememe', version='v1' , description='Rose Meme API', hostname='mengx-rose-meme.appspot.com')

class RoseMemeApi(remote.Service):
    """ Provides the Move Quote JSON api methods. """
    # Insert meme
    @Meme.method(path='meme/insert',
                       http_method='post',
                       name='meme.insert')
    def rose_meme_insert(self, a_meme):
        """Insert a meme in the database. """
        # add this object into the database
        a_meme.put()
        # return the object that was inserted
        return a_meme
    
    
    # Read meme
    @Meme.query_method(path='meme/list',
                       name='meme.list',
                       http_method='GET',
                       query_fields=('limit', 'order', 'pageToken'))
    def rose_meme_read(self, query):
        return query
     
     
    # Delete meme
    @Meme.method(path='meme/delete/{id}',
                       name='meme.delete',
                       http_method='GET',
                       request_fields=('id',))
    def rose_meme_delete(self, a_meme):
        if not a_meme.from_datastore:
            raise endpoints.NotFoundException('Meme not Found')
        a_meme.key.delete()
        return Meme(caption = 'Deleted')
    
    
    
app = endpoints.api_server([RoseMemeApi], restricted=False)