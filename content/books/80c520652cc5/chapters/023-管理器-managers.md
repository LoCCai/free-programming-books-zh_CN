A Manager is the interface through which database query operations are provided to Django models. At least one Manager exists for every model in a Django application.

The way Manager classes work is documented in [_Making queries_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html); this document specifically touches on model options that customize Manager behavior.

## Manager names[¶](#manager-names "Permalink to this headline")

By default, Django adds a Manager with the name objects to every Django model class. However, if you want to use objects as a field name, or if you want to use a name other than objects for the Manager, you can rename it on a per-model basis. To rename the Manager for a given class, define a class attribute of type models.Manager() on that model. For example:

from django.db import models

class Person(models.Model):
    #...
    people \= models.Manager()

Using this example model, Person.objects will generate an AttributeError exception, but Person.people.all() will provide a list of all Person objects.

## Custom Managers[¶](#custom-managers "Permalink to this headline")

You can use a custom Manager in a particular model by extending the base Manager class and instantiating your custom Manager in your model.

There are two reasons you might want to customize a Manager: to add extra Manager methods, and/or to modify the initial QuerySet the Manager returns.

### Modifying initial Manager QuerySets[¶](#modifying-initial-manager-querysets "Permalink to this headline")

A Manager‘s base QuerySet returns all objects in the system. For example, using this model:

class Book(models.Model):
    title \= models.CharField(max\_length\=100)
    author \= models.CharField(max\_length\=50)

...the statement Book.objects.all() will return all books in the database.

You can override a Manager‘s base QuerySet by overriding the Manager.get\_query\_set() method. get\_query\_set() should return a QuerySet with the properties you require.

For example, the following model has _two_ Managers – one that returns all objects, and one that returns only the books by Roald Dahl:

\# First, define the Manager subclass.
class DahlBookManager(models.Manager):
    def get\_query\_set(self):
        return super(DahlBookManager, self).get\_query\_set().filter(author\='Roald Dahl')

\# Then hook it into the Book model explicitly.
class Book(models.Model):
    title \= models.CharField(max\_length\=100)
    author \= models.CharField(max\_length\=50)

    objects \= models.Manager() \# The default manager.
    dahl\_objects \= DahlBookManager() \# The Dahl-specific manager.

With this sample model, Book.objects.all() will return all books in the database, but Book.dahl\_objects.all() will only return the ones written by Roald Dahl.

Of course, because get\_query\_set() returns a QuerySet object, you can use filter(), exclude() and all the other QuerySet methods on it. So these statements are all legal:

Book.dahl\_objects.all()
Book.dahl\_objects.filter(title\='Matilda')
Book.dahl\_objects.count()

This example also pointed out another interesting technique: using multiple managers on the same model. You can attach as many Manager() instances to a model as you’d like. This is an easy way to define common “filters” for your models.

For example:

class MaleManager(models.Manager):
    def get\_query\_set(self):
        return super(MaleManager, self).get\_query\_set().filter(sex\='M')

class FemaleManager(models.Manager):
    def get\_query\_set(self):
        return super(FemaleManager, self).get\_query\_set().filter(sex\='F')

class Person(models.Model):
    first\_name \= models.CharField(max\_length\=50)
    last\_name \= models.CharField(max\_length\=50)
    sex \= models.CharField(max\_length\=1, choices\=(('M', 'Male'), ('F', 'Female')))
    people \= models.Manager()
    men \= MaleManager()
    women \= FemaleManager()

This example allows you to request Person.men.all(), Person.women.all(), and Person.people.all(), yielding predictable results.

If you use custom Manager objects, take note that the first Manager Django encounters (in the order in which they’re defined in the model) has a special status. Django interprets the first Manager defined in a class as the “default” Manager, and several parts of Django (including [dumpdata](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-dumpdata)) will use that Manager exclusively for that model. As a result, it’s a good idea to be careful in your choice of default manager in order to avoid a situation where overriding get\_query\_set() results in an inability to retrieve objects you’d like to work with.

### Custom managers and model inheritance[¶](#custom-managers-and-model-inheritance "Permalink to this headline")

