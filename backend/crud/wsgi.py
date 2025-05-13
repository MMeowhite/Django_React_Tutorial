"""
WSGI config for crud project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# Determine the settings module based on the environment
# If the environment variable 'WEBSITE_HOSTNAME' is set, use 'crud.deployment'
# Otherwise, use 'crud.settings'
# This is useful for local development and production environments
# The 'WEBSITE_HOSTNAME' environment variable is set in Azure App Service
# The 'crud.deployment' settings module is used for production
settings_module = 'crud.deployment' if 'ALLOWED_HOSTS' in os.environ else 'crud.settings'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_wsgi_application()
