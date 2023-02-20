# Task Manager 

## Installation & Setup: Vlab
To install our app, you will need to first download and unzip the files via GitHub. The primary environment for our app will be CSE VLab.

CSE VLab Assumptions:
- Python: 3.9.2
- NodeJS: 12.22.12
- npm: 7.5.2
- Pip: 20.3.4 (pip3)

To install on CSE VLab, navigate to the root directory of our repository. From here, type in the following commands:
```
chmod +x run.sh
./run.sh
```

> Note: If ever prompted by the terminal to select [Y/N], type in ‘Y’ and press enter. 

This should start both the backend and frontend in a single terminal. After the server has been set up, the app should then be opened by itself in Firefox. If not, it will be accessible by visiting ‘localhost:{port no. displayed on terminal}’ on a browser. 

## Cleanup: Vlab
To terminate the server, use either `ctrl+d` or `ctrl+c` (dependent on system config). 
If for any reason you want to restart the server, make sure to use this section. This will prevent any ghost processes or other problems that may occur from incorrect closure. To cleanup an instance of a server, type in the following commands:
```
chmod +x cleanup.sh
./cleanup.sh
```

This will unbind the ports and ensure that the server is turned off after you are done or would like to restart the server.

## Troubleshooting: Vlab
If there are problems installing the server via the script, you can manually set it up. This will require 2 terminals (for frontend and backend respectively). 

On one terminal in the root directory, type in the following command:
```
cd ezpz-task-manager/frontend 
npm start
```

On a second terminal in the root directory, type in the following commands:
```
kill $(lsof -t -i:8000)
pipenv shell
pip3 install -r requirements.txt 
cd ezpz-task-manager/backend 
python3 manage.py runserver
```

> Note: If you receive any errors from the second terminal regarding Django migrations, try the following commands:
```
python3 manage.py makemigrations account profile task group availabilities forum resource
python3 manage.py migrate
python3 manage.py runserver
```