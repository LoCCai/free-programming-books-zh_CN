_class_ `BaseDatabaseSchemaEditor`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor "Permalink to this definition")

Django's migration system is split into two parts; the logic for calculating and storing what operations should be run (`django.db.migrations`), and the database abstraction layer that turns things like "create a model" or "delete a field" into SQL - which is the job of the `SchemaEditor`.

It's unlikely that you will want to interact directly with `SchemaEditor` as a normal developer using Django, but if you want to write your own migration system, or have more advanced needs, it's a lot nicer than writing SQL.

Each database backend in Django supplies its own version of `SchemaEditor`, and it's always accessible via the `connection.schema_editor()` context manager:

with connection.schema\_editor() as schema\_editor:
    schema\_editor.delete\_model(MyModel)

It must be used via the context manager as this allows it to manage things like transactions and deferred SQL (like creating `ForeignKey` constraints).

It exposes all possible operations as methods, that should be called in the order you wish changes to be applied. Some possible operations or types of change are not possible on all databases - for example, MyISAM does not support foreign key constraints.

If you are writing or maintaining a third-party database backend for Django, you will need to provide a `SchemaEditor` implementation in order to work with 1.7's migration functionality - however, as long as your database is relatively standard in its use of SQL and relational design, you should be able to subclass one of the built-in Django `SchemaEditor` classes and just tweak the syntax a little. Also note that there are a few new database features that migrations will look for: `can_rollback_ddl` and `supports_combined_alters` are the most important.

## Methods[¶](#methods "Permalink to this headline")

### `execute()`[¶](#execute "Permalink to this headline")

`BaseDatabaseSchemaEditor.``execute`(_sql_, _params=\[\]_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.execute)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.execute "Permalink to this definition")

Executes the SQL statement passed in, with parameters if supplied. This is a simple wrapper around the normal database cursors that allows capture of the SQL to a `.sql` file if the user wishes.

### `create_model()`[¶](#create-model "Permalink to this headline")

`BaseDatabaseSchemaEditor.``create_model`(_model_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.create_model)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.create_model "Permalink to this definition")

Creates a new table in the database for the provided model, along with any unique constraints or indexes it requires.

### `delete_model()`[¶](#delete-model "Permalink to this headline")

`BaseDatabaseSchemaEditor.``delete_model`(_model_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.delete_model)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.delete_model "Permalink to this definition")

Drops the model's table in the database along with any unique constraints or indexes it has.

### `add_index()`[¶](#add-index "Permalink to this headline")

`BaseDatabaseSchemaEditor.``add_index`(_model_, _index_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.add_index)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.add_index "Permalink to this definition")

New in Django 1.11.

Adds `index` to `model`’s table.

### `remove_index()`[¶](#remove-index "Permalink to this headline")

`BaseDatabaseSchemaEditor.``remove_index`(_model_, _index_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.remove_index)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.remove_index "Permalink to this definition")

New in Django 1.11.

Removes `index` from `model`’s table.

### `alter_unique_together()`[¶](#alter-unique-together "Permalink to this headline")

`BaseDatabaseSchemaEditor.``alter_unique_together`(_model_, _old\_unique\_together_, _new\_unique\_together_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.alter_unique_together)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.alter_unique_together "Permalink to this definition")

Changes a model's [`unique_together`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.unique_together "django.db.models.Options.unique_together") value; this will add or remove unique constraints from the model's table until they match the new value.

### `alter_index_together()`[¶](#alter-index-together "Permalink to this headline")

`BaseDatabaseSchemaEditor.``alter_index_together`(_model_, _old\_index\_together_, _new\_index\_together_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.alter_index_together)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.alter_index_together "Permalink to this definition")

Changes a model's [`index_together`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/options/#django.db.models.Options.index_together "django.db.models.Options.index_together") value; this will add or remove indexes from the model's table until they match the new value.

### `alter_db_table()`[¶](#alter-db-table "Permalink to this headline")

`BaseDatabaseSchemaEditor.``alter_db_table`(_model_, _old\_db\_table_, _new\_db\_table_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.alter_db_table)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.alter_db_table "Permalink to this definition")

Renames the model's table from `old_db_table` to `new_db_table`.

### `alter_db_tablespace()`[¶](#alter-db-tablespace "Permalink to this headline")

`BaseDatabaseSchemaEditor.``alter_db_tablespace`(_model_, _old\_db\_tablespace_, _new\_db\_tablespace_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.alter_db_tablespace)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.alter_db_tablespace "Permalink to this definition")

Moves the model's table from one tablespace to another.

### `add_field()`[¶](#add-field "Permalink to this headline")

`BaseDatabaseSchemaEditor.``add_field`(_model_, _field_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.add_field)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.add_field "Permalink to this definition")

Adds a column (or sometimes multiple) to the model's table to represent the field. This will also add indexes or a unique constraint if the field has `db_index=True` or `unique=True`.

If the field is a `ManyToManyField` without a value for `through`, instead of creating a column, it will make a table to represent the relationship. If `through` is provided, it is a no-op.

If the field is a `ForeignKey`, this will also add the foreign key constraint to the column.

### `remove_field()`[¶](#remove-field "Permalink to this headline")

`BaseDatabaseSchemaEditor.``remove_field`(_model_, _field_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.remove_field)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.remove_field "Permalink to this definition")

Removes the column(s) representing the field from the model's table, along with any unique constraints, foreign key constraints, or indexes caused by that field.

If the field is a ManyToManyField without a value for `through`, it will remove the table created to track the relationship. If `through` is provided, it is a no-op.

### `alter_field()`[¶](#alter-field "Permalink to this headline")

`BaseDatabaseSchemaEditor.``alter_field`(_model_, _old\_field_, _new\_field_, _strict=False_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/db/backends/base/schema/#BaseDatabaseSchemaEditor.alter_field)[¶](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.alter_field "Permalink to this definition")

This transforms the field on the model from the old field to the new one. This includes changing the name of the column (the [`db_column`](https://docs.djangoproject.com/zh-hans/2.0/ref/models/fields/#django.db.models.Field.db_column "django.db.models.Field.db_column") attribute), changing the type of the field (if the field class changes), changing the `NULL` status of the field, adding or removing field-only unique constraints and indexes, changing primary key, and changing the destination of `ForeignKey` constraints.

The most common transformation this cannot do is transforming a `ManyToManyField` into a normal Field or vice-versa; Django cannot do this without losing data, and so it will refuse to do it. Instead, [`remove_field()`](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.remove_field "django.db.backends.base.schema.BaseDatabaseSchemaEditor.remove_field") and [`add_field()`](#django.db.backends.base.schema.BaseDatabaseSchemaEditor.add_field "django.db.backends.base.schema.BaseDatabaseSchemaEditor.add_field") should be called separately.

If the database has the `supports_combined_alters`, Django will try and do as many of these in a single database call as possible; otherwise, it will issue a separate ALTER statement for each change, but will not issue ALTERs where no change is required (as South often did).

## Attributes[¶](#attributes "Permalink to this headline")

All attributes should be considered read-only unless stated otherwise.

### `connection`[¶](#connection "Permalink to this headline")

`SchemaEditor.``connection`[¶](#django.db.backends.base.schema.SchemaEditor.connection "Permalink to this definition")

A connection object to the database. A useful attribute of the connection is `alias` which can be used to determine the name of the database being accessed.

This is useful when doing data migrations for [migrations with multiple databases](https://docs.djangoproject.com/zh-hans/2.0/howto/writing-migrations/#data-migrations-and-multiple-databases).
