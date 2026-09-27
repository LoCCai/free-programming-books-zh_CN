### Methods that return new `QuerySet`s[¶](#methods-that-return-new-querysets "Permalink to this headline")

Django provides a range of `QuerySet` refinement methods that modify either the types of results returned by the `QuerySet` or the way its SQL query is executed.

#### `filter()`[¶](#filter "Permalink to this headline")

`filter`(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.filter "Permalink to this definition")

Returns a new `QuerySet` containing objects that match the given lookup parameters.

The lookup parameters (`**kwargs`) should be in the format described in [Field lookups](#id4) below. Multiple parameters are joined via `AND` in the underlying SQL statement.

If you need to execute more complex queries (for example, queries with `OR` statements), you can use [`Q objects`](#django.db.models.Q "django.db.models.Q").

#### `exclude()`[¶](#exclude "Permalink to this headline")

`exclude`(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.exclude "Permalink to this definition")

Returns a new `QuerySet` containing objects that do _not_ match the given lookup parameters.

The lookup parameters (`**kwargs`) should be in the format described in [Field lookups](#id4) below. Multiple parameters are joined via `AND` in the underlying SQL statement, and the whole thing is enclosed in a `NOT()`.

This example excludes all entries whose `pub_date` is later than 2005-1-3 AND whose `headline` is "Hello":

Entry.objects.exclude(pub\_date\_\_gt\=datetime.date(2005, 1, 3), headline\='Hello')

In SQL terms, that evaluates to:

SELECT ...
WHERE NOT (pub\_date \> '2005-1-3' AND headline \= 'Hello')

This example excludes all entries whose `pub_date` is later than 2005-1-3 OR whose headline is "Hello":

Entry.objects.exclude(pub\_date\_\_gt\=datetime.date(2005, 1, 3)).exclude(headline\='Hello')

In SQL terms, that evaluates to:

SELECT ...
WHERE NOT pub\_date \> '2005-1-3'
AND NOT headline \= 'Hello'

Note the second example is more restrictive.

If you need to execute more complex queries (for example, queries with `OR` statements), you can use [`Q objects`](#django.db.models.Q "django.db.models.Q").

#### `annotate()`[¶](#annotate "Permalink to this headline")

`annotate`(_\*args_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.annotate "Permalink to this definition")

Annotates each object in the `QuerySet` with the provided list of [query expressions](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/). An expression may be a simple value, a reference to a field on the model (or any related models), or an aggregate expression (averages, sums, etc.) that has been computed over the objects that are related to the objects in the `QuerySet`.

Each argument to `annotate()` is an annotation that will be added to each object in the `QuerySet` that is returned.

The aggregation functions that are provided by Django are described in [Aggregation Functions](#id5) below.

Annotations specified using keyword arguments will use the keyword as the alias for the annotation. Anonymous arguments will have an alias generated for them based upon the name of the aggregate function and the model field that is being aggregated. Only aggregate expressions that reference a single field can be anonymous arguments. Everything else must be a keyword argument.

For example, if you were manipulating a list of blogs, you may want to determine how many entries have been made in each blog:

\>>> from django.db.models import Count
\>>> q \= Blog.objects.annotate(Count('entry'))
\# The name of the first blog
\>>> q\[0\].name
'Blogasaurus'
\# The number of entries on the first blog
\>>> q\[0\].entry\_\_count
42

The `Blog` model doesn't define an `entry__count` attribute by itself, but by using a keyword argument to specify the aggregate function, you can control the name of the annotation:

\>>> q \= Blog.objects.annotate(number\_of\_entries\=Count('entry'))
\# The number of entries on the first blog, using the name provided
\>>> q\[0\].number\_of\_entries
42

For an in-depth discussion of aggregation, see [the topic guide on Aggregation](https://docs.djangoproject.com/zh-hans/2.0/topics/db/aggregation/).

#### `order_by()`[¶](#order-by "Permalink to this headline")

`order_by`(_\*fields_)[¶](#django.db.models.query.QuerySet.order_by "Permalink to this definition")

By default, results returned by a `QuerySet` are ordered by the ordering tuple given by the `ordering` option in the model's `Meta`. You can override this on a per-`QuerySet` basis by using the `order_by` method.

Example:

Entry.objects.filter(pub\_date\_\_year\=2005).order\_by('-pub\_date', 'headline')

The result above will be ordered by `pub_date` descending, then by `headline` ascending. The negative sign in front of `"-pub_date"` indicates _descending_ order. Ascending order is implied. To order randomly, use `"?"`, like so:

Entry.objects.order\_by('?')

Note: `order_by('?')` queries may be expensive and slow, depending on the database backend you're using.

To order by a field in a different model, use the same syntax as when you are querying across model relations. That is, the name of the field, followed by a double underscore (`__`), followed by the name of the field in the new model, and so on for as many models as you want to join. For example:

Entry.objects.order\_by('blog\_\_name', 'headline')

If you try to order by a field that is a relation to another model, Django will use the default ordering on the related model, or order by the related model's primary key if there is no [`Meta.ordering`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.ordering "django.db.models.Options.ordering") specified. For example, since the `Blog` model has no default ordering specified:

Entry.objects.order\_by('blog')

...is identical to:

Entry.objects.order\_by('blog\_\_id')

If `Blog` had `ordering = ['name']`, then the first queryset would be identical to:

Entry.objects.order\_by('blog\_\_name')

You can also order by [query expressions](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/) by calling `asc()` or `desc()` on the expression:

Entry.objects.order\_by(Coalesce('summary', 'headline').desc())

Be cautious when ordering by fields in related models if you are also using [`distinct()`](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct"). See the note in [`distinct()`](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct") for an explanation of how related model ordering can change the expected results.

Note

It is permissible to specify a multi-valued field to order the results by (for example, a [`ManyToManyField`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ManyToManyField "django.db.models.ManyToManyField") field, or the reverse relation of a [`ForeignKey`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey "django.db.models.ForeignKey") field).

Consider this case:

class Event(Model):
   parent \= models.ForeignKey(
       'self',
       on\_delete\=models.CASCADE,
       related\_name\='children',
   )
   date \= models.DateField()

Event.objects.order\_by('children\_\_date')

Here, there could potentially be multiple ordering data for each `Event`; each `Event` with multiple `children` will be returned multiple times into the new `QuerySet` that `order_by()` creates. In other words, using `order_by()` on the `QuerySet` could return more items than you were working on to begin with - which is probably neither expected nor useful.

Thus, take care when using multi-valued field to order the results. **If** you can be sure that there will only be one ordering piece of data for each of the items you're ordering, this approach should not present problems. If not, make sure the results are what you expect.

There's no way to specify whether ordering should be case sensitive. With respect to case-sensitivity, Django will order results however your database backend normally orders them.

You can order by a field converted to lowercase with [`Lower`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/database-functions/#django.db.models.functions.Lower "django.db.models.functions.Lower") which will achieve case-consistent ordering:

Entry.objects.order\_by(Lower('headline').desc())

If you don't want any ordering to be applied to a query, not even the default ordering, call [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") with no parameters.

You can tell if a query is ordered or not by checking the [`QuerySet.ordered`](#django.db.models.query.QuerySet.ordered "django.db.models.query.QuerySet.ordered") attribute, which will be `True` if the `QuerySet` has been ordered in any way.

Each `order_by()` call will clear any previous ordering. For example, this query will be ordered by `pub_date` and not `headline`:

Entry.objects.order\_by('headline').order\_by('pub\_date')

Warning

Ordering is not a free operation. Each field you add to the ordering incurs a cost to your database. Each foreign key you add will implicitly include all of its default orderings as well.

If a query doesn't have an ordering specified, results are returned from the database in an unspecified order. A particular ordering is guaranteed only when ordering by a set of fields that uniquely identify each object in the results. For example, if a `name` field isn't unique, ordering by it won't guarantee objects with the same name always appear in the same order.

#### `reverse()`[¶](#reverse "Permalink to this headline")

`reverse`()[¶](#django.db.models.query.QuerySet.reverse "Permalink to this definition")

Use the `reverse()` method to reverse the order in which a queryset's elements are returned. Calling `reverse()` a second time restores the ordering back to the normal direction.

To retrieve the "last" five items in a queryset, you could do this:

my\_queryset.reverse()\[:5\]

Note that this is not quite the same as slicing from the end of a sequence in Python. The above example will return the last item first, then the penultimate item and so on. If we had a Python sequence and looked at `seq[-5:]`, we would see the fifth-last item first. Django doesn't support that mode of access (slicing from the end), because it's not possible to do it efficiently in SQL.

Also, note that `reverse()` should generally only be called on a `QuerySet` which has a defined ordering (e.g., when querying against a model which defines a default ordering, or when using [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by")). If no such ordering is defined for a given `QuerySet`, calling `reverse()` on it has no real effect (the ordering was undefined prior to calling `reverse()`, and will remain undefined afterward).

#### `distinct()`[¶](#distinct "Permalink to this headline")

`distinct`(_\*fields_)[¶](#django.db.models.query.QuerySet.distinct "Permalink to this definition")

Returns a new `QuerySet` that uses `SELECT DISTINCT` in its SQL query. This eliminates duplicate rows from the query results.

By default, a `QuerySet` will not eliminate duplicate rows. In practice, this is rarely a problem, because simple queries such as `Blog.objects.all()` don't introduce the possibility of duplicate result rows. However, if your query spans multiple tables, it's possible to get duplicate results when a `QuerySet` is evaluated. That's when you'd use `distinct()`.

Note

Any fields used in an [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") call are included in the SQL `SELECT` columns. This can sometimes lead to unexpected results when used in conjunction with `distinct()`. If you order by fields from a related model, those fields will be added to the selected columns and they may make otherwise duplicate rows appear to be distinct. Since the extra columns don't appear in the returned results (they are only there to support ordering), it sometimes looks like non-distinct results are being returned.

Similarly, if you use a [`values()`](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") query to restrict the columns selected, the columns used in any [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") (or default model ordering) will still be involved and may affect uniqueness of the results.

The moral here is that if you are using `distinct()` be careful about ordering by related models. Similarly, when using `distinct()` and [`values()`](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") together, be careful when ordering by fields not in the [`values()`](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values") call.

On PostgreSQL only, you can pass positional arguments (`*fields`) in order to specify the names of fields to which the `DISTINCT` should apply. This translates to a `SELECT DISTINCT ON` SQL query. Here's the difference. For a normal `distinct()` call, the database compares _each_ field in each row when determining which rows are distinct. For a `distinct()` call with specified field names, the database will only compare the specified field names.

Note

When you specify field names, you _must_ provide an `order_by()` in the `QuerySet`, and the fields in `order_by()` must start with the fields in `distinct()`, in the same order.

For example, `SELECT DISTINCT ON (a)` gives you the first row for each value in column `a`. If you don't specify an order, you'll get some arbitrary row.

Examples (those after the first will only work on PostgreSQL):

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

Note

Keep in mind that [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") uses any default related model ordering that has been defined. You might have to explicitly order by the relation `_id` or referenced field to make sure the `DISTINCT ON` expressions match those at the beginning of the `ORDER BY` clause. For example, if the `Blog` model defined an [`ordering`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.ordering "django.db.models.Options.ordering") by `name`:

Entry.objects.order\_by('blog').distinct('blog')

...wouldn't work because the query would be ordered by `blog__name` thus mismatching the `DISTINCT ON` expression. You'd have to explicitly order by the relation \_id field (`blog_id` in this case) or the referenced one (`blog__pk`) to make sure both expressions match.

#### `values()`[¶](#values "Permalink to this headline")

`values`(_\*fields_, _\*\*expressions_)[¶](#django.db.models.query.QuerySet.values "Permalink to this definition")

Returns a `QuerySet` that returns dictionaries, rather than model instances, when used as an iterable.

Each of those dictionaries represents an object, with the keys corresponding to the attribute names of model objects.

This example compares the dictionaries of `values()` with the normal model objects:

\# This list contains a Blog object.
\>>> Blog.objects.filter(name\_\_startswith\='Beatles')
<QuerySet \[<Blog: Beatles Blog\>\]\>

\# This list contains a dictionary.
\>>> Blog.objects.filter(name\_\_startswith\='Beatles').values()
<QuerySet \[{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}\]\>

The `values()` method takes optional positional arguments, `*fields`, which specify field names to which the `SELECT` should be limited. If you specify the fields, each dictionary will contain only the field keys/values for the fields you specify. If you don't specify the fields, each dictionary will contain a key and value for every field in the database table.

Example:

\>>> Blog.objects.values()
<QuerySet \[{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}\]>
\>>> Blog.objects.values('id', 'name')
<QuerySet \[{'id': 1, 'name': 'Beatles Blog'}\]>

The `values()` method also takes optional keyword arguments, `**expressions`, which are passed through to [`annotate()`](#django.db.models.query.QuerySet.annotate "django.db.models.query.QuerySet.annotate"):

\>>> from django.db.models.functions import Lower
\>>> Blog.objects.values(lower\_name\=Lower('name'))
<QuerySet \[{'lower\_name': 'beatles blog'}\]>

An aggregate within a `values()` clause is applied before other arguments within the same `values()` clause. If you need to group by another value, add it to an earlier `values()` clause instead. For example:

\>>> from django.db.models import Count
\>>> Blog.objects.values('entry\_\_authors', entries\=Count('entry'))
<QuerySet \[{'entry\_\_authors': 1, 'entries': 20}, {'entry\_\_authors': 1, 'entries': 13}\]>
\>>> Blog.objects.values('entry\_\_authors').annotate(entries\=Count('entry'))
<QuerySet \[{'entry\_\_authors': 1, 'entries': 33}\]>

A few subtleties that are worth mentioning:

-   If you have a field called `foo` that is a [`ForeignKey`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey "django.db.models.ForeignKey"), the default `values()` call will return a dictionary key called `foo_id`, since this is the name of the hidden model attribute that stores the actual value (the `foo` attribute refers to the related model). When you are calling `values()` and passing in field names, you can pass in either `foo` or `foo_id` and you will get back the same thing (the dictionary key will match the field name you passed in).
    
    For example:
    
    \>>> Entry.objects.values()
    <QuerySet \[{'blog\_id': 1, 'headline': 'First Entry', ...}, ...\]>
    
    \>>> Entry.objects.values('blog')
    <QuerySet \[{'blog': 1}, ...\]>
    
    \>>> Entry.objects.values('blog\_id')
    <QuerySet \[{'blog\_id': 1}, ...\]>
    
-   When using `values()` together with [`distinct()`](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct"), be aware that ordering can affect the results. See the note in [`distinct()`](#django.db.models.query.QuerySet.distinct "django.db.models.query.QuerySet.distinct") for details.
    
-   If you use a `values()` clause after an [`extra()`](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") call, any fields defined by a `select` argument in the [`extra()`](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") must be explicitly included in the `values()` call. Any [`extra()`](#django.db.models.query.QuerySet.extra "django.db.models.query.QuerySet.extra") call made after a `values()` call will have its extra selected fields ignored.
    
-   Calling [`only()`](#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only") and [`defer()`](#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer") after `values()` doesn't make sense, so doing so will raise a `NotImplementedError`.
    

It is useful when you know you're only going to need values from a small number of the available fields and you won't need the functionality of a model instance object. It's more efficient to select only the fields you need to use.

Finally, note that you can call `filter()`, `order_by()`, etc. after the `values()` call, that means that these two calls are identical:

Blog.objects.values().order\_by('id')
Blog.objects.order\_by('id').values()

The people who made Django prefer to put all the SQL-affecting methods first, followed (optionally) by any output-affecting methods (such as `values()`), but it doesn't really matter. This is your chance to really flaunt your individualism.

You can also refer to fields on related models with reverse relations through `OneToOneField`, `ForeignKey` and `ManyToManyField` attributes:

\>>> Blog.objects.values('name', 'entry\_\_headline')
<QuerySet \[{'name': 'My blog', 'entry\_\_headline': 'An entry'},
     {'name': 'My blog', 'entry\_\_headline': 'Another entry'}, ...\]>

Warning

Because [`ManyToManyField`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ManyToManyField "django.db.models.ManyToManyField") attributes and reverse relations can have multiple related rows, including these can have a multiplier effect on the size of your result set. This will be especially pronounced if you include multiple such fields in your `values()` query, in which case all possible combinations will be returned.

Changed in Django 1.11:

Support for `**expressions` was added.

#### `values_list()`[¶](#values-list "Permalink to this headline")

`values_list`(_\*fields_, _flat=False_, _named=False_)[¶](#django.db.models.query.QuerySet.values_list "Permalink to this definition")

This is similar to `values()` except that instead of returning dictionaries, it returns tuples when iterated over. Each tuple contains the value from the respective field or expression passed into the `values_list()` call — so the first item is the first field, etc. For example:

\>>> Entry.objects.values\_list('id', 'headline')
<QuerySet \[(1, 'First entry'), ...\]>
\>>> from django.db.models.functions import Lower
\>>> Entry.objects.values\_list('id', Lower('headline'))
<QuerySet \[(1, 'first entry'), ...\]>

If you only pass in a single field, you can also pass in the `flat` parameter. If `True`, this will mean the returned results are single values, rather than one-tuples. An example should make the difference clearer:

\>>> Entry.objects.values\_list('id').order\_by('id')
<QuerySet\[(1,), (2,), (3,), ...\]>

\>>> Entry.objects.values\_list('id', flat\=True).order\_by('id')
<QuerySet \[1, 2, 3, ...\]>

It is an error to pass in `flat` when there is more than one field.

You can pass `named=True` to get results as a [`namedtuple()`](https://docs.python.org/3/library/collections.html#collections.namedtuple "(in Python v3.7)"):

\>>> Entry.objects.values\_list('id', 'headline', named\=True)
<QuerySet \[Row(id=1, headline='First entry'), ...\]>

Using a named tuple may make use of the results more readable, at the expense of a small performance penalty for transforming the results into a named tuple.

If you don't pass any values to `values_list()`, it will return all the fields in the model, in the order they were declared.

A common need is to get a specific field value of a certain model instance. To achieve that, use `values_list()` followed by a `get()` call:

\>>> Entry.objects.values\_list('headline', flat\=True).get(pk\=1)
'First entry'

`values()` and `values_list()` are both intended as optimizations for a specific use case: retrieving a subset of data without the overhead of creating a model instance. This metaphor falls apart when dealing with many-to-many and other multivalued relations (such as the one-to-many relation of a reverse foreign key) because the "one row, one object" assumption doesn't hold.

For example, notice the behavior when querying across a [`ManyToManyField`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ManyToManyField "django.db.models.ManyToManyField"):

\>>> Author.objects.values\_list('name', 'entry\_\_headline')
<QuerySet \[('Noam Chomsky', 'Impressions of Gaza'),
 ('George Orwell', 'Why Socialists Do Not Believe in Fun'),
 ('George Orwell', 'In Defence of English Cooking'),
 ('Don Quixote', None)\]>

Authors with multiple entries appear multiple times and authors without any entries have `None` for the entry headline.

Similarly, when querying a reverse foreign key, `None` appears for entries not having any author:

\>>> Entry.objects.values\_list('authors')
<QuerySet \[('Noam Chomsky',), ('George Orwell',), (None,)\]>

Changed in Django 1.11:

Support for expressions in `*fields` was added.

Changed in Django 2.0:

The `named` parameter was added.

#### `dates()`[¶](#dates "Permalink to this headline")

`dates`(_field_, _kind_, _order='ASC'_)[¶](#django.db.models.query.QuerySet.dates "Permalink to this definition")

Returns a `QuerySet` that evaluates to a list of [`datetime.date`](https://docs.python.org/3/library/datetime.html#datetime.date "(in Python v3.7)") objects representing all available dates of a particular kind within the contents of the `QuerySet`.

`field` should be the name of a `DateField` of your model. `kind` should be either `"year"`, `"month"` or `"day"`. Each `datetime.date` object in the result list is "truncated" to the given `type`.

-   `"year"` returns a list of all distinct year values for the field.
-   `"month"` returns a list of all distinct year/month values for the field.
-   `"day"` returns a list of all distinct year/month/day values for the field.

`order`, which defaults to `'ASC'`, should be either `'ASC'` or `'DESC'`. This specifies how to order the results.

Examples:

\>>> Entry.objects.dates('pub\_date', 'year')
\[datetime.date(2005, 1, 1)\]
\>>> Entry.objects.dates('pub\_date', 'month')
\[datetime.date(2005, 2, 1), datetime.date(2005, 3, 1)\]
\>>> Entry.objects.dates('pub\_date', 'day')
\[datetime.date(2005, 2, 20), datetime.date(2005, 3, 20)\]
\>>> Entry.objects.dates('pub\_date', 'day', order\='DESC')
\[datetime.date(2005, 3, 20), datetime.date(2005, 2, 20)\]
\>>> Entry.objects.filter(headline\_\_contains\='Lennon').dates('pub\_date', 'day')
\[datetime.date(2005, 3, 20)\]

#### `datetimes()`[¶](#datetimes "Permalink to this headline")

`datetimes`(_field\_name_, _kind_, _order='ASC'_, _tzinfo=None_)[¶](#django.db.models.query.QuerySet.datetimes "Permalink to this definition")

Returns a `QuerySet` that evaluates to a list of [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.7)") objects representing all available dates of a particular kind within the contents of the `QuerySet`.

`field_name` should be the name of a `DateTimeField` of your model.

`kind` should be either `"year"`, `"month"`, `"day"`, `"hour"`, `"minute"` or `"second"`. Each `datetime.datetime` object in the result list is "truncated" to the given `type`.

`order`, which defaults to `'ASC'`, should be either `'ASC'` or `'DESC'`. This specifies how to order the results.

`tzinfo` defines the time zone to which datetimes are converted prior to truncation. Indeed, a given datetime has different representations depending on the time zone in use. This parameter must be a [`datetime.tzinfo`](https://docs.python.org/3/library/datetime.html#datetime.tzinfo "(in Python v3.7)") object. If it's `None`, Django uses the [current time zone](https://docs.djangoproject.com/zh-hans/2.0/topics/i18n/timezones/#default-current-time-zone). It has no effect when [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `False`.

Note

This function performs time zone conversions directly in the database. As a consequence, your database must be able to interpret the value of `tzinfo.tzname(None)`. This translates into the following requirements:

-   SQLite: no requirements. Conversions are performed in Python with [pytz](http://pytz.sourceforge.net/) (installed when you install Django).
-   PostgreSQL: no requirements (see [Time Zones](https://www.postgresql.org/docs/current/static/datatype-datetime.html#DATATYPE-TIMEZONES)).
-   Oracle: no requirements (see [Choosing a Time Zone File](https://docs.oracle.com/database/121/NLSPG/ch4datetime.htm#NLSPG258)).
-   MySQL: load the time zone tables with [mysql\_tzinfo\_to\_sql](https://dev.mysql.com/doc/refman/en/mysql-tzinfo-to-sql.html).

#### `none()`[¶](#none "Permalink to this headline")

`none`()[¶](#django.db.models.query.QuerySet.none "Permalink to this definition")

Calling none() will create a queryset that never returns any objects and no query will be executed when accessing the results. A qs.none() queryset is an instance of `EmptyQuerySet`.

Examples:

\>>> Entry.objects.none()
<QuerySet \[\]>
\>>> from django.db.models.query import EmptyQuerySet
\>>> isinstance(Entry.objects.none(), EmptyQuerySet)
True

#### `all()`[¶](#all "Permalink to this headline")

`all`()[¶](#django.db.models.query.QuerySet.all "Permalink to this definition")

Returns a _copy_ of the current `QuerySet` (or `QuerySet` subclass). This can be useful in situations where you might want to pass in either a model manager or a `QuerySet` and do further filtering on the result. After calling `all()` on either object, you'll definitely have a `QuerySet` to work with.

When a `QuerySet` is [evaluated](#when-querysets-are-evaluated), it typically caches its results. If the data in the database might have changed since a `QuerySet` was evaluated, you can get updated results for the same query by calling `all()` on a previously evaluated `QuerySet`.

#### `union()`[¶](#union "Permalink to this headline")

`union`(_\*other\_qs_, _all=False_)[¶](#django.db.models.query.QuerySet.union "Permalink to this definition")

New in Django 1.11.

Uses SQL's `UNION` operator to combine the results of two or more `QuerySet`s. For example:

\>>> qs1.union(qs2, qs3)

The `UNION` operator selects only distinct values by default. To allow duplicate values, use the `all=True` argument.

`union()`, `intersection()`, and `difference()` return model instances of the type of the first `QuerySet` even if the arguments are `QuerySet`s of other models. Passing different models works as long as the `SELECT` list is the same in all `QuerySet`s (at least the types, the names don't matter as long as the types in the same order). In such cases, you must use the column names from the first `QuerySet` in `QuerySet` methods applied to the resulting `QuerySet`. For example:

\>>> qs1 \= Author.objects.values\_list('name')
\>>> qs2 \= Entry.objects.values\_list('headline')
\>>> qs1.union(qs2).order\_by('name')

In addition, only `LIMIT`, `OFFSET`, `COUNT(*)`, `ORDER BY`, and specifying columns (i.e. slicing, [`count()`](#django.db.models.query.QuerySet.count "django.db.models.query.QuerySet.count"), [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by"), and [`values()`](#django.db.models.query.QuerySet.values "django.db.models.query.QuerySet.values")/[`values_list()`](#django.db.models.query.QuerySet.values_list "django.db.models.query.QuerySet.values_list")) are allowed on the resulting `QuerySet`. Further, databases place restrictions on what operations are allowed in the combined queries. For example, most databases don't allow `LIMIT` or `OFFSET` in the combined queries.

Changed in Django 1.11.4:

`COUNT(*)` support was added.

#### `intersection()`[¶](#intersection "Permalink to this headline")

`intersection`(_\*other\_qs_)[¶](#django.db.models.query.QuerySet.intersection "Permalink to this definition")

New in Django 1.11.

Uses SQL's `INTERSECT` operator to return the shared elements of two or more `QuerySet`s. For example:

\>>> qs1.intersection(qs2, qs3)

See [`union()`](#django.db.models.query.QuerySet.union "django.db.models.query.QuerySet.union") for some restrictions.

#### `difference()`[¶](#difference "Permalink to this headline")

`difference`(_\*other\_qs_)[¶](#django.db.models.query.QuerySet.difference "Permalink to this definition")

New in Django 1.11.

Uses SQL's `EXCEPT` operator to keep only elements present in the `QuerySet` but not in some other `QuerySet`s. For example:

\>>> qs1.difference(qs2, qs3)

See [`union()`](#django.db.models.query.QuerySet.union "django.db.models.query.QuerySet.union") for some restrictions.

#### `extra()`[¶](#extra "Permalink to this headline")

`extra`(_select=None_, _where=None_, _params=None_, _tables=None_, _order\_by=None_, _select\_params=None_)[¶](#django.db.models.query.QuerySet.extra "Permalink to this definition")

Sometimes, the Django query syntax by itself can't easily express a complex `WHERE` clause. For these edge cases, Django provides the `extra()` `QuerySet` modifier — a hook for injecting specific clauses into the SQL generated by a `QuerySet`.

Use this method as a last resort

This is an old API that we aim to deprecate at some point in the future. Use it only if you cannot express your query using other queryset methods. If you do need to use it, please [file a ticket](https://code.djangoproject.com/newticket) using the [QuerySet.extra keyword](https://code.djangoproject.com/query?status=assigned&status=new&keywords=~QuerySet.extra) with your use case (please check the list of existing tickets first) so that we can enhance the QuerySet API to allow removing `extra()`. We are no longer improving or fixing bugs for this method.

For example, this use of `extra()`:

\>>> qs.extra(
...     select\={'val': "select col from sometable where othercol = %s"},
...     select\_params\=(someparam,),
... )

is equivalent to:

\>>> qs.annotate(val\=RawSQL("select col from sometable where othercol = %s", (someparam,)))

The main benefit of using [`RawSQL`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/#django.db.models.expressions.RawSQL "django.db.models.expressions.RawSQL") is that you can set `output_field` if needed. The main downside is that if you refer to some table alias of the queryset in the raw SQL, then it is possible that Django might change that alias (for example, when the queryset is used as a subquery in yet another query).

Warning

You should be very careful whenever you use `extra()`. Every time you use it, you should escape any parameters that the user can control by using `params` in order to protect against SQL injection attacks.

You also must not quote placeholders in the SQL string. This example is vulnerable to SQL injection because of the quotes around `%s`:

"select col from sometable where othercol = '%s'"  \# unsafe!

You can read more about how Django's [SQL injection protection](https://docs.djangoproject.com/zh-hans/2.0/topics/security/#sql-injection-protection) works.

By definition, these extra lookups may not be portable to different database engines (because you're explicitly writing SQL code) and violate the DRY principle, so you should avoid them if possible.

Specify one or more of `params`, `select`, `where` or `tables`. None of the arguments is required, but you should use at least one of them.

-   `select`
    
    The `select` argument lets you put extra fields in the `SELECT` clause. It should be a dictionary mapping attribute names to SQL clauses to use to calculate that attribute.
    
    Example:
    
    Entry.objects.extra(select\={'is\_recent': "pub\_date > '2006-01-01'"})
    
    As a result, each `Entry` object will have an extra attribute, `is_recent`, a boolean representing whether the entry's `pub_date` is greater than Jan. 1, 2006.
    
    Django inserts the given SQL snippet directly into the `SELECT` statement, so the resulting SQL of the above example would be something like:
    
    SELECT blog\_entry.\*, (pub\_date \> '2006-01-01') AS is\_recent
    FROM blog\_entry;
    
    The next example is more advanced; it does a subquery to give each resulting `Blog` object an `entry_count` attribute, an integer count of associated `Entry` objects:
    
    Blog.objects.extra(
        select\={
            'entry\_count': 'SELECT COUNT(\*) FROM blog\_entry WHERE blog\_entry.blog\_id = blog\_blog.id'
        },
    )
    
    In this particular case, we're exploiting the fact that the query will already contain the `blog_blog` table in its `FROM` clause.
    
    The resulting SQL of the above example would be:
    
    SELECT blog\_blog.\*, (SELECT COUNT(\*) FROM blog\_entry WHERE blog\_entry.blog\_id \= blog\_blog.id) AS entry\_count
    FROM blog\_blog;
    
    Note that the parentheses required by most database engines around subqueries are not required in Django's `select` clauses. Also note that some database backends, such as some MySQL versions, don't support subqueries.
    
    In some rare cases, you might wish to pass parameters to the SQL fragments in `extra(select=...)`. For this purpose, use the `select_params` parameter. Since `select_params` is a sequence and the `select` attribute is a dictionary, some care is required so that the parameters are matched up correctly with the extra select pieces. In this situation, you should use a [`collections.OrderedDict`](https://docs.python.org/3/library/collections.html#collections.OrderedDict "(in Python v3.7)") for the `select` value, not just a normal Python dictionary.
    
    This will work, for example:
    
    Blog.objects.extra(
        select\=OrderedDict(\[('a', '%s'), ('b', '%s')\]),
        select\_params\=('one', 'two'))
    
    If you need to use a literal `%s` inside your select string, use the sequence `%%s`.
    
-   `where` / `tables`
    
    You can define explicit SQL `WHERE` clauses — perhaps to perform non-explicit joins — by using `where`. You can manually add tables to the SQL `FROM` clause by using `tables`.
    
    `where` and `tables` both take a list of strings. All `where` parameters are "AND"ed to any other search criteria.
    
    Example:
    
    Entry.objects.extra(where\=\["foo='a' OR bar = 'a'", "baz = 'a'"\])
    
    ...translates (roughly) into the following SQL:
    
    SELECT \* FROM blog\_entry WHERE (foo\='a' OR bar\='a') AND (baz\='a')
    
    Be careful when using the `tables` parameter if you're specifying tables that are already used in the query. When you add extra tables via the `tables` parameter, Django assumes you want that table included an extra time, if it is already included. That creates a problem, since the table name will then be given an alias. If a table appears multiple times in an SQL statement, the second and subsequent occurrences must use aliases so the database can tell them apart. If you're referring to the extra table you added in the extra `where` parameter this is going to cause errors.
    
    Normally you'll only be adding extra tables that don't already appear in the query. However, if the case outlined above does occur, there are a few solutions. First, see if you can get by without including the extra table and use the one already in the query. If that isn't possible, put your `extra()` call at the front of the queryset construction so that your table is the first use of that table. Finally, if all else fails, look at the query produced and rewrite your `where` addition to use the alias given to your extra table. The alias will be the same each time you construct the queryset in the same way, so you can rely upon the alias name to not change.
    
-   `order_by`
    
    If you need to order the resulting queryset using some of the new fields or tables you have included via `extra()` use the `order_by` parameter to `extra()` and pass in a sequence of strings. These strings should either be model fields (as in the normal [`order_by()`](#django.db.models.query.QuerySet.order_by "django.db.models.query.QuerySet.order_by") method on querysets), of the form `table_name.column_name` or an alias for a column that you specified in the `select` parameter to `extra()`.
    
    For example:
    
    q \= Entry.objects.extra(select\={'is\_recent': "pub\_date > '2006-01-01'"})
    q \= q.extra(order\_by \= \['-is\_recent'\])
    
    This would sort all the items for which `is_recent` is true to the front of the result set (`True` sorts before `False` in a descending ordering).
    
    This shows, by the way, that you can make multiple calls to `extra()` and it will behave as you expect (adding new constraints each time).
    
-   `params`
    
    The `where` parameter described above may use standard Python database string placeholders — `'%s'` to indicate parameters the database engine should automatically quote. The `params` argument is a list of any extra parameters to be substituted.
    
    Example:
    
    Entry.objects.extra(where\=\['headline=%s'\], params\=\['Lennon'\])
    
    Always use `params` instead of embedding values directly into `where` because `params` will ensure values are quoted correctly according to your particular backend. For example, quotes will be escaped correctly.
    
    Bad:
    
    Entry.objects.extra(where\=\["headline='Lennon'"\])
    
    Good:
    
    Entry.objects.extra(where\=\['headline=%s'\], params\=\['Lennon'\])
    

Warning

If you are performing queries on MySQL, note that MySQL's silent type coercion may cause unexpected results when mixing types. If you query on a string type column, but with an integer value, MySQL will coerce the types of all values in the table to an integer before performing the comparison. For example, if your table contains the values `'abc'`, `'def'` and you query for `WHERE mycolumn=0`, both rows will match. To prevent this, perform the correct typecasting before using the value in a query.

#### `defer()`[¶](#defer "Permalink to this headline")

`defer`(_\*fields_)[¶](#django.db.models.query.QuerySet.defer "Permalink to this definition")

In some complex data-modeling situations, your models might contain a lot of fields, some of which could contain a lot of data (for example, text fields), or require expensive processing to convert them to Python objects. If you are using the results of a queryset in some situation where you don't know if you need those particular fields when you initially fetch the data, you can tell Django not to retrieve them from the database.

This is done by passing the names of the fields to not load to `defer()`:

Entry.objects.defer("headline", "body")

A queryset that has deferred fields will still return model instances. Each deferred field will be retrieved from the database if you access that field (one at a time, not all the deferred fields at once).

You can make multiple calls to `defer()`. Each call adds new fields to the deferred set:

\# Defers both the body and headline fields.
Entry.objects.defer("body").filter(rating\=5).defer("headline")

The order in which fields are added to the deferred set does not matter. Calling `defer()` with a field name that has already been deferred is harmless (the field will still be deferred).

You can defer loading of fields in related models (if the related models are loading via [`select_related()`](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related")) by using the standard double-underscore notation to separate related fields:

Blog.objects.select\_related().defer("entry\_\_headline", "entry\_\_body")

If you want to clear the set of deferred fields, pass `None` as a parameter to `defer()`:

\# Load all fields immediately.
my\_queryset.defer(None)

Some fields in a model won't be deferred, even if you ask for them. You can never defer the loading of the primary key. If you are using [`select_related()`](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related") to retrieve related models, you shouldn't defer the loading of the field that connects from the primary model to the related one, doing so will result in an error.

Note

The `defer()` method (and its cousin, [`only()`](#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only"), below) are only for advanced use-cases. They provide an optimization for when you have analyzed your queries closely and understand _exactly_ what information you need and have measured that the difference between returning the fields you need and the full set of fields for the model will be significant.

Even if you think you are in the advanced use-case situation, **only use defer() when you cannot, at queryset load time, determine if you will need the extra fields or not**. If you are frequently loading and using a particular subset of your data, the best choice you can make is to normalize your models and put the non-loaded data into a separate model (and database table). If the columns _must_ stay in the one table for some reason, create a model with `Meta.managed = False` (see the [`managed attribute`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.managed "django.db.models.Options.managed") documentation) containing just the fields you normally need to load and use that where you might otherwise call `defer()`. This makes your code more explicit to the reader, is slightly faster and consumes a little less memory in the Python process.

For example, both of these models use the same underlying database table:

class CommonlyUsedModel(models.Model):
    f1 \= models.CharField(max\_length\=10)

    class Meta:
        managed \= False
        db\_table \= 'app\_largetable'

class ManagedModel(models.Model):
    f1 \= models.CharField(max\_length\=10)
    f2 \= models.CharField(max\_length\=10)

    class Meta:
        db\_table \= 'app\_largetable'

\# Two equivalent QuerySets:
CommonlyUsedModel.objects.all()
ManagedModel.objects.all().defer('f2')

If many fields need to be duplicated in the unmanaged model, it may be best to create an abstract model with the shared fields and then have the unmanaged and managed models inherit from the abstract model.

Note

When calling [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save") for instances with deferred fields, only the loaded fields will be saved. See [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save") for more details.

#### `only()`[¶](#only "Permalink to this headline")

`only`(_\*fields_)[¶](#django.db.models.query.QuerySet.only "Permalink to this definition")

The `only()` method is more or less the opposite of [`defer()`](#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer"). You call it with the fields that should _not_ be deferred when retrieving a model. If you have a model where almost all the fields need to be deferred, using `only()` to specify the complementary set of fields can result in simpler code.

Suppose you have a model with fields `name`, `age` and `biography`. The following two querysets are the same, in terms of deferred fields:

Person.objects.defer("age", "biography")
Person.objects.only("name")

Whenever you call `only()` it _replaces_ the set of fields to load immediately. The method's name is mnemonic: **only** those fields are loaded immediately; the remainder are deferred. Thus, successive calls to `only()` result in only the final fields being considered:

\# This will defer all fields except the headline.
Entry.objects.only("body", "rating").only("headline")

Since `defer()` acts incrementally (adding fields to the deferred list), you can combine calls to `only()` and `defer()` and things will behave logically:

\# Final result is that everything except "headline" is deferred.
Entry.objects.only("headline", "body").defer("body")

\# Final result loads headline and body immediately (only() replaces any
\# existing set of fields).
Entry.objects.defer("body").only("headline", "body")

All of the cautions in the note for the [`defer()`](#django.db.models.query.QuerySet.defer "django.db.models.query.QuerySet.defer") documentation apply to `only()` as well. Use it cautiously and only after exhausting your other options.

Using [`only()`](#django.db.models.query.QuerySet.only "django.db.models.query.QuerySet.only") and omitting a field requested using [`select_related()`](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related") is an error as well.

Note

When calling [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save") for instances with deferred fields, only the loaded fields will be saved. See [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save") for more details.

#### `using()`[¶](#using "Permalink to this headline")

`using`(_alias_)[¶](#django.db.models.query.QuerySet.using "Permalink to this definition")

This method is for controlling which database the `QuerySet` will be evaluated against if you are using more than one database. The only argument this method takes is the alias of a database, as defined in [`DATABASES`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DATABASES).

For example:

\# queries the database with the 'default' alias.
\>>> Entry.objects.all()

\# queries the database with the 'backup' alias
\>>> Entry.objects.using('backup')

#### `select_for_update()`[¶](#select-for-update "Permalink to this headline")

`select_for_update`(_nowait=False_, _skip\_locked=False_, _of=()_)[¶](#django.db.models.query.QuerySet.select_for_update "Permalink to this definition")

Returns a queryset that will lock rows until the end of the transaction, generating a `SELECT ... FOR UPDATE` SQL statement on supported databases.

For example:

entries \= Entry.objects.select\_for\_update().filter(author\=request.user)

All matched entries will be locked until the end of the transaction block, meaning that other transactions will be prevented from changing or acquiring locks on them.

Usually, if another transaction has already acquired a lock on one of the selected rows, the query will block until the lock is released. If this is not the behavior you want, call `select_for_update(nowait=True)`. This will make the call non-blocking. If a conflicting lock is already acquired by another transaction, [`DatabaseError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.DatabaseError "django.db.DatabaseError") will be raised when the queryset is evaluated. You can also ignore locked rows by using `select_for_update(skip_locked=True)` instead. The `nowait` and `skip_locked` are mutually exclusive and attempts to call `select_for_update()` with both options enabled will result in a [`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError "(in Python v3.7)").

By default, `select_for_update()` locks all rows that are selected by the query. For example, rows of related objects specified in [`select_related()`](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related") are locked in addition to rows of the queryset's model. If this isn't desired, specify the related objects you want to lock in `select_for_update(of=(...))` using the same fields syntax as [`select_related()`](#django.db.models.query.QuerySet.select_related "django.db.models.query.QuerySet.select_related"). Use the value `'self'` to refer to the queryset's model.

You can't use `select_for_update()` on nullable relations:

\>>> Person.objects.select\_related('hometown').select\_for\_update()
Traceback (most recent call last):
...
django.db.utils.NotSupportedError: FOR UPDATE cannot be applied to the nullable side of an outer join

To avoid that restriction, you can exclude null objects if you don't care about them:

\>>> Person.objects.select\_related('hometown').select\_for\_update().exclude(hometown\=None)
<QuerySet \[<Person: ...)>, ...\]>

Currently, the `postgresql`, `oracle`, and `mysql` database backends support `select_for_update()`. However, MySQL doesn't support the `nowait`, `skip_locked`, and `of` arguments.

Passing `nowait=True`, `skip_locked=True`, or `of` to `select_for_update()` using database backends that do not support these options, such as MySQL, raises a [`NotSupportedError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.NotSupportedError "django.db.NotSupportedError"). This prevents code from unexpectedly blocking.

Evaluating a queryset with `select_for_update()` in autocommit mode on backends which support `SELECT ... FOR UPDATE` is a [`TransactionManagementError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.transaction.TransactionManagementError "django.db.transaction.TransactionManagementError") error because the rows are not locked in that case. If allowed, this would facilitate data corruption and could easily be caused by calling code that expects to be run in a transaction outside of one.

Using `select_for_update()` on backends which do not support `SELECT ... FOR UPDATE` (such as SQLite) will have no effect. `SELECT ... FOR UPDATE` will not be added to the query, and an error isn't raised if `select_for_update()` is used in autocommit mode.

Warning

Although `select_for_update()` normally fails in autocommit mode, since [`TestCase`](https://docs.djangoproject.com/zh-hans/2.0/topics/testing/tools/#django.test.TestCase "django.test.TestCase") automatically wraps each test in a transaction, calling `select_for_update()` in a `TestCase` even outside an [`atomic()`](https://docs.djangoproject.com/zh-hans/2.0/topics/db/transactions/#django.db.transaction.atomic "django.db.transaction.atomic") block will (perhaps unexpectedly) pass without raising a `TransactionManagementError`. To properly test `select_for_update()` you should use [`TransactionTestCase`](https://docs.djangoproject.com/zh-hans/2.0/topics/testing/tools/#django.test.TransactionTestCase "django.test.TransactionTestCase").

Certain expressions may not be supported

PostgreSQL doesn't support `select_for_update()` with [`Window`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/#django.db.models.expressions.Window "django.db.models.expressions.Window") expressions.

Changed in Django 1.11:

The `skip_locked` argument was added.

Changed in Django 2.0:

The `of` argument was added.

#### `raw()`[¶](#raw "Permalink to this headline")

`raw`(_raw\_query_, _params=None_, _translations=None_)[¶](#django.db.models.query.QuerySet.raw "Permalink to this definition")

Takes a raw SQL query, executes it, and returns a `django.db.models.query.RawQuerySet` instance. This `RawQuerySet` instance can be iterated over just like an normal `QuerySet` to provide object instances.

See the [Performing raw SQL queries](https://docs.djangoproject.com/zh-hans/2.0/topics/db/sql/) for more information.

Warning

`raw()` always triggers a new query and doesn't account for previous filtering. As such, it should generally be called from the `Manager` or from a fresh `QuerySet` instance.

### Methods that do not return `QuerySet`s[¶](#methods-that-do-not-return-querysets "Permalink to this headline")

The following `QuerySet` methods evaluate the `QuerySet` and return something _other than_ a `QuerySet`.

These methods do not use a cache (see [Caching and QuerySets](https://docs.djangoproject.com/zh-hans/2.0/topics/db/queries/#caching-and-querysets)). Rather, they query the database each time they're called.

#### `get()`[¶](#get "Permalink to this headline")

`get`(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.get "Permalink to this definition")

Returns the object matching the given lookup parameters, which should be in the format described in [Field lookups](#id4).

`get()` raises [`MultipleObjectsReturned`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned") if more than one object was found. The [`MultipleObjectsReturned`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned") exception is an attribute of the model class.

`get()` raises a [`DoesNotExist`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.DoesNotExist "django.db.models.Model.DoesNotExist") exception if an object wasn't found for the given parameters. This exception is an attribute of the model class. Example:

Entry.objects.get(id\='foo') \# raises Entry.DoesNotExist

The [`DoesNotExist`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.DoesNotExist "django.db.models.Model.DoesNotExist") exception inherits from [`django.core.exceptions.ObjectDoesNotExist`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.core.exceptions.ObjectDoesNotExist "django.core.exceptions.ObjectDoesNotExist"), so you can target multiple [`DoesNotExist`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.DoesNotExist "django.db.models.Model.DoesNotExist") exceptions. Example:

from django.core.exceptions import ObjectDoesNotExist
try:
    e \= Entry.objects.get(id\=3)
    b \= Blog.objects.get(id\=1)
except ObjectDoesNotExist:
    print("Either the entry or blog doesn't exist.")

If you expect a queryset to return one row, you can use `get()` without any arguments to return the object for that row:

entry \= Entry.objects.filter(...).exclude(...).get()

#### `create()`[¶](#create "Permalink to this headline")

`create`(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.create "Permalink to this definition")

A convenience method for creating an object and saving it all in one step. Thus:

p \= Person.objects.create(first\_name\="Bruce", last\_name\="Springsteen")

and:

p \= Person(first\_name\="Bruce", last\_name\="Springsteen")
p.save(force\_insert\=True)

are equivalent.

The [force\_insert](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#ref-models-force-insert) parameter is documented elsewhere, but all it means is that a new object will always be created. Normally you won't need to worry about this. However, if your model contains a manual primary key value that you set and if that value already exists in the database, a call to `create()` will fail with an [`IntegrityError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.IntegrityError "django.db.IntegrityError") since primary keys must be unique. Be prepared to handle the exception if you are using manual primary keys.

#### `get_or_create()`[¶](#get-or-create "Permalink to this headline")

`get_or_create`(_defaults=None_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.get_or_create "Permalink to this definition")

A convenience method for looking up an object with the given `kwargs` (may be empty if your model has defaults for all fields), creating one if necessary.

Returns a tuple of `(object, created)`, where `object` is the retrieved or created object and `created` is a boolean specifying whether a new object was created.

This is meant as a shortcut to boilerplatish code. For example:

try:
    obj \= Person.objects.get(first\_name\='John', last\_name\='Lennon')
except Person.DoesNotExist:
    obj \= Person(first\_name\='John', last\_name\='Lennon', birthday\=date(1940, 10, 9))
    obj.save()

This pattern gets quite unwieldy as the number of fields in a model goes up. The above example can be rewritten using `get_or_create()` like so:

obj, created \= Person.objects.get\_or\_create(
    first\_name\='John',
    last\_name\='Lennon',
    defaults\={'birthday': date(1940, 10, 9)},
)

Any keyword arguments passed to `get_or_create()` — _except_ an optional one called `defaults` — will be used in a [`get()`](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get") call. If an object is found, `get_or_create()` returns a tuple of that object and `False`. If multiple objects are found, `get_or_create` raises [`MultipleObjectsReturned`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.core.exceptions.MultipleObjectsReturned "django.core.exceptions.MultipleObjectsReturned"). If an object is _not_ found, `get_or_create()` will instantiate and save a new object, returning a tuple of the new object and `True`. The new object will be created roughly according to this algorithm:

params \= {k: v for k, v in kwargs.items() if '\_\_' not in k}
params.update({k: v() if callable(v) else v for k, v in defaults.items()})
obj \= self.model(\*\*params)
obj.save()

In English, that means start with any non-`'defaults'` keyword argument that doesn't contain a double underscore (which would indicate a non-exact lookup). Then add the contents of `defaults`, overriding any keys if necessary, and use the result as the keyword arguments to the model class. If there are any callables in `defaults`, evaluate them. As hinted at above, this is a simplification of the algorithm that is used, but it contains all the pertinent details. The internal implementation has some more error-checking than this and handles some extra edge-conditions; if you're interested, read the code.

If you have a field named `defaults` and want to use it as an exact lookup in `get_or_create()`, just use `'defaults__exact'`, like so:

Foo.objects.get\_or\_create(defaults\_\_exact\='bar', defaults\={'defaults': 'baz'})

The `get_or_create()` method has similar error behavior to [`create()`](#django.db.models.query.QuerySet.create "django.db.models.query.QuerySet.create") when you're using manually specified primary keys. If an object needs to be created and the key already exists in the database, an [`IntegrityError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.IntegrityError "django.db.IntegrityError") will be raised.

This method is atomic assuming correct usage, correct database configuration, and correct behavior of the underlying database. However, if uniqueness is not enforced at the database level for the `kwargs` used in a `get_or_create` call (see [`unique`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.Field.unique "django.db.models.Field.unique") or [`unique_together`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.unique_together "django.db.models.Options.unique_together")), this method is prone to a race-condition which can result in multiple rows with the same parameters being inserted simultaneously.

If you are using MySQL, be sure to use the `READ COMMITTED` isolation level rather than `REPEATABLE READ` (the default), otherwise you may see cases where `get_or_create` will raise an [`IntegrityError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.IntegrityError "django.db.IntegrityError") but the object won't appear in a subsequent [`get()`](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get") call.

Finally, a word on using `get_or_create()` in Django views. Please make sure to use it only in `POST` requests unless you have a good reason not to. `GET` requests shouldn't have any effect on data. Instead, use `POST` whenever a request to a page has a side effect on your data. For more, see [**Safe methods**](https://tools.ietf.org/html/rfc7231.html#section-4.2.1) in the HTTP spec.

Warning

You can use `get_or_create()` through [`ManyToManyField`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ManyToManyField "django.db.models.ManyToManyField") attributes and reverse relations. In that case you will restrict the queries inside the context of that relation. That could lead you to some integrity problems if you don't use it consistently.

Being the following models:

class Chapter(models.Model):
    title \= models.CharField(max\_length\=255, unique\=True)

class Book(models.Model):
    title \= models.CharField(max\_length\=256)
    chapters \= models.ManyToManyField(Chapter)

You can use `get_or_create()` through Book's chapters field, but it only fetches inside the context of that book:

\>>> book \= Book.objects.create(title\="Ulysses")
\>>> book.chapters.get\_or\_create(title\="Telemachus")
(<Chapter: Telemachus>, True)
\>>> book.chapters.get\_or\_create(title\="Telemachus")
(<Chapter: Telemachus>, False)
\>>> Chapter.objects.create(title\="Chapter 1")
<Chapter: Chapter 1>
\>>> book.chapters.get\_or\_create(title\="Chapter 1")
\# Raises IntegrityError

This is happening because it's trying to get or create "Chapter 1" through the book "Ulysses", but it can't do any of them: the relation can't fetch that chapter because it isn't related to that book, but it can't create it either because `title` field should be unique.

Changed in Django 1.11:

Added support for callable values in `defaults`.

#### `update_or_create()`[¶](#update-or-create "Permalink to this headline")

`update_or_create`(_defaults=None_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.update_or_create "Permalink to this definition")

A convenience method for updating an object with the given `kwargs`, creating a new one if necessary. The `defaults` is a dictionary of (field, value) pairs used to update the object. The values in `defaults` can be callables.

Returns a tuple of `(object, created)`, where `object` is the created or updated object and `created` is a boolean specifying whether a new object was created.

The `update_or_create` method tries to fetch an object from database based on the given `kwargs`. If a match is found, it updates the fields passed in the `defaults` dictionary.

This is meant as a shortcut to boilerplatish code. For example:

defaults \= {'first\_name': 'Bob'}
try:
    obj \= Person.objects.get(first\_name\='John', last\_name\='Lennon')
    for key, value in defaults.items():
        setattr(obj, key, value)
    obj.save()
except Person.DoesNotExist:
    new\_values \= {'first\_name': 'John', 'last\_name': 'Lennon'}
    new\_values.update(defaults)
    obj \= Person(\*\*new\_values)
    obj.save()

This pattern gets quite unwieldy as the number of fields in a model goes up. The above example can be rewritten using `update_or_create()` like so:

obj, created \= Person.objects.update\_or\_create(
    first\_name\='John', last\_name\='Lennon',
    defaults\={'first\_name': 'Bob'},
)

For detailed description how names passed in `kwargs` are resolved see [`get_or_create()`](#django.db.models.query.QuerySet.get_or_create "django.db.models.query.QuerySet.get_or_create").

As described above in [`get_or_create()`](#django.db.models.query.QuerySet.get_or_create "django.db.models.query.QuerySet.get_or_create"), this method is prone to a race-condition which can result in multiple rows being inserted simultaneously if uniqueness is not enforced at the database level.

Like [`get_or_create()`](#django.db.models.query.QuerySet.get_or_create "django.db.models.query.QuerySet.get_or_create") and [`create()`](#django.db.models.query.QuerySet.create "django.db.models.query.QuerySet.create"), if you're using manually specified primary keys and an object needs to be created but the key already exists in the database, an [`IntegrityError`](https://docs.djangoproject.com/zh-hans/2.0/ref/exceptions/#django.db.IntegrityError "django.db.IntegrityError") is raised.

Changed in Django 1.11:

Added support for callable values in `defaults`.

#### `bulk_create()`[¶](#bulk-create "Permalink to this headline")

`bulk_create`(_objs_, _batch\_size=None_)[¶](#django.db.models.query.QuerySet.bulk_create "Permalink to this definition")

This method inserts the provided list of objects into the database in an efficient manner (generally only 1 query, no matter how many objects there are):

\>>> Entry.objects.bulk\_create(\[
...     Entry(headline\='This is a test'),
...     Entry(headline\='This is only a test'),
... \])

This has a number of caveats though:

-   The model's `save()` method will not be called, and the `pre_save` and `post_save` signals will not be sent.
    
-   It does not work with child models in a multi-table inheritance scenario.
    
-   If the model's primary key is an [`AutoField`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.AutoField "django.db.models.AutoField") it does not retrieve and set the primary key attribute, as `save()` does, unless the database backend supports it (currently PostgreSQL).
    
-   It does not work with many-to-many relationships.
    
-   It casts `objs` to a list, which fully evaluates `objs` if it's a generator. The cast allows inspecting all objects so that any objects with a manually set primary key can be inserted first. If you want to insert objects in batches without evaluating the entire generator at once, you can use this technique as long as the objects don't have any manually set primary keys:
    
    from itertools import islice
    
    batch\_size \= 100
    objs \= (Entry(headline\='Test %s' % i) for i in range(1000))
    while True:
        batch \= list(islice(objs, batch\_size))
        if not batch:
            break
        Entry.objects.bulk\_create(batch, batch\_size)
    

The `batch_size` parameter controls how many objects are created in a single query. The default is to create all objects in one batch, except for SQLite where the default is such that at most 999 variables per query are used.

#### `count()`[¶](#count "Permalink to this headline")

`count`()[¶](#django.db.models.query.QuerySet.count "Permalink to this definition")

Returns an integer representing the number of objects in the database matching the `QuerySet`. The `count()` method never raises exceptions.

Example:

\# Returns the total number of entries in the database.
Entry.objects.count()

\# Returns the number of entries whose headline contains 'Lennon'
Entry.objects.filter(headline\_\_contains\='Lennon').count()

A `count()` call performs a `SELECT COUNT(*)` behind the scenes, so you should always use `count()` rather than loading all of the record into Python objects and calling `len()` on the result (unless you need to load the objects into memory anyway, in which case `len()` will be faster).

Note that if you want the number of items in a `QuerySet` and are also retrieving model instances from it (for example, by iterating over it), it's probably more efficient to use `len(queryset)` which won't cause an extra database query like `count()` would.

#### `in_bulk()`[¶](#in-bulk "Permalink to this headline")

`in_bulk`(_id\_list=None_, _field\_name='pk'_)[¶](#django.db.models.query.QuerySet.in_bulk "Permalink to this definition")

Takes a list of field values (`id_list`) and the `field_name` for those values, and returns a dictionary mapping each value to an instance of the object with the given field value. If `id_list` isn't provided, all objects in the queryset are returned. `field_name` must be a unique field, and it defaults to the primary key.

Example:

\>>> Blog.objects.in\_bulk(\[1\])
{1: <Blog: Beatles Blog>}
\>>> Blog.objects.in\_bulk(\[1, 2\])
{1: <Blog: Beatles Blog>, 2: <Blog: Cheddar Talk>}
\>>> Blog.objects.in\_bulk(\[\])
{}
\>>> Blog.objects.in\_bulk()
{1: <Blog: Beatles Blog>, 2: <Blog: Cheddar Talk>, 3: <Blog: Django Weblog>}
\>>> Blog.objects.in\_bulk(\['beatles\_blog'\], field\_name\='slug')
{'beatles\_blog': <Blog: Beatles Blog>}

If you pass `in_bulk()` an empty list, you'll get an empty dictionary.

Changed in Django 2.0:

The `field_name` parameter was added.

#### `iterator()`[¶](#iterator "Permalink to this headline")

`iterator`(_chunk\_size=2000_)[¶](#django.db.models.query.QuerySet.iterator "Permalink to this definition")

Evaluates the `QuerySet` (by performing the query) and returns an iterator (see [**PEP 234**](https://www.python.org/dev/peps/pep-0234)) over the results. A `QuerySet` typically caches its results internally so that repeated evaluations do not result in additional queries. In contrast, `iterator()` will read results directly, without doing any caching at the `QuerySet` level (internally, the default iterator calls `iterator()` and caches the return value). For a `QuerySet` which returns a large number of objects that you only need to access once, this can result in better performance and a significant reduction in memory.

Note that using `iterator()` on a `QuerySet` which has already been evaluated will force it to evaluate again, repeating the query.

Also, use of `iterator()` causes previous `prefetch_related()` calls to be ignored since these two optimizations do not make sense together.

Depending on the database backend, query results will either be loaded all at once or streamed from the database using server-side cursors.

##### With server-side cursors[¶](#with-server-side-cursors "Permalink to this headline")

Oracle and [PostgreSQL](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#postgresql-server-side-cursors) use server-side cursors to stream results from the database without loading the entire result set into memory.

The Oracle database driver always uses server-side cursors.

With server-side cursors, the `chunk_size` parameter specifies the number of results to cache at the database driver level. Fetching bigger chunks diminishes the number of round trips between the database driver and the database, at the expense of memory.

On PostgreSQL, server-side cursors will only be used when the [`DISABLE_SERVER_SIDE_CURSORS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DATABASE-DISABLE_SERVER_SIDE_CURSORS) setting is `False`. Read [Transaction pooling and server-side cursors](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#transaction-pooling-server-side-cursors) if you're using a connection pooler configured in transaction pooling mode. When server-side cursors are disabled, the behavior is the same as databases that don't support server-side cursors.

##### Without server-side cursors[¶](#without-server-side-cursors "Permalink to this headline")

MySQL and SQLite don't support streaming results, hence the Python database drivers load the entire result set into memory. The result set is then transformed into Python row objects by the database adapter using the `fetchmany()` method defined in [**PEP 249**](https://www.python.org/dev/peps/pep-0249).

The `chunk_size` parameter controls the size of batches Django retrieves from the database driver. Larger batches decrease the overhead of communicating with the database driver at the expense of a slight increase in memory consumption.

The default value of `chunk_size`, 2000, comes from [a calculation on the psycopg mailing list](https://www.postgresql.org/message-id/4D2F2C71.8080805%40dndg.it):

> Assuming rows of 10-20 columns with a mix of textual and numeric data, 2000 is going to fetch less than 100KB of data, which seems a good compromise between the number of rows transferred and the data discarded if the loop is exited early.

Changed in Django 1.11:

PostgreSQL support for server-side cursors was added.

Changed in Django 2.0:

The `chunk_size` parameter was added.

#### `latest()`[¶](#latest "Permalink to this headline")

`latest`(_\*fields_)[¶](#django.db.models.query.QuerySet.latest "Permalink to this definition")

Returns the latest object in the table based on the given field(s).

This example returns the latest `Entry` in the table, according to the `pub_date` field:

Entry.objects.latest('pub\_date')

You can also choose the latest based on several fields. For example, to select the `Entry` with the earliest `expire_date` when two entries have the same `pub_date`:

Entry.objects.latest('pub\_date', '-expire\_date')

The negative sign in `'-expire_date'` means to sort `expire_date` in _descending_ order. Since `latest()` gets the last result, the `Entry` with the earliest `expire_date` is selected.

If your model's [Meta](https://docs.djangoproject.com/zh-hans/2.0/topics/db/models/#meta-options) specifies [`get_latest_by`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.get_latest_by "django.db.models.Options.get_latest_by"), you can omit any arguments to `earliest()` or `latest()`. The fields specified in [`get_latest_by`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.get_latest_by "django.db.models.Options.get_latest_by") will be used by default.

Like [`get()`](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get"), `earliest()` and `latest()` raise [`DoesNotExist`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.DoesNotExist "django.db.models.Model.DoesNotExist") if there is no object with the given parameters.

Note that `earliest()` and `latest()` exist purely for convenience and readability.

Changed in Django 2.0:

Support for several arguments was added.

`earliest()` and `latest()` may return instances with null dates.

Since ordering is delegated to the database, results on fields that allow null values may be ordered differently if you use different databases. For example, PostgreSQL and MySQL sort null values as if they are higher than non-null values, while SQLite does the opposite.

You may want to filter out null values:

Entry.objects.filter(pub\_date\_\_isnull\=False).latest('pub\_date')

#### `earliest()`[¶](#earliest "Permalink to this headline")

`earliest`(_\*fields_)[¶](#django.db.models.query.QuerySet.earliest "Permalink to this definition")

Works otherwise like [`latest()`](#django.db.models.query.QuerySet.latest "django.db.models.query.QuerySet.latest") except the direction is changed.

#### `first()`[¶](#first "Permalink to this headline")

`first`()[¶](#django.db.models.query.QuerySet.first "Permalink to this definition")

Returns the first object matched by the queryset, or `None` if there is no matching object. If the `QuerySet` has no ordering defined, then the queryset is automatically ordered by the primary key. This can affect aggregation results as described in [Interaction with default ordering or order\_by()](https://docs.djangoproject.com/zh-hans/2.0/topics/db/aggregation/#aggregation-ordering-interaction).

Example:

p \= Article.objects.order\_by('title', 'pub\_date').first()

Note that `first()` is a convenience method, the following code sample is equivalent to the above example:

try:
    p \= Article.objects.order\_by('title', 'pub\_date')\[0\]
except IndexError:
    p \= None

#### `last()`[¶](#last "Permalink to this headline")

`last`()[¶](#django.db.models.query.QuerySet.last "Permalink to this definition")

Works like [`first()`](#django.db.models.query.QuerySet.first "django.db.models.query.QuerySet.first"), but returns the last object in the queryset.

#### `aggregate()`[¶](#aggregate "Permalink to this headline")

`aggregate`(_\*args_, _\*\*kwargs_)[¶](#django.db.models.query.QuerySet.aggregate "Permalink to this definition")

Returns a dictionary of aggregate values (averages, sums, etc.) calculated over the `QuerySet`. Each argument to `aggregate()` specifies a value that will be included in the dictionary that is returned.

The aggregation functions that are provided by Django are described in [Aggregation Functions](#id5) below. Since aggregates are also [query expressions](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/), you may combine aggregates with other aggregates or values to create complex aggregates.

Aggregates specified using keyword arguments will use the keyword as the name for the annotation. Anonymous arguments will have a name generated for them based upon the name of the aggregate function and the model field that is being aggregated. Complex aggregates cannot use anonymous arguments and must specify a keyword argument as an alias.

For example, when you are working with blog entries, you may want to know the number of authors that have contributed blog entries:

\>>> from django.db.models import Count
\>>> q \= Blog.objects.aggregate(Count('entry'))
{'entry\_\_count': 16}

By using a keyword argument to specify the aggregate function, you can control the name of the aggregation value that is returned:

\>>> q \= Blog.objects.aggregate(number\_of\_entries\=Count('entry'))
{'number\_of\_entries': 16}

For an in-depth discussion of aggregation, see [the topic guide on Aggregation](https://docs.djangoproject.com/zh-hans/2.0/topics/db/aggregation/).

#### `exists()`[¶](#exists "Permalink to this headline")

`exists`()[¶](#django.db.models.query.QuerySet.exists "Permalink to this definition")

Returns `True` if the [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") contains any results, and `False` if not. This tries to perform the query in the simplest and fastest way possible, but it _does_ execute nearly the same query as a normal [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") query.

[`exists()`](#django.db.models.query.QuerySet.exists "django.db.models.query.QuerySet.exists") is useful for searches relating to both object membership in a [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") and to the existence of any objects in a [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet"), particularly in the context of a large [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet").

The most efficient method of finding whether a model with a unique field (e.g. `primary_key`) is a member of a [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") is:

entry \= Entry.objects.get(pk\=123)
if some\_queryset.filter(pk\=entry.pk).exists():
    print("Entry contained in queryset")

Which will be faster than the following which requires evaluating and iterating through the entire queryset:

if entry in some\_queryset:
   print("Entry contained in QuerySet")

And to find whether a queryset contains any items:

if some\_queryset.exists():
    print("There is at least one object in some\_queryset")

Which will be faster than:

if some\_queryset:
    print("There is at least one object in some\_queryset")

... but not by a large degree (hence needing a large queryset for efficiency gains).

Additionally, if a `some_queryset` has not yet been evaluated, but you know that it will be at some point, then using `some_queryset.exists()` will do more overall work (one query for the existence check plus an extra one to later retrieve the results) than simply using `bool(some_queryset)`, which retrieves the results and then checks if any were returned.

#### `update()`[¶](#update "Permalink to this headline")

`update`(_\*\*kwargs_)[¶](#django.db.models.query.QuerySet.update "Permalink to this definition")

Performs an SQL update query for the specified fields, and returns the number of rows matched (which may not be equal to the number of rows updated if some rows already have the new value).

For example, to turn comments off for all blog entries published in 2010, you could do this:

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False)

(This assumes your `Entry` model has fields `pub_date` and `comments_on`.)

You can update multiple fields — there's no limit on how many. For example, here we update the `comments_on` and `headline` fields:

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False, headline\='This is old')

The `update()` method is applied instantly, and the only restriction on the [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that is updated is that it can only update columns in the model's main table, not on related models. You can't do this, for example:

\>>> Entry.objects.update(blog\_\_name\='foo') \# Won't work!

Filtering based on related fields is still possible, though:

\>>> Entry.objects.filter(blog\_\_id\=1).update(comments\_on\=True)

You cannot call `update()` on a [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that has had a slice taken or can otherwise no longer be filtered.

The `update()` method returns the number of affected rows:

\>>> Entry.objects.filter(id\=64).update(comments\_on\=True)
1

\>>> Entry.objects.filter(slug\='nonexistent-slug').update(comments\_on\=True)
0

\>>> Entry.objects.filter(pub\_date\_\_year\=2010).update(comments\_on\=False)
132

If you're just updating a record and don't need to do anything with the model object, the most efficient approach is to call `update()`, rather than loading the model object into memory. For example, instead of doing this:

e \= Entry.objects.get(id\=10)
e.comments\_on \= False
e.save()

...do this:

Entry.objects.filter(id\=10).update(comments\_on\=False)

Using `update()` also prevents a race condition wherein something might change in your database in the short period of time between loading the object and calling `save()`.

Finally, realize that `update()` does an update at the SQL level and, thus, does not call any `save()` methods on your models, nor does it emit the [`pre_save`](https://docs.djangoproject.com/zh-hans/2.0/ref/signals/#django.db.models.signals.pre_save "django.db.models.signals.pre_save") or [`post_save`](https://docs.djangoproject.com/zh-hans/2.0/ref/signals/#django.db.models.signals.post_save "django.db.models.signals.post_save") signals (which are a consequence of calling [`Model.save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save")). If you want to update a bunch of records for a model that has a custom [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save") method, loop over them and call [`save()`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/instances/#django.db.models.Model.save "django.db.models.Model.save"), like this:

for e in Entry.objects.filter(pub\_date\_\_year\=2010):
    e.comments\_on \= False
    e.save()

#### `delete()`[¶](#delete "Permalink to this headline")

`delete`()[¶](#django.db.models.query.QuerySet.delete "Permalink to this definition")

Performs an SQL delete query on all rows in the [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") and returns the number of objects deleted and a dictionary with the number of deletions per object type.

The `delete()` is applied instantly. You cannot call `delete()` on a [`QuerySet`](#django.db.models.query.QuerySet "django.db.models.query.QuerySet") that has had a slice taken or can otherwise no longer be filtered.

For example, to delete all the entries in a particular blog:

\>>> b \= Blog.objects.get(pk\=1)

\# Delete all the entries belonging to this Blog.
\>>> Entry.objects.filter(blog\=b).delete()
(4, {'weblog.Entry': 2, 'weblog.Entry\_authors': 2})

By default, Django's [`ForeignKey`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey "django.db.models.ForeignKey") emulates the SQL constraint `ON DELETE CASCADE` — in other words, any objects with foreign keys pointing at the objects to be deleted will be deleted along with them. For example:

\>>> blogs \= Blog.objects.all()

\# This will delete all Blogs and all of their Entry objects.
\>>> blogs.delete()
(5, {'weblog.Blog': 1, 'weblog.Entry': 2, 'weblog.Entry\_authors': 2})

This cascade behavior is customizable via the [`on_delete`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey.on_delete "django.db.models.ForeignKey.on_delete") argument to the [`ForeignKey`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey "django.db.models.ForeignKey").

The `delete()` method does a bulk delete and does not call any `delete()` methods on your models. It does, however, emit the [`pre_delete`](https://docs.djangoproject.com/zh-hans/2.0/ref/signals/#django.db.models.signals.pre_delete "django.db.models.signals.pre_delete") and [`post_delete`](https://docs.djangoproject.com/zh-hans/2.0/ref/signals/#django.db.models.signals.post_delete "django.db.models.signals.post_delete") signals for all deleted objects (including cascaded deletions).

Django needs to fetch objects into memory to send signals and handle cascades. However, if there are no cascades and no signals, then Django may take a fast-path and delete objects without fetching into memory. For large deletes this can result in significantly reduced memory usage. The amount of executed queries can be reduced, too.

ForeignKeys which are set to [`on_delete`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.ForeignKey.on_delete "django.db.models.ForeignKey.on_delete") `DO_NOTHING` do not prevent taking the fast-path in deletion.

Note that the queries generated in object deletion is an implementation detail subject to change.

### `Field` lookups[¶](#field-lookups "Permalink to this headline")

Field lookups are how you specify the meat of an SQL `WHERE` clause. They're specified as keyword arguments to the `QuerySet` methods [`filter()`](#django.db.models.query.QuerySet.filter "django.db.models.query.QuerySet.filter"), [`exclude()`](#django.db.models.query.QuerySet.exclude "django.db.models.query.QuerySet.exclude") and [`get()`](#django.db.models.query.QuerySet.get "django.db.models.query.QuerySet.get").

For an introduction, see [models and database queries documentation](https://docs.djangoproject.com/zh-hans/2.0/topics/db/queries/#field-lookups-intro).

Django's built-in lookups are listed below. It is also possible to write [custom lookups](https://docs.djangoproject.com/zh-hans/2.0/howto/custom-lookups/) for model fields.

As a convenience when no lookup type is provided (like in `Entry.objects.get(id=14)`) the lookup type is assumed to be [`exact`](#std:fieldlookup-exact).

#### `exact`[¶](#exact "Permalink to this headline")

Exact match. If the value provided for comparison is `None`, it will be interpreted as an SQL `NULL` (see [`isnull`](#std:fieldlookup-isnull) for more details).

Examples:

Entry.objects.get(id\_\_exact\=14)
Entry.objects.get(id\_\_exact\=None)

SQL equivalents:

SELECT ... WHERE id \= 14;
SELECT ... WHERE id IS NULL;

MySQL comparisons

In MySQL, a database table's "collation" setting determines whether `exact` comparisons are case-sensitive. This is a database setting, _not_ a Django setting. It's possible to configure your MySQL tables to use case-sensitive comparisons, but some trade-offs are involved. For more information about this, see the [collation section](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#mysql-collation) in the [databases](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/) documentation.

#### `iexact`[¶](#iexact "Permalink to this headline")

Case-insensitive exact match. If the value provided for comparison is `None`, it will be interpreted as an SQL `NULL` (see [`isnull`](#std:fieldlookup-isnull) for more details).

Example:

Blog.objects.get(name\_\_iexact\='beatles blog')
Blog.objects.get(name\_\_iexact\=None)

SQL equivalents:

SELECT ... WHERE name ILIKE 'beatles blog';
SELECT ... WHERE name IS NULL;

Note the first query will match `'Beatles Blog'`, `'beatles blog'`, `'BeAtLes BLoG'`, etc.

SQLite users

When using the SQLite backend and non-ASCII strings, bear in mind the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) about string comparisons. SQLite does not do case-insensitive matching for non-ASCII strings.

#### `contains`[¶](#contains "Permalink to this headline")

Case-sensitive containment test.

Example:

Entry.objects.get(headline\_\_contains\='Lennon')

SQL equivalent:

SELECT ... WHERE headline LIKE '%Lennon%';

Note this will match the headline `'Lennon honored today'` but not `'lennon honored today'`.

SQLite users

SQLite doesn't support case-sensitive `LIKE` statements; `contains` acts like `icontains` for SQLite. See the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) for more information.

#### `icontains`[¶](#icontains "Permalink to this headline")

Case-insensitive containment test.

Example:

Entry.objects.get(headline\_\_icontains\='Lennon')

SQL equivalent:

SELECT ... WHERE headline ILIKE '%Lennon%';

SQLite users

When using the SQLite backend and non-ASCII strings, bear in mind the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) about string comparisons.

#### `in`[¶](#in "Permalink to this headline")

In a given iterable; often a list, tuple, or queryset.

Example:

Entry.objects.filter(id\_\_in\=\[1, 3, 4\])

SQL equivalent:

SELECT ... WHERE id IN (1, 3, 4);

You can also use a queryset to dynamically evaluate the list of values instead of providing a list of literal values:

inner\_qs \= Blog.objects.filter(name\_\_contains\='Cheddar')
entries \= Entry.objects.filter(blog\_\_in\=inner\_qs)

This queryset will be evaluated as subselect statement:

SELECT ... WHERE blog.id IN (SELECT id FROM ... WHERE NAME LIKE '%Cheddar%')

If you pass in a `QuerySet` resulting from `values()` or `values_list()` as the value to an `__in` lookup, you need to ensure you are only extracting one field in the result. For example, this will work (filtering on the blog names):

inner\_qs \= Blog.objects.filter(name\_\_contains\='Ch').values('name')
entries \= Entry.objects.filter(blog\_\_name\_\_in\=inner\_qs)

This example will raise an exception, since the inner query is trying to extract two field values, where only one is expected:

\# Bad code! Will raise a TypeError.
inner\_qs \= Blog.objects.filter(name\_\_contains\='Ch').values('name', 'id')
entries \= Entry.objects.filter(blog\_\_name\_\_in\=inner\_qs)

Performance considerations

Be cautious about using nested queries and understand your database server's performance characteristics (if in doubt, benchmark!). Some database backends, most notably MySQL, don't optimize nested queries very well. It is more efficient, in those cases, to extract a list of values and then pass that into the second query. That is, execute two queries instead of one:

values \= Blog.objects.filter(
        name\_\_contains\='Cheddar').values\_list('pk', flat\=True)
entries \= Entry.objects.filter(blog\_\_in\=list(values))

Note the `list()` call around the Blog `QuerySet` to force execution of the first query. Without it, a nested query would be executed, because [QuerySets are lazy](https://docs.djangoproject.com/zh-hans/2.0/topics/db/queries/#querysets-are-lazy).

#### `gt`[¶](#gt "Permalink to this headline")

Greater than.

Example:

Entry.objects.filter(id\_\_gt\=4)

SQL equivalent:

SELECT ... WHERE id \> 4;

#### `gte`[¶](#gte "Permalink to this headline")

Greater than or equal to.

#### `lte`[¶](#lte "Permalink to this headline")

Less than or equal to.

#### `startswith`[¶](#startswith "Permalink to this headline")

Case-sensitive starts-with.

Example:

Entry.objects.filter(headline\_\_startswith\='Lennon')

SQL equivalent:

SELECT ... WHERE headline LIKE 'Lennon%';

SQLite doesn't support case-sensitive `LIKE` statements; `startswith` acts like `istartswith` for SQLite.

#### `istartswith`[¶](#istartswith "Permalink to this headline")

Case-insensitive starts-with.

Example:

Entry.objects.filter(headline\_\_istartswith\='Lennon')

SQL equivalent:

SELECT ... WHERE headline ILIKE 'Lennon%';

SQLite users

When using the SQLite backend and non-ASCII strings, bear in mind the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) about string comparisons.

#### `endswith`[¶](#endswith "Permalink to this headline")

Case-sensitive ends-with.

Example:

Entry.objects.filter(headline\_\_endswith\='Lennon')

SQL equivalent:

SELECT ... WHERE headline LIKE '%Lennon';

SQLite users

SQLite doesn't support case-sensitive `LIKE` statements; `endswith` acts like `iendswith` for SQLite. Refer to the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) documentation for more.

#### `iendswith`[¶](#iendswith "Permalink to this headline")

Case-insensitive ends-with.

Example:

Entry.objects.filter(headline\_\_iendswith\='Lennon')

SQL equivalent:

SELECT ... WHERE headline ILIKE '%Lennon'

SQLite users

When using the SQLite backend and non-ASCII strings, bear in mind the [database note](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#sqlite-string-matching) about string comparisons.

#### `range`[¶](#range "Permalink to this headline")

Range test (inclusive).

Example:

import datetime
start\_date \= datetime.date(2005, 1, 1)
end\_date \= datetime.date(2005, 3, 31)
Entry.objects.filter(pub\_date\_\_range\=(start\_date, end\_date))

SQL equivalent:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01' and '2005-03-31';

You can use `range` anywhere you can use `BETWEEN` in SQL — for dates, numbers and even characters.

Warning

Filtering a `DateTimeField` with dates won't include items on the last day, because the bounds are interpreted as "0am on the given date". If `pub_date` was a `DateTimeField`, the above expression would be turned into this SQL:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01 00:00:00' and '2005-03-31 00:00:00';

Generally speaking, you can't mix dates and datetimes.

#### `date`[¶](#date "Permalink to this headline")

For datetime fields, casts the value as date. Allows chaining additional field lookups. Takes a date value.

Example:

Entry.objects.filter(pub\_date\_\_date\=datetime.date(2005, 1, 1))
Entry.objects.filter(pub\_date\_\_date\_\_gt\=datetime.date(2005, 1, 1))

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, fields are converted to the current time zone before filtering.

#### `year`[¶](#year "Permalink to this headline")

For date and datetime fields, an exact year match. Allows chaining additional field lookups. Takes an integer year.

Example:

Entry.objects.filter(pub\_date\_\_year\=2005)
Entry.objects.filter(pub\_date\_\_year\_\_gte\=2005)

SQL equivalent:

SELECT ... WHERE pub\_date BETWEEN '2005-01-01' AND '2005-12-31';
SELECT ... WHERE pub\_date \>= '2005-01-01';

(The exact SQL syntax varies for each database engine.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, datetime fields are converted to the current time zone before filtering.

#### `month`[¶](#month "Permalink to this headline")

For date and datetime fields, an exact month match. Allows chaining additional field lookups. Takes an integer 1 (January) through 12 (December).

Example:

Entry.objects.filter(pub\_date\_\_month\=12)
Entry.objects.filter(pub\_date\_\_month\_\_gte\=6)

SQL equivalent:

SELECT ... WHERE EXTRACT('month' FROM pub\_date) \= '12';
SELECT ... WHERE EXTRACT('month' FROM pub\_date) \>= '6';

(The exact SQL syntax varies for each database engine.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, datetime fields are converted to the current time zone before filtering. This requires [time zone definitions in the database](#database-time-zone-definitions).

#### `day`[¶](#day "Permalink to this headline")

For date and datetime fields, an exact day match. Allows chaining additional field lookups. Takes an integer day.

Example:

Entry.objects.filter(pub\_date\_\_day\=3)
Entry.objects.filter(pub\_date\_\_day\_\_gte\=3)

SQL equivalent:

SELECT ... WHERE EXTRACT('day' FROM pub\_date) \= '3';
SELECT ... WHERE EXTRACT('day' FROM pub\_date) \>= '3';

(The exact SQL syntax varies for each database engine.)

Note this will match any record with a pub\_date on the third day of the month, such as January 3, July 3, etc.

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, datetime fields are converted to the current time zone before filtering. This requires [time zone definitions in the database](#database-time-zone-definitions).

#### `week`[¶](#week "Permalink to this headline")

New in Django 1.11.

For date and datetime fields, return the week number (1-52 or 53) according to [ISO-8601](https://en.wikipedia.org/wiki/ISO-8601), i.e., weeks start on a Monday and the first week contains the year's first Thursday.

Example:

Entry.objects.filter(pub\_date\_\_week\=52)
Entry.objects.filter(pub\_date\_\_week\_\_gte\=32, pub\_date\_\_week\_\_lte\=38)

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, fields are converted to the current time zone before filtering.

#### `week_day`[¶](#week-day "Permalink to this headline")

For date and datetime fields, a 'day of the week' match. Allows chaining additional field lookups.

Takes an integer value representing the day of week from 1 (Sunday) to 7 (Saturday).

Example:

Entry.objects.filter(pub\_date\_\_week\_day\=2)
Entry.objects.filter(pub\_date\_\_week\_day\_\_gte\=2)

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

Note this will match any record with a `pub_date` that falls on a Monday (day 2 of the week), regardless of the month or year in which it occurs. Week days are indexed with day 1 being Sunday and day 7 being Saturday.

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, datetime fields are converted to the current time zone before filtering. This requires [time zone definitions in the database](#database-time-zone-definitions).

#### `quarter`[¶](#quarter "Permalink to this headline")

New in Django 2.0.

For date and datetime fields, a 'quarter of the year' match. Allows chaining additional field lookups. Takes an integer value between 1 and 4 representing the quarter of the year.

Example to retrieve entries in the second quarter (April 1 to June 30):

Entry.objects.filter(pub\_date\_\_quarter\=2)

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, datetime fields are converted to the current time zone before filtering. This requires [time zone definitions in the database](#database-time-zone-definitions).

#### `time`[¶](#time "Permalink to this headline")

New in Django 1.11.

For datetime fields, casts the value as time. Allows chaining additional field lookups. Takes a [`datetime.time`](https://docs.python.org/3/library/datetime.html#datetime.time "(in Python v3.7)") value.

Example:

Entry.objects.filter(pub\_date\_\_time\=datetime.time(14, 30))
Entry.objects.filter(pub\_date\_\_time\_\_range\=(datetime.time(8), datetime.time(17)))

(No equivalent SQL code fragment is included for this lookup because implementation of the relevant query varies among different database engines.)

When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, fields are converted to the current time zone before filtering.

#### `hour`[¶](#hour "Permalink to this headline")

For datetime and time fields, an exact hour match. Allows chaining additional field lookups. Takes an integer between 0 and 23.

Example:

Event.objects.filter(timestamp\_\_hour\=23)
Event.objects.filter(time\_\_hour\=5)
Event.objects.filter(timestamp\_\_hour\_\_gte\=12)

SQL equivalent:

SELECT ... WHERE EXTRACT('hour' FROM timestamp) \= '23';
SELECT ... WHERE EXTRACT('hour' FROM time) \= '5';
SELECT ... WHERE EXTRACT('hour' FROM timestamp) \>= '12';

(The exact SQL syntax varies for each database engine.)

For datetime fields, when [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, values are converted to the current time zone before filtering.

#### `minute`[¶](#minute "Permalink to this headline")

For datetime and time fields, an exact minute match. Allows chaining additional field lookups. Takes an integer between 0 and 59.

Example:

Event.objects.filter(timestamp\_\_minute\=29)
Event.objects.filter(time\_\_minute\=46)
Event.objects.filter(timestamp\_\_minute\_\_gte\=29)

SQL equivalent:

SELECT ... WHERE EXTRACT('minute' FROM timestamp) \= '29';
SELECT ... WHERE EXTRACT('minute' FROM time) \= '46';
SELECT ... WHERE EXTRACT('minute' FROM timestamp) \>= '29';

(The exact SQL syntax varies for each database engine.)

For datetime fields, When [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, values are converted to the current time zone before filtering.

#### `second`[¶](#second "Permalink to this headline")

For datetime and time fields, an exact second match. Allows chaining additional field lookups. Takes an integer between 0 and 59.

Example:

Event.objects.filter(timestamp\_\_second\=31)
Event.objects.filter(time\_\_second\=2)
Event.objects.filter(timestamp\_\_second\_\_gte\=31)

SQL equivalent:

SELECT ... WHERE EXTRACT('second' FROM timestamp) \= '31';
SELECT ... WHERE EXTRACT('second' FROM time) \= '2';
SELECT ... WHERE EXTRACT('second' FROM timestamp) \>= '31';

(The exact SQL syntax varies for each database engine.)

For datetime fields, when [`USE_TZ`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_TZ) is `True`, values are converted to the current time zone before filtering.

#### `isnull`[¶](#isnull "Permalink to this headline")

Takes either `True` or `False`, which correspond to SQL queries of `IS NULL` and `IS NOT NULL`, respectively.

Example:

Entry.objects.filter(pub\_date\_\_isnull\=True)

SQL equivalent:

SELECT ... WHERE pub\_date IS NULL;

#### `regex`[¶](#regex "Permalink to this headline")

Case-sensitive regular expression match.

The regular expression syntax is that of the database backend in use. In the case of SQLite, which has no built in regular expression support, this feature is provided by a (Python) user-defined REGEXP function, and the regular expression syntax is therefore that of Python's `re` module.

Example:

Entry.objects.get(title\_\_regex\=r'^(An?|The) +')

SQL equivalents:

SELECT ... WHERE title REGEXP BINARY '^(An?|The) +'; \-- MySQL

SELECT ... WHERE REGEXP\_LIKE(title, '^(An?|The) +', 'c'); \-- Oracle

SELECT ... WHERE title ~ '^(An?|The) +'; \-- PostgreSQL

SELECT ... WHERE title REGEXP '^(An?|The) +'; \-- SQLite

Using raw strings (e.g., `r'foo'` instead of `'foo'`) for passing in the regular expression syntax is recommended.

#### `iregex`[¶](#iregex "Permalink to this headline")

Case-insensitive regular expression match.

Example:

Entry.objects.get(title\_\_iregex\=r'^(an?|the) +')

SQL equivalents:

SELECT ... WHERE title REGEXP '^(an?|the) +'; \-- MySQL

SELECT ... WHERE REGEXP\_LIKE(title, '^(an?|the) +', 'i'); \-- Oracle

SELECT ... WHERE title ~\* '^(an?|the) +'; \-- PostgreSQL

SELECT ... WHERE title REGEXP '(?i)^(an?|the) +'; \-- SQLite

### Aggregation functions[¶](#aggregation-functions "Permalink to this headline")

Django provides the following aggregation functions in the `django.db.models` module. For details on how to use these aggregate functions, see [the topic guide on aggregation](https://docs.djangoproject.com/zh-hans/2.0/topics/db/aggregation/). See the [`Aggregate`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/expressions/#django.db.models.Aggregate "django.db.models.Aggregate") documentation to learn how to create your aggregates.

Warning

SQLite can't handle aggregation on date/time fields out of the box. This is because there are no native date/time fields in SQLite and Django currently emulates these features using a text field. Attempts to use aggregation on date/time fields in SQLite will raise `NotImplementedError`.

Note

Aggregation functions return `None` when used with an empty `QuerySet`. For example, the `Sum` aggregation function returns `None` instead of `0` if the `QuerySet` contains no entries. An exception is `Count`, which does return `0` if the `QuerySet` is empty.

All aggregates have the following parameters in common:

#### `output_field`[¶](#output-field "Permalink to this headline")

An optional argument that represents the [model field](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/) of the return value

Note

When combining multiple field types, Django can only determine the `output_field` if all fields are of the same type. Otherwise, you must provide the `output_field` yourself.

#### `**extra`[¶](#id7 "Permalink to this headline")

Keyword arguments that can provide extra context for the SQL generated by the aggregate.

#### `Avg`[¶](#avg "Permalink to this headline")

_class_ `Avg`(_expression_, _output\_field=FloatField()_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Avg)[¶](#django.db.models.Avg "Permalink to this definition")

Returns the mean value of the given expression, which must be numeric unless you specify a different `output_field`.

-   Default alias: `<field>__avg`
-   Return type: `float` (or the type of whatever `output_field` is specified)

#### `Count`[¶](#id8 "Permalink to this headline")

_class_ `Count`(_expression_, _distinct=False_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Count)[¶](#django.db.models.Count "Permalink to this definition")

Returns the number of objects that are related through the provided expression.

-   Default alias: `<field>__count`
-   Return type: `int`

Has one optional argument:

`distinct`[¶](#django.db.models.Count.distinct "Permalink to this definition")

If `distinct=True`, the count will only include unique instances. This is the SQL equivalent of `COUNT(DISTINCT <field>)`. The default value is `False`.

#### `Max`[¶](#max "Permalink to this headline")

_class_ `Max`(_expression_, _output\_field=None_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Max)[¶](#django.db.models.Max "Permalink to this definition")

Returns the maximum value of the given expression.

-   Default alias: `<field>__max`
-   Return type: same as input field, or `output_field` if supplied

#### `Min`[¶](#min "Permalink to this headline")

_class_ `Min`(_expression_, _output\_field=None_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Min)[¶](#django.db.models.Min "Permalink to this definition")

Returns the minimum value of the given expression.

-   Default alias: `<field>__min`
-   Return type: same as input field, or `output_field` if supplied

#### `StdDev`[¶](#stddev "Permalink to this headline")

_class_ `StdDev`(_expression_, _sample=False_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#StdDev)[¶](#django.db.models.StdDev "Permalink to this definition")

Returns the standard deviation of the data in the provided expression.

-   Default alias: `<field>__stddev`
-   Return type: `float`

Has one optional argument:

`sample`[¶](#django.db.models.StdDev.sample "Permalink to this definition")

By default, `StdDev` returns the population standard deviation. However, if `sample=True`, the return value will be the sample standard deviation.

SQLite

SQLite doesn't provide `StdDev` out of the box. An implementation is available as an extension module for SQLite. Consult the [SQlite documentation](https://www.sqlite.org/contrib) for instructions on obtaining and installing this extension.

#### `Sum`[¶](#sum "Permalink to this headline")

_class_ `Sum`(_expression_, _output\_field=None_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Sum)[¶](#django.db.models.Sum "Permalink to this definition")

Computes the sum of all values of the given expression.

-   Default alias: `<field>__sum`
-   Return type: same as input field, or `output_field` if supplied

#### `Variance`[¶](#variance "Permalink to this headline")

_class_ `Variance`(_expression_, _sample=False_, _filter=None_, _\*\*extra_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/models/aggregates/#Variance)[¶](#django.db.models.Variance "Permalink to this definition")

Returns the variance of the data in the provided expression.

-   Default alias: `<field>__variance`
-   Return type: `float`

Has one optional argument:

`sample`[¶](#django.db.models.Variance.sample "Permalink to this definition")

By default, `Variance` returns the population variance. However, if `sample=True`, the return value will be the sample variance.

SQLite

SQLite doesn't provide `Variance` out of the box. An implementation is available as an extension module for SQLite. Consult the [SQlite documentation](https://www.sqlite.org/contrib) for instructions on obtaining and installing this extension.
