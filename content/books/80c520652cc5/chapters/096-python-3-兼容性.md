## Porting to Python 3[¶](#porting-to-python-3 "Permalink to this headline")

Django 1.5 is the first version of Django to support Python 3. The same code runs both on Python 2 (≥ 2.6.5) and Python 3 (≥ 3.2), thanks to the [six](http://packages.python.org/six/) compatibility layer.

This document is primarily targeted at authors of pluggable application who want to support both Python 2 and 3. It also describes guidelines that apply to Django’s code.

## Philosophy[¶](#philosophy "Permalink to this headline")

This document assumes that you are familiar with the changes between Python 2 and Python 3. If you aren’t, read [Python’s official porting guide](http://docs.python.org/py3k/howto/pyporting.html) first. Refreshing your knowledge of unicode handling on Python 2 and 3 will help; the [Pragmatic Unicode](http://nedbatchelder.com/text/unipain.html) presentation is a good resource.

Django uses the _Python 2/3 Compatible Source_ strategy. Of course, you’re free to chose another strategy for your own code, especially if you don’t need to stay compatible with Python 2. But authors of pluggable applications are encouraged to use the same porting strategy as Django itself.

Writing compatible code is much easier if you target Python ≥ 2.6. Django 1.5 introduces compatibility tools such as [django.utils.six](#module-django.utils.six "django.utils.six"). For convenience, forwards-compatible aliases were introduced in Django 1.4.2. If your application takes advantage of these tools, it will require Django ≥ 1.4.2.

Obviously, writing compatible source code adds some overhead, and that can cause frustration. Django’s developers have found that attempting to write Python 3 code that’s compatible with Python 2 is much more rewarding than the opposite. Not only does that make your code more future-proof, but Python 3’s advantages (like the saner string handling) start shining quickly. Dealing with Python 2 becomes a backwards compatibility requirement, and we as developers are used to dealing with such constraints.

Porting tools provided by Django are inspired by this philosophy, and it’s reflected throughout this guide.

## Porting tips[¶](#porting-tips "Permalink to this headline")

### Unicode literals[¶](#unicode-literals "Permalink to this headline")

This step consists in:

-   Adding from \_\_future\_\_ import unicode\_literals at the top of your Python modules – it’s best to put it in each and every module, otherwise you’ll keep checking the top of your files to see which mode is in effect;
-   Removing the u prefix before unicode strings;
-   Adding a b prefix before bytestrings.

Performing these changes systematically guarantees backwards compatibility.

However, Django applications generally don’t need bytestrings, since Django only exposes unicode interfaces to the programmer. Python 3 discourages using bytestrings, except for binary data or byte-oriented interfaces. Python 2 makes bytestrings and unicode strings effectively interchangeable, as long as they only contain ASCII data. Take advantage of this to use unicode strings wherever possible and avoid the b prefixes.

Note

Python 2’s u prefix is a syntax error in Python 3.2 but it will be allowed again in Python 3.3 thanks to [**PEP 414**](http://www.python.org/dev/peps/pep-0414). Thus, this transformation is optional if you target Python ≥ 3.3. It’s still recommended, per the “write Python 3 code” philosophy.

### String handling[¶](#string-handling "Permalink to this headline")

Python 2’s [unicode()](http://docs.python.org/2.7/library/functions.html#unicode "(in Python v2.7)") type was renamed [str()](http://docs.python.org/2.7/library/functions.html#str "(in Python v2.7)") in Python 3, [str()](http://docs.python.org/2.7/library/functions.html#str "(in Python v2.7)") was renamed bytes(), and [basestring()](http://docs.python.org/2.7/library/functions.html#basestring "(in Python v2.7)") disappeared. [six](http://packages.python.org/six/) provides [_tools_](#string-handling-with-six) to deal with these changes.

Django also contains several string related classes and functions in the [django.utils.encoding](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#module-django.utils.encoding "django.utils.encoding: A series of helper classes and function to manage character encoding.") and [django.utils.safestring](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#module-django.utils.safestring "django.utils.safestring: Functions and classes for working with strings that can be displayed safely without further escaping in HTML.") modules. Their names used the words str, which doesn’t mean the same thing in Python 2 and Python 3, and unicode, which doesn’t exist in Python 3. In order to avoid ambiguity and confusion these concepts were renamed bytes and text.

Here are the name changes in [django.utils.encoding](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#module-django.utils.encoding "django.utils.encoding: A series of helper classes and function to manage character encoding."):

 
| Old name | New name |
| --- | --- |
| smart\_str | smart\_bytes |
| smart\_unicode | smart\_text |
| force\_unicode | force\_text |

For backwards compatibility, the old names still work on Python 2. Under Python 3, smart\_str is an alias for smart\_text.

For forwards compatibility, the new names work as of Django 1.4.2.

Note

[django.utils.encoding](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#module-django.utils.encoding "django.utils.encoding: A series of helper classes and function to manage character encoding.") was deeply refactored in Django 1.5 to provide a more consistent API. Check its documentation for more information.

[django.utils.safestring](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#module-django.utils.safestring "django.utils.safestring: Functions and classes for working with strings that can be displayed safely without further escaping in HTML.") is mostly used via the [mark\_safe()](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#django.utils.safestring.mark_safe "django.utils.safestring.mark_safe") and [mark\_for\_escaping()](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#django.utils.safestring.mark_for_escaping "django.utils.safestring.mark_for_escaping") functions, which didn’t change. In case you’re using the internals, here are the name changes:

 
| Old name | New name |
| --- | --- |
| EscapeString | EscapeBytes |
| EscapeUnicode | EscapeText |
| SafeString | SafeBytes |
| SafeUnicode | SafeText |

For backwards compatibility, the old names still work on Python 2. Under Python 3, EscapeString and SafeString are aliases for EscapeText and SafeText respectively.

For forwards compatibility, the new names work as of Django 1.4.2.

### [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") and [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") methods[¶](#str-and-unicode-methods "Permalink to this headline")

In Python 2, the object model specifies [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") and [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") methods. If these methods exist, they must return str (bytes) and unicode (text) respectively.

The print statement and the [str()](http://docs.python.org/2.7/library/functions.html#str "(in Python v2.7)") built-in call [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") to determine the human-readable representation of an object. The [unicode()](http://docs.python.org/2.7/library/functions.html#unicode "(in Python v2.7)") built-in calls [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") if it exists, and otherwise falls back to [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") and decodes the result with the system encoding. Conversely, the [Model](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model "django.db.models.Model") base class automatically derives [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") from [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") by encoding to UTF-8.

In Python 3, there’s simply [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)"), which must return str (text).

(It is also possible to define \_\_bytes\_\_(), but Django application have little use for that method, because they hardly ever deal with bytes.)

Django provides a simple way to define [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") and [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") methods that work on Python 2 and 3: you must define a [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") method returning text and to apply the [python\_2\_unicode\_compatible()](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#django.utils.encoding.python_2_unicode_compatible "django.utils.encoding.python_2_unicode_compatible") decorator.

On Python 3, the decorator is a no-op. On Python 2, it defines appropriate [\_\_unicode\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__unicode__ "(in Python v2.7)") and [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") methods (replacing the original [\_\_str\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__str__ "(in Python v2.7)") method in the process). Here’s an example:

from \_\_future\_\_ import unicode\_literals
from django.utils.encoding import python\_2\_unicode\_compatible

@python\_2\_unicode\_compatible
class MyClass(object):
    def \_\_str\_\_(self):
        return "Instance of my class"

This technique is the best match for Django’s porting philosophy.

For forwards compatibility, this decorator is available as of Django 1.4.2.

Finally, note that [\_\_repr\_\_()](http://docs.python.org/2.7/reference/datamodel.html#object.__repr__ "(in Python v2.7)") must return a str on all versions of Python.

## Coding guidelines[¶](#coding-guidelines "Permalink to this headline")

The following guidelines are enforced in Django’s source code. They’re also recommended for third-party application who follow the same porting strategy.

### Syntax requirements[¶](#syntax-requirements "Permalink to this headline")

#### Unicode[¶](#unicode "Permalink to this headline")

In Python 3, all strings are considered Unicode by default. The unicode type from Python 2 is called str in Python 3, and str becomes bytes.

You mustn’t use the u prefix before a unicode string literal because it’s a syntax error in Python 3.2. You must prefix byte strings with b.

In order to enable the same behavior in Python 2, every module must import unicode\_literals from \_\_future\_\_:

from \_\_future\_\_ import unicode\_literals

my\_string \= "This is an unicode literal"
my\_bytestring \= b"This is a bytestring"

If you need a byte string literal under Python 2 and a unicode string literal under Python 3, use the [str()](http://docs.python.org/2.7/library/functions.html#str "(in Python v2.7)") builtin:

str('my string')

In Python 3, there aren’t any automatic conversions between str and bytes, and the [codecs](http://docs.python.org/2.7/library/codecs.html#codecs "(in Python v2.7)") module became more strict. [str.decode()](http://docs.python.org/2.7/library/stdtypes.html#str.decode "(in Python v2.7)") always returns bytes, and bytes.decode always returns str. As a consequence, the following pattern is sometimes necessary:

value \= value.encode('ascii', 'ignore').decode('ascii')

Be cautious if you have to [index bytestrings](http://docs.python.org/py3k/howto/pyporting.html#bytes-literals).

#### Exceptions[¶](#exceptions "Permalink to this headline")

When you capture exceptions, use the as keyword:

try:
    ...
except MyException as exc:
    ...

This older syntax was removed in Python 3:

try:
    ...
except MyException, exc:    \# Don't do that!
    ...

The syntax to reraise an exception with a different traceback also changed. Use [six.reraise()](http://packages.python.org/six/index.html#six.reraise "(in six v1.4)").

### Magic methods[¶](#magic-methods "Permalink to this headline")

Use the patterns below to handle magic methods renamed in Python 3.

#### Iterators[¶](#iterators "Permalink to this headline")

class MyIterator(six.Iterator):
    def \_\_iter\_\_(self):
        return self             \# implement some logic here

    def \_\_next\_\_(self):
        raise StopIteration     \# implement some logic here

#### Boolean evaluation[¶](#boolean-evaluation "Permalink to this headline")

class MyBoolean(object):

    def \_\_bool\_\_(self):
        return True             \# implement some logic here

    def \_\_nonzero\_\_(self):      \# Python 2 compatibility
        return type(self).\_\_bool\_\_(self)

#### Division[¶](#division "Permalink to this headline")

class MyDivisible(object):

    def \_\_truediv\_\_(self, other):
        return self / other     \# implement some logic here

    def \_\_div\_\_(self, other):   \# Python 2 compatibility
        return type(self).\_\_truediv\_\_(self, other)

    def \_\_itruediv\_\_(self, other):
        return self // other    \# implement some logic here

    def \_\_idiv\_\_(self, other):  \# Python 2 compatibility
        return type(self).\_\_itruediv\_\_(self, other)

### Writing compatible code with six[¶](#writing-compatible-code-with-six "Permalink to this headline")

[six](http://packages.python.org/six/) is the canonical compatibility library for supporting Python 2 and 3 in a single codebase. Read its documentation!

[six](http://packages.python.org/six/index.html#module-six "(in six v1.4)") is bundled with Django as of version 1.4.2. You can import it as [django.utils.six](#module-django.utils.six "django.utils.six").

Here are the most common changes required to write compatible code.

#### String handling[¶](#string-handling-with-six "Permalink to this headline")

The basestring and unicode types were removed in Python 3, and the meaning of str changed. To test these types, use the following idioms:

isinstance(myvalue, six.string\_types)       \# replacement for basestring
isinstance(myvalue, six.text\_type)          \# replacement for unicode
isinstance(myvalue, bytes)                  \# replacement for str

Python ≥ 2.6 provides bytes as an alias for str, so you don’t need [six.binary\_type](http://packages.python.org/six/index.html#six.binary_type "(in six v1.4)").

#### long[¶](#long "Permalink to this headline")

The long type no longer exists in Python 3. 1L is a syntax error. Use [six.integer\_types](http://packages.python.org/six/index.html#six.integer_types "(in six v1.4)") check if a value is an integer or a long:

isinstance(myvalue, six.integer\_types)      \# replacement for (int, long)

#### xrange[¶](#xrange "Permalink to this headline")

Import six.moves.xrange wherever you use xrange.

#### Moved modules[¶](#moved-modules "Permalink to this headline")

Some modules were renamed in Python 3. The [django.utils.six.moves](http://packages.python.org/six/index.html#module-six.moves "(in six v1.4)") module provides a compatible location to import them.

The urllib, urllib2 and urlparse modules were reworked in depth and [django.utils.six.moves](http://packages.python.org/six/index.html#module-six.moves "(in six v1.4)") doesn’t handle them. Django explicitly tries both locations, as follows:

try:
    from urllib.parse import urlparse, urlunparse
except ImportError:     \# Python 2
    from urlparse import urlparse, urlunparse

#### PY3[¶](#py3 "Permalink to this headline")

If you need different code in Python 2 and Python 3, check [six.PY3](http://packages.python.org/six/index.html#six.PY3 "(in six v1.4)"):

if six.PY3:
    # do stuff Python 3-wise
else:
    # do stuff Python 2-wise

This is a last resort solution when [six](http://packages.python.org/six/index.html#module-six "(in six v1.4)") doesn’t provide an appropriate function.

### Customizations of six[¶](#customizations-of-six "Permalink to this headline")

The version of six bundled with Django includes one extra function:

iterlists(_MultiValueDict_)[¶](#django.utils.six.iterlists "Permalink to this definition")

Returns an iterator over the lists of values of a MultiValueDict. This replaces iterlists() on Python 2 and lists() on Python 3.

assertRaisesRegex(_testcase_, _\*args_, _\*\*kwargs_)[¶](#django.utils.six.assertRaisesRegex "Permalink to this definition")

This replaces testcase.assertRaisesRegexp on Python 2, and testcase.assertRaisesRegex on Python 3. assertRaisesRegexp still exists in current Python3 versions, but issues a warning.

In addition to six’ defaults moves, Django’s version provides thread as \_thread and dummy\_thread as \_dummy\_thread.
