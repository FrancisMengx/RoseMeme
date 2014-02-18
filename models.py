""" Model classes for the RoseTask API """

from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb.model import EndpointsModel

class Meme(EndpointsModel):
    """ Model to store a single task"""
    _message_fields_schema = ('id', 'caption', 'image_url', 'last_touch_date_time')
    caption = ndb.StringProperty()
    image_url = ndb.StringProperty()
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)
