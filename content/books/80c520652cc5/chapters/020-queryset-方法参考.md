Though you usually won’t create one manually — you’ll go through a [Manager](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/managers.html#django.db.models.Manager "django.db.models.Manager") — here’s the formal declaration of a QuerySet:

### Methods that return new QuerySets[¶](#methods-that-return-new-querysets "Permalink to this headline")

Django provides a range of QuerySet refinement methods that modify either the types of results returned by the QuerySet or the way its SQL query is executed.

#### filter[¶](#filter "Permalink to this headline")

filter(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.filter "Permalink to this definition")

Returns a new QuerySet containing objects that match the given lookup parameters.

The lookup parameters (\*\*kwargs) should be in the format described in [Field lookups](#id4) below. Multiple parameters are joined via AND in the underlying SQL statement.

#### exclude[¶](#exclude "Permalink to this headline")

exclude(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.exclude "Permalink to this definition")

Returns a new QuerySet containing objects that do _not_ match the given lookup parameters.

The lookup parameters (\*\*kwargs) should be in the format described in [Field lookups](#id4) below. Multiple parameters are joined via AND in the underlying SQL statement, and the whole thing is enclosed in a NOT().

This example excludes all entries whose pub\_date is later than 2005-1-3 AND whose headline is “Hello”:

Entry.objects.exclude(pub\_date\_\_gt\=datetime.date(2005, 1, 3), headline\='Hello')

In SQL terms, that evaluates to:

SELECT ...
WHERE NOT (pub\_date > '2005-1-3' AND headline = 'Hello')

This example excludes all entries whose pub\_date is later than 2005-1-3 OR whose headline is “Hello”:

Entry.objects.exclude(pub\_date\_\_gt\=datetime.date(2005, 1, 3)).exclude(headline\='Hello')

In SQL terms, that evaluates to:

SELECT ...
WHERE NOT pub\_date > '2005-1-3'
AND NOT headline = 'Hello'

Note the second example is more restrictive.

#### annotate[¶](#annotate "Permalink to this headline")

annotate(_\*args_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.annotate "Permalink to this definition")

Annotates each object in the QuerySet with the provided list of aggregate values (averages, sums, etc) that have been computed over the objects that are related to the objects in the QuerySet. Each argument to annotate() is an annotation that will be added to each object in the QuerySet that is returned.

The aggregation functions that are provided by Django are described in [Aggregation Functions](#id5) below.

Annotations specified using keyword arguments will use the keyword as the alias for the annotation. Anonymous arguments will have an alias generated for them based upon the name of the aggregate function and the model field that is being aggregated.

For example, if you were manipulating a list of blogs, you may want to determine how many entries have been made in each blog:

\>>> q \= Blog.objects.annotate(Count('entry'))
\# The name of the first blog
\>>> q\[0\].name
'Blogasaurus'
\# The number of entries on the first blog
\>>> q\[0\].entry\_\_count
42

The Blog model doesn’t define an entry\_\_count attribute by itself, but by using a keyword argument to specify the aggregate function, you can control the name of the annotation:

\>>> q \= Blog.objects.annotate(number\_of\_entries\=Count('entry'))
\# The number of entries on the first blog, using the name provided
\>>> q\[0\].number\_of\_entries
42

For an in-depth discussion of aggregation, see [_the topic guide on Aggregation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/aggregation.html).

#### order\_by[¶](#order-by "Permalink to this headline")

order\_by(_\*fields_)[¶](#django.db.models.query.QuerySet.order_by "Permalink to this definition")

By default, results returned by a QuerySet are ordered by the ordering tuple given by the ordering option in the model’s Meta. You can override this on a per-QuerySet basis by using the order\_by method.

Example:

Entry.objects.filter(pub\_date\_\_year\=2005).order\_by('-pub\_date', 'headline')

The result above will be ordered by pub\_date descending, then by headline ascending. The negative sign in front of "-pub\_date" indicates _descending_ order. Ascending order is implied. To order randomly, use "?", like so:

Entry.objects.order\_by('?')

Note: order\_by('?') queries may be expensive and slow, depending on the database backend you’re using.

To order by a field in a different model, use the same syntax as when you are querying across model relations. That is, the name of the field, followed by a double underscore (\_\_), followed by the name of the field in the new model, and so on for as many models as you want to join. For example:

Entry.objects.order\_by('blog\_\_name', 'headline')

If you try to order by a field that is a relation to another model, Django will use the default ordering on the related model (or order by the related model’s primary key if there is no [Meta.ordering](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html#django.db.models.Options.ordering "django.db.models.Options.ordering") specified. For example:

Entry.objects.order\_by('blog')

...is identical to:

Entry.objects.order\_by('blog\_\_id')

...since the Blog model has no default ordering specified.

Be cautious when ordering by fields in related models if you are also using [distinct()](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct"). See the note in [distinct()](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct") for an explanation of how related model ordering can change the expected results.

It is permissible to specify a multi-valued field to order the results by (for example, a [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") field). Normally this won’t be a sensible thing to do and it’s really an advanced usage feature. However, if you know that your queryset’s filtering or available data implies that there will only be one ordering piece of data for each of the main items you are selecting, the ordering may well be exactly what you want to do. Use ordering on multi-valued fields with care and make sure the results are what you expect.

There’s no way to specify whether ordering should be case sensitive. With respect to case-sensitivity, Django will order results however your database backend normally orders them.

If you don’t want any ordering to be applied to a query, not even the default ordering, call [order\_by()](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") with no parameters.

You can tell if a query is ordered or not by checking the [QuerySet.ordered](#django.db.models.query.QuerySet.ordered "django.db.models.query.QuerySet.ordered") attribute, which will be True if the QuerySet has been ordered in any way.

#### reverse[¶](#reverse "Permalink to this headline")

reverse()[¶](#django.db.models.query.QuerySet.reverse "Permalink to this definition")

Use the reverse() method to reverse the order in which a queryset’s elements are returned. Calling reverse() a second time restores the ordering back to the normal direction.

To retrieve the ‘’last’’ five items in a queryset, you could do this:

my\_queryset.reverse()\[:5\]

Note that this is not quite the same as slicing from the end of a sequence in Python. The above example will return the last item first, then the penultimate item and so on. If we had a Python sequence and looked at seq\[-5:\], we would see the fifth-last item first. Django doesn’t support that mode of access (slicing from the end), because it’s not possible to do it efficiently in SQL.

Also, note that reverse() should generally only be called on a QuerySet which has a defined ordering (e.g., when querying against a model which defines a default ordering, or when using [order\_by()](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by")). If no such ordering is defined for a given QuerySet, calling reverse() on it has no real effect (the ordering was undefined prior to calling reverse(), and will remain undefined afterward).

#### distinct[¶](#distinct "Permalink to this headline")

distinct(\[_\*fields_\])[¶](#django.db.models.query.QuerySet.distinct "Permalink to this definition")

Returns a new QuerySet that uses SELECT DISTINCT in its SQL query. This eliminates duplicate rows from the query results.

By default, a QuerySet will not eliminate duplicate rows. In practice, this is rarely a problem, because simple queries such as Blog.objects.all() don’t introduce the possibility of duplicate result rows. However, if your query spans multiple tables, it’s possible to get duplicate results when a QuerySet is evaluated. That’s when you’d use distinct().

Note

Any fields used in an [order\_by()](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") call are included in the SQL SELECT columns. This can sometimes lead to unexpected results when used in conjunction with distinct(). If you order by fields from a related model, those fields will be added to the selected columns and they may make otherwise duplicate rows appear to be distinct. Since the extra columns don’t appear in the returned results (they are only there to support ordering), it sometimes looks like non-distinct results are being returned.

Similarly, if you use a [values()](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") query to restrict the columns selected, the columns used in any [order\_by()](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") (or default model ordering) will still be involved and may affect uniqueness of the results.

The moral here is that if you are using distinct() be careful about ordering by related models. Similarly, when using distinct() and [values()](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") together, be careful when ordering by fields not in the [values()](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") call.

New in Django 1.4.

As of Django 1.4, you can pass positional arguments (\*fields) in order to specify the names of fields to which the DISTINCT should apply. This translates to a SELECT DISTINCT ON SQL query.

Here’s the difference. For a normal distinct() call, the database compares _each_ field in each row when determining which rows are distinct. For a distinct() call with specified field names, the database will only compare the specified field names.

Note

This ability to specify field names is only available in PostgreSQL.

Note

When you specify field names, you _must_ provide an order\_by() in the QuerySet, and the fields in order\_by() must start with the fields in distinct(), in the same order.

For example, SELECT DISTINCT ON (a) gives you the first row for each value in column a. If you don’t specify an order, you’ll get some arbitrary row.

Examples:

\>>> Author.objects.distinct()
\[...\]

\>>> Entry.objects.order\_by('pub\_date').distinct('pub\_date')
\[...\]

\>>> Entry.objects.order\_by('blog').distinct('blog')
\[...\]

\>>> Entry.objects.order\_by('author', 'pub\_date').distinct('author', 'pub\_date')
\[...\]

\>>> Entry.objects.order\_by('blog\_\_name', 'mod\_date').distinct('blog\_\_name', 'mod\_date')
\[...\]

\>>> Entry.objects.order\_by('author', 'pub\_date').distinct('author')
\[...\]

#### values[¶](#values "Permalink to this headline")

values(_\*fields_)[¶](#django.db.models.query.QuerySet.values "Permalink to this definition")

Returns a ValuesQuerySet — a QuerySet subclass that returns dictionaries when used as an iterable, rather than model-instance objects.

Each of those dictionaries represents an object, with the keys corresponding to the attribute names of model objects.

This example compares the dictionaries of values() with the normal model objects:

\# This list contains a Blog object.
>>> Blog.objects.filter(name\_\_startswith='Beatles')
\[<Blog: Beatles Blog>\]

# This list contains a dictionary.
>>> Blog.objects.filter(name\_\_startswith='Beatles').values()
\[{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}\]

The values() method takes optional positional arguments, \*fields, which specify field names to which the SELECT should be limited. If you specify the fields, each dictionary will contain only the field keys/values for the fields you specify. If you don’t specify the fields, each dictionary will contain a key and value for every field in the database table.

Example:

\>>> Blog.objects.values()
\[{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}\],
\>>> Blog.objects.values('id', 'name')
\[{'id': 1, 'name': 'Beatles Blog'}\]

A few subtleties that are worth mentioning:

-   If you have a field called foo that is a [ForeignKey](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey "django.db.models.ForeignKey"), the default values() call will return a dictionary key called foo\_id, since this is the name of the hidden model attribute that stores the actual value (the foo attribute refers to the related model). When you are calling values() and passing in field names, you can pass in either foo or foo\_id and you will get back the same thing (the dictionary key will match the field name you passed in).
    
    For example:
    
    \>>> Entry.objects.values()
    \[{'blog\_id': 1, 'headline': u'First Entry', ...}, ...\]
    
    \>>> Entry.objects.values('blog')
    \[{'blog': 1}, ...\]
    
    \>>> Entry.objects.values('blog\_id')
    \[{'blog\_id': 1}, ...\]
    
-   When using values() together with [distinct()](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct"), be aware that ordering can affect the results. See the note in [distinct()](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct") for details.
    
-   If you use a values() clause after an [extra()](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") call, any fields defined by a select argument in the [extra()](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") must be explicitly included in the values() call. Any [extra()](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") call made after a values() call will have its extra selected fields ignored.
    

A ValuesQuerySet is useful when you know you’re only going to need values from a small number of the available fields and you won’t need the functionality of a model instance object. It’s more efficient to select only the fields you need to use.

Finally, note a ValuesQuerySet is a subclass of QuerySet, so it has all methods of QuerySet. You can call filter() on it, or order\_by(), or whatever. Yes, that means these two calls are identical:

Blog.objects.values().order\_by('id')
Blog.objects.order\_by('id').values()

The people who made Django prefer to put all the SQL-affecting methods first, followed (optionally) by any output-affecting methods (such as values()), but it doesn’t really matter. This is your chance to really flaunt your individualism.

You can also refer to fields on related models with reverse relations through OneToOneField, ForeignKey and ManyToManyField attributes:

Blog.objects.values('name', 'entry\_\_headline')
\[{'name': 'My blog', 'entry\_\_headline': 'An entry'},
     {'name': 'My blog', 'entry\_\_headline': 'Another entry'}, ...\]

Warning

Because [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") attributes and reverse relations can have multiple related rows, including these can have a multiplier effect on the size of your result set. This will be especially pronounced if you include multiple such fields in your values() query, in which case all possible combinations will be returned.

#### values\_list[¶](#values-list "Permalink to this headline")

values\_list(_\*fields_)[¶](#django.db.models.query.QuerySet.values_list "Permalink to this definition")

This is similar to values() except that instead of returning dictionaries, it returns tuples when iterated over. Each tuple contains the value from the respective field passed into the values\_list() call — so the first item is the first field, etc. For example:

\>>> Entry.objects.values\_list('id', 'headline')
\[(1, u'First entry'), ...\]

If you only pass in a single field, you can also pass in the flat parameter. If True, this will mean the returned results are single values, rather than one-tuples. An example should make the difference clearer:

\>>> Entry.objects.values\_list('id').order\_by('id')
\[(1,), (2,), (3,), ...\]

\>>> Entry.objects.values\_list('id', flat\=True).order\_by('id')
\[1, 2, 3, ...\]

It is an error to pass in flat when there is more than one field.

If you don’t pass any values to values\_list(), it will return all the fields in the model, in the order they were declared.

#### dates[¶](#dates "Permalink to this headline")

dates(_field_, _kind_, _order='ASC'_)[¶](#django.db.models.query.QuerySet.dates "Permalink to this definition")

Returns a DateQuerySet — a QuerySet that evaluates to a list of datetime.datetime objects representing all available dates of a particular kind within the contents of the QuerySet.

field should be the name of a DateField or DateTimeField of your model.

kind should be either "year", "month" or "day". Each datetime.datetime object in the result list is “truncated” to the given type.

-   "year" returns a list of all distinct year values for the field.
-   "month" returns a list of all distinct year/month values for the field.
-   "day" returns a list of all distinct year/month/day values for the field.

order, which defaults to 'ASC', should be either 'ASC' or 'DESC'. This specifies how to order the results.

Examples:

\>>> Entry.objects.dates('pub\_date', 'year')
\[datetime.datetime(2005, 1, 1)\]
\>>> Entry.objects.dates('pub\_date', 'month')
\[datetime.datetime(2005, 2, 1), datetime.datetime(2005, 3, 1)\]
\>>> Entry.objects.dates('pub\_date', 'day')
\[datetime.datetime(2005, 2, 20), datetime.datetime(2005, 3, 20)\]
\>>> Entry.objects.dates('pub\_date', 'day', order\='DESC')
\[datetime.datetime(2005, 3, 20), datetime.datetime(2005, 2, 20)\]
\>>> Entry.objects.filter(headline\_\_contains\='Lennon').dates('pub\_date', 'day')
\[datetime.datetime(2005, 3, 20)\]

Warning

When [_time zone support_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/timezones.html) is enabled, Django uses UTC in the database connection, which means the aggregation is performed in UTC. This is a known limitation of the current implementation.

#### none[¶](#none "Permalink to this headline")

none()[¶](#django.db.models.query.QuerySet.none "Permalink to this definition")

Returns an EmptyQuerySet — a QuerySet subclass that always evaluates to an empty list. This can be used in cases where you know that you should return an empty result set and your caller is expecting a QuerySet object (instead of returning an empty list, for example.)

Examples:

\>>> Entry.objects.none()
\[\]

#### all[¶](#all "Permalink to this headline")

all()[¶](#django.db.models.query.QuerySet.all "Permalink to this definition")

Returns a _copy_ of the current QuerySet (or QuerySet subclass). This can be useful in situations where you might want to pass in either a model manager or a QuerySet and do further filtering on the result. After calling all() on either object, you’ll definitely have a QuerySet to work with.

#### defer[¶](#defer "Permalink to this headline")

defer(_\*fields_)[¶](#django.db.models.query.QuerySet.defer "Permalink to this definition")

In some complex data-modeling situations, your models might contain a lot of fields, some of which could contain a lot of data (for example, text fields), or require expensive processing to convert them to Python objects. If you are using the results of a queryset in some situation where you don’t know if you need those particular fields when you initially fetch the data, you can tell Django not to retrieve them from the database.

This is done by passing the names of the fields to not load to defer():

Entry.objects.defer("headline", "body")

A queryset that has deferred fields will still return model instances. Each deferred field will be retrieved from the database if you access that field (one at a time, not all the deferred fields at once).

You can make multiple calls to defer(). Each call adds new fields to the deferred set:

\# Defers both the body and headline fields.
Entry.objects.defer("body").filter(rating\=5).defer("headline")

The order in which fields are added to the deferred set does not matter. Calling defer() with a field name that has already been deferred is harmless (the field will still be deferred).

You can defer loading of fields in related models (if the related models are loading via [select\_related()](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related")) by using the standard double-underscore notation to separate related fields:

Blog.objects.select\_related().defer("entry\_\_headline", "entry\_\_body")

If you want to clear the set of deferred fields, pass None as a parameter to defer():

\# Load all fields immediately.
my\_queryset.defer(None)

Changed in Django 1.5.

Some fields in a model won’t be deferred, even if you ask for them. You can never defer the loading of the primary key. If you are using [select\_related()](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related") to retrieve related models, you shouldn’t defer the loading of the field that connects from the primary model to the related one, doing so will result in an error.

Note

The defer() method (and its cousin, [only()](#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only"), below) are only for advanced use-cases. They provide an optimization for when you have analyzed your queries closely and understand _exactly_ what information you need and have measured that the difference between returning the fields you need and the full set of fields for the model will be significant.

Even if you think you are in the advanced use-case situation, **only use defer() when you cannot, at queryset load time, determine if you will need the extra fields or not**. If you are frequently loading and using a particular subset of your data, the best choice you can make is to normalize your models and put the non-loaded data into a separate model (and database table). If the columns _must_ stay in the one table for some reason, create a model with Meta.managed \= False (see the [managed attribute](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html#django.db.models.Options.managed "django.db.models.Options.managed") documentation) containing just the fields you normally need to load and use that where you might otherwise call defer(). This makes your code more explicit to the reader, is slightly faster and consumes a little less memory in the Python process.

Changed in Django 1.5.

Note

When calling [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save") for instances with deferred fields, only the loaded fields will be saved. See [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save") for more details.

#### only[¶](#only "Permalink to this headline")

only(_\*fields_)[¶](#django.db.models.query.QuerySet.only "Permalink to this definition")

The only() method is more or less the opposite of [defer()](#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer"). You call it with the fields that should _not_ be deferred when retrieving a model. If you have a model where almost all the fields need to be deferred, using only() to specify the complementary set of fields can result in simpler code.

Suppose you have a model with fields name, age and biography. The following two querysets are the same, in terms of deferred fields:

Person.objects.defer("age", "biography")
Person.objects.only("name")

Whenever you call only() it _replaces_ the set of fields to load immediately. The method’s name is mnemonic: **only** those fields are loaded immediately; the remainder are deferred. Thus, successive calls to only() result in only the final fields being considered:

\# This will defer all fields except the headline.
Entry.objects.only("body", "rating").only("headline")

Since defer() acts incrementally (adding fields to the deferred list), you can combine calls to only() and defer() and things will behave logically:

\# Final result is that everything except "headline" is deferred.
Entry.objects.only("headline", "body").defer("body")

\# Final result loads headline and body immediately (only() replaces any
\# existing set of fields).
Entry.objects.defer("body").only("headline", "body")

Changed in Django 1.5.

All of the cautions in the note for the [defer()](#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer") documentation apply to only() as well. Use it cautiously and only after exhausting your other options. Also note that using [only()](#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only") and omitting a field requested using [select\_related()](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related") is an error as well.

Changed in Django 1.5.

Note

When calling [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save") for instances with deferred fields, only the loaded fields will be saved. See [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save") for more details.

#### using[¶](#using "Permalink to this headline")

using(_alias_)[¶](#django.db.models.query.QuerySet.using "Permalink to this definition")

This method is for controlling which database the QuerySet will be evaluated against if you are using more than one database. The only argument this method takes is the alias of a database, as defined in [DATABASES](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DATABASES).

For example:

\# queries the database with the 'default' alias.
>>> Entry.objects.all()

# queries the database with the 'backup' alias
>>> Entry.objects.using('backup')

#### select\_for\_update[¶](#select-for-update "Permalink to this headline")

select\_for\_update(_nowait=False_)[¶](#django.db.models.query.QuerySet.select_for_update "Permalink to this definition")

New in Django 1.4.

Returns a queryset that will lock rows until the end of the transaction, generating a SELECT ... FOR UPDATE SQL statement on supported databases.

For example:

entries \= Entry.objects.select\_for\_update().filter(author\=request.user)

All matched entries will be locked until the end of the transaction block, meaning that other transactions will be prevented from changing or acquiring locks on them.

Usually, if another transaction has already acquired a lock on one of the selected rows, the query will block until the lock is released. If this is not the behavior you want, call select\_for\_update(nowait=True). This will make the call non-blocking. If a conflicting lock is already acquired by another transaction, [DatabaseError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.db.DatabaseError "django.db.DatabaseError") will be raised when the queryset is evaluated.

Note that using select\_for\_update() will cause the current transaction to be considered dirty, if under transaction management. This is to ensure that Django issues a COMMIT or ROLLBACK, releasing any locks held by the SELECT FOR UPDATE.

Currently, the postgresql\_psycopg2, oracle, and mysql database backends support select\_for\_update(). However, MySQL has no support for the nowait argument. Obviously, users of external third-party backends should check with their backend’s documentation for specifics in those cases.

Passing nowait=True to select\_for\_update using database backends that do not support nowait, such as MySQL, will cause a [DatabaseError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.db.DatabaseError "django.db.DatabaseError") to be raised. This is in order to prevent code unexpectedly blocking.

Using select\_for\_update on backends which do not support SELECT ... FOR UPDATE (such as SQLite) will have no effect.

### Methods that do not return QuerySets[¶](#methods-that-do-not-return-querysets "Permalink to this headline")

The following QuerySet methods evaluate the QuerySet and return something _other than_ a QuerySet.

These methods do not use a cache (see [_Caching and QuerySets_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#caching-and-querysets)). Rather, they query the database each time they’re called.

#### get[¶](#get "Permalink to this headline")

get(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.get "Permalink to this definition")

Returns the object matching the given lookup parameters, which should be in the format described in [Field lookups](#id4).

get() raises [MultipleObjectsReturned](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned") if more than one object was found. The [MultipleObjectsReturned](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned") exception is an attribute of the model class.

get() raises a [DoesNotExist](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.DoesNotExist "django.core.exceptions.DoesNotExist") exception if an object wasn’t found for the given parameters. This exception is also an attribute of the model class. Example:

Entry.objects.get(id\='foo') \# raises Entry.DoesNotExist

The [DoesNotExist](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.DoesNotExist "django.core.exceptions.DoesNotExist") exception inherits from [django.core.exceptions.ObjectDoesNotExist](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.ObjectDoesNotExist "django.core.exceptions.ObjectDoesNotExist"), so you can target multiple [DoesNotExist](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.DoesNotExist "django.core.exceptions.DoesNotExist") exceptions. Example:

from django.core.exceptions import ObjectDoesNotExist
try:
    e \= Entry.objects.get(id\=3)
    b \= Blog.objects.get(id\=1)
except ObjectDoesNotExist:
    print("Either the entry or blog doesn't exist.")

#### create[¶](#create "Permalink to this headline")

create(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.create "Permalink to this definition")

A convenience method for creating an object and saving it all in one step. Thus:

p \= Person.objects.create(first\_name\="Bruce", last\_name\="Springsteen")

and:

p \= Person(first\_name\="Bruce", last\_name\="Springsteen")
p.save(force\_insert\=True)

are equivalent.

The [_force\_insert_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#ref-models-force-insert) parameter is documented elsewhere, but all it means is that a new object will always be created. Normally you won’t need to worry about this. However, if your model contains a manual primary key value that you set and if that value already exists in the database, a call to create() will fail with an [IntegrityError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.db.IntegrityError "django.db.IntegrityError") since primary keys must be unique. Be prepared to handle the exception if you are using manual primary keys.

#### get\_or\_create[¶](#get-or-create "Permalink to this headline")

get\_or\_create(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.get_or_create "Permalink to this definition")

A convenience method for looking up an object with the given kwargs, creating one if necessary.

Returns a tuple of (object, created), where object is the retrieved or created object and created is a boolean specifying whether a new object was created.

This is meant as a shortcut to boilerplatish code and is mostly useful for data-import scripts. For example:

try:
    obj \= Person.objects.get(first\_name\='John', last\_name\='Lennon')
except Person.DoesNotExist:
    obj \= Person(first\_name\='John', last\_name\='Lennon', birthday\=date(1940, 10, 9))
    obj.save()

This pattern gets quite unwieldy as the number of fields in a model goes up. The above example can be rewritten using get\_or\_create() like so:

obj, created \= Person.objects.get\_or\_create(first\_name\='John', last\_name\='Lennon',
                  defaults\={'birthday': date(1940, 10, 9)})

Any keyword arguments passed to get\_or\_create() — _except_ an optional one called defaults — will be used in a [get()](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get") call. If an object is found, get\_or\_create() returns a tuple of that object and False. If multiple objects are found, get\_or\_create raises [MultipleObjectsReturned](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned"). If an object is _not_ found, get\_or\_create() will instantiate and save a new object, returning a tuple of the new object and True. The new object will be created roughly according to this algorithm:

defaults \= kwargs.pop('defaults', {})
params \= dict(\[(k, v) for k, v in kwargs.items() if '\_\_' not in k\])
params.update(defaults)
obj \= self.model(\*\*params)
obj.save()

In English, that means start with any non-'defaults' keyword argument that doesn’t contain a double underscore (which would indicate a non-exact lookup). Then add the contents of defaults, overriding any keys if necessary, and use the result as the keyword arguments to the model class. As hinted at above, this is a simplification of the algorithm that is used, but it contains all the pertinent details. The internal implementation has some more error-checking than this and handles some extra edge-conditions; if you’re interested, read the code.

If you have a field named defaults and want to use it as an exact lookup in get\_or\_create(), just use 'defaults\_\_exact', like so:

Foo.objects.get\_or\_create(defaults\_\_exact\='bar', defaults\={'defaults': 'baz'})

The get\_or\_create() method has similar error behavior to [create()](#django.db.models.query.QuerySet.create "django.db.models.query.QuerySet.create") when you’re using manually specified primary keys. If an object needs to be created and the key already exists in the database, an [IntegrityError](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.db.IntegrityError "django.db.IntegrityError") will be raised.

Finally, a word on using get\_or\_create() in Django views. As mentioned earlier, get\_or\_create() is mostly useful in scripts that need to parse data and create new records if existing ones aren’t available. But if you need to use get\_or\_create() in a view, please make sure to use it only in POST requests unless you have a good reason not to. GET requests shouldn’t have any effect on data; use POST whenever a request to a page has a side effect on your data. For more, see [Safe methods](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.1.1) in the HTTP spec.

#### bulk\_create[¶](#bulk-create "Permalink to this headline")

bulk\_create(_objs_, _batch\_size=None_)[¶](#django.db.models.query.QuerySet.bulk_create "Permalink to this definition")

New in Django 1.4.

This method inserts the provided list of objects into the database in an efficient manner (generally only 1 query, no matter how many objects there are):

\>>> Entry.objects.bulk\_create(\[
...     Entry(headline\="Django 1.0 Released"),
...     Entry(headline\="Django 1.1 Announced"),
...     Entry(headline\="Breaking: Django is awesome")
... \])

This has a number of caveats though:

-   The model’s save() method will not be called, and the pre\_save and post\_save signals will not be sent.
-   It does not work with child models in a multi-table inheritance scenario.
-   If the model’s primary key is an [AutoField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.AutoField "django.db.models.AutoField") it does not retrieve and set the primary key attribute, as save() does.

The batch\_size parameter controls how many objects are created in single query. The default is to create all objects in one batch, except for SQLite where the default is such that at maximum 999 variables per query is used.

New in Django 1.5: The

batch\_size

parameter was added in version 1.5.

#### count[¶](#count "Permalink to this headline")

count()[¶](#django.db.models.query.QuerySet.count "Permalink to this definition")

Returns an integer representing the number of objects in the database matching the QuerySet. The count() method never raises exceptions.

Example:

\# Returns the total number of entries in the database.
Entry.objects.count()

\# Returns the number of entries whose headline contains 'Lennon'
Entry.objects.filter(headline\_\_contains\='Lennon').count()

A count() call performs a SELECT COUNT(\*) behind the scenes, so you should always use count() rather than loading all of the record into Python objects and calling len() on the result (unless you need to load the objects into memory anyway, in which case len() will be faster).

Depending on which database you’re using (e.g. PostgreSQL vs. MySQL), count() may return a long integer instead of a normal Python integer. This is an underlying implementation quirk that shouldn’t pose any real-world problems.

#### in\_bulk[¶](#in-bulk "Permalink to this headline")

in\_bulk(_id\_list_)[¶](#django.db.models.query.QuerySet.in_bulk "Permalink to this definition")

Takes a list of primary-key values and returns a dictionary mapping each primary-key value to an instance of the object with the given ID.

Example:

\>>> Blog.objects.in\_bulk(\[1\])
{1: <Blog: Beatles Blog>}
\>>> Blog.objects.in\_bulk(\[1, 2\])
{1: <Blog: Beatles Blog>, 2: <Blog: Cheddar Talk>}
\>>> Blog.objects.in\_bulk(\[\])
{}

If you pass in\_bulk() an empty list, you’ll get an empty dictionary.

#### iterator[¶](#iterator "Permalink to this headline")

iterator()[¶](#django.db.models.query.QuerySet.iterator "Permalink to this definition")

Evaluates the QuerySet (by performing the query) and returns an iterator (see [**PEP 234**](http://www.python.org/dev/peps/pep-0234)) over the results. A QuerySet typically caches its results internally so that repeated evaluations do not result in additional queries. In contrast, iterator() will read results directly, without doing any caching at the QuerySet level (internally, the default iterator calls iterator() and caches the return value). For a QuerySet which returns a large number of objects that you only need to access once, this can results in better performance and a significant reduction in memory.

Note that using iterator() on a QuerySet which has already been evaluated will force it to evaluate again, repeating the query.

Also, use of iterator() causes previous prefetch\_related() calls to be ignored since these two optimizations do not make sense together.

Warning

Some Python database drivers like psycopg2 perform caching if using client side cursors (instantiated with connection.cursor() and what Django’s ORM uses). Using iterator() does not affect caching at the database driver level. To disable this caching, look at [server side cursors](http://initd.org/psycopg/docs/usage.html#server-side-cursors).

#### latest[¶](#latest "Permalink to this headline")

latest(_field\_name=None_)[¶](#django.db.models.query.QuerySet.latest "Permalink to this definition")

Returns the latest object in the table, by date, using the field\_name provided as the date field.

This example returns the latest Entry in the table, according to the pub\_date field:

Entry.objects.latest('pub\_date')

If your model’s [_Meta_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html#meta-options) specifies [get\_latest\_by](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html#django.db.models.Options.get_latest_by "django.db.models.Options.get_latest_by"), you can leave off the field\_name argument to latest(). Django will use the field specified in [get\_latest\_by](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html#django.db.models.Options.get_latest_by "django.db.models.Options.get_latest_by") by default.

Like [get()](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get"), latest() raises [DoesNotExist](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.exceptions.DoesNotExist "django.core.exceptions.DoesNotExist") if there is no object with the given parameters.

Note latest() exists purely for convenience and readability.

#### aggregate[¶](#aggregate "Permalink to this headline")

aggregate(_\*args_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.aggregate "Permalink to this definition")

Returns a dictionary of aggregate values (averages, sums, etc) calculated over the QuerySet. Each argument to aggregate() specifies a value that will be included in the dictionary that is returned.

The aggregation functions that are provided by Django are described in [Aggregation Functions](#id5) below.

Aggregates specified using keyword arguments will use the keyword as the name for the annotation. Anonymous arguments will have a name generated for them based upon the name of the aggregate function and the model field that is being aggregated.

For example, when you are working with blog entries, you may want to know the number of authors that have contributed blog entries:

\>>> q \= Blog.objects.aggregate(Count('entry'))
{'entry\_\_count': 16}

By using a keyword argument to specify the aggregate function, you can control the name of the aggregation value that is returned:

\>>> q \= Blog.objects.aggregate(number\_of\_entries\=Count('entry'))
{'number\_of\_entries': 16}

For an in-depth discussion of aggregation, see [_the topic guide on Aggregation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/aggregation.html).

#### exists[¶](#exists "Permalink to this headline")

exists()[¶](#django.db.models.query.QuerySet.exists "Permalink to this definition")

Returns True if the [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") contains any results, and False if not. This tries to perform the query in the simplest and fastest way possible, but it _does_ execute nearly the same query as a normal [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") query.

[exists()](#django.db.models.query.QuerySet.exists "django.db.models.query.QuerySet.exists") is useful for searches relating to both object membership in a [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") and to the existence of any objects in a [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet"), particularly in the context of a large [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet").

The most efficient method of finding whether a model with a unique field (e.g. primary\_key) is a member of a [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") is:

entry \= Entry.objects.get(pk\=123)
if some\_query\_set.filter(pk\=entry.pk).exists():
    print("Entry contained in queryset")

Which will be faster than the following which requires evaluating and iterating through the entire queryset:

if entry in some\_query\_set:
   print("Entry contained in QuerySet")

And to find whether a queryset contains any items:

if some\_query\_set.exists():
    print("There is at least one object in some\_query\_set")

Which will be faster than:

if some\_query\_set:
    print("There is at least one object in some\_query\_set")

... but not by a large degree (hence needing a large queryset for efficiency gains).

Additionally, if a some\_query\_set has not yet been evaluated, but you know that it will be at some point, then using some\_query\_set.exists() will do more overall work (one query for the existence check plus an extra one to later retrieve the results) than simply using bool(some\_query\_set), which retrieves the results and then checks if any were returned.

#### update[¶](#update "Permalink to this headline")

update(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.update "Permalink to this definition")

Performs an SQL update query for the specified fields, and returns the number of rows matched (which may not be equal to the number of rows updated if some rows already have the new value).

For example, to turn comments off for all blog entries published in 2010, you could do this:

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False)

(This assumes your Entry model has fields pub\_date and comments\_on.)

You can update multiple fields — there’s no limit on how many. For example, here we update the comments\_on and headline fields:

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False, headline\='This is old')

The update() method is applied instantly, and the only restriction on the [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that is updated is that it can only update columns in the model’s main table, not on related models. You can’t do this, for example:

\>>> Entry.objects.update(blog\_\_name\='foo') \# Won't work!

Filtering based on related fields is still possible, though:

\>>> Entry.objects.filter(blog\_\_id\=1).update(comments\_on\=True)

You cannot call update() on a [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that has had a slice taken or can otherwise no longer be filtered.

The update() method returns the number of affected rows:

\>>> Entry.objects.filter(id\=64).update(comments\_on\=True)
1

\>>> Entry.objects.filter(slug\='nonexistent-slug').update(comments\_on\=True)
0

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False)
132

If you’re just updating a record and don’t need to do anything with the model object, the most efficient approach is to call update(), rather than loading the model object into memory. For example, instead of doing this:

e \= Entry.objects.get(id\=10)
e.comments\_on \= False
e.save()

...do this:

Entry.objects.filter(id\=10).update(comments\_on\=False)

Using update() also prevents a race condition wherein something might change in your database in the short period of time between loading the object and calling save().

Finally, realize that update() does an update at the SQL level and, thus, does not call any save() methods on your models, nor does it emit the [pre\_save](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.pre_save "django.db.models.signals.pre_save") or [post\_save](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.post_save "django.db.models.signals.post_save") signals (which are a consequence of calling [Model.save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save")). If you want to update a bunch of records for a model that has a custom [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save") method, loop over them and call [save()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.save "django.db.models.Model.save"), like this:

for e in Entry.objects.filter(pub\_date\_\_year\=2010):
    e.comments\_on \= False
    e.save()

#### delete[¶](#delete "Permalink to this headline")

delete()[¶](#django.db.models.query.QuerySet.delete "Permalink to this definition")

Performs an SQL delete query on all rows in the [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet"). The delete() is applied instantly. You cannot call delete() on a [QuerySet](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that has had a slice taken or can otherwise no longer be filtered.

For example, to delete all the entries in a particular blog:

\>>> b \= Blog.objects.get(pk\=1)

\# Delete all the entries belonging to this Blog.
\>>> Entry.objects.filter(blog\=b).delete()

By default, Django’s [ForeignKey](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey "django.db.models.ForeignKey") emulates the SQL constraint ON DELETE CASCADE — in other words, any objects with foreign keys pointing at the objects to be deleted will be deleted along with them. For example:

blogs \= Blog.objects.all()
\# This will delete all Blogs and all of their Entry objects.
blogs.delete()

This cascade behavior is customizable via the [on\_delete](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey.on_delete "django.db.models.ForeignKey.on_delete") argument to the [ForeignKey](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey "django.db.models.ForeignKey").

The delete() method does a bulk delete and does not call any delete() methods on your models. It does, however, emit the [pre\_delete](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.pre_delete "django.db.models.signals.pre_delete") and [post\_delete](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.post_delete "django.db.models.signals.post_delete") signals for all deleted objects (including cascaded deletions).

New in Django 1.5: Allow fast-path deletion of objects

Django needs to fetch objects into memory to send signals and handle cascades. However, if there are no cascades and no signals, then Django may take a fast-path and delete objects without fetching into memory. For large deletes this can result in significantly reduced memory usage. The amount of executed queries can be reduced, too.

ForeignKeys which are set to [on\_delete](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey.on_delete "django.db.models.ForeignKey.on_delete") DO\_NOTHING do not prevent taking the fast-path in deletion.

Note that the queries generated in object deletion is an implementation detail subject to change.

### Field lookups[¶](#field-lookups "Permalink to this headline")

Field lookups are how you specify the meat of an SQL WHERE clause. They’re specified as keyword arguments to the QuerySet methods [filter()](#django.db.models.query.QuerySet.filter "django.db.models.query.QuerySet.filter"), [exclude()](#django.db.models.query.QuerySet.exclude "django.db.models.query.QuerySet.exclude") and [get()](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get").

For an introduction, see [_models and database queries documentation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#field-lookups-intro).

#### exact[¶](#exact "Permalink to this headline")

Exact match. If the value provided for comparison is None, it will be interpreted as an SQL NULL (see [isnull](#std:fieldlookup-isnull) for more details).

Examples:

Entry.objects.get(id\_\_exact\=14)
Entry.objects.get(id\_\_exact\=None)

SQL equivalents:

SELECT ... WHERE id = 14;
SELECT ... WHERE id IS NULL;

MySQL comparisons

In MySQL, a database table’s “collation” setting determines whether exact comparisons are case-sensitive. This is a database setting, _not_ a Django setting. It’s possible to configure your MySQL tables to use case-sensitive comparisons, but some trade-offs are involved. For more information about this, see the [_collation section_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#mysql-collation) in the [_databases_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html) documentation.

#### iexact[¶](#iexact "Permalink to this headline")

Case-insensitive exact match.

Example:

Blog.objects.get(name\_\_iexact\='beatles blog')

SQL equivalent:

SELECT ... WHERE name ILIKE 'beatles blog';

Note this will match 'Beatles Blog', 'beatles blog', 'BeAtLes BLoG', etc.

SQLite users

When using the SQLite backend and Unicode (non-ASCII) strings, bear in mind the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) about string comparisons. SQLite does not do case-insensitive matching for Unicode strings.

#### contains[¶](#contains "Permalink to this headline")

Case-sensitive containment test.

Example:

Entry.objects.get(headline\_\_contains\='Lennon')

SQL equivalent:

SELECT ... WHERE headline LIKE '%Lennon%';

Note this will match the headline 'Lennon honored today' but not 'lennon honored today'.

SQLite users

SQLite doesn’t support case-sensitive LIKE statements; contains acts like icontains for SQLite. See the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) for more information.

#### icontains[¶](#icontains "Permalink to this headline")

Case-insensitive containment test.

Example:

Entry.objects.get(headline\_\_icontains\='Lennon')

SQL equivalent:

SELECT ... WHERE headline ILIKE '%Lennon%';

SQLite users

When using the SQLite backend and Unicode (non-ASCII) strings, bear in mind the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) about string comparisons.

#### in[¶](#in "Permalink to this headline")

In a given list.

Example:

Entry.objects.filter(id\_\_in\=\[1, 3, 4\])

SQL equivalent:

SELECT ... WHERE id IN (1, 3, 4);

You can also use a queryset to dynamically evaluate the list of values instead of providing a list of literal values:

inner\_qs \= Blog.objects.filter(name\_\_contains\='Cheddar')
entries \= Entry.objects.filter(blog\_\_in\=inner\_qs)

This queryset will be evaluated as subselect statement:

SELECT ... WHERE blog.id IN (SELECT id FROM ... WHERE NAME LIKE '%Cheddar%')

If you pass in a ValuesQuerySet or ValuesListQuerySet (the result of calling values() or values\_list() on a queryset) as the value to an \_\_in lookup, you need to ensure you are only extracting one field in the result. For example, this will work (filtering on the blog names):

inner\_qs \= Blog.objects.filter(name\_\_contains\='Ch').values('name')
entries \= Entry.objects.filter(blog\_\_name\_\_in\=inner\_qs)

This example will raise an exception, since the inner query is trying to extract two field values, where only one is expected:

\# Bad code! Will raise a TypeError.
inner\_qs \= Blog.objects.filter(name\_\_contains\='Ch').values('name', 'id')
entries \= Entry.objects.filter(blog\_\_name\_\_in\=inner\_qs)

Performance considerations

Be cautious about using nested queries and understand your database server’s performance characteristics (if in doubt, benchmark!). Some database backends, most notably MySQL, don’t optimize nested queries very well. It is more efficient, in those cases, to extract a list of values and then pass that into the second query. That is, execute two queries instead of one:

values \= Blog.objects.filter(
        name\_\_contains\='Cheddar').values\_list('pk', flat\=True)
entries \= Entry.objects.filter(blog\_\_in\=list(values))

Note the list() call around the Blog QuerySet to force execution of the first query. Without it, a nested query would be executed, because [_QuerySets are lazy_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html#querysets-are-lazy).

#### gt[¶](#gt "Permalink to this headline")

Greater than.

Example:

Entry.objects.filter(id\_\_gt\=4)

SQL equivalent:

SELECT ... WHERE id > 4;

#### gte[¶](#gte "Permalink to this headline")

Greater than or equal to.

#### lte[¶](#lte "Permalink to this headline")

Less than or equal to.

#### startswith[¶](#startswith "Permalink to this headline")

Case-sensitive starts-with.

Example:

Entry.objects.filter(headline\_\_startswith\='Will')

SQL equivalent:

SELECT ... WHERE headline LIKE 'Will%';

SQLite doesn’t support case-sensitive LIKE statements; startswith acts like istartswith for SQLite.

#### istartswith[¶](#istartswith "Permalink to this headline")

Case-insensitive starts-with.

Example:

Entry.objects.filter(headline\_\_istartswith\='will')

SQL equivalent:

SELECT ... WHERE headline ILIKE 'Will%';

SQLite users

When using the SQLite backend and Unicode (non-ASCII) strings, bear in mind the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) about string comparisons.

#### endswith[¶](#endswith "Permalink to this headline")

Case-sensitive ends-with.

Example:

Entry.objects.filter(headline\_\_endswith\='cats')

SQL equivalent:

SELECT ... WHERE headline LIKE '%cats';

SQLite users

SQLite doesn’t support case-sensitive LIKE statements; endswith acts like iendswith for SQLite. Refer to the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) documentation for more.

#### iendswith[¶](#iendswith "Permalink to this headline")

Case-insensitive ends-with.

Example:

Entry.objects.filter(headline\_\_iendswith\='will')

SQL equivalent:

SELECT ... WHERE headline ILIKE '%will'

SQLite users

When using the SQLite backend and Unicode (non-ASCII) strings, bear in mind the [_database note_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html#sqlite-string-matching) about string comparisons.

#### range[¶](#range "Permalink to this headline")

Range test (inclusive).

Example:

start\_date \= datetime.date(2005, 1, 1)
end\_date \= datetime.date(2005, 3, 31)
Entry.objects.filter(pub\_date\_\_range\=(start\_date, end\_date))

SQL equivalent:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01' and '2005-03-31';

You can use range anywhere you can use BETWEEN in SQL — for dates, numbers and even characters.

Warning

Filtering a DateTimeField with dates won’t include items on the last day, because the bounds are interpreted as “0am on the given date”. If pub\_date was a DateTimeField, the above expression would be turned into this SQL:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01 00:00:00' and '2005-03-31 00:00:00';

Generally speaking, you can’t mix dates and datetimes.

#### year[¶](#year "Permalink to this headline")

For date/datetime fields, exact year match. Takes a four-digit year.

Example:

Entry.objects.filter(pub\_date\_\_year\=2005)

SQL equivalent:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01' AND '2005-12-31';

(The exact SQL syntax varies for each database engine.)

#### month[¶](#month "Permalink to this headline")

For date and datetime fields, an exact month match. Takes an integer 1 (January) through 12 (December).

Example:

Entry.objects.filter(pub\_date\_\_month\=12)

SQL equivalent:

SELECT ... WHERE EXTRACT('month' FROM pub\_date) = '12';

(The exact SQL syntax varies for each database engine.)

#### day[¶](#day "Permalink to this headline")

For date and datetime fields, an exact day match.

Example:

Entry.objects.filter(pub\_date\_\_day\=3)

SQL equivalent:

SELECT ... WHERE EXTRACT('day' FROM pub\_date) = '3';

(The exact SQL syntax varies for each database engine.)

Note this will match any record with a pub\_date on the third day of the month, such as January 3, July 3, etc.

#### week\_day[¶](#week-day "Permalink to this headline")

For date and datetime fields, a ‘day of the week’ match.

Takes an integer value representing the day of week from 1 (Sunday) to 7 (Saturday).

Example:

Entry.objects.filter(pub\_date\_\_week\_day\=2)

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

Note this will match any record with a pub\_date that falls on a Monday (day 2 of the week), regardless of the month or year in which it occurs. Week days are indexed with day 1 being Sunday and day 7 being Saturday.

Warning

When [_time zone support_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/timezones.html) is enabled, Django uses UTC in the database connection, which means the year, month, day and week\_day lookups are performed in UTC. This is a known limitation of the current implementation.

#### isnull[¶](#isnull "Permalink to this headline")

Takes either True or False, which correspond to SQL queries of IS NULL and IS NOT NULL, respectively.

Example:

Entry.objects.filter(pub\_date\_\_isnull\=True)

SQL equivalent:

SELECT ... WHERE pub\_date IS NULL;

#### search[¶](#search "Permalink to this headline")

A boolean full-text search, taking advantage of full-text indexing. This is like [contains](#std:fieldlookup-contains) but is significantly faster due to full-text indexing.

Example:

Entry.objects.filter(headline\_\_search\="+Django -jazz Python")

SQL equivalent:

SELECT ... WHERE MATCH(tablename, headline) AGAINST (+Django -jazz Python IN BOOLEAN MODE);

Note this is only available in MySQL and requires direct manipulation of the database to add the full-text index. By default Django uses BOOLEAN MODE for full text searches. See the [MySQL documentation](http://dev.mysql.com/doc/refman/5.1/en/fulltext-boolean.html) for additional details.

#### regex[¶](#regex "Permalink to this headline")

Case-sensitive regular expression match.

The regular expression syntax is that of the database backend in use. In the case of SQLite, which has no built in regular expression support, this feature is provided by a (Python) user-defined REGEXP function, and the regular expression syntax is therefore that of Python’s re module.

Example:

Entry.objects.get(title\_\_regex\=r'^(An?|The) +')

SQL equivalents:

SELECT ... WHERE title REGEXP BINARY '^(An?|The) +'; -- MySQL

SELECT ... WHERE REGEXP\_LIKE(title, '^(an?|the) +', 'c'); -- Oracle

SELECT ... WHERE title ~ '^(An?|The) +'; -- PostgreSQL

SELECT ... WHERE title REGEXP '^(An?|The) +'; -- SQLite

Using raw strings (e.g., r'foo' instead of 'foo') for passing in the regular expression syntax is recommended.

#### iregex[¶](#iregex "Permalink to this headline")

Case-insensitive regular expression match.

Example:

Entry.objects.get(title\_\_iregex\=r'^(an?|the) +')

SQL equivalents:

SELECT ... WHERE title REGEXP '^(an?|the) +'; -- MySQL

SELECT ... WHERE REGEXP\_LIKE(title, '^(an?|the) +', 'i'); -- Oracle

SELECT ... WHERE title ~\* '^(an?|the) +'; -- PostgreSQL

SELECT ... WHERE title REGEXP '(?i)^(an?|the) +'; -- SQLite

### Aggregation functions[¶](#aggregation-functions "Permalink to this headline")

Django provides the following aggregation functions in the django.db.models module. For details on how to use these aggregate functions, see [_the topic guide on aggregation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/aggregation.html).

#### Avg[¶](#avg "Permalink to this headline")

_class_ Avg(_field_)[¶](#django.db.models.Avg "Permalink to this definition")

Returns the mean value of the given field, which must be numeric.

-   Default alias: <field>\_\_avg
-   Return type: float

#### Count[¶](#id6 "Permalink to this headline")

_class_ Count(_field_, _distinct=False_)[¶](#django.db.models.Count "Permalink to this definition")

Returns the number of objects that are related through the provided field.

-   Default alias: <field>\_\_count
-   Return type: int

Has one optional argument:

distinct[¶](#django.db.models.Count.distinct "Permalink to this definition")

If distinct=True, the count will only include unique instances. This is the SQL equivalent of COUNT(DISTINCT <field>). The default value is False.

#### Max[¶](#max "Permalink to this headline")

_class_ Max(_field_)[¶](#django.db.models.Max "Permalink to this definition")

Returns the maximum value of the given field.

-   Default alias: <field>\_\_max
-   Return type: same as input field

#### Min[¶](#min "Permalink to this headline")

_class_ Min(_field_)[¶](#django.db.models.Min "Permalink to this definition")

Returns the minimum value of the given field.

-   Default alias: <field>\_\_min
-   Return type: same as input field

#### StdDev[¶](#stddev "Permalink to this headline")

_class_ StdDev(_field_, _sample=False_)[¶](#django.db.models.StdDev "Permalink to this definition")

Returns the standard deviation of the data in the provided field.

-   Default alias: <field>\_\_stddev
-   Return type: float

Has one optional argument:

sample[¶](#django.db.models.StdDev.sample "Permalink to this definition")

By default, StdDev returns the population standard deviation. However, if sample=True, the return value will be the sample standard deviation.

SQLite

SQLite doesn’t provide StdDev out of the box. An implementation is available as an extension module for SQLite. Consult the [SQlite documentation](http://www.sqlite.org/contrib) for instructions on obtaining and installing this extension.

#### Sum[¶](#sum "Permalink to this headline")

_class_ Sum(_field_)[¶](#django.db.models.Sum "Permalink to this definition")

Computes the sum of all values of the given field.

-   Default alias: <field>\_\_sum
-   Return type: same as input field

#### Variance[¶](#variance "Permalink to this headline")

_class_ Variance(_field_, _sample=False_)[¶](#django.db.models.Variance "Permalink to this definition")

Returns the variance of the data in the provided field.

-   Default alias: <field>\_\_variance
-   Return type: float

Has one optional argument:

sample[¶](#django.db.models.Variance.sample "Permalink to this definition")

By default, Variance returns the population variance. However, if sample=True, the return value will be the sample variance.

SQLite

SQLite doesn’t provide Variance out of the box. An implementation is available as an extension module for SQLite. Consult the [SQlite documentation](http://www.sqlite.org/contrib) for instructions on obtaining and installing this extension.
