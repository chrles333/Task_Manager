kill $(lsof -t -i:8000)
pip uninstall -y -r <(pip freeze)
