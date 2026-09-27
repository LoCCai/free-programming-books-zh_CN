#### Table names[¶](#table-names "Permalink to this headline")

To save you time, Django automatically derives the name of the database table from the name of your model class and the app that contains it. A model's database table name is constructed by joining the model's "app label" -- the name you used in [`manage.py startapp`](https://docs.djangoproject.com/zh-hans/2.0/ref/django-admin/#django-admin-startapp) -- to the model's class name, with an underscore between them.

For example, if you have an app `bookstore` (as created by `manage.py startapp bookstore`), a model defined as `class Book` will have a database table named `bookstore_book`.

To override the database table name, use the `db_table` parameter in `class Meta`.

If your database table name is an SQL reserved word, or contains characters that aren't allowed in Python variable names -- notably, the hyphen -- that's OK. Django quotes column and table names behind the scenes.

Use lowercase table names for MySQL

It is strongly advised that you use lowercase table names when you override the table name via `db_table`, particularly if you are using the MySQL backend. See the [MySQL notes](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#mysql-notes) for more details.

Table name quoting for Oracle

In order to meet the 30-char limitation Oracle has on table names, and match the usual conventions for Oracle databases, Django may shorten table names and turn them all-uppercase. To prevent such transformations, use a quoted name as the value for `db_table`:

db\_table \= '"name\_left\_in\_lowercase"'

Such quoted names can also be used with Django's other supported database backends; except for Oracle, however, the quotes have no effect. See the [Oracle notes](https://docs.djangoproject.com/zh-hans/2.0/ref/databases/#oracle-notes) for more details.
