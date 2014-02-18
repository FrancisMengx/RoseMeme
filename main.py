#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2

from google.appengine.ext.webapp import template
from models import Meme

import time

class AddHandler(webapp2.RequestHandler):
    def get(self):
        memes = Meme.query().order(-Meme.last_touch_date_time).fetch(20)
        self.response.out.write(template.render('templates/add.html', {'memes': memes}))

    def post(self):
        new_message = Meme(image_url = self.request.get('image_url'), caption = self.request.get('caption'))
        new_message.put()
        time.sleep(0.5)
        self.redirect('/')

    
class MemeHandler(webapp2.RequestHandler):
    def get(self):
        memes = Meme.query().order(-Meme.last_touch_date_time).fetch(20)
        self.response.out.write(template.render('templates/meme.html', {'memes': memes}))


app = webapp2.WSGIApplication([
    ('/add', AddHandler),
    ('/', MemeHandler)
], debug=True)