Class inheritance and model managers aren’t quite a perfect match for each other. Managers are often specific to the classes they are defined on and inheriting them in subclasses isn’t necessarily a good idea. Also, because the first manager declared is the _default manager_, it is important to allow that to be controlled. So here’s how Django handles custom managers and [_model inheritance_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#model-inheritance):

1.  Managers defined on non-abstract base classes are _not_ inherited by child classes. If you want to reuse a manager from a non-abstract base, redeclare it explicitly on the child class. These sorts of managers are likely to be fairly specific to the class they are defined on, so inheriting them can often lead to unexpected results (particularly as far as the default manager goes). Therefore, they aren’t passed onto child classes.
2.  Managers from abstract base classes are always inherited by the child class, using Python’s normal name resolution order (names on the child class override all others; then come names on the first parent class, and so on). Abstract base classes are designed to capture information and behavior that is common to their child classes. Defining common managers is an appropriate part of this common information.
3.  The default manager on a class is either the first manager declared on the class, if that exists, or the default manager of the first abstract base class in the parent hierarchy, if that exists. If no default manager is explicitly declared, Django’s normal default manager is used.

These rules provide the necessary flexibility if you want to install a collection of custom managers on a group of models, via an abstract base class, but still customize the default manager. For example, suppose you have this base class:

class AbstractBase(models.Model):
    ...
    objects \= CustomManager()

    class Meta:
        abstract \= True

If you use this directly in a subclass, objects will be the default manager if you declare no managers in the base class:

class ChildA(AbstractBase):
    ...
    \# This class has CustomManager as the default manager.

If you want to inherit from AbstractBase, but provide a different default manager, you can provide the default manager on the child class:

class ChildB(AbstractBase):
    ...
    \# An explicit default manager.
    default\_manager \= OtherManager()

Here, default\_manager is the default. The objects manager is still available, since it’s inherited. It just isn’t used as the default.

Finally for this example, suppose you want to add extra managers to the child class, but still use the default from AbstractBase. You can’t add the new manager directly in the child class, as that would override the default and you would have to also explicitly include all the managers from the abstract base class. The solution is to put the extra managers in another base class and introduce it into the inheritance hierarchy _after_ the defaults:

class ExtraManager(models.Model):
    extra\_manager \= OtherManager()

    class Meta:
        abstract \= True

class ChildC(AbstractBase, ExtraManager):
    ...
    \# Default manager is CustomManager, but OtherManager is
    \# also available via the "extra\_manager" attribute.

Note that while you can _define_ a custom manager on the abstract model, you can’t _invoke_ any methods using the abstract model. That is:

ClassA.objects.do\_something()

is legal, but:

AbstractBase.objects.do\_something()

will raise an exception. This is because managers are intended to encapsulate logic for managing collections of objects. Since you can’t have a collection of abstract objects, it doesn’t make sense to be managing them. If you have functionality that applies to the abstract model, you should put that functionality in a staticmethod or classmethod on the abstract model.

### Implementation concerns[¶](#implementation-concerns "Permalink to this headline")

Whatever features you add to your custom Manager, it must be possible to make a shallow copy of a Manager instance; i.e., the following code must work:

\>>> import copy
\>>> manager \= MyManager()
\>>> my\_copy \= copy.copy(manager)

Django makes shallow copies of manager objects during certain queries; if your Manager cannot be copied, those queries will fail.

This won’t be an issue for most custom managers. If you are just adding simple methods to your Manager, it is unlikely that you will inadvertently make instances of your Manager uncopyable. However, if you’re overriding \_\_getattr\_\_ or some other private method of your Manager object that controls object state, you should ensure that you don’t affect the ability of your Manager to be copied.

## Controlling automatic Manager types[¶](#controlling-automatic-manager-types "Permalink to this headline")

This document has already mentioned a couple of places where Django creates a manager class for you: [default managers](#manager-names) and the “plain” manager used to [access related objects](#managers-for-related-objects). There are other places in the implementation of Django where temporary plain managers are needed. Those automatically created managers will normally be instances of the [django.db.models.Manager](#django.db.models.Manager "django.db.models.Manager") class.

Throughout this section, we will use the term “automatic manager” to mean a manager that Django creates for you – either as a default manager on a model with no managers, or to use temporarily when accessing related objects.

Sometimes this default class won’t be the right choice. One example is in the [django.contrib.gis](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/gis/index.html#module-django.contrib.gis "django.contrib.gis: Geographic Information System (GIS) extensions for Django") application that ships with Django itself. All gis models must use a special manager class ([GeoManager](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/gis/model-api.html#django.contrib.gis.db.models.GeoManager "django.contrib.gis.db.models.GeoManager")) because they need a special queryset ([GeoQuerySet](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/gis/geoquerysets.html#django.contrib.gis.db.models.GeoQuerySet "django.contrib.gis.db.models.GeoQuerySet")) to be used for interacting with the database. It turns out that models which require a special manager like this need to use the same manager class wherever an automatic manager is created.

Django provides a way for custom manager developers to say that their manager class should be used for automatic managers whenever it is the default manager on a model. This is done by setting the use\_for\_related\_fields attribute on the manager class:

class MyManager(models.Manager):
    use\_for\_related\_fields \= True

    ...

If this attribute is set on the _default_ manager for a model (only the default manager is considered in these situations), Django will use that class whenever it needs to automatically create a manager for the class. Otherwise, it will use [django.db.models.Manager](#django.db.models.Manager "django.db.models.Manager").

Historical Note

Given the purpose for which it’s used, the name of this attribute (use\_for\_related\_fields) might seem a little odd. Originally, the attribute only controlled the type of manager used for related field access, which is where the name came from. As it became clear the concept was more broadly useful, the name hasn’t been changed. This is primarily so that existing code will [_continue to work_](https://django-chinese-docs.readthedocs.io/en/latest/misc/api-stability.html) in future Django versions.

### Writing correct Managers for use in automatic Manager instances[¶](#writing-correct-managers-for-use-in-automatic-manager-instances "Permalink to this headline")

As already suggested by the django.contrib.gis example, above, the use\_for\_related\_fields feature is primarily for managers that need to return a custom QuerySet subclass. In providing this functionality in your manager, there are a couple of things to remember.

#### Do not filter away any results in this type of manager subclass[¶](#do-not-filter-away-any-results-in-this-type-of-manager-subclass "Permalink to this headline")

One reason an automatic manager is used is to access objects that are related to from some other model. In those situations, Django has to be able to see all the objects for the model it is fetching, so that _anything_ which is referred to can be retrieved.

If you override the get\_query\_set() method and filter out any rows, Django will return incorrect results. Don’t do that. A manager that filters results in get\_query\_set() is not appropriate for use as an automatic manager.
