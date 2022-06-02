from django.shortcuts import redirect
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from .util import update_or_create_user_tokens, is_spotify_authenticated


# Create your views here.

# Request authorization
# We want this view to return an url we can use on the frontend to interact with the spotify app
# From our frontend we are going to call this API endpoint
class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
        # requesting authorization
        # need client_id, response_type,
        # will send code back that will allow us to authenticate a user
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


# Need to set up a redirect URI
# This is also sometimes referred to as a callback
# After we send the request to the auth url we need a call back
# AKA some url where this info gets returned to
# Need an endpoint to take in the code and state returned from spotify after the user gives access

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    print(f'refresh_token from spotify.views: {refresh_token}')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    # redirect back to our application home page
    return redirect('frontend:')


class isAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
