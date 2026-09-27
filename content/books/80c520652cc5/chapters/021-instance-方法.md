## Model instance reference[¶](#model-instance-reference "Permalink to this headline")

This document describes the details of the Model API. It builds on the material presented in the [_model_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html) and [_database query_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html) guides, so you’ll probably want to read and understand those documents before reading this one.

Throughout this reference we’ll use the [_example Weblog models_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#queryset-model-example) presented in the [_database query guide_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html).

## Creating objects[¶](#creating-objects "Permalink to this headline")

To create a new instance of a model, just instantiate it like any other Python class:

_class_ Model(_\*\*kwargs_)[¶](#django.db.models.Model "Permalink to this definition")

The keyword arguments are simply the names of the fields you’ve defined on your model. Note that instantiating a model in no way touches your database; for that, you need to [save()](#django.db.models.Model.save "django.db.models.Model.save").

Note

You may be tempted to customize the model by overriding the \_\_init\_\_ method. If you do so, however, take care not to change the calling signature as any change may prevent the model instance from being saved. Rather than overriding \_\_init\_\_, try using one of these approaches:

1.  Add a classmethod on the model class:
    
    class Book(models.Model):
        title \= models.CharField(max\_length\=100)
    
        @classmethod
        def create(cls, title):
            book \= cls(title\=title)
            \# do something with the book
            return book
    
    book \= Book.create("Pride and Prejudice")
    
2.  Add a method on a custom manager (usually preferred):
    
    class BookManager(models.Manager):
        def create\_book(self, title):
            book \= self.create(title\=title)
            \# do something with the book
            return book
    
    class Book(models.Model):
        title \= models.CharField(max\_length\=100)
    
        objects \= BookManager()
    
    book \= Book.objects.create\_book("Pride and Prejudice")
    

## Validating objects[¶](#validating-objects "Permalink to this headline")

There are three steps involved in validating a model:

1.  Validate the model fields - [Model.clean\_fields()](#django.db.models.Model.clean_fields "django.db.models.Model.clean_fields")
2.  Validate the model as a whole - [Model.clean()](#django.db.models.Model.clean "django.db.models.Model.clean")
3.  Validate the field uniqueness - [Model.validate\_unique()](#django.db.models.Model.validate_unique "django.db.models.Model.validate_unique")

All three steps are performed when you call a model’s [full\_clean()](#django.db.models.Model.full_clean "django.db.models.Model.full_clean") method.

When you use a [ModelForm](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html#django.forms.ModelForm "django.forms.ModelForm"), the call to [is\_valid()](https://django-chinese-docs.readthedocs.io/en/latest/ref/forms/api.html#django.forms.Form.is_valid "django.forms.Form.is_valid") will perform these validation steps for all the fields that are included on the form. See the [_ModelForm documentation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html) for more information. You should only need to call a model’s [full\_clean()](#django.db.models.Model.full_clean "django.db.models.Model.full_clean") method if you plan to handle validation errors yourself, or if you have excluded fields from the [ModelForm](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html#django.forms.ModelForm "django.forms.ModelForm") that require validation.

Model.full\_clean(_exclude=None_)[¶](#django.db.models.Model.full_clean "Permalink to this definition")

This method calls [Model.clean\_fields()](#django.db.models.Model.clean_fields "django.db.models.Model.clean_fields"), [Model.clean()](#django.db.models.Model.clean "django.db.models.Model.clean"), and [Model.validate\_unique()](#django.db.models.Model.validate_unique "django.db.models.Model.validate_unique"), in that order and raises a [ValidationError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.ValidationError "django.core.exceptions.ValidationError") that has a message\_dict attribute containing errors from all three stages.

The optional exclude argument can be used to provide a list of field names that can be excluded from validation and cleaning. [ModelForm](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html#django.forms.ModelForm "django.forms.ModelForm") uses this argument to exclude fields that aren’t present on your form from being validated since any errors raised could not be corrected by the user.

Note that full\_clean() will _not_ be called automatically when you call your model’s [save()](#django.db.models.Model.save "django.db.models.Model.save") method, nor as a result of [ModelForm](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html#django.forms.ModelForm "django.forms.ModelForm") validation. In the case of [ModelForm](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html#django.forms.ModelForm "django.forms.ModelForm") validation, [Model.clean\_fields()](#django.db.models.Model.clean_fields "django.db.models.Model.clean_fields"), [Model.clean()](#django.db.models.Model.clean "django.db.models.Model.clean"), and [Model.validate\_unique()](#django.db.models.Model.validate_unique "django.db.models.Model.validate_unique") are all called individually.

You’ll need to call full\_clean manually when you want to run one-step model validation for your own manually created models. For example:

try:
    article.full\_clean()
except ValidationError as e:
    \# Do something based on the errors contained in e.message\_dict.
    \# Display them to a user, or handle them programatically.
    pass

The first step full\_clean() performs is to clean each individual field.

Model.clean\_fields(_exclude=None_)[¶](#django.db.models.Model.clean_fields "Permalink to this definition")

This method will validate all fields on your model. The optional exclude argument lets you provide a list of field names to exclude from validation. It will raise a [ValidationError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.ValidationError "django.core.exceptions.ValidationError") if any fields fail validation.

The second step full\_clean() performs is to call [Model.clean()](#django.db.models.Model.clean "django.db.models.Model.clean"). This method should be overridden to perform custom validation on your model.

Model.clean()[¶](#django.db.models.Model.clean "Permalink to this definition")

This method should be used to provide custom model validation, and to modify attributes on your model if desired. For instance, you could use it to automatically provide a value for a field, or to do validation that requires access to more than a single field:

def clean(self):
    from django.core.exceptions import ValidationError
    \# Don't allow draft entries to have a pub\_date.
    if self.status \== 'draft' and self.pub\_date is not None:
        raise ValidationError('Draft entries may not have a publication date.')
    \# Set the pub\_date for published items if it hasn't been set already.
    if self.status \== 'published' and self.pub\_date is None:
        self.pub\_date \= datetime.date.today()

Any [ValidationError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.ValidationError "django.core.exceptions.ValidationError") exceptions raised by Model.clean() will be stored in a special key error dictionary key, NON\_FIELD\_ERRORS, that is used for errors that are tied to the entire model instead of to a specific field:

from django.core.exceptions import ValidationError, NON\_FIELD\_ERRORS
try:
    article.full\_clean()
except ValidationError as e:
    non\_field\_errors \= e.message\_dict\[NON\_FIELD\_ERRORS\]

Finally, full\_clean() will check any unique constraints on your model.

Model.validate\_unique(_exclude=None_)[¶](#django.db.models.Model.validate_unique "Permalink to this definition")

This method is similar to [clean\_fields()](#django.db.models.Model.clean_fields "django.db.models.Model.clean_fields"), but validates all uniqueness constraints on your model instead of individual field values. The optional exclude argument allows you to provide a list of field names to exclude from validation. It will raise a [ValidationError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.ValidationError "django.core.exceptions.ValidationError") if any fields fail validation.

Note that if you provide an exclude argument to validate\_unique(), any [unique\_together](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html#django.db.models.Options.unique_together "django.db.models.Options.unique_together") constraint involving one of the fields you provided will not be checked.

## Saving objects[¶](#saving-objects "Permalink to this headline")

To save an object back to the database, call save():

Model.save(\[_force\_insert=False_, _force\_update=False_, _using=DEFAULT\_DB\_ALIAS_, _update\_fields=None_\])[¶](#django.db.models.Model.save "Permalink to this definition")

If you want customized saving behavior, you can override this save() method. See [_Overriding predefined model methods_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#overriding-model-methods) for more details.

The model save process also has some subtleties; see the sections below.

### Auto-incrementing primary keys[¶](#auto-incrementing-primary-keys "Permalink to this headline")

If a model has an [AutoField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.AutoField "django.db.models.AutoField") — an auto-incrementing primary key — then that auto-incremented value will be calculated and saved as an attribute on your object the first time you call save():

\>>> b2 \= Blog(name\='Cheddar Talk', tagline\='Thoughts on cheese.')
\>>> b2.id     \# Returns None, because b doesn't have an ID yet.
\>>> b2.save()
\>>> b2.id     \# Returns the ID of your new object.

There’s no way to tell what the value of an ID will be before you call save(), because that value is calculated by your database, not by Django.

For convenience, each model has an [AutoField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.AutoField "django.db.models.AutoField") named id by default unless you explicitly specify primary\_key=True on a field in your model. See the documentation for [AutoField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.AutoField "django.db.models.AutoField") for more details.

#### The pk property[¶](#the-pk-property "Permalink to this headline")

Model.pk[¶](#django.db.models.Model.pk "Permalink to this definition")

Regardless of whether you define a primary key field yourself, or let Django supply one for you, each model will have a property called pk. It behaves like a normal attribute on the model, but is actually an alias for whichever attribute is the primary key field for the model. You can read and set this value, just as you would for any other attribute, and it will update the correct field in the model.

#### Explicitly specifying auto-primary-key values[¶](#explicitly-specifying-auto-primary-key-values "Permalink to this headline")

If a model has an [AutoField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.AutoField "django.db.models.AutoField") but you want to define a new object’s ID explicitly when saving, just define it explicitly before saving, rather than relying on the auto-assignment of the ID:

\>>> b3 \= Blog(id\=3, name\='Cheddar Talk', tagline\='Thoughts on cheese.')
\>>> b3.id     \# Returns 3.
\>>> b3.save()
\>>> b3.id     \# Returns 3.

If you assign auto-primary-key values manually, make sure not to use an already-existing primary-key value! If you create a new object with an explicit primary-key value that already exists in the database, Django will assume you’re changing the existing record rather than creating a new one.

Given the above 'Cheddar Talk' blog example, this example would override the previous record in the database:

b4 \= Blog(id\=3, name\='Not Cheddar', tagline\='Anything but cheese.')
b4.save()  \# Overrides the previous blog with ID=3!

See [How Django knows to UPDATE vs. INSERT](#how-django-knows-to-update-vs-insert), below, for the reason this happens.

Explicitly specifying auto-primary-key values is mostly useful for bulk-saving objects, when you’re confident you won’t have primary-key collision.

### What happens when you save?[¶](#what-happens-when-you-save "Permalink to this headline")

When you save an object, Django performs the following steps:

1.  **Emit a pre-save signal.** The [_signal_](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html) [django.db.models.signals.pre\_save](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.pre_save "django.db.models.signals.pre_save") is sent, allowing any functions listening for that signal to take some customized action.
    
2.  **Pre-process the data.** Each field on the object is asked to perform any automated data modification that the field may need to perform.
    
    Most fields do _no_ pre-processing — the field data is kept as-is. Pre-processing is only used on fields that have special behavior. For example, if your model has a [DateField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.DateField "django.db.models.DateField") with auto\_now=True, the pre-save phase will alter the data in the object to ensure that the date field contains the current date stamp. (Our documentation doesn’t yet include a list of all the fields with this “special behavior.”)
    
3.  **Prepare the data for the database.** Each field is asked to provide its current value in a data type that can be written to the database.
    
    Most fields require _no_ data preparation. Simple data types, such as integers and strings, are ‘ready to write’ as a Python object. However, more complex data types often require some modification.
    
    For example, [DateField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.DateField "django.db.models.DateField") fields use a Python datetime object to store data. Databases don’t store datetime objects, so the field value must be converted into an ISO-compliant date string for insertion into the database.
    
4.  **Insert the data into the database.** The pre-processed, prepared data is then composed into an SQL statement for insertion into the database.
    
5.  **Emit a post-save signal.** The signal [django.db.models.signals.post\_save](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.post_save "django.db.models.signals.post_save") is sent, allowing any functions listening for that signal to take some customized action.
    

### How Django knows to UPDATE vs. INSERT[¶](#how-django-knows-to-update-vs-insert "Permalink to this headline")

You may have noticed Django database objects use the same save() method for creating and changing objects. Django abstracts the need to use INSERT or UPDATE SQL statements. Specifically, when you call save(), Django follows this algorithm:

-   If the object’s primary key attribute is set to a value that evaluates to True (i.e., a value other than None or the empty string), Django executes a SELECT query to determine whether a record with the given primary key already exists.
-   If the record with the given primary key does already exist, Django executes an UPDATE query.
-   If the object’s primary key attribute is _not_ set, or if it’s set but a record doesn’t exist, Django executes an INSERT.

The one gotcha here is that you should be careful not to specify a primary-key value explicitly when saving new objects, if you cannot guarantee the primary-key value is unused. For more on this nuance, see [Explicitly specifying auto-primary-key values](#explicitly-specifying-auto-primary-key-values) above and [Forcing an INSERT or UPDATE](#forcing-an-insert-or-update) below.

#### Forcing an INSERT or UPDATE[¶](#forcing-an-insert-or-update "Permalink to this headline")

In some rare circumstances, it’s necessary to be able to force the [save()](#django.db.models.Model.save "django.db.models.Model.save") method to perform an SQL INSERT and not fall back to doing an UPDATE. Or vice-versa: update, if possible, but not insert a new row. In these cases you can pass the force\_insert=True or force\_update=True parameters to the [save()](#django.db.models.Model.save "django.db.models.Model.save") method. Obviously, passing both parameters is an error: you cannot both insert _and_ update at the same time!

It should be very rare that you’ll need to use these parameters. Django will almost always do the right thing and trying to override that will lead to errors that are difficult to track down. This feature is for advanced use only.

Using update\_fields will force an update similarly to force\_update.

### Updating attributes based on existing fields[¶](#updating-attributes-based-on-existing-fields "Permalink to this headline")

Sometimes you’ll need to perform a simple arithmetic task on a field, such as incrementing or decrementing the current value. The obvious way to achieve this is to do something like:

\>>> product \= Product.objects.get(name\='Venezuelan Beaver Cheese')
\>>> product.number\_sold += 1
\>>> product.save()

If the old number\_sold value retrieved from the database was 10, then the value of 11 will be written back to the database.

This sequence has a standard update problem in that it contains a race condition. If another thread of execution has already saved an updated value after the current thread retrieved the old value, the current thread will only save the old value plus one, rather than the new (current) value plus one.

The process can be made robust and slightly faster by expressing the update relative to the original field value, rather than as an explicit assignment of a new value. Django provides [_F() expressions_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#query-expressions) for performing this kind of relative update. Using F() expressions, the previous example is expressed as:

\>>> from django.db.models import F
\>>> product \= Product.objects.get(name\='Venezuelan Beaver Cheese')
\>>> product.number\_sold \= F('number\_sold') + 1
\>>> product.save()

This approach doesn’t use the initial value from the database. Instead, it makes the database do the update based on whatever value is current at the time that the [save()](#django.db.models.Model.save "django.db.models.Model.save") is executed.

Once the object has been saved, you must reload the object in order to access the actual value that was applied to the updated field:

\>>> product \= Products.objects.get(pk\=product.pk)
\>>> print(product.number\_sold)
42

For more details, see the documentation on [_F() expressions_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#query-expressions) and their [_use in update queries_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#topics-db-queries-update).

### Specifying which fields to save[¶](#specifying-which-fields-to-save "Permalink to this headline")

New in Django 1.5.

If save() is passed a list of field names in keyword argument update\_fields, only the fields named in that list will be updated. This may be desirable if you want to update just one or a few fields on an object. There will be a slight performance benefit from preventing all of the model fields from being updated in the database. For example:

product.name \= 'Name changed again'
product.save(update\_fields\=\['name'\])

The update\_fields argument can be any iterable containing strings. An empty update\_fields iterable will skip the save. A value of None will perform an update on all fields.

Specifying update\_fields will force an update.

When saving a model fetched through deferred model loading ([only()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/querysets.html#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only") or [defer()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/querysets.html#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer")) only the fields loaded from the DB will get updated. In effect there is an automatic update\_fields in this case. If you assign or change any deferred field value, the field will be added to the updated fields.

## Deleting objects[¶](#deleting-objects "Permalink to this headline")

Model.delete(\[_using=DEFAULT\_DB\_ALIAS_\])[¶](#django.db.models.Model.delete "Permalink to this definition")

Issues a SQL DELETE for the object. This only deletes the object in the database; the Python instance will still exist and will still have data in its fields.

For more details, including how to delete objects in bulk, see [_Deleting objects_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#topics-db-queries-delete).

If you want customized deletion behavior, you can override the delete() method. See [_Overriding predefined model methods_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#overriding-model-methods) for more details.

## Other model instance methods[¶](#other-model-instance-methods "Permalink to this headline")

A few object methods have special purposes.

### \_\_unicode\_\_[¶](#unicode "Permalink to this headline")

Model.\_\_unicode\_\_()[¶](#django.db.models.Model.__unicode__ "Permalink to this definition")

The \_\_unicode\_\_() method is called whenever you call unicode() on an object. Django uses unicode(obj) (or the related function, [str(obj)](#django.db.models.Model.__str__ "django.db.models.Model.__str__")) in a number of places. Most notably, to display an object in the Django admin site and as the value inserted into a template when it displays an object. Thus, you should always return a nice, human-readable representation of the model from the \_\_unicode\_\_() method.

For example:

class Person(models.Model):
    first\_name \= models.CharField(max\_length\=50)
    last\_name \= models.CharField(max\_length\=50)

    def \_\_unicode\_\_(self):
        return u'%s %s' % (self.first\_name, self.last\_name)

If you define a \_\_unicode\_\_() method on your model and not a [\_\_str\_\_()](#django.db.models.Model.__str__ "django.db.models.Model.__str__") method, Django will automatically provide you with a [\_\_str\_\_()](#django.db.models.Model.__str__ "django.db.models.Model.__str__") that calls \_\_unicode\_\_() and then converts the result correctly to a UTF-8 encoded string object. This is recommended development practice: define only \_\_unicode\_\_() and let Django take care of the conversion to string objects when required.

### \_\_str\_\_[¶](#str "Permalink to this headline")

Model.\_\_str\_\_()[¶](#django.db.models.Model.__str__ "Permalink to this definition")

The \_\_str\_\_() method is called whenever you call str() on an object. The main use for this method directly inside Django is when the repr() output of a model is displayed anywhere (for example, in debugging output). Thus, you should return a nice, human-readable string for the object’s \_\_str\_\_(). It isn’t required to put \_\_str\_\_() methods everywhere if you have sensible [\_\_unicode\_\_()](#django.db.models.Model.__unicode__ "django.db.models.Model.__unicode__") methods.

The previous [\_\_unicode\_\_()](#django.db.models.Model.__unicode__ "django.db.models.Model.__unicode__") example could be similarly written using \_\_str\_\_() like this:

class Person(models.Model):
    first\_name \= models.CharField(max\_length\=50)
    last\_name \= models.CharField(max\_length\=50)

    def \_\_str\_\_(self):
        \# Note use of django.utils.encoding.force\_bytes() here because
        \# first\_name and last\_name will be unicode strings.
        return force\_bytes('%s %s' % (self.first\_name, self.last\_name))

### get\_absolute\_url[¶](#get-absolute-url "Permalink to this headline")

Model.get\_absolute\_url()[¶](#django.db.models.Model.get_absolute_url "Permalink to this definition")

Define a get\_absolute\_url() method to tell Django how to calculate the canonical URL for an object. To callers, this method should appear to return a string that can be used to refer to the object over HTTP.

For example:

def get\_absolute\_url(self):
    return "/people/%i/" % self.id

(Whilst this code is correct and simple, it may not be the most portable way to write this kind of method. The [reverse()](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.reverse "django.core.urlresolvers.reverse") function is usually the best approach.)

For example:

def get\_absolute\_url(self):
    return reverse('people.views.details', args\=\[str(self.id)\])

One place Django uses get\_absolute\_url() is in the admin app. If an object defines this method, the object-editing page will have a “View on site” link that will jump you directly to the object’s public view, as given by get\_absolute\_url().

Similarly, a couple of other bits of Django, such as the [_syndication feed framework_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/syndication.html), use get\_absolute\_url() when it is defined. If it makes sense for your model’s instances to each have a unique URL, you should define get\_absolute\_url().

It’s good practice to use get\_absolute\_url() in templates, instead of hard-coding your objects’ URLs. For example, this template code is bad:

<!-- BAD template code. Avoid! -->
<a href="/people/{{ object.id }}/"\>{{ object.name }}</a>

This template code is much better:

<a href="{{ object.get\_absolute\_url }}"\>{{ object.name }}</a>

The logic here is that if you change the URL structure of your objects, even for something simple such as correcting a spelling error, you don’t want to have to track down every place that the URL might be created. Specify it once, in get\_absolute\_url() and have all your other code call that one place.

Note

The string you return from get\_absolute\_url() **must** contain only ASCII characters (required by the URI specfication, [**RFC 2396**](http://tools.ietf.org/html/rfc2396.html)) and be URL-encoded, if necessary.

Code and templates calling get\_absolute\_url() should be able to use the result directly without any further processing. You may wish to use the django.utils.encoding.iri\_to\_uri() function to help with this if you are using unicode strings containing characters outside the ASCII range at all.

#### The permalink decorator[¶](#the-permalink-decorator "Permalink to this headline")

Warning

The permalink decorator is no longer recommended. You should use [reverse()](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.reverse "django.core.urlresolvers.reverse") in the body of your get\_absolute\_url method instead.

In early versions of Django, there wasn’t an easy way to use URLs defined in URLconf file inside [get\_absolute\_url()](#django.db.models.Model.get_absolute_url "django.db.models.Model.get_absolute_url"). That meant you would need to define the URL both in URLConf and [get\_absolute\_url()](#django.db.models.Model.get_absolute_url "django.db.models.Model.get_absolute_url"). The permalink decorator was added to overcome this DRY principle violation. However, since the introduction of [reverse()](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.reverse "django.core.urlresolvers.reverse") there is no reason to use permalink any more.

permalink()[¶](#django.db.models.permalink "Permalink to this definition")

This decorator takes the name of a URL pattern (either a view name or a URL pattern name) and a list of position or keyword arguments and uses the URLconf patterns to construct the correct, full URL. It returns a string for the correct URL, with all parameters substituted in the correct positions.

The permalink decorator is a Python-level equivalent to the [url](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-url) template tag and a high-level wrapper for the [reverse()](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.reverse "django.core.urlresolvers.reverse") function.

An example should make it clear how to use permalink(). Suppose your URLconf contains a line such as:

(r'^people/(\\d+)/$', 'people.views.details'),

...your model could have a [get\_absolute\_url()](#django.db.models.Model.get_absolute_url "django.db.models.Model.get_absolute_url") method that looked like this:

from django.db import models

@models.permalink
def get\_absolute\_url(self):
    return ('people.views.details', \[str(self.id)\])

Similarly, if you had a URLconf entry that looked like:

(r'/archive/(?P<year>\\d{4})/(?P<month>\\d{2})/(?P<day>\\d{2})/$', archive\_view)

...you could reference this using permalink() as follows:

@models.permalink
def get\_absolute\_url(self):
    return ('archive\_view', (), {
        'year': self.created.year,
        'month': self.created.strftime('%m'),
        'day': self.created.strftime('%d')})

Notice that we specify an empty sequence for the second parameter in this case, because we only want to pass keyword parameters, not positional ones.

In this way, you’re associating the model’s absolute path with the view that is used to display it, without repeating the view’s URL information anywhere. You can still use the [get\_absolute\_url()](#django.db.models.Model.get_absolute_url "django.db.models.Model.get_absolute_url") method in templates, as before.

In some cases, such as the use of generic views or the re-use of custom views for multiple models, specifying the view function may confuse the reverse URL matcher (because multiple patterns point to the same view). For that case, Django has [_named URL patterns_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html#naming-url-patterns). Using a named URL pattern, it’s possible to give a name to a pattern, and then reference the name rather than the view function. A named URL pattern is defined by replacing the pattern tuple by a call to the url function):

from django.conf.urls import url

url(r'^people/(\\d+)/$', 'blog\_views.generic\_detail', name\='people\_view'),

...and then using that name to perform the reverse URL resolution instead of the view name:

from django.db import models

@models.permalink
def get\_absolute\_url(self):
    return ('people\_view', \[str(self.id)\])

More details on named URL patterns are in the [_URL dispatch documentation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html).
