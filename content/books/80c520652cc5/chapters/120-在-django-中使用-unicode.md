## Unicode data[¶](#unicode-data "Permalink to this headline")

Django natively supports Unicode data everywhere. Providing your database can somehow store the data, you can safely pass around Unicode strings to templates, models and the database.

This document tells you what you need to know if you’re writing applications that use data or templates that are encoded in something other than ASCII.

## Creating the database[¶](#creating-the-database "Permalink to this headline")

Make sure your database is configured to be able to store arbitrary string data. Normally, this means giving it an encoding of UTF-8 or UTF-16. If you use a more restrictive encoding – for example, latin1 (iso8859-1) – you won’t be able to store certain characters in the database, and information will be lost.

-   MySQL users, refer to the [MySQL manual](http://dev.mysql.com/doc/refman/5.1/en/charset-database.html) (section 9.1.3.2 for MySQL 5.1) for details on how to set or alter the database character set encoding.
-   PostgreSQL users, refer to the [PostgreSQL manual](http://www.postgresql.org/docs/8.2/static/multibyte.html#AEN24104) (section 21.2.2 in PostgreSQL 8) for details on creating databases with the correct encoding.
-   SQLite users, there is nothing you need to do. SQLite always uses UTF-8 for internal encoding.

All of Django’s database backends automatically convert Unicode strings into the appropriate encoding for talking to the database. They also automatically convert strings retrieved from the database into Python Unicode strings. You don’t even need to tell Django what encoding your database uses: that is handled transparently.

For more, see the section “The database API” below.

## General string handling[¶](#general-string-handling "Permalink to this headline")

Whenever you use strings with Django – e.g., in database lookups, template rendering or anywhere else – you have two choices for encoding those strings. You can use Unicode strings, or you can use normal strings (sometimes called “bytestrings”) that are encoded using UTF-8.

Changed in Django 1.5.

In Python 3, the logic is reversed, that is normal strings are Unicode, and when you want to specifically create a bytestring, you have to prefix the string with a ‘b’. As we are doing in Django code from version 1.5, we recommend that you import unicode\_literals from the \_\_future\_\_ library in your code. Then, when you specifically want to create a bytestring literal, prefix the string with ‘b’.

Python 2 legacy:

my\_string \= "This is a bytestring"
my\_unicode \= u"This is an Unicode string"

Python 2 with unicode literals or Python 3:

from \_\_future\_\_ import unicode\_literals

my\_string \= b"This is a bytestring"
my\_unicode \= "This is an Unicode string"

See also [_Python 3 compatibility_](https://django-chinese-docs.readthedocs.io/en/latest/topics/python3.html).

Warning

A bytestring does not carry any information with it about its encoding. For that reason, we have to make an assumption, and Django assumes that all bytestrings are in UTF-8.

If you pass a string to Django that has been encoded in some other format, things will go wrong in interesting ways. Usually, Django will raise a UnicodeDecodeError at some point.

If your code only uses ASCII data, it’s safe to use your normal strings, passing them around at will, because ASCII is a subset of UTF-8.

Don’t be fooled into thinking that if your [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) setting is set to something other than 'utf-8' you can use that other encoding in your bytestrings! [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) only applies to the strings generated as the result of template rendering (and email). Django will always assume UTF-8 encoding for internal bytestrings. The reason for this is that the [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) setting is not actually under your control (if you are the application developer). It’s under the control of the person installing and using your application – and if that person chooses a different setting, your code must still continue to work. Ergo, it cannot rely on that setting.

In most cases when Django is dealing with strings, it will convert them to Unicode strings before doing anything else. So, as a general rule, if you pass in a bytestring, be prepared to receive a Unicode string back in the result.

### Translated strings[¶](#translated-strings "Permalink to this headline")

Aside from Unicode strings and bytestrings, there’s a third type of string-like object you may encounter when using Django. The framework’s internationalization features introduce the concept of a “lazy translation” – a string that has been marked as translated but whose actual translation result isn’t determined until the object is used in a string. This feature is useful in cases where the translation locale is unknown until the string is used, even though the string might have originally been created when the code was first imported.

Normally, you won’t have to worry about lazy translations. Just be aware that if you examine an object and it claims to be a django.utils.functional.\_\_proxy\_\_ object, it is a lazy translation. Calling unicode() with the lazy translation as the argument will generate a Unicode string in the current locale.

For more details about lazy translation objects, refer to the [_internationalization_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/index.html) documentation.

### Useful utility functions[¶](#useful-utility-functions "Permalink to this headline")

Because some string operations come up again and again, Django ships with a few useful functions that should make working with Unicode and bytestring objects a bit easier.

#### Conversion functions[¶](#conversion-functions "Permalink to this headline")

The django.utils.encoding module contains a few functions that are handy for converting back and forth between Unicode and bytestrings.

-   smart\_text(s, encoding='utf-8', strings\_only=False, errors='strict') converts its input to a Unicode string. The encoding parameter specifies the input encoding. (For example, Django uses this internally when processing form input data, which might not be UTF-8 encoded.) The strings\_only parameter, if set to True, will result in Python numbers, booleans and None not being converted to a string (they keep their original types). The errors parameter takes any of the values that are accepted by Python’s unicode() function for its error handling.
    
    If you pass smart\_text() an object that has a \_\_unicode\_\_ method, it will use that method to do the conversion.
    
-   force\_text(s, encoding='utf-8', strings\_only=False, errors='strict') is identical to smart\_text() in almost all cases. The difference is when the first argument is a [_lazy translation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/translation.html#lazy-translations) instance. While smart\_text() preserves lazy translations, force\_text() forces those objects to a Unicode string (causing the translation to occur). Normally, you’ll want to use smart\_text(). However, force\_text() is useful in template tags and filters that absolutely _must_ have a string to work with, not just something that can be converted to a string.
    
-   smart\_bytes(s, encoding='utf-8', strings\_only=False, errors='strict') is essentially the opposite of smart\_text(). It forces the first argument to a bytestring. The strings\_only parameter has the same behavior as for smart\_text() and force\_text(). This is slightly different semantics from Python’s builtin str() function, but the difference is needed in a few places within Django’s internals.
    

Normally, you’ll only need to use smart\_text(). Call it as early as possible on any input data that might be either Unicode or a bytestring, and from then on, you can treat the result as always being Unicode.

#### URI and IRI handling[¶](#uri-and-iri-handling "Permalink to this headline")

Web frameworks have to deal with URLs (which are a type of [IRI](http://www.ietf.org/rfc/rfc3987.txt)). One requirement of URLs is that they are encoded using only ASCII characters. However, in an international environment, you might need to construct a URL from an [IRI](http://www.ietf.org/rfc/rfc3987.txt) – very loosely speaking, a [URI](http://www.ietf.org/rfc/rfc2396.txt) that can contain Unicode characters. Quoting and converting an IRI to URI can be a little tricky, so Django provides some assistance.

-   The function django.utils.encoding.iri\_to\_uri() implements the conversion from IRI to URI as required by the specification ([**RFC 3987**](http://tools.ietf.org/html/rfc3987.html)).
-   The functions django.utils.http.urlquote() and django.utils.http.urlquote\_plus() are versions of Python’s standard urllib.quote() and urllib.quote\_plus() that work with non-ASCII characters. (The data is converted to UTF-8 prior to encoding.)

These two groups of functions have slightly different purposes, and it’s important to keep them straight. Normally, you would use urlquote() on the individual portions of the IRI or URI path so that any reserved characters such as ‘&’ or ‘%’ are correctly encoded. Then, you apply iri\_to\_uri() to the full IRI and it converts any non-ASCII characters to the correct encoded values.

Note

Technically, it isn’t correct to say that iri\_to\_uri() implements the full algorithm in the IRI specification. It doesn’t (yet) perform the international domain name encoding portion of the algorithm.

The iri\_to\_uri() function will not change ASCII characters that are otherwise permitted in a URL. So, for example, the character ‘%’ is not further encoded when passed to iri\_to\_uri(). This means you can pass a full URL to this function and it will not mess up the query string or anything like that.

An example might clarify things here:

\>>> urlquote(u'Paris & Orléans')
u'Paris%20%26%20Orl%C3%A9ans'
\>>> iri\_to\_uri(u'/favorites/François/%s' % urlquote('Paris & Orléans'))
'/favorites/Fran%C3%A7ois/Paris%20%26%20Orl%C3%A9ans'

If you look carefully, you can see that the portion that was generated by urlquote() in the second example was not double-quoted when passed to iri\_to\_uri(). This is a very important and useful feature. It means that you can construct your IRI without worrying about whether it contains non-ASCII characters and then, right at the end, call iri\_to\_uri() on the result.

The iri\_to\_uri() function is also idempotent, which means the following is always true:

iri\_to\_uri(iri\_to\_uri(some\_string)) \= iri\_to\_uri(some\_string)

So you can safely call it multiple times on the same IRI without risking double-quoting problems.

## Models[¶](#models "Permalink to this headline")

Because all strings are returned from the database as Unicode strings, model fields that are character based (CharField, TextField, URLField, etc) will contain Unicode values when Django retrieves data from the database. This is _always_ the case, even if the data could fit into an ASCII bytestring.

You can pass in bytestrings when creating a model or populating a field, and Django will convert it to Unicode when it needs to.

### Choosing between \_\_str\_\_() and \_\_unicode\_\_()[¶](#choosing-between-str-and-unicode "Permalink to this headline")

One consequence of using Unicode by default is that you have to take some care when printing data from the model.

In particular, rather than giving your model a \_\_str\_\_() method, we recommended you implement a \_\_unicode\_\_() method. In the \_\_unicode\_\_() method, you can quite safely return the values of all your fields without having to worry about whether they fit into a bytestring or not. (The way Python works, the result of \_\_str\_\_() is _always_ a bytestring, even if you accidentally try to return a Unicode object).

You can still create a \_\_str\_\_() method on your models if you want, of course, but you shouldn’t need to do this unless you have a good reason. Django’s Model base class automatically provides a \_\_str\_\_() implementation that calls \_\_unicode\_\_() and encodes the result into UTF-8. This means you’ll normally only need to implement a \_\_unicode\_\_() method and let Django handle the coercion to a bytestring when required.

### Taking care in get\_absolute\_url()[¶](#taking-care-in-get-absolute-url "Permalink to this headline")

URLs can only contain ASCII characters. If you’re constructing a URL from pieces of data that might be non-ASCII, be careful to encode the results in a way that is suitable for a URL. The [reverse()](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.reverse "django.core.urlresolvers.reverse") function handles this for you automatically.

If you’re constructing a URL manually (i.e., _not_ using the reverse() function), you’ll need to take care of the encoding yourself. In this case, use the iri\_to\_uri() and urlquote() functions that were documented [above](#id1). For example:

from django.utils.encoding import iri\_to\_uri
from django.utils.http import urlquote

def get\_absolute\_url(self):
    url \= u'/person/%s/?x=0&y=0' % urlquote(self.location)
    return iri\_to\_uri(url)

This function returns a correctly encoded URL even if self.location is something like “Jack visited Paris & Orléans”. (In fact, the iri\_to\_uri() call isn’t strictly necessary in the above example, because all the non-ASCII characters would have been removed in quoting in the first line.)

## The database API[¶](#the-database-api "Permalink to this headline")

You can pass either Unicode strings or UTF-8 bytestrings as arguments to filter() methods and the like in the database API. The following two querysets are identical:

from \_\_future\_\_ import unicode\_literals

qs \= People.objects.filter(name\_\_contains\='Å')
qs \= People.objects.filter(name\_\_contains\=b'\\xc3\\x85') \# UTF-8 encoding of Å

## Templates[¶](#templates "Permalink to this headline")

You can use either Unicode or bytestrings when creating templates manually:

from \_\_future\_\_ import unicode\_literals
from django.template import Template
t1 \= Template(b'This is a bytestring template.')
t2 \= Template('This is a Unicode template.')

But the common case is to read templates from the filesystem, and this creates a slight complication: not all filesystems store their data encoded as UTF-8. If your template files are not stored with a UTF-8 encoding, set the [FILE\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-FILE_CHARSET) setting to the encoding of the files on disk. When Django reads in a template file, it will convert the data from this encoding to Unicode. ([FILE\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-FILE_CHARSET) is set to 'utf-8' by default.)

The [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) setting controls the encoding of rendered templates. This is set to UTF-8 by default.

## Email[¶](#email "Permalink to this headline")

Django’s email framework (in django.core.mail) supports Unicode transparently. You can use Unicode data in the message bodies and any headers. However, you’re still obligated to respect the requirements of the email specifications, so, for example, email addresses should use only ASCII characters.

The following code example demonstrates that everything except email addresses can be non-ASCII:

from \_\_future\_\_ import unicode\_literals
from django.core.mail import EmailMessage

subject \= 'My visit to Sør-Trøndelag'
sender \= 'Arnbjörg Ráðormsdóttir <arnbjorg@example.com>'
recipients \= \['Fred <fred@example.com'\]
body \= '...'
msg \= EmailMessage(subject, body, sender, recipients)
msg.attach("Une pièce jointe.pdf", "%PDF-1.4.%...", mimetype\="application/pdf")
msg.send()

## Form submission[¶](#form-submission "Permalink to this headline")

HTML form submission is a tricky area. There’s no guarantee that the submission will include encoding information, which means the framework might have to guess at the encoding of submitted data.

Django adopts a “lazy” approach to decoding form data. The data in an HttpRequest object is only decoded when you access it. In fact, most of the data is not decoded at all. Only the HttpRequest.GET and HttpRequest.POST data structures have any decoding applied to them. Those two fields will return their members as Unicode data. All other attributes and methods of HttpRequest return data exactly as it was submitted by the client.

By default, the [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) setting is used as the assumed encoding for form data. If you need to change this for a particular form, you can set the encoding attribute on an HttpRequest instance. For example:

def some\_view(request):
    \# We know that the data must be encoded as KOI8-R (for some reason).
    request.encoding \= 'koi8-r'
    ...

You can even change the encoding after having accessed request.GET or request.POST, and all subsequent accesses will use the new encoding.

Most developers won’t need to worry about changing form encoding, but this is a useful feature for applications that talk to legacy systems whose encoding you cannot control.

Django does not decode the data of file uploads, because that data is normally treated as collections of bytes, rather than strings. Any automatic decoding there would alter the meaning of the stream of bytes.
