## Request and response objects[¶](#module-django.http "Permalink to this headline")

## Quick overview[¶](#quick-overview "Permalink to this headline")

Django uses request and response objects to pass state through the system.

When a page is requested, Django creates an [HttpRequest](#django.http.HttpRequest "django.http.HttpRequest") object that contains metadata about the request. Then Django loads the appropriate view, passing the [HttpRequest](#django.http.HttpRequest "django.http.HttpRequest") as the first argument to the view function. Each view is responsible for returning an [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") object.

This document explains the APIs for [HttpRequest](#django.http.HttpRequest "django.http.HttpRequest") and [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") objects, which are defined in the [django.http](#module-django.http "django.http: Classes dealing with HTTP requests and responses.") module.

## HttpRequest objects[¶](#httprequest-objects "Permalink to this headline")

_class_ HttpRequest[¶](#django.http.HttpRequest "Permalink to this definition")

### Attributes[¶](#attributes "Permalink to this headline")

All attributes should be considered read-only, unless stated otherwise below. session is a notable exception.

HttpRequest.body[¶](#django.http.HttpRequest.body "Permalink to this definition")

Changed in Django 1.4.

Before Django 1.4, HttpRequest.body was named HttpRequest.raw\_post\_data.

The raw HTTP request body as a byte string. This is useful for processing data in different ways than conventional HTML forms: binary images, XML payload etc. For processing conventional form data, use HttpRequest.POST.

You can also read from an HttpRequest using a file-like interface. See [HttpRequest.read()](#django.http.HttpRequest.read "django.http.HttpRequest.read").

HttpRequest.path[¶](#django.http.HttpRequest.path "Permalink to this definition")

A string representing the full path to the requested page, not including the domain.

Example: "/music/bands/the\_beatles/"

HttpRequest.path\_info[¶](#django.http.HttpRequest.path_info "Permalink to this definition")

Under some Web server configurations, the portion of the URL after the host name is split up into a script prefix portion and a path info portion. The path\_info attribute always contains the path info portion of the path, no matter what Web server is being used. Using this instead of [path](#django.http.HttpRequest.path "django.http.HttpRequest.path") can make your code easier to move between test and deployment servers.

For example, if the WSGIScriptAlias for your application is set to "/minfo", then path might be "/minfo/music/bands/the\_beatles/" and path\_info would be "/music/bands/the\_beatles/".

HttpRequest.method[¶](#django.http.HttpRequest.method "Permalink to this definition")

A string representing the HTTP method used in the request. This is guaranteed to be uppercase. Example:

if request.method \== 'GET':
    do\_something()
elif request.method \== 'POST':
    do\_something\_else()

HttpRequest.encoding[¶](#django.http.HttpRequest.encoding "Permalink to this definition")

A string representing the current encoding used to decode form submission data (or None, which means the [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) setting is used). You can write to this attribute to change the encoding used when accessing the form data. Any subsequent attribute accesses (such as reading from GET or POST) will use the new encoding value. Useful if you know the form data is not in the [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) encoding.

HttpRequest.GET[¶](#django.http.HttpRequest.GET "Permalink to this definition")

A dictionary-like object containing all given HTTP GET parameters. See the [QueryDict](#django.http.QueryDict "django.http.QueryDict") documentation below.

HttpRequest.POST[¶](#django.http.HttpRequest.POST "Permalink to this definition")

A dictionary-like object containing all given HTTP POST parameters, providing that the request contains form data. See the [QueryDict](#django.http.QueryDict "django.http.QueryDict") documentation below. If you need to access raw or non-form data posted in the request, access this through the [HttpRequest.body](#django.http.HttpRequest.body "django.http.HttpRequest.body") attribute instead.

Changed in Django 1.5: Before Django 1.5, HttpRequest.POST contained non-form data.

It’s possible that a request can come in via POST with an empty POST dictionary – if, say, a form is requested via the POST HTTP method but does not include form data. Therefore, you shouldn’t use if request.POST to check for use of the POST method; instead, use if request.method \== "POST" (see above).

Note: POST does _not_ include file-upload information. See FILES.

HttpRequest.REQUEST[¶](#django.http.HttpRequest.REQUEST "Permalink to this definition")

For convenience, a dictionary-like object that searches POST first, then GET. Inspired by PHP’s $\_REQUEST.

For example, if GET \= {"name": "john"} and POST \= {"age": '34'}, REQUEST\["name"\] would be "john", and REQUEST\["age"\] would be "34".

It’s strongly suggested that you use GET and POST instead of REQUEST, because the former are more explicit.

HttpRequest.COOKIES[¶](#django.http.HttpRequest.COOKIES "Permalink to this definition")

A standard Python dictionary containing all cookies. Keys and values are strings.

HttpRequest.FILES[¶](#django.http.HttpRequest.FILES "Permalink to this definition")

A dictionary-like object containing all uploaded files. Each key in FILES is the name from the <input type="file" name="" />. Each value in FILES is an [UploadedFile](#django.http.UploadedFile "django.http.UploadedFile") as described below.

See [_Managing files_](https://django-chinese-docs.readthedocs.io/en/latest/topics/files.html) for more information.

Note that FILES will only contain data if the request method was POST and the <form> that posted to the request had enctype="multipart/form-data". Otherwise, FILES will be a blank dictionary-like object.

HttpRequest.META[¶](#django.http.HttpRequest.META "Permalink to this definition")

A standard Python dictionary containing all available HTTP headers. Available headers depend on the client and server, but here are some examples:

-   CONTENT\_LENGTH – the length of the request body (as a string).
-   CONTENT\_TYPE – the MIME type of the request body.
-   HTTP\_ACCEPT\_ENCODING – Acceptable encodings for the response.
-   HTTP\_ACCEPT\_LANGUAGE – Acceptable languages for the response.
-   HTTP\_HOST – The HTTP Host header sent by the client.
-   HTTP\_REFERER – The referring page, if any.
-   HTTP\_USER\_AGENT – The client’s user-agent string.
-   QUERY\_STRING – The query string, as a single (unparsed) string.
-   REMOTE\_ADDR – The IP address of the client.
-   REMOTE\_HOST – The hostname of the client.
-   REMOTE\_USER – The user authenticated by the Web server, if any.
-   REQUEST\_METHOD – A string such as "GET" or "POST".
-   SERVER\_NAME – The hostname of the server.
-   SERVER\_PORT – The port of the server (as a string).

With the exception of CONTENT\_LENGTH and CONTENT\_TYPE, as given above, any HTTP headers in the request are converted to META keys by converting all characters to uppercase, replacing any hyphens with underscores and adding an HTTP\_ prefix to the name. So, for example, a header called X-Bender would be mapped to the META key HTTP\_X\_BENDER.

HttpRequest.user[¶](#django.http.HttpRequest.user "Permalink to this definition")

A django.contrib.auth.models.User object representing the currently logged-in user. If the user isn’t currently logged in, user will be set to an instance of django.contrib.auth.models.AnonymousUser. You can tell them apart with is\_authenticated(), like so:

if request.user.is\_authenticated():
    # Do something for logged-in users.
else:
    # Do something for anonymous users.

user is only available if your Django installation has the AuthenticationMiddleware activated. For more, see [_User authentication in Django_](https://django-chinese-docs.readthedocs.io/en/latest/topics/auth/index.html).

HttpRequest.session[¶](#django.http.HttpRequest.session "Permalink to this definition")

A readable-and-writable, dictionary-like object that represents the current session. This is only available if your Django installation has session support activated. See the [_session documentation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/sessions.html) for full details.

HttpRequest.urlconf[¶](#django.http.HttpRequest.urlconf "Permalink to this definition")

Not defined by Django itself, but will be read if other code (e.g., a custom middleware class) sets it. When present, this will be used as the root URLconf for the current request, overriding the [ROOT\_URLCONF](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-ROOT_URLCONF) setting. See [_How Django processes a request_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html#how-django-processes-a-request) for details.

HttpRequest.resolver\_match[¶](#django.http.HttpRequest.resolver_match "Permalink to this definition")

New in Django 1.5.

An instance of [ResolverMatch](https://django-chinese-docs.readthedocs.io/en/latest/ref/urlresolvers.html#django.core.urlresolvers.ResolverMatch "django.core.urlresolvers.ResolverMatch") representing the resolved url. This attribute is only set after url resolving took place, which means it’s available in all views but not in middleware methods which are executed before url resolving takes place (like process\_request, you can use process\_view instead).

### Methods[¶](#methods "Permalink to this headline")

HttpRequest.get\_host()[¶](#django.http.HttpRequest.get_host "Permalink to this definition")

Returns the originating host of the request using information from the HTTP\_X\_FORWARDED\_HOST (if [USE\_X\_FORWARDED\_HOST](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-USE_X_FORWARDED_HOST) is enabled) and HTTP\_HOST headers, in that order. If they don’t provide a value, the method uses a combination of SERVER\_NAME and SERVER\_PORT as detailed in [**PEP 3333**](http://www.python.org/dev/peps/pep-3333).

Example: "127.0.0.1:8000"

Note

The [get\_host()](#django.http.HttpRequest.get_host "django.http.HttpRequest.get_host") method fails when the host is behind multiple proxies. One solution is to use middleware to rewrite the proxy headers, as in the following example:

class MultipleProxyMiddleware(object):
    FORWARDED\_FOR\_FIELDS \= \[
        'HTTP\_X\_FORWARDED\_FOR',
        'HTTP\_X\_FORWARDED\_HOST',
        'HTTP\_X\_FORWARDED\_SERVER',
    \]

    def process\_request(self, request):
        """
        Rewrites the proxy headers so that only the most
        recent proxy is used.
        """
        for field in self.FORWARDED\_FOR\_FIELDS:
            if field in request.META:
                if ',' in request.META\[field\]:
                    parts \= request.META\[field\].split(',')
                    request.META\[field\] \= parts\[\-1\].strip()

This middleware should be positioned before any other middleware that relies on the value of [get\_host()](#django.http.HttpRequest.get_host "django.http.HttpRequest.get_host") – for instance, [CommonMiddleware](https://django-chinese-docs.readthedocs.io/en/latest/ref/middleware.html#django.middleware.common.CommonMiddleware "django.middleware.common.CommonMiddleware") or [CsrfViewMiddleware](https://django-chinese-docs.readthedocs.io/en/latest/ref/middleware.html#django.middleware.csrf.CsrfViewMiddleware "django.middleware.csrf.CsrfViewMiddleware").

HttpRequest.get\_full\_path()[¶](#django.http.HttpRequest.get_full_path "Permalink to this definition")

Returns the path, plus an appended query string, if applicable.

Example: "/music/bands/the\_beatles/?print=true"

HttpRequest.build\_absolute\_uri(_location_)[¶](#django.http.HttpRequest.build_absolute_uri "Permalink to this definition")

Returns the absolute URI form of location. If no location is provided, the location will be set to request.get\_full\_path().

If the location is already an absolute URI, it will not be altered. Otherwise the absolute URI is built using the server variables available in this request.

Example: "http://example.com/music/bands/the\_beatles/?print=true"

HttpRequest.get\_signed\_cookie(_key_, _default=RAISE\_ERROR_, _salt=''_, _max\_age=None_)[¶](#django.http.HttpRequest.get_signed_cookie "Permalink to this definition")

New in Django 1.4.

Returns a cookie value for a signed cookie, or raises a django.core.signing.BadSignature exception if the signature is no longer valid. If you provide the default argument the exception will be suppressed and that default value will be returned instead.

The optional salt argument can be used to provide extra protection against brute force attacks on your secret key. If supplied, the max\_age argument will be checked against the signed timestamp attached to the cookie value to ensure the cookie is not older than max\_age seconds.

For example:

\>>> request.get\_signed\_cookie('name')
'Tony'
\>>> request.get\_signed\_cookie('name', salt\='name-salt')
'Tony' # assuming cookie was set using the same salt
\>>> request.get\_signed\_cookie('non-existing-cookie')
...
KeyError: 'non-existing-cookie'
\>>> request.get\_signed\_cookie('non-existing-cookie', False)
False
\>>> request.get\_signed\_cookie('cookie-that-was-tampered-with')
...
BadSignature: ...
\>>> request.get\_signed\_cookie('name', max\_age\=60)
...
SignatureExpired: Signature age 1677.3839159 > 60 seconds
\>>> request.get\_signed\_cookie('name', False, max\_age\=60)
False

See [_cryptographic signing_](https://django-chinese-docs.readthedocs.io/en/latest/topics/signing.html) for more information.

HttpRequest.is\_secure()[¶](#django.http.HttpRequest.is_secure "Permalink to this definition")

Returns True if the request is secure; that is, if it was made with HTTPS.

HttpRequest.is\_ajax()[¶](#django.http.HttpRequest.is_ajax "Permalink to this definition")

Returns True if the request was made via an XMLHttpRequest, by checking the HTTP\_X\_REQUESTED\_WITH header for the string 'XMLHttpRequest'. Most modern JavaScript libraries send this header. If you write your own XMLHttpRequest call (on the browser side), you’ll have to set this header manually if you want is\_ajax() to work.

HttpRequest.read(_size=None_)[¶](#django.http.HttpRequest.read "Permalink to this definition")

HttpRequest.readline()[¶](#django.http.HttpRequest.readline "Permalink to this definition")

HttpRequest.readlines()[¶](#django.http.HttpRequest.readlines "Permalink to this definition")

HttpRequest.xreadlines()[¶](#django.http.HttpRequest.xreadlines "Permalink to this definition")

HttpRequest.\_\_iter\_\_()[¶](#django.http.HttpRequest.__iter__ "Permalink to this definition")

Methods implementing a file-like interface for reading from an HttpRequest instance. This makes it possible to consume an incoming request in a streaming fashion. A common use-case would be to process a big XML payload with iterative parser without constructing a whole XML tree in memory.

Given this standard interface, an HttpRequest instance can be passed directly to an XML parser such as ElementTree:

import xml.etree.ElementTree as ET
for element in ET.iterparse(request):
    process(element)

## UploadedFile objects[¶](#uploadedfile-objects "Permalink to this headline")

_class_ UploadedFile[¶](#django.http.UploadedFile "Permalink to this definition")

### Attributes[¶](#id1 "Permalink to this headline")

UploadedFile.name[¶](#django.http.UploadedFile.name "Permalink to this definition")

The name of the uploaded file.

UploadedFile.size[¶](#django.http.UploadedFile.size "Permalink to this definition")

The size, in bytes, of the uploaded file.

### Methods[¶](#id2 "Permalink to this headline")

UploadedFile.chunks(_chunk\_size=None_)[¶](#django.http.UploadedFile.chunks "Permalink to this definition")

Returns a generator that yields sequential chunks of data.

UploadedFile.read(_num\_bytes=None_)[¶](#django.http.UploadedFile.read "Permalink to this definition")

Read a number of bytes from the file.

## QueryDict objects[¶](#querydict-objects "Permalink to this headline")

_class_ QueryDict[¶](#django.http.QueryDict "Permalink to this definition")

In an [HttpRequest](#django.http.HttpRequest "django.http.HttpRequest") object, the GET and POST attributes are instances of django.http.QueryDict. [QueryDict](#django.http.QueryDict "django.http.QueryDict") is a dictionary-like class customized to deal with multiple values for the same key. This is necessary because some HTML form elements, notably <select multiple="multiple">, pass multiple values for the same key.

QueryDict instances are immutable, unless you create a copy() of them. That means you can’t change attributes of request.POST and request.GET directly.

### Methods[¶](#id3 "Permalink to this headline")

[QueryDict](#django.http.QueryDict "django.http.QueryDict") implements all the standard dictionary methods, because it’s a subclass of dictionary. Exceptions are outlined here:

QueryDict.\_\_getitem\_\_(_key_)[¶](#django.http.QueryDict.__getitem__ "Permalink to this definition")

Returns the value for the given key. If the key has more than one value, \_\_getitem\_\_() returns the last value. Raises django.utils.datastructures.MultiValueDictKeyError if the key does not exist. (This is a subclass of Python’s standard KeyError, so you can stick to catching KeyError.)

QueryDict.\_\_setitem\_\_(_key_, _value_)[¶](#django.http.QueryDict.__setitem__ "Permalink to this definition")

Sets the given key to \[value\] (a Python list whose single element is value). Note that this, as other dictionary functions that have side effects, can only be called on a mutable QueryDict (one that was created via copy()).

QueryDict.\_\_contains\_\_(_key_)[¶](#django.http.QueryDict.__contains__ "Permalink to this definition")

Returns True if the given key is set. This lets you do, e.g., if "foo" in request.GET.

QueryDict.get(_key_, _default_)[¶](#django.http.QueryDict.get "Permalink to this definition")

Uses the same logic as \_\_getitem\_\_() above, with a hook for returning a default value if the key doesn’t exist.

QueryDict.setdefault(_key_, _default_)[¶](#django.http.QueryDict.setdefault "Permalink to this definition")

Just like the standard dictionary setdefault() method, except it uses \_\_setitem\_\_() internally.

QueryDict.update(_other\_dict_)[¶](#django.http.QueryDict.update "Permalink to this definition")

Takes either a QueryDict or standard dictionary. Just like the standard dictionary update() method, except it _appends_ to the current dictionary items rather than replacing them. For example:

\>>> q \= QueryDict('a=1')
\>>> q \= q.copy() \# to make it mutable
\>>> q.update({'a': '2'})
\>>> q.getlist('a')
\[u'1', u'2'\]
\>>> q\['a'\] \# returns the last
\[u'2'\]

QueryDict.items()[¶](#django.http.QueryDict.items "Permalink to this definition")

Just like the standard dictionary items() method, except this uses the same last-value logic as \_\_getitem\_\_(). For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> q.items()
\[(u'a', u'3')\]

QueryDict.iteritems()[¶](#django.http.QueryDict.iteritems "Permalink to this definition")

Just like the standard dictionary iteritems() method. Like [QueryDict.items()](#django.http.QueryDict.items "django.http.QueryDict.items") this uses the same last-value logic as [QueryDict.\_\_getitem\_\_()](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__").

QueryDict.iterlists()[¶](#django.http.QueryDict.iterlists "Permalink to this definition")

Like [QueryDict.iteritems()](#django.http.QueryDict.iteritems "django.http.QueryDict.iteritems") except it includes all values, as a list, for each member of the dictionary.

QueryDict.values()[¶](#django.http.QueryDict.values "Permalink to this definition")

Just like the standard dictionary values() method, except this uses the same last-value logic as \_\_getitem\_\_(). For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> q.values()
\[u'3'\]

QueryDict.itervalues()[¶](#django.http.QueryDict.itervalues "Permalink to this definition")

Just like [QueryDict.values()](#django.http.QueryDict.values "django.http.QueryDict.values"), except an iterator.

In addition, QueryDict has the following methods:

QueryDict.copy()[¶](#django.http.QueryDict.copy "Permalink to this definition")

Returns a copy of the object, using copy.deepcopy() from the Python standard library. The copy will be mutable – that is, you can change its values.

QueryDict.getlist(_key_, _default_)[¶](#django.http.QueryDict.getlist "Permalink to this definition")

Returns the data with the requested key, as a Python list. Returns an empty list if the key doesn’t exist and no default value was provided. It’s guaranteed to return a list of some sort unless the default value was no list.

Changed in Django 1.4: The

default

parameter was added.

QueryDict.setlist(_key_, _list\__)[¶](#django.http.QueryDict.setlist "Permalink to this definition")

Sets the given key to list\_ (unlike \_\_setitem\_\_()).

QueryDict.appendlist(_key_, _item_)[¶](#django.http.QueryDict.appendlist "Permalink to this definition")

Appends an item to the internal list associated with key.

QueryDict.setlistdefault(_key_, _default\_list_)[¶](#django.http.QueryDict.setlistdefault "Permalink to this definition")

Just like setdefault, except it takes a list of values instead of a single value.

QueryDict.lists()[¶](#django.http.QueryDict.lists "Permalink to this definition")

Like [items()](#django.http.QueryDict.items "django.http.QueryDict.items"), except it includes all values, as a list, for each member of the dictionary. For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> q.lists()
\[(u'a', \[u'1', u'2', u'3'\])\]

QueryDict.dict()[¶](#django.http.QueryDict.dict "Permalink to this definition")

New in Django 1.4.

Returns dict representation of QueryDict. For every (key, list) pair in QueryDict, dict will have (key, item), where item is one element of the list, using same logic as [QueryDict.\_\_getitem\_\_()](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__"):

\>>> q \= QueryDict('a=1&a=3&a=5')
\>>> q.dict()
{u'a': u'5'}

QueryDict.urlencode(\[_safe_\])[¶](#django.http.QueryDict.urlencode "Permalink to this definition")

Returns a string of the data in query-string format. Example:

\>>> q \= QueryDict('a=2&b=3&b=5')
\>>> q.urlencode()
'a=2&b=3&b=5'

Optionally, urlencode can be passed characters which do not require encoding. For example:

\>>> q \= QueryDict('', mutable\=True)
\>>> q\['next'\] \= '/a&b/'
\>>> q.urlencode(safe\='/')
'next=/a%26b/'

## HttpResponse objects[¶](#httpresponse-objects "Permalink to this headline")

_class_ HttpResponse[¶](#django.http.HttpResponse "Permalink to this definition")

In contrast to [HttpRequest](#django.http.HttpRequest "django.http.HttpRequest") objects, which are created automatically by Django, [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") objects are your responsibility. Each view you write is responsible for instantiating, populating and returning an [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse").

The [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") class lives in the [django.http](#module-django.http "django.http: Classes dealing with HTTP requests and responses.") module.

### Usage[¶](#usage "Permalink to this headline")

#### Passing strings[¶](#passing-strings "Permalink to this headline")

Typical usage is to pass the contents of the page, as a string, to the [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") constructor:

\>>> from django.http import HttpResponse
\>>> response \= HttpResponse("Here's the text of the Web page.")
\>>> response \= HttpResponse("Text only, please.", content\_type\="text/plain")

But if you want to add content incrementally, you can use response as a file-like object:

\>>> response \= HttpResponse()
\>>> response.write("<p>Here's the text of the Web page.</p>")
\>>> response.write("<p>Here's another paragraph.</p>")

#### Passing iterators[¶](#passing-iterators "Permalink to this headline")

Finally, you can pass HttpResponse an iterator rather than strings. If you use this technique, the iterator should return strings.

Passing an iterator as content to [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") creates a streaming response if (and only if) no middleware accesses the [HttpResponse.content](#django.http.HttpResponse.content "django.http.HttpResponse.content") attribute before the response is returned.

Changed in Django 1.5.

This technique is fragile and was deprecated in Django 1.5. If you need the response to be streamed from the iterator to the client, you should use the [StreamingHttpResponse](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") class instead.

As of Django 1.7, when [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") is instantiated with an iterator, it will consume it immediately, store the response content as a string, and discard the iterator.

Changed in Django 1.5.

You can now use [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") as a file-like object even if it was instantiated with an iterator. Django will consume and save the content of the iterator on first access.

#### Telling the browser to treat the response as a file attachment[¶](#telling-the-browser-to-treat-the-response-as-a-file-attachment "Permalink to this headline")

To tell the browser to treat the response as a file attachment, use the content\_type argument and set the Content-Disposition header. For example, this is how you might return a Microsoft Excel spreadsheet:

\>>> response \= HttpResponse(my\_data, content\_type\='application/vnd.ms-excel')
\>>> response\['Content-Disposition'\] \= 'attachment; filename="foo.xls"'

There’s nothing Django-specific about the Content-Disposition header, but it’s easy to forget the syntax, so we’ve included it here.

### Attributes[¶](#id4 "Permalink to this headline")

HttpResponse.content[¶](#django.http.HttpResponse.content "Permalink to this definition")

A string representing the content, encoded from a Unicode object if necessary.

HttpResponse.status\_code[¶](#django.http.HttpResponse.status_code "Permalink to this definition")

The [HTTP Status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10) for the response.

HttpResponse.streaming[¶](#django.http.HttpResponse.streaming "Permalink to this definition")

This is always False.

This attribute exists so middleware can treat streaming responses differently from regular responses.

### Methods[¶](#id5 "Permalink to this headline")

HttpResponse.\_\_init\_\_(_content=''_, _content\_type=None_, _status=200_)[¶](#django.http.HttpResponse.__init__ "Permalink to this definition")

Instantiates an HttpResponse object with the given page content and content type.

content should be an iterator or a string. If it’s an iterator, it should return strings, and those strings will be joined together to form the content of the response. If it is not an iterator or a string, it will be converted to a string when accessed.

content\_type is the MIME type optionally completed by a character set encoding and is used to fill the HTTP Content-Type header. If not specified, it is formed by the [DEFAULT\_CONTENT\_TYPE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CONTENT_TYPE) and [DEFAULT\_CHARSET](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CHARSET) settings, by default: “text/html; charset=utf-8”.

Historically, this parameter was called mimetype (now deprecated).

status is the [HTTP Status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10) for the response.

HttpResponse.\_\_setitem\_\_(_header_, _value_)[¶](#django.http.HttpResponse.__setitem__ "Permalink to this definition")

Sets the given header name to the given value. Both header and value should be strings.

HttpResponse.\_\_delitem\_\_(_header_)[¶](#django.http.HttpResponse.__delitem__ "Permalink to this definition")

Deletes the header with the given name. Fails silently if the header doesn’t exist. Case-insensitive.

HttpResponse.\_\_getitem\_\_(_header_)[¶](#django.http.HttpResponse.__getitem__ "Permalink to this definition")

Returns the value for the given header name. Case-insensitive.

Returns True or False based on a case-insensitive check for a header with the given name.

HttpResponse.set\_cookie(_key_, _value=''_, _max\_age=None_, _expires=None_, _path='/'_, _domain=None_, _secure=None_, _httponly=False_)[¶](#django.http.HttpResponse.set_cookie "Permalink to this definition")

Sets a cookie. The parameters are the same as in the [Cookie.Morsel](http://docs.python.org/2.7/library/cookie.html#Cookie.Morsel "(in Python v2.7)") object in the Python standard library.

-   max\_age should be a number of seconds, or None (default) if the cookie should last only as long as the client’s browser session. If expires is not specified, it will be calculated.
    
-   expires should either be a string in the format "Wdy, DD-Mon-YY HH:MM:SS GMT" or a datetime.datetime object in UTC. If expires is a datetime object, the max\_age will be calculated.
    
-   Use domain if you want to set a cross-domain cookie. For example, domain=".lawrence.com" will set a cookie that is readable by the domains www.lawrence.com, blogs.lawrence.com and calendars.lawrence.com. Otherwise, a cookie will only be readable by the domain that set it.
    
-   Use httponly=True if you want to prevent client-side JavaScript from having access to the cookie.
    
    [HTTPOnly](https://www.owasp.org/index.php/HTTPOnly) is a flag included in a Set-Cookie HTTP response header. It is not part of the [**RFC 2109**](http://tools.ietf.org/html/rfc2109.html) standard for cookies, and it isn’t honored consistently by all browsers. However, when it is honored, it can be a useful way to mitigate the risk of client side script accessing the protected cookie data.
    

HttpResponse.set\_signed\_cookie(_key_, _value=''_, _salt=''_, _max\_age=None_, _expires=None_, _path='/'_, _domain=None_, _secure=None_, _httponly=True_)[¶](#django.http.HttpResponse.set_signed_cookie "Permalink to this definition")

New in Django 1.4.

Like [set\_cookie()](#django.http.HttpResponse.set_cookie "django.http.HttpResponse.set_cookie"), but [_cryptographic signing_](https://django-chinese-docs.readthedocs.io/en/latest/topics/signing.html) the cookie before setting it. Use in conjunction with [HttpRequest.get\_signed\_cookie()](#django.http.HttpRequest.get_signed_cookie "django.http.HttpRequest.get_signed_cookie"). You can use the optional salt argument for added key strength, but you will need to remember to pass it to the corresponding [HttpRequest.get\_signed\_cookie()](#django.http.HttpRequest.get_signed_cookie "django.http.HttpRequest.get_signed_cookie") call.

HttpResponse.delete\_cookie(_key_, _path='/'_, _domain=None_)[¶](#django.http.HttpResponse.delete_cookie "Permalink to this definition")

Deletes the cookie with the given key. Fails silently if the key doesn’t exist.

Due to the way cookies work, path and domain should be the same values you used in set\_cookie() – otherwise the cookie may not be deleted.

HttpResponse.write(_content_)[¶](#django.http.HttpResponse.write "Permalink to this definition")

This method makes an [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

HttpResponse.flush()[¶](#django.http.HttpResponse.flush "Permalink to this definition")

This method makes an [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

HttpResponse.tell()[¶](#django.http.HttpResponse.tell "Permalink to this definition")

This method makes an [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

### HttpResponse subclasses[¶](#httpresponse-subclasses "Permalink to this headline")

Django includes a number of HttpResponse subclasses that handle different types of HTTP responses. Like HttpResponse, these subclasses live in [django.http](#module-django.http "django.http: Classes dealing with HTTP requests and responses.").

_class_ HttpResponseRedirect[¶](#django.http.HttpResponseRedirect "Permalink to this definition")

The first argument to the constructor is required – the path to redirect to. This can be a fully qualified URL (e.g. 'http://www.yahoo.com/search/') or an absolute path with no domain (e.g. '/search/'). See [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") for other optional constructor arguments. Note that this returns an HTTP status code 302.

_class_ HttpResponsePermanentRedirect[¶](#django.http.HttpResponsePermanentRedirect "Permalink to this definition")

Like [HttpResponseRedirect](#django.http.HttpResponseRedirect "django.http.HttpResponseRedirect"), but it returns a permanent redirect (HTTP status code 301) instead of a “found” redirect (status code 302).

_class_ HttpResponseNotModified[¶](#django.http.HttpResponseNotModified "Permalink to this definition")

The constructor doesn’t take any arguments and no content should be added to this response. Use this to designate that a page hasn’t been modified since the user’s last request (status code 304).

_class_ HttpResponseBadRequest[¶](#django.http.HttpResponseBadRequest "Permalink to this definition")

Acts just like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") but uses a 400 status code.

_class_ HttpResponseNotFound[¶](#django.http.HttpResponseNotFound "Permalink to this definition")

Acts just like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") but uses a 404 status code.

_class_ HttpResponseForbidden[¶](#django.http.HttpResponseForbidden "Permalink to this definition")

Acts just like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") but uses a 403 status code.

_class_ HttpResponseNotAllowed[¶](#django.http.HttpResponseNotAllowed "Permalink to this definition")

Like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse"), but uses a 405 status code. The first argument to the constructor is required: a list of permitted methods (e.g. \['GET', 'POST'\]).

_class_ HttpResponseGone[¶](#django.http.HttpResponseGone "Permalink to this definition")

Acts just like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") but uses a 410 status code.

_class_ HttpResponseServerError[¶](#django.http.HttpResponseServerError "Permalink to this definition")

Acts just like [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") but uses a 500 status code.

Note

If a custom subclass of [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse") implements a render method, Django will treat it as emulating a [SimpleTemplateResponse](https://django-chinese-docs.readthedocs.io/en/latest/ref/template-response.html#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse"), and the render method must itself return a valid response object.

## StreamingHttpResponse objects[¶](#streaminghttpresponse-objects "Permalink to this headline")

New in Django 1.5.

_class_ StreamingHttpResponse[¶](#django.http.StreamingHttpResponse "Permalink to this definition")

The [StreamingHttpResponse](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") class is used to stream a response from Django to the browser. You might want to do this if generating the response takes too long or uses too much memory. For instance, it’s useful for generating large CSV files.

Performance considerations

Django is designed for short-lived requests. Streaming responses will tie a worker process and keep a database connection idle in transaction for the entire duration of the response. This may result in poor performance.

Generally speaking, you should perform expensive tasks outside of the request-response cycle, rather than resorting to a streamed response.

The [StreamingHttpResponse](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") is not a subclass of [HttpResponse](#django.http.HttpResponse "django.http.HttpResponse"), because it features a slightly different API. However, it is almost identical, with the following notable differences:

-   It should be given an iterator that yields strings as content.
-   You cannot access its content, except by iterating the response object itself. This should only occur when the response is returned to the client.
-   It has no content attribute. Instead, it has a [streaming\_content](#django.http.StreamingHttpResponse.streaming_content "django.http.StreamingHttpResponse.streaming_content") attribute.
-   You cannot use the file-like object tell() or write() methods. Doing so will raise an exception.

[StreamingHttpResponse](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") should only be used in situations where it is absolutely required that the whole content isn’t iterated before transferring the data to the client. Because the content can’t be accessed, many middlewares can’t function normally. For example the ETag and Content- Length headers can’t be generated for streaming responses.

### Attributes[¶](#id6 "Permalink to this headline")

StreamingHttpResponse.streaming\_content[¶](#django.http.StreamingHttpResponse.streaming_content "Permalink to this definition")

An iterator of strings representing the content.

HttpResponse.status\_code

The [HTTP Status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10) for the response.

HttpResponse.streaming

This is always True.
