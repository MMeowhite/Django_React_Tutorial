import os
from .settings import *
from .settings import BASE_DIR
import dj_database_url
 
# ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] # Allow all hosts for local development
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')
# SECURITY WARNING: keep the secret key used in production secret!
CSRF_TRUSTED_ORIGINS = ['https://' + os.environ['ALLOWED_HOSTS']] # Allow all hosts for local development
DEBUG = False # Disable debug mode for production


MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise middleware for serving static files
    'corsheaders.middleware.CorsMiddleware', # CORS middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Static files (CSS, JavaScript, Images)
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # Use WhiteNoise for static files
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') # Set the static root directory)

# For Deployment in Azure App Service
# connection_string = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING'] # Get the connection string from the environment variable
# parameters = {pair.split('='):pair.split('=')[1] for pair in connection_string.split(' ')} # Split the connection string into key-value pairs

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql', # Use PostgreSQL as the database engine
#         'NAME': parameters['dbname'], # Database
#         "HOST": parameters['host'], # Database host
#         "USER": parameters['user'], # Database user
#         "PASSWORD": parameters['password'], # Database password
#     }

# }

DATABASES = {
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))  # Use dj_database_url to parse the database URL
}


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Django REST framework
    'api',  # API app
    'corsheaders',  # CORS headers
]

CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')