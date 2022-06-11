# houseparty-react-django-app

Notes on Spotify API

- Need to register our application with spotify and tell them we have a program using their api
  - Going to send them client_id, response_type, redirect_url, state, scope
    - Scope is what you have access too
- Spotify will then display success and prompt user to login (if required)
  - User will then log in and authorize access

- We will sent a code to request a token
  - What we will use whenever we send a request to Spotify
  - Will be sent access_token, token_type, express_in, and refresh_token