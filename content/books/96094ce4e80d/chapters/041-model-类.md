This document covers features of the [`Model`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model "django.db.models.Model") class. For more information about models, see [the complete list of Model reference guides](https://docs.djangoproject.com/zh-hans/2.0/ref/models/).

## Attributes[¶](#attributes "Permalink to this headline")

### `objects`[¶](#objects "Permalink to this headline")

`Model.``objects`[¶](#django.db.models.Model.objects "Permalink to this definition")

Each non-abstract [`Model`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model "django.db.models.Model") class must have a [`Manager`](https://docs.djangoproject.com/zh-hans/2.0/topics/db/managers/#django.db.models.Manager "django.db.models.Manager") instance added to it. Django ensures that in your model class you have at least a default `Manager` specified. If you don't add your own `Manager`, Django will add an attribute `objects` containing default [`Manager`](https://docs.djangoproject.com/zh-hans/2.0/topics/db/managers/#django.db.models.Manager "django.db.models.Manager") instance. If you add your own [`Manager`](https://docs.djangoproject.com/zh-hans/2.0/topics/db/managers/#django.db.models.Manager "django.db.models.Manager") instance attribute, the default one does not appear. Consider the following example:

from django.db import models

class Person(models.Model):
    \# Add manager with another name
    people \= models.Manager()

For more details on model managers see [Managers](https://docs.djangoproject.com/zh-hans/2.0/topics/db/managers/) and [Retrieving objects](https://docs.djangoproject.com/zh-hans/2.0/topics/db/queries/#retrieving-objects).
