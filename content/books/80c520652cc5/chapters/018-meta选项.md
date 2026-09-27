## Model Meta options[¶](#model-meta-options "Permalink to this headline")

This document explains all the possible [_metadata options_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#meta-options) that you can give your model in its internal class Meta.

## Available Meta options[¶](#available-meta-options "Permalink to this headline")

### app\_label[¶](#app-label "Permalink to this headline")

Options.app\_label[¶](#django.db.models.Options.app_label "Permalink to this definition")

If a model exists outside of the standard models.py (for instance, if the app’s models are in submodules of myapp.models), the model must define which app it is part of:

app\_label \= 'myapp'

### db\_table[¶](#db-table "Permalink to this headline")

Options.db\_table[¶](#django.db.models.Options.db_table "Permalink to this definition")

The name of the database table to use for the model:

db\_table \= 'music\_album'

#### Table names[¶](#table-names "Permalink to this headline")

To save you time, Django automatically derives the name of the database table from the name of your model class and the app that contains it. A model’s database table name is constructed by joining the model’s “app label” – the name you used in [manage.py startapp](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-startapp) – to the model’s class name, with an underscore between them.

For example, if you have an app bookstore (as created by manage.py startapp bookstore), a model defined as class Book will have a database table named bookstore\_book.

To override the database table name, use the db\_table parameter in class Meta.

If your database table name is an SQL reserved word, or contains characters that aren’t allowed in Python variable names – notably, the hyphen – that’s OK. Django quotes column and table names behind the scenes.

Use lowercase table names for MySQL

It is strongly advised that you use lowercase table names when you override the table name via db\_table, particularly if you are using the MySQL backend. See the [_MySQL notes_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#mysql-notes) for more details.

### db\_tablespace[¶](#db-tablespace "Permalink to this headline")

Options.db\_tablespace[¶](#django.db.models.Options.db_tablespace "Permalink to this definition")

The name of the [_database tablespace_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/tablespaces.html) to use for this model. The default is the project’s [DEFAULT\_TABLESPACE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_TABLESPACE) setting, if set. If the backend doesn’t support tablespaces, this option is ignored.

### get\_latest\_by[¶](#get-latest-by "Permalink to this headline")

Options.get\_latest\_by[¶](#django.db.models.Options.get_latest_by "Permalink to this definition")

The name of an orderable field in the model, typically a [DateField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.DateField "django.db.models.DateField"), [DateTimeField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.DateTimeField "django.db.models.DateTimeField"), or [IntegerField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.IntegerField "django.db.models.IntegerField"). This specifies the default field to use in your model [Manager](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/managers.html#django.db.models.Manager "django.db.models.Manager")‘s [latest()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/querysets.html#django.db.models.query.QuerySet.latest "django.db.models.query.QuerySet.latest") method.

Example:

get\_latest\_by \= "order\_date"

See the [latest()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/querysets.html#django.db.models.query.QuerySet.latest "django.db.models.query.QuerySet.latest") docs for more.

### managed[¶](#managed "Permalink to this headline")

Options.managed[¶](#django.db.models.Options.managed "Permalink to this definition")

Defaults to True, meaning Django will create the appropriate database tables in [syncdb](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-syncdb) and remove them as part of a [flush](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-flush) management command. That is, Django _manages_ the database tables’ lifecycles.

If False, no database table creation or deletion operations will be performed for this model. This is useful if the model represents an existing table or a database view that has been created by some other means. This is the _only_ difference when managed=False. All other aspects of model handling are exactly the same as normal. This includes

1.  Adding an automatic primary key field to the model if you don’t declare it. To avoid confusion for later code readers, it’s recommended to specify all the columns from the database table you are modeling when using unmanaged models.
    
2.  If a model with managed=False contains a [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") that points to another unmanaged model, then the intermediate table for the many-to-many join will also not be created. However, the intermediary table between one managed and one unmanaged model _will_ be created.
    
    If you need to change this default behavior, create the intermediary table as an explicit model (with managed set as needed) and use the [ManyToManyField.through](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField.through "django.db.models.ManyToManyField.through") attribute to make the relation use your custom model.
    

For tests involving models with managed=False, it’s up to you to ensure the correct tables are created as part of the test setup.

If you’re interested in changing the Python-level behavior of a model class, you _could_ use managed=False and create a copy of an existing model. However, there’s a better approach for that situation: [_Proxy models_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#proxy-models).

### order\_with\_respect\_to[¶](#order-with-respect-to "Permalink to this headline")

Options.order\_with\_respect\_to[¶](#django.db.models.Options.order_with_respect_to "Permalink to this definition")

Marks this object as “orderable” with respect to the given field. This is almost always used with related objects to allow them to be ordered with respect to a parent object. For example, if an Answer relates to a Question object, and a question has more than one answer, and the order of answers matters, you’d do this:

class Answer(models.Model):
    question \= models.ForeignKey(Question)
    \# ...

    class Meta:
        order\_with\_respect\_to \= 'question'

When order\_with\_respect\_to is set, two additional methods are provided to retrieve and to set the order of the related objects: get\_RELATED\_order() and set\_RELATED\_order(), where RELATED is the lowercased model name. For example, assuming that a Question object has multiple related Answer objects, the list returned contains the primary keys of the related Answer objects:

\>>> question \= Question.objects.get(id\=1)
\>>> question.get\_answer\_order()
\[1, 2, 3\]

The order of a Question object’s related Answer objects can be set by passing in a list of Answer primary keys:

\>>> question.set\_answer\_order(\[3, 1, 2\])

The related objects also get two methods, get\_next\_in\_order() and get\_previous\_in\_order(), which can be used to access those objects in their proper order. Assuming the Answer objects are ordered by id:

\>>> answer \= Answer.objects.get(id\=2)
\>>> answer.get\_next\_in\_order()
<Answer: 3>
\>>> answer.get\_previous\_in\_order()
<Answer: 1>

Changing order\_with\_respect\_to

order\_with\_respect\_to adds an additional field/database column named \_order, so be sure to handle that as you would any other change to your models if you add or change order\_with\_respect\_to after your initial [syncdb](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-syncdb).

### ordering[¶](#ordering "Permalink to this headline")

Options.ordering[¶](#django.db.models.Options.ordering "Permalink to this definition")

The default ordering for the object, for use when obtaining lists of objects:

ordering \= \['-order\_date'\]

This is a tuple or list of strings. Each string is a field name with an optional “-” prefix, which indicates descending order. Fields without a leading “-” will be ordered ascending. Use the string ”?” to order randomly.

For example, to order by a pub\_date field ascending, use this:

ordering \= \['pub\_date'\]

To order by pub\_date descending, use this:

ordering \= \['-pub\_date'\]

To order by pub\_date descending, then by author ascending, use this:

ordering \= \['-pub\_date', 'author'\]

Changed in Django 1.4: The Django admin honors all elements in the list/tuple; before 1.4, only the first one was respected.

### permissions[¶](#permissions "Permalink to this headline")

Options.permissions[¶](#django.db.models.Options.permissions "Permalink to this definition")

Extra permissions to enter into the permissions table when creating this object. Add, delete and change permissions are automatically created for each object that has admin set. This example specifies an extra permission, can\_deliver\_pizzas:

permissions \= (("can\_deliver\_pizzas", "Can deliver pizzas"),)

This is a list or tuple of 2-tuples in the format (permission\_code, human\_readable\_permission\_name).

### proxy[¶](#proxy "Permalink to this headline")

Options.proxy[¶](#django.db.models.Options.proxy "Permalink to this definition")

If proxy \= True, a model which subclasses another model will be treated as a [_proxy model_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#proxy-models).

### unique\_together[¶](#unique-together "Permalink to this headline")

Options.unique\_together[¶](#django.db.models.Options.unique_together "Permalink to this definition")

Sets of field names that, taken together, must be unique:

unique\_together \= (("driver", "restaurant"),)

This is a tuple of tuples that must be unique when considered together. It’s used in the Django admin and is enforced at the database level (i.e., the appropriate UNIQUE statements are included in the CREATE TABLE statement).

For convenience, unique\_together can be a single tuple when dealing with a single set of fields:

unique\_together \= ("driver", "restaurant")

A [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") cannot be included in unique\_together. (It’s not clear what that would even mean!) If you need to validate uniqueness related to a [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField"), try using a signal or an explicit [through](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField.through "django.db.models.ManyToManyField.through") model.

index\_together

Options.index\_together[¶](#django.db.models.Options.index_together "Permalink to this definition")

New in Django 1.5.

Sets of field names that, taken together, are indexed:

index\_together \= \[
    \["pub\_date", "deadline"\],
\]

This list of fields will be indexed together (i.e. the appropriate CREATE INDEX statement will be issued.)

### verbose\_name[¶](#verbose-name "Permalink to this headline")

Options.verbose\_name[¶](#django.db.models.Options.verbose_name "Permalink to this definition")

A human-readable name for the object, singular:

verbose\_name \= "pizza"

If this isn’t given, Django will use a munged version of the class name: CamelCase becomes camel case.

### verbose\_name\_plural[¶](#verbose-name-plural "Permalink to this headline")

Options.verbose\_name\_plural[¶](#django.db.models.Options.verbose_name_plural "Permalink to this definition")

The plural name for the object:

verbose\_name\_plural \= "stories"

If this isn’t given, Django will use [verbose\_name](#django.db.models.Options.verbose_name "django.db.models.Options.verbose_name") + "s".

### [Table Of Contents](https://django-chinese-docs.readthedocs.io/en/latest/contents.html)

-   [Model Meta options](#)
    -   [Available Meta options](#available-meta-options)
        -   [abstract](#abstract)
        -   [app\_label](#app-label)
        -   [db\_table](#db-table)
            -   [Table names](#table-names)
        -   [db\_tablespace](#db-tablespace)
        -   [get\_latest\_by](#get-latest-by)
        -   [managed](#managed)
        -   [order\_with\_respect\_to](#order-with-respect-to)
        -   [ordering](#ordering)
        -   [permissions](#permissions)
        -   [proxy](#proxy)
        -   [unique\_together](#unique-together)
        -   [verbose\_name](#verbose-name)
        -   [verbose\_name\_plural](#verbose-name-plural)

### Browse

-   Prev: [Related objects reference](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/relations.html)
-   Next: [Model instance reference](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html)

### You are here:

-   [Django 1.5 documentation](https://django-chinese-docs.readthedocs.io/en/latest/index.html)
    -   [API 参考](https://django-chinese-docs.readthedocs.io/en/latest/ref/index.html)
        -   [Models](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/index.html)
            -   Model Meta options

### This Page

-   [Show Source](https://django-chinese-docs.readthedocs.io/en/latest/_sources/ref/models/options.txt)

### Last update:

Dec 02, 2013
