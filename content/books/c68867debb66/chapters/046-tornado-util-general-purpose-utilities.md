Miscellaneous utility functions and classes.

This module is used internally by Tornado. It is not necessarily expected that the functions and classes defined here will be useful to other applications, but they are documented here in case they are.

The one public-facing part of this module is the [`Configurable`](#tornado.util.Configurable "tornado.util.Configurable") class and its [`configure`](#tornado.util.Configurable.configure "tornado.util.Configurable.configure") method, which becomes a part of the interface of its subclasses, including [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient"), [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), and [`Resolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.Resolver "tornado.netutil.Resolver").

_class_ `tornado.util.``ObjectDict`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#ObjectDict)[¶](#tornado.util.ObjectDict "永久链接至目标")

Makes a dictionary behave like an object, with attribute-style access.

_class_ `tornado.util.``GzipDecompressor`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#GzipDecompressor)[¶](#tornado.util.GzipDecompressor "永久链接至目标")

Streaming gzip decompressor.

The interface is like that of [`zlib.decompressobj`](https://docs.python.org/3.4/library/zlib.html#zlib.decompressobj "(在 Python v3.4)") (without some of the optional arguments, but it understands gzip headers and checksums.

`decompress`(_value_, _max\_length=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#GzipDecompressor.decompress)[¶](#tornado.util.GzipDecompressor.decompress "永久链接至目标")

Decompress a chunk, returning newly-available data.

Some data may be buffered for later processing; [`flush`](#tornado.util.GzipDecompressor.flush "tornado.util.GzipDecompressor.flush") must be called when there is no more input data to ensure that all data was processed.

If `max_length` is given, some input data may be left over in `unconsumed_tail`; you must retrieve this value and pass it back to a future call to [`decompress`](#tornado.util.GzipDecompressor.decompress "tornado.util.GzipDecompressor.decompress") if it is not empty.

`unconsumed_tail`[¶](#tornado.util.GzipDecompressor.unconsumed_tail "永久链接至目标")

Returns the unconsumed portion left over

`flush`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#GzipDecompressor.flush)[¶](#tornado.util.GzipDecompressor.flush "永久链接至目标")

Return any remaining buffered data not yet returned by decompress.

Also checks for errors such as truncated input. No other methods may be called on this object after [`flush`](#tornado.util.GzipDecompressor.flush "tornado.util.GzipDecompressor.flush").

`tornado.util.``import_object`(_name_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#import_object)[¶](#tornado.util.import_object "永久链接至目标")

Imports an object by name.

import\_object(‘x’) is equivalent to ‘import x’. import\_object(‘x.y.z’) is equivalent to ‘from x.y import z’.

\>>> import tornado.escape
\>>> import\_object('tornado.escape') is tornado.escape
True
\>>> import\_object('tornado.escape.utf8') is tornado.escape.utf8
True
\>>> import\_object('tornado') is tornado
True
\>>> import\_object('tornado.missing\_module')
Traceback (most recent call last):
    ...
ImportError: No module named missing\_module

`tornado.util.``errno_from_exception`(_e_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#errno_from_exception)[¶](#tornado.util.errno_from_exception "永久链接至目标")

Provides the errno from an Exception object.

There are cases that the errno attribute was not set so we pull the errno out of the args but if someone instantiates an Exception without any args you will get a tuple error. So this function abstracts all that behavior to give you a safe way to get the errno.

_class_ `tornado.util.``Configurable`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable)[¶](#tornado.util.Configurable "永久链接至目标")

Base class for configurable interfaces.

A configurable interface is an (abstract) class whose constructor acts as a factory function for one of its implementation subclasses. The implementation subclass as well as optional keyword arguments to its initializer can be set globally at runtime with [`configure`](#tornado.util.Configurable.configure "tornado.util.Configurable.configure").

By using the constructor as the factory method, the interface looks like a normal class, [`isinstance`](https://docs.python.org/3.4/library/functions.html#isinstance "(在 Python v3.4)") works as usual, etc. This pattern is most useful when the choice of implementation is likely to be a global decision (e.g. when [`epoll`](https://docs.python.org/3.4/library/select.html#select.epoll "(在 Python v3.4)") is available, always use it instead of [`select`](https://docs.python.org/3.4/library/select.html#select.select "(在 Python v3.4)")), or when a previously-monolithic class has been split into specialized subclasses.

Configurable subclasses must define the class methods [`configurable_base`](#tornado.util.Configurable.configurable_base "tornado.util.Configurable.configurable_base") and [`configurable_default`](#tornado.util.Configurable.configurable_default "tornado.util.Configurable.configurable_default"), and use the instance method [`initialize`](#tornado.util.Configurable.initialize "tornado.util.Configurable.initialize") instead of `__init__`.

_classmethod_ `configurable_base`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable.configurable_base)[¶](#tornado.util.Configurable.configurable_base "永久链接至目标")

Returns the base class of a configurable hierarchy.

This will normally return the class in which it is defined. (which is _not_ necessarily the same as the cls classmethod parameter).

_classmethod_ `configurable_default`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable.configurable_default)[¶](#tornado.util.Configurable.configurable_default "永久链接至目标")

Returns the implementation class to be used if none is configured.

`initialize`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable.initialize)[¶](#tornado.util.Configurable.initialize "永久链接至目标")

Initialize a [`Configurable`](#tornado.util.Configurable "tornado.util.Configurable") subclass instance.

Configurable classes should use [`initialize`](#tornado.util.Configurable.initialize "tornado.util.Configurable.initialize") instead of `__init__`.

在 4.2 版更改: Now accepts positional arguments in addition to keyword arguments.

_classmethod_ `configure`(_impl_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable.configure)[¶](#tornado.util.Configurable.configure "永久链接至目标")

Sets the class to use when the base class is instantiated.

Keyword arguments will be saved and added to the arguments passed to the constructor. This can be used to set global defaults for some parameters.

_classmethod_ `configured_class`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#Configurable.configured_class)[¶](#tornado.util.Configurable.configured_class "永久链接至目标")

Returns the currently configured class.

_class_ `tornado.util.``ArgReplacer`(_func_, _name_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#ArgReplacer)[¶](#tornado.util.ArgReplacer "永久链接至目标")

Replaces one value in an `args, kwargs` pair.

Inspects the function signature to find an argument by name whether it is passed by position or keyword. For use in decorators and similar wrappers.

`get_old_value`(_args_, _kwargs_, _default=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#ArgReplacer.get_old_value)[¶](#tornado.util.ArgReplacer.get_old_value "永久链接至目标")

Returns the old value of the named argument without replacing it.

Returns `default` if the argument is not present.

`replace`(_new\_value_, _args_, _kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#ArgReplacer.replace)[¶](#tornado.util.ArgReplacer.replace "永久链接至目标")

Replace the named argument in `args, kwargs` with `new_value`.

Returns `(old_value, args, kwargs)`. The returned `args` and `kwargs` objects may not be the same as the input objects, or the input objects may be mutated.

If the named argument was not found, `new_value` will be added to `kwargs` and None will be returned as `old_value`.

`tornado.util.``timedelta_to_seconds`(_td_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/util.html#timedelta_to_seconds)[¶](#tornado.util.timedelta_to_seconds "永久链接至目标")

Equivalent to td.total\_seconds() (introduced in python 2.7).
