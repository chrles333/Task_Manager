#!/bin/sh
pip3 install -r requirements.txt
kill $(lsof -t -i:8000)
/bin/sh -ec 'cd ezpz-task-manager/backend && python3 manage.py runserver &';
/bin/sh -ec 'cd ezpz-task-manager/frontend && npm start';

# Note if this does not automatically run the app
# Run the following in 2 seperate terminals: 

# in Terminal 1: 
# pip3 install -r requirements.txt
# cd ezpz-task-manager/backend && python3 manage.py runserver

# in Terminal 2: 
# cd ezpz-task-manager/frontend && npm start
