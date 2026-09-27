## How to deploy with WSGI[¶](#how-to-deploy-with-wsgi "Permalink to this headline")

Django’s primary deployment platform is [WSGI](http://www.wsgi.org), the Python standard for web servers and applications.

Django’s [startproject](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-startproject) management command sets up a simple default WSGI configuration for you, which you can tweak as needed for your project, and direct any WSGI-compliant webserver to use. Django includes getting-started documentation for the following WSGI servers:

-   [How to use Django with Apache and mod\_wsgi](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/modwsgi.html)
-   [Authenticating against Django’s user database from Apache](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/apache-auth.html)
-   [How to use Django with Gunicorn](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/gunicorn.html)
-   [How to use Django with uWSGI](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/uwsgi.html)

## The application object[¶](#the-application-object "Permalink to this headline")

One key concept of deploying with WSGI is to specify a central application callable object which the webserver uses to communicate with your code. This is commonly specified as an object named application in a Python module accessible to the server.

Changed in Django 1.4.

The [startproject](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-startproject) command creates a projectname/wsgi.py that contains such an application callable.

Note

Upgrading from a previous release of Django and don’t have a wsgi.py file in your project? You can simply add one to your project’s top-level Python package (probably next to settings.py and urls.py) with the contents below. If you want [runserver](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-runserver) to also make use of this WSGI file, you can also add WSGI\_APPLICATION \= "mysite.wsgi.application" in your settings (replacing mysite with the name of your project).

Initially this file contains:

import os

os.environ.setdefault("DJANGO\_SETTINGS\_MODULE", "mysite.settings")

\# This application object is used by the development server
\# as well as any WSGI server configured to use this file.
from django.core.wsgi import get\_wsgi\_application
application \= get\_wsgi\_application()

The os.environ.setdefault line just sets the default settings module to use, if you haven’t explicitly set the [DJANGO\_SETTINGS\_MODULE](https://django-chinese-docs.readthedocs.io/en/latest/topics/settings.html#envvar-DJANGO_SETTINGS_MODULE) environment variable. You’ll need to edit this line to replace mysite with the name of your project package, so the path to your settings module is correct.

To apply [WSGI middleware](http://www.python.org/dev/peps/pep-3333/#middleware-components-that-play-both-sides) you can simply wrap the application object in the same file:

from helloworld.wsgi import HelloWorldApplication
application \= HelloWorldApplication(application)

You could also replace the Django WSGI application with a custom WSGI application that later delegates to the Django WSGI application, if you want to combine a Django application with a WSGI application of another framework.
