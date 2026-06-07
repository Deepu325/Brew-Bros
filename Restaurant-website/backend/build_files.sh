#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Make migrations (optional, but good for deployment)
python manage.py makemigrations --noinput
python manage.py migrate --noinput
