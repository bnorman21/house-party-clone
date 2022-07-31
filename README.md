# houseparty-react-django-app

**Setup**

_Backend_
- `cd house_party`
- `python3 -m venv env ` 
- `source env/bin/activate` 
- `pip install django djangorestframework requests`

_Frontend_
- `cd house_party/music_controller/frontend`
- `npm init -y`
- `npm i webpack webpack-cli --save-dev`
- `npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`
- `npm i react react-dom --save-dev`
- `npm install @babel/plugin-proposal-class-properties`
- `npm install react-router-dom`
- `npm install @mui/material @mui/icons-material @emotion/react @emotion/styled `

_Spotify API_
- Use link https://developer.spotify.com/documentation/web-api/quick-start/ to set up a developer account
- Set up a client id, client secret, and a redirect link
- `cd music_controller/spotify`
- `touch credentials.py`
- paste below into credentials.py
`CLIENT_ID = "Paste Value Here"
CLIENT_SECRET = "Paste Value Here"
REDIRECT_URI = "Paste Link Here"`

**Run Locally**
- `cd house_party`
- `python3 manage.py runserver`
- _new terminal_
- `cd house_party/music_controller/frontend`
- `npm run-script dev `



**Notes on Spotify API**
- Need to register your application with spotify and tell them you have a program using their api
  - Going to send them client_id, response_type, redirect_url, state, scope
    - Scope is what you have access too
- Spotify will then display success and prompt user to login (if required)
  - User will then log in and authorize access

- You will be sent a code to request a token
  - You will use whenever you send a request to Spotify
  - You be sent access_token, token_type, express_in, and refresh_token
