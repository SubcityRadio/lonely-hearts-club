import json
import urllib
from os import curdir, sep
from urllib.parse import parse_qs
from http.server import BaseHTTPRequestHandler, HTTPServer

SITE_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
SITE_SECRET = '6LftmZEUAAAAADtip4grAAcdDHmU-2necEqmy8_5'
RECAPTCHA_RESPONSE_PARAM = 'g-recaptcha-response'

class handler(BaseHTTPRequestHandler):
  def set_headers(self):
    self.send_response(200)
    self.send_header('Content-type', 'text/html')
    self.end_headers()

  def do_POST(self):
    self.set_headers()
    post_body = parse_qs(self.rfile.read(int(self.headers['Content-Length'])))

    success = False
    if RECAPTCHA_RESPONSE_PARAM in post_body:
      token = post_body[RECAPTCHA_RESPONSE_PARAM][0]
      resp = urllib.request.urlopen(
          SITE_VERIFY_URL, urllib.parse.urlencode(
              {'secret': SITE_SECRET, 'response': token}, True)).read()
      if json.loads(resp).get("success"):
        success = True

    if success:
      message = 'Thanks for the feedback!'
    else:
      message = 'There was an error.'
    self.wfile.write(message.encode())
    return

