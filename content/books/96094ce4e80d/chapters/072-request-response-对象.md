## Quick overview[¶](#quick-overview "Permalink to this headline")

Django uses request and response objects to pass state through the system.

When a page is requested, Django creates an [`HttpRequest`](#django.http.HttpRequest "django.http.HttpRequest") object that contains metadata about the request. Then Django loads the appropriate view, passing the [`HttpRequest`](#django.http.HttpRequest "django.http.HttpRequest") as the first argument to the view function. Each view is responsible for returning an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") object.

This document explains the APIs for [`HttpRequest`](#django.http.HttpRequest "django.http.HttpRequest") and [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") objects, which are defined in the [`django.http`](#module-django.http "django.http: Classes dealing with HTTP requests and responses.") module.

## `HttpRequest` objects[¶](#httprequest-objects "Permalink to this headline")

_class_ `HttpRequest`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest)[¶](#django.http.HttpRequest "Permalink to this definition")

### Attributes[¶](#attributes "Permalink to this headline")

All attributes should be considered read-only, unless stated otherwise.

`HttpRequest.``scheme`[¶](#django.http.HttpRequest.scheme "Permalink to this definition")

A string representing the scheme of the request (`http` or `https` usually).

`HttpRequest.``body`[¶](#django.http.HttpRequest.body "Permalink to this definition")

The raw HTTP request body as a byte string. This is useful for processing data in different ways than conventional HTML forms: binary images, XML payload etc. For processing conventional form data, use [`HttpRequest.POST`](#django.http.HttpRequest.POST "django.http.HttpRequest.POST").

You can also read from an `HttpRequest` using a file-like interface. See [`HttpRequest.read()`](#django.http.HttpRequest.read "django.http.HttpRequest.read").

`HttpRequest.``path`[¶](#django.http.HttpRequest.path "Permalink to this definition")

A string representing the full path to the requested page, not including the scheme or domain.

Example: `"/music/bands/the_beatles/"`

`HttpRequest.``path_info`[¶](#django.http.HttpRequest.path_info "Permalink to this definition")

Under some Web server configurations, the portion of the URL after the host name is split up into a script prefix portion and a path info portion. The `path_info` attribute always contains the path info portion of the path, no matter what Web server is being used. Using this instead of [`path`](#django.http.HttpRequest.path "django.http.HttpRequest.path") can make your code easier to move between test and deployment servers.

For example, if the `WSGIScriptAlias` for your application is set to `"/minfo"`, then `path` might be `"/minfo/music/bands/the_beatles/"` and `path_info` would be `"/music/bands/the_beatles/"`.

`HttpRequest.``method`[¶](#django.http.HttpRequest.method "Permalink to this definition")

A string representing the HTTP method used in the request. This is guaranteed to be uppercase. For example:

if request.method \== 'GET':
    do\_something()
elif request.method \== 'POST':
    do\_something\_else()

`HttpRequest.``encoding`[¶](#django.http.HttpRequest.encoding "Permalink to this definition")

A string representing the current encoding used to decode form submission data (or `None`, which means the [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET) setting is used). You can write to this attribute to change the encoding used when accessing the form data. Any subsequent attribute accesses (such as reading from [`GET`](#django.http.HttpRequest.GET "django.http.HttpRequest.GET") or [`POST`](#django.http.HttpRequest.POST "django.http.HttpRequest.POST")) will use the new `encoding` value. Useful if you know the form data is not in the [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET) encoding.

`HttpRequest.``content_type`[¶](#django.http.HttpRequest.content_type "Permalink to this definition")

A string representing the MIME type of the request, parsed from the `CONTENT_TYPE` header.

`HttpRequest.``content_params`[¶](#django.http.HttpRequest.content_params "Permalink to this definition")

A dictionary of key/value parameters included in the `CONTENT_TYPE` header.

`HttpRequest.``GET`[¶](#django.http.HttpRequest.GET "Permalink to this definition")

A dictionary-like object containing all given HTTP GET parameters. See the [`QueryDict`](#django.http.QueryDict "django.http.QueryDict") documentation below.

`HttpRequest.``POST`[¶](#django.http.HttpRequest.POST "Permalink to this definition")

A dictionary-like object containing all given HTTP POST parameters, providing that the request contains form data. See the [`QueryDict`](#django.http.QueryDict "django.http.QueryDict") documentation below. If you need to access raw or non-form data posted in the request, access this through the [`HttpRequest.body`](#django.http.HttpRequest.body "django.http.HttpRequest.body") attribute instead.

It's possible that a request can come in via POST with an empty `POST` dictionary -- if, say, a form is requested via the POST HTTP method but does not include form data. Therefore, you shouldn't use `if request.POST` to check for use of the POST method; instead, use `if request.method == "POST"` (see [`HttpRequest.method`](#django.http.HttpRequest.method "django.http.HttpRequest.method")).

`POST` does _not_ include file-upload information. See [`FILES`](#django.http.HttpRequest.FILES "django.http.HttpRequest.FILES").

`HttpRequest.``COOKIES`[¶](#django.http.HttpRequest.COOKIES "Permalink to this definition")

A dictionary containing all cookies. Keys and values are strings.

`HttpRequest.``FILES`[¶](#django.http.HttpRequest.FILES "Permalink to this definition")

A dictionary-like object containing all uploaded files. Each key in `FILES` is the `name` from the `<input type="file" name="" />`. Each value in `FILES` is an [`UploadedFile`](https://docs.djangoproject.com/zh-hans/2.0/ref/files/uploads/#django.core.files.uploadedfile.UploadedFile "django.core.files.uploadedfile.UploadedFile").

See [Managing files](https://docs.djangoproject.com/zh-hans/2.0/topics/files/) for more information.

`FILES` will only contain data if the request method was POST and the `<form>` that posted to the request had `enctype="multipart/form-data"`. Otherwise, `FILES` will be a blank dictionary-like object.

`HttpRequest.``META`[¶](#django.http.HttpRequest.META "Permalink to this definition")

A dictionary containing all available HTTP headers. Available headers depend on the client and server, but here are some examples:

-   `CONTENT_LENGTH` -- The length of the request body (as a string).
-   `CONTENT_TYPE` -- The MIME type of the request body.
-   `HTTP_ACCEPT` -- Acceptable content types for the response.
-   `HTTP_ACCEPT_ENCODING` -- Acceptable encodings for the response.
-   `HTTP_ACCEPT_LANGUAGE` -- Acceptable languages for the response.
-   `HTTP_HOST` -- The HTTP Host header sent by the client.
-   `HTTP_REFERER` -- The referring page, if any.
-   `HTTP_USER_AGENT` -- The client's user-agent string.
-   `QUERY_STRING` -- The query string, as a single (unparsed) string.
-   `REMOTE_ADDR` -- The IP address of the client.
-   `REMOTE_HOST` -- The hostname of the client.
-   `REMOTE_USER` -- The user authenticated by the Web server, if any.
-   `REQUEST_METHOD` -- A string such as `"GET"` or `"POST"`.
-   `SERVER_NAME` -- The hostname of the server.
-   `SERVER_PORT` -- The port of the server (as a string).

With the exception of `CONTENT_LENGTH` and `CONTENT_TYPE`, as given above, any HTTP headers in the request are converted to `META` keys by converting all characters to uppercase, replacing any hyphens with underscores and adding an `HTTP_` prefix to the name. So, for example, a header called `X-Bender` would be mapped to the `META` key `HTTP_X_BENDER`.

Note that [`runserver`](https://docs.djangoproject.com/zh-hans/2.0/ref/django-admin/#django-admin-runserver) strips all headers with underscores in the name, so you won't see them in `META`. This prevents header-spoofing based on ambiguity between underscores and dashes both being normalizing to underscores in WSGI environment variables. It matches the behavior of Web servers like Nginx and Apache 2.4+.

`HttpRequest.``resolver_match`[¶](#django.http.HttpRequest.resolver_match "Permalink to this definition")

An instance of [`ResolverMatch`](https://docs.djangoproject.com/zh-hans/2.0/ref/urlresolvers/#django.urls.ResolverMatch "django.urls.ResolverMatch") representing the resolved URL. This attribute is only set after URL resolving took place, which means it's available in all views but not in middleware which are executed before URL resolving takes place (you can use it in [`process_view()`](https://docs.djangoproject.com/zh-hans/2.0/topics/http/middleware/#process_view "process_view") though).

### Attributes set by application code[¶](#attributes-set-by-application-code "Permalink to this headline")

Django doesn't set these attributes itself but makes use of them if set by your application.

`HttpRequest.``current_app`[¶](#django.http.HttpRequest.current_app "Permalink to this definition")

The [`url`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-url) template tag will use its value as the `current_app` argument to [`reverse()`](https://docs.djangoproject.com/zh-hans/2.0/ref/urlresolvers/#django.urls.reverse "django.urls.reverse").

`HttpRequest.``urlconf`[¶](#django.http.HttpRequest.urlconf "Permalink to this definition")

This will be used as the root URLconf for the current request, overriding the [`ROOT_URLCONF`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-ROOT_URLCONF) setting. See [Django 如何处理一个请求](https://docs.djangoproject.com/zh-hans/2.0/topics/http/urls/#how-django-processes-a-request) for details.

`urlconf` can be set to `None` to revert any changes made by previous middleware and return to using the [`ROOT_URLCONF`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-ROOT_URLCONF).

### Attributes set by middleware[¶](#attributes-set-by-middleware "Permalink to this headline")

Some of the middleware included in Django's contrib apps set attributes on the request. If you don't see the attribute on a request, be sure the appropriate middleware class is listed in [`MIDDLEWARE`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-MIDDLEWARE).

`HttpRequest.``session`[¶](#django.http.HttpRequest.session "Permalink to this definition")

From the [`SessionMiddleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#django.contrib.sessions.middleware.SessionMiddleware "django.contrib.sessions.middleware.SessionMiddleware"): A readable and writable, dictionary-like object that represents the current session.

`HttpRequest.``site`[¶](#django.http.HttpRequest.site "Permalink to this definition")

From the [`CurrentSiteMiddleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#django.contrib.sites.middleware.CurrentSiteMiddleware "django.contrib.sites.middleware.CurrentSiteMiddleware"): An instance of [`Site`](https://docs.djangoproject.com/zh-hans/2.0/ref/contrib/sites/#django.contrib.sites.models.Site "django.contrib.sites.models.Site") or [`RequestSite`](https://docs.djangoproject.com/zh-hans/2.0/ref/contrib/sites/#django.contrib.sites.requests.RequestSite "django.contrib.sites.requests.RequestSite") as returned by [`get_current_site()`](https://docs.djangoproject.com/zh-hans/2.0/ref/contrib/sites/#django.contrib.sites.shortcuts.get_current_site "django.contrib.sites.shortcuts.get_current_site") representing the current site.

`HttpRequest.``user`[¶](#django.http.HttpRequest.user "Permalink to this definition")

From the [`AuthenticationMiddleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#django.contrib.auth.middleware.AuthenticationMiddleware "django.contrib.auth.middleware.AuthenticationMiddleware"): An instance of [`AUTH_USER_MODEL`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-AUTH_USER_MODEL) representing the currently logged-in user. If the user isn't currently logged in, `user` will be set to an instance of [`AnonymousUser`](https://docs.djangoproject.com/zh-hans/2.0/ref/contrib/auth/#django.contrib.auth.models.AnonymousUser "django.contrib.auth.models.AnonymousUser"). You can tell them apart with [`is_authenticated`](https://docs.djangoproject.com/zh-hans/2.0/ref/contrib/auth/#django.contrib.auth.models.User.is_authenticated "django.contrib.auth.models.User.is_authenticated"), like so:

if request.user.is\_authenticated:
    ... \# Do something for logged-in users.
else:
    ... \# Do something for anonymous users.

### Methods[¶](#methods "Permalink to this headline")

`HttpRequest.``get_host`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.get_host)[¶](#django.http.HttpRequest.get_host "Permalink to this definition")

Returns the originating host of the request using information from the `HTTP_X_FORWARDED_HOST` (if [`USE_X_FORWARDED_HOST`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_X_FORWARDED_HOST) is enabled) and `HTTP_HOST` headers, in that order. If they don't provide a value, the method uses a combination of `SERVER_NAME` and `SERVER_PORT` as detailed in [**PEP 3333**](https://www.python.org/dev/peps/pep-3333).

Example: `"127.0.0.1:8000"`

Note

The [`get_host()`](#django.http.HttpRequest.get_host "django.http.HttpRequest.get_host") method fails when the host is behind multiple proxies. One solution is to use middleware to rewrite the proxy headers, as in the following example:

from django.utils.deprecation import MiddlewareMixin

class MultipleProxyMiddleware(MiddlewareMixin):
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

This middleware should be positioned before any other middleware that relies on the value of [`get_host()`](#django.http.HttpRequest.get_host "django.http.HttpRequest.get_host") -- for instance, [`CommonMiddleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#django.middleware.common.CommonMiddleware "django.middleware.common.CommonMiddleware") or [`CsrfViewMiddleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#django.middleware.csrf.CsrfViewMiddleware "django.middleware.csrf.CsrfViewMiddleware").

`HttpRequest.``get_port`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.get_port)[¶](#django.http.HttpRequest.get_port "Permalink to this definition")

Returns the originating port of the request using information from the `HTTP_X_FORWARDED_PORT` (if [`USE_X_FORWARDED_PORT`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-USE_X_FORWARDED_PORT) is enabled) and `SERVER_PORT` `META` variables, in that order.

`HttpRequest.``get_full_path`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.get_full_path)[¶](#django.http.HttpRequest.get_full_path "Permalink to this definition")

Returns the `path`, plus an appended query string, if applicable.

Example: `"/music/bands/the_beatles/?print=true"`

`HttpRequest.``build_absolute_uri`(_location_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.build_absolute_uri)[¶](#django.http.HttpRequest.build_absolute_uri "Permalink to this definition")

Returns the absolute URI form of `location`. If no location is provided, the location will be set to `request.get_full_path()`.

If the location is already an absolute URI, it will not be altered. Otherwise the absolute URI is built using the server variables available in this request.

Example: `"https://example.com/music/bands/the_beatles/?print=true"`

Note

Mixing HTTP and HTTPS on the same site is discouraged, therefore [`build_absolute_uri()`](#django.http.HttpRequest.build_absolute_uri "django.http.HttpRequest.build_absolute_uri") will always generate an absolute URI with the same scheme the current request has. If you need to redirect users to HTTPS, it's best to let your Web server redirect all HTTP traffic to HTTPS.

`HttpRequest.``get_signed_cookie`(_key_, _default=RAISE\_ERROR_, _salt=''_, _max\_age=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.get_signed_cookie)[¶](#django.http.HttpRequest.get_signed_cookie "Permalink to this definition")

Returns a cookie value for a signed cookie, or raises a `django.core.signing.BadSignature` exception if the signature is no longer valid. If you provide the `default` argument the exception will be suppressed and that default value will be returned instead.

The optional `salt` argument can be used to provide extra protection against brute force attacks on your secret key. If supplied, the `max_age` argument will be checked against the signed timestamp attached to the cookie value to ensure the cookie is not older than `max_age` seconds.

For example:

\>>> request.get\_signed\_cookie('name')
'Tony'
\>>> request.get\_signed\_cookie('name', salt\='name-salt')
'Tony' # assuming cookie was set using the same salt
\>>> request.get\_signed\_cookie('nonexistent-cookie')
...
KeyError: 'nonexistent-cookie'
\>>> request.get\_signed\_cookie('nonexistent-cookie', False)
False
\>>> request.get\_signed\_cookie('cookie-that-was-tampered-with')
...
BadSignature: ...
\>>> request.get\_signed\_cookie('name', max\_age\=60)
...
SignatureExpired: Signature age 1677.3839159 > 60 seconds
\>>> request.get\_signed\_cookie('name', False, max\_age\=60)
False

See [cryptographic signing](https://docs.djangoproject.com/zh-hans/2.0/topics/signing/) for more information.

`HttpRequest.``is_secure`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.is_secure)[¶](#django.http.HttpRequest.is_secure "Permalink to this definition")

Returns `True` if the request is secure; that is, if it was made with HTTPS.

`HttpRequest.``is_ajax`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.is_ajax)[¶](#django.http.HttpRequest.is_ajax "Permalink to this definition")

Returns `True` if the request was made via an `XMLHttpRequest`, by checking the `HTTP_X_REQUESTED_WITH` header for the string `'XMLHttpRequest'`. Most modern JavaScript libraries send this header. If you write your own `XMLHttpRequest` call (on the browser side), you'll have to set this header manually if you want `is_ajax()` to work.

If a response varies on whether or not it's requested via AJAX and you are using some form of caching like Django's [`cache middleware`](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#module-django.middleware.cache "django.middleware.cache: Middleware for the site-wide cache."), you should decorate the view with [`vary_on_headers('X-Requested-With')`](https://docs.djangoproject.com/zh-hans/2.0/topics/http/decorators/#django.views.decorators.vary.vary_on_headers "django.views.decorators.vary.vary_on_headers") so that the responses are properly cached.

`HttpRequest.``read`(_size=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.read)[¶](#django.http.HttpRequest.read "Permalink to this definition")

`HttpRequest.``readline`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.readline)[¶](#django.http.HttpRequest.readline "Permalink to this definition")

`HttpRequest.``readlines`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.readlines)[¶](#django.http.HttpRequest.readlines "Permalink to this definition")

`HttpRequest.``__iter__`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#HttpRequest.__iter__)[¶](#django.http.HttpRequest.__iter__ "Permalink to this definition")

Methods implementing a file-like interface for reading from an `HttpRequest` instance. This makes it possible to consume an incoming request in a streaming fashion. A common use-case would be to process a big XML payload with an iterative parser without constructing a whole XML tree in memory.

Given this standard interface, an `HttpRequest` instance can be passed directly to an XML parser such as [`ElementTree`](https://docs.python.org/3/library/xml.etree.elementtree.html#xml.etree.ElementTree.ElementTree "(in Python v3.7)"):

import xml.etree.ElementTree as ET
for element in ET.iterparse(request):
    process(element)

## `QueryDict` objects[¶](#querydict-objects "Permalink to this headline")

_class_ `QueryDict`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict)[¶](#django.http.QueryDict "Permalink to this definition")

In an [`HttpRequest`](#django.http.HttpRequest "django.http.HttpRequest") object, the [`GET`](#django.http.HttpRequest.GET "django.http.HttpRequest.GET") and [`POST`](#django.http.HttpRequest.POST "django.http.HttpRequest.POST") attributes are instances of `django.http.QueryDict`, a dictionary-like class customized to deal with multiple values for the same key. This is necessary because some HTML form elements, notably `<select multiple>`, pass multiple values for the same key.

The `QueryDict`s at `request.POST` and `request.GET` will be immutable when accessed in a normal request/response cycle. To get a mutable version you need to use [`QueryDict.copy()`](#django.http.QueryDict.copy "django.http.QueryDict.copy").

### Methods[¶](#id1 "Permalink to this headline")

[`QueryDict`](#django.http.QueryDict "django.http.QueryDict") implements all the standard dictionary methods because it's a subclass of dictionary. Exceptions are outlined here:

`QueryDict.``__init__`(_query\_string=None_, _mutable=False_, _encoding=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.__init__)[¶](#django.http.QueryDict.__init__ "Permalink to this definition")

Instantiates a `QueryDict` object based on `query_string`.

\>>> QueryDict('a=1&a=2&c=3')
<QueryDict: {'a': \['1', '2'\], 'c': \['3'\]}>

If `query_string` is not passed in, the resulting `QueryDict` will be empty (it will have no keys or values).

Most `QueryDict`s you encounter, and in particular those at `request.POST` and `request.GET`, will be immutable. If you are instantiating one yourself, you can make it mutable by passing `mutable=True` to its `__init__()`.

Strings for setting both keys and values will be converted from `encoding` to `str`. If `encoding` is not set, it defaults to [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET).

_classmethod_ `QueryDict.``fromkeys`(_iterable_, _value=''_, _mutable=False_, _encoding=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.fromkeys)[¶](#django.http.QueryDict.fromkeys "Permalink to this definition")

New in Django 1.11.

Creates a new `QueryDict` with keys from `iterable` and each value equal to `value`. For example:

\>>> QueryDict.fromkeys(\['a', 'a', 'b'\], value\='val')
<QueryDict: {'a': \['val', 'val'\], 'b': \['val'\]}>

`QueryDict.``__getitem__`(_key_)[¶](#django.http.QueryDict.__getitem__ "Permalink to this definition")

Returns the value for the given key. If the key has more than one value, it returns the last value. Raises `django.utils.datastructures.MultiValueDictKeyError` if the key does not exist. (This is a subclass of Python's standard [`KeyError`](https://docs.python.org/3/library/exceptions.html#KeyError "(in Python v3.7)"), so you can stick to catching `KeyError`.)

`QueryDict.``__setitem__`(_key_, _value_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.__setitem__)[¶](#django.http.QueryDict.__setitem__ "Permalink to this definition")

Sets the given key to `[value]` (a list whose single element is `value`). Note that this, as other dictionary functions that have side effects, can only be called on a mutable `QueryDict` (such as one that was created via [`QueryDict.copy()`](#django.http.QueryDict.copy "django.http.QueryDict.copy")).

`QueryDict.``__contains__`(_key_)[¶](#django.http.QueryDict.__contains__ "Permalink to this definition")

Returns `True` if the given key is set. This lets you do, e.g., `if "foo" in request.GET`.

`QueryDict.``get`(_key_, _default=None_)[¶](#django.http.QueryDict.get "Permalink to this definition")

Uses the same logic as [`__getitem__()`](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__"), with a hook for returning a default value if the key doesn't exist.

`QueryDict.``setdefault`(_key_, _default=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.setdefault)[¶](#django.http.QueryDict.setdefault "Permalink to this definition")

Like [`dict.setdefault()`](https://docs.python.org/3/library/stdtypes.html#dict.setdefault "(in Python v3.7)"), except it uses [`__setitem__()`](#django.http.QueryDict.__setitem__ "django.http.QueryDict.__setitem__") internally.

`QueryDict.``update`(_other\_dict_)[¶](#django.http.QueryDict.update "Permalink to this definition")

Takes either a `QueryDict` or a dictionary. Like [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update "(in Python v3.7)"), except it _appends_ to the current dictionary items rather than replacing them. For example:

\>>> q \= QueryDict('a=1', mutable\=True)
\>>> q.update({'a': '2'})
\>>> q.getlist('a')
\['1', '2'\]
\>>> q\['a'\] \# returns the last
'2'

`QueryDict.``items`()[¶](#django.http.QueryDict.items "Permalink to this definition")

Like [`dict.items()`](https://docs.python.org/3/library/stdtypes.html#dict.items "(in Python v3.7)"), except this uses the same last-value logic as [`__getitem__()`](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__") and returns an iterator object instead of a view object. For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> list(q.items())
\[('a', '3')\]

`QueryDict.``values`()[¶](#django.http.QueryDict.values "Permalink to this definition")

Like [`dict.values()`](https://docs.python.org/3/library/stdtypes.html#dict.values "(in Python v3.7)"), except this uses the same last-value logic as [`__getitem__()`](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__") and returns an iterator instead of a view object. For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> list(q.values())
\['3'\]

In addition, `QueryDict` has the following methods:

`QueryDict.``copy`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.copy)[¶](#django.http.QueryDict.copy "Permalink to this definition")

Returns a copy of the object using [`copy.deepcopy()`](https://docs.python.org/3/library/copy.html#copy.deepcopy "(in Python v3.7)"). This copy will be mutable even if the original was not.

`QueryDict.``getlist`(_key_, _default=None_)[¶](#django.http.QueryDict.getlist "Permalink to this definition")

Returns a list of the data with the requested key. Returns an empty list if the key doesn't exist and a default value wasn't provided. It's guaranteed to return a list unless the default value provided isn't a list.

`QueryDict.``setlist`(_key_, _list\__)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.setlist)[¶](#django.http.QueryDict.setlist "Permalink to this definition")

Sets the given key to `list_` (unlike [`__setitem__()`](#django.http.QueryDict.__setitem__ "django.http.QueryDict.__setitem__")).

`QueryDict.``appendlist`(_key_, _item_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.appendlist)[¶](#django.http.QueryDict.appendlist "Permalink to this definition")

Appends an item to the internal list associated with key.

`QueryDict.``setlistdefault`(_key_, _default\_list=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.setlistdefault)[¶](#django.http.QueryDict.setlistdefault "Permalink to this definition")

Like [`setdefault()`](#django.http.QueryDict.setdefault "django.http.QueryDict.setdefault"), except it takes a list of values instead of a single value.

`QueryDict.``lists`()[¶](#django.http.QueryDict.lists "Permalink to this definition")

Like [`items()`](#django.http.QueryDict.items "django.http.QueryDict.items"), except it includes all values, as a list, for each member of the dictionary. For example:

\>>> q \= QueryDict('a=1&a=2&a=3')
\>>> q.lists()
\[('a', \['1', '2', '3'\])\]

`QueryDict.``pop`(_key_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.pop)[¶](#django.http.QueryDict.pop "Permalink to this definition")

Returns a list of values for the given key and removes them from the dictionary. Raises `KeyError` if the key does not exist. For example:

\>>> q \= QueryDict('a=1&a=2&a=3', mutable\=True)
\>>> q.pop('a')
\['1', '2', '3'\]

`QueryDict.``popitem`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.popitem)[¶](#django.http.QueryDict.popitem "Permalink to this definition")

Removes an arbitrary member of the dictionary (since there's no concept of ordering), and returns a two value tuple containing the key and a list of all values for the key. Raises `KeyError` when called on an empty dictionary. For example:

\>>> q \= QueryDict('a=1&a=2&a=3', mutable\=True)
\>>> q.popitem()
('a', \['1', '2', '3'\])

`QueryDict.``dict`()[¶](#django.http.QueryDict.dict "Permalink to this definition")

Returns a `dict` representation of `QueryDict`. For every (key, list) pair in `QueryDict`, `dict` will have (key, item), where item is one element of the list, using the same logic as [`QueryDict.__getitem__()`](#django.http.QueryDict.__getitem__ "django.http.QueryDict.__getitem__"):

\>>> q \= QueryDict('a=1&a=3&a=5')
\>>> q.dict()
{'a': '5'}

`QueryDict.``urlencode`(_safe=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/request/#QueryDict.urlencode)[¶](#django.http.QueryDict.urlencode "Permalink to this definition")

Returns a string of the data in query string format. For example:

\>>> q \= QueryDict('a=2&b=3&b=5')
\>>> q.urlencode()
'a=2&b=3&b=5'

Use the `safe` parameter to pass characters which don't require encoding. For example:

\>>> q \= QueryDict(mutable\=True)
\>>> q\['next'\] \= '/a&b/'
\>>> q.urlencode(safe\='/')
'next=/a%26b/'

## `HttpResponse` objects[¶](#httpresponse-objects "Permalink to this headline")

_class_ `HttpResponse`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse)[¶](#django.http.HttpResponse "Permalink to this definition")

In contrast to [`HttpRequest`](#django.http.HttpRequest "django.http.HttpRequest") objects, which are created automatically by Django, [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") objects are your responsibility. Each view you write is responsible for instantiating, populating, and returning an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse").

The [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") class lives in the [`django.http`](#module-django.http "django.http: Classes dealing with HTTP requests and responses.") module.

### Usage[¶](#usage "Permalink to this headline")

#### Passing strings[¶](#passing-strings "Permalink to this headline")

Typical usage is to pass the contents of the page, as a string, to the [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") constructor:

\>>> from django.http import HttpResponse
\>>> response \= HttpResponse("Here's the text of the Web page.")
\>>> response \= HttpResponse("Text only, please.", content\_type\="text/plain")

But if you want to add content incrementally, you can use `response` as a file-like object:

\>>> response \= HttpResponse()
\>>> response.write("<p>Here's the text of the Web page.</p>")
\>>> response.write("<p>Here's another paragraph.</p>")

#### Passing iterators[¶](#passing-iterators "Permalink to this headline")

Finally, you can pass `HttpResponse` an iterator rather than strings. `HttpResponse` will consume the iterator immediately, store its content as a string, and discard it. Objects with a `close()` method such as files and generators are immediately closed.

If you need the response to be streamed from the iterator to the client, you must use the [`StreamingHttpResponse`](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") class instead.

#### Setting header fields[¶](#setting-header-fields "Permalink to this headline")

To set or remove a header field in your response, treat it like a dictionary:

\>>> response \= HttpResponse()
\>>> response\['Age'\] \= 120
\>>> del response\['Age'\]

Note that unlike a dictionary, `del` doesn't raise `KeyError` if the header field doesn't exist.

For setting the `Cache-Control` and `Vary` header fields, it is recommended to use the [`patch_cache_control()`](https://docs.djangoproject.com/zh-hans/2.0/ref/utils/#django.utils.cache.patch_cache_control "django.utils.cache.patch_cache_control") and [`patch_vary_headers()`](https://docs.djangoproject.com/zh-hans/2.0/ref/utils/#django.utils.cache.patch_vary_headers "django.utils.cache.patch_vary_headers") methods from [`django.utils.cache`](https://docs.djangoproject.com/zh-hans/2.0/ref/utils/#module-django.utils.cache "django.utils.cache: Helper functions for controlling caching."), since these fields can have multiple, comma-separated values. The "patch" methods ensure that other values, e.g. added by a middleware, are not removed.

HTTP header fields cannot contain newlines. An attempt to set a header field containing a newline character (CR or LF) will raise `BadHeaderError`

#### Telling the browser to treat the response as a file attachment[¶](#telling-the-browser-to-treat-the-response-as-a-file-attachment "Permalink to this headline")

To tell the browser to treat the response as a file attachment, use the `content_type` argument and set the `Content-Disposition` header. For example, this is how you might return a Microsoft Excel spreadsheet:

\>>> response \= HttpResponse(my\_data, content\_type\='application/vnd.ms-excel')
\>>> response\['Content-Disposition'\] \= 'attachment; filename="foo.xls"'

There's nothing Django-specific about the `Content-Disposition` header, but it's easy to forget the syntax, so we've included it here.

### Attributes[¶](#id2 "Permalink to this headline")

`HttpResponse.``content`[¶](#django.http.HttpResponse.content "Permalink to this definition")

A bytestring representing the content, encoded from a string if necessary.

`HttpResponse.``charset`[¶](#django.http.HttpResponse.charset "Permalink to this definition")

A string denoting the charset in which the response will be encoded. If not given at `HttpResponse` instantiation time, it will be extracted from `content_type` and if that is unsuccessful, the [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET) setting will be used.

`HttpResponse.``status_code`[¶](#django.http.HttpResponse.status_code "Permalink to this definition")

The [**HTTP status code**](https://tools.ietf.org/html/rfc7231.html#section-6) for the response.

Unless [`reason_phrase`](#django.http.HttpResponse.reason_phrase "django.http.HttpResponse.reason_phrase") is explicitly set, modifying the value of `status_code` outside the constructor will also modify the value of `reason_phrase`.

`HttpResponse.``reason_phrase`[¶](#django.http.HttpResponse.reason_phrase "Permalink to this definition")

The HTTP reason phrase for the response. It uses the [**HTTP standard's**](https://tools.ietf.org/html/rfc7231.html#section-6.1) default reason phrases.

Unless explicitly set, `reason_phrase` is determined by the value of [`status_code`](#django.http.HttpResponse.status_code "django.http.HttpResponse.status_code").

`HttpResponse.``streaming`[¶](#django.http.HttpResponse.streaming "Permalink to this definition")

This is always `False`.

This attribute exists so middleware can treat streaming responses differently from regular responses.

`HttpResponse.``closed`[¶](#django.http.HttpResponse.closed "Permalink to this definition")

`True` if the response has been closed.

### Methods[¶](#id3 "Permalink to this headline")

`HttpResponse.``__init__`(_content=''_, _content\_type=None_, _status=200_, _reason=None_, _charset=None_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.__init__)[¶](#django.http.HttpResponse.__init__ "Permalink to this definition")

Instantiates an `HttpResponse` object with the given page content and content type.

`content` should be an iterator or a string. If it's an iterator, it should return strings, and those strings will be joined together to form the content of the response. If it is not an iterator or a string, it will be converted to a string when accessed.

`content_type` is the MIME type optionally completed by a character set encoding and is used to fill the HTTP `Content-Type` header. If not specified, it is formed by the [`DEFAULT_CONTENT_TYPE`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CONTENT_TYPE) and [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET) settings, by default: "text/html; charset=utf-8".

`status` is the [**HTTP status code**](https://tools.ietf.org/html/rfc7231.html#section-6) for the response.

`reason` is the HTTP response phrase. If not provided, a default phrase will be used.

`charset` is the charset in which the response will be encoded. If not given it will be extracted from `content_type`, and if that is unsuccessful, the [`DEFAULT_CHARSET`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-DEFAULT_CHARSET) setting will be used.

`HttpResponse.``__setitem__`(_header_, _value_)[¶](#django.http.HttpResponse.__setitem__ "Permalink to this definition")

Sets the given header name to the given value. Both `header` and `value` should be strings.

`HttpResponse.``__delitem__`(_header_)[¶](#django.http.HttpResponse.__delitem__ "Permalink to this definition")

Deletes the header with the given name. Fails silently if the header doesn't exist. Case-insensitive.

`HttpResponse.``__getitem__`(_header_)[¶](#django.http.HttpResponse.__getitem__ "Permalink to this definition")

Returns the value for the given header name. Case-insensitive.

`HttpResponse.``has_header`(_header_)[¶](#django.http.HttpResponse.has_header "Permalink to this definition")

Returns `True` or `False` based on a case-insensitive check for a header with the given name.

`HttpResponse.``setdefault`(_header_, _value_)[¶](#django.http.HttpResponse.setdefault "Permalink to this definition")

Sets a header unless it has already been set.

`HttpResponse.``set_cookie`(_key_, _value=''_, _max\_age=None_, _expires=None_, _path='/'_, _domain=None_, _secure=None_, _httponly=False_)[¶](#django.http.HttpResponse.set_cookie "Permalink to this definition")

Sets a cookie. The parameters are the same as in the [`Morsel`](https://docs.python.org/3/library/http.cookies.html#http.cookies.Morsel "(in Python v3.7)") cookie object in the Python standard library.

-   `max_age` should be a number of seconds, or `None` (default) if the cookie should last only as long as the client's browser session. If `expires` is not specified, it will be calculated.
    
-   `expires` should either be a string in the format `"Wdy, DD-Mon-YY HH:MM:SS GMT"` or a `datetime.datetime` object in UTC. If `expires` is a `datetime` object, the `max_age` will be calculated.
    
-   Use `domain` if you want to set a cross-domain cookie. For example, `domain="example.com"` will set a cookie that is readable by the domains www.example.com, blog.example.com, etc. Otherwise, a cookie will only be readable by the domain that set it.
    
-   Use `httponly=True` if you want to prevent client-side JavaScript from having access to the cookie.
    
    [HTTPOnly](https://www.owasp.org/index.php/HTTPOnly) is a flag included in a Set-Cookie HTTP response header. It is not part of the [**RFC 2109**](https://tools.ietf.org/html/rfc2109.html) standard for cookies, and it isn't honored consistently by all browsers. However, when it is honored, it can be a useful way to mitigate the risk of a client-side script from accessing the protected cookie data.
    

Warning

Both [**RFC 2109**](https://tools.ietf.org/html/rfc2109.html) and [**RFC 6265**](https://tools.ietf.org/html/rfc6265.html) state that user agents should support cookies of at least 4096 bytes. For many browsers this is also the maximum size. Django will not raise an exception if there's an attempt to store a cookie of more than 4096 bytes, but many browsers will not set the cookie correctly.

`HttpResponse.``set_signed_cookie`(_key_, _value_, _salt=''_, _max\_age=None_, _expires=None_, _path='/'_, _domain=None_, _secure=None_, _httponly=False_)[¶](#django.http.HttpResponse.set_signed_cookie "Permalink to this definition")

Like [`set_cookie()`](#django.http.HttpResponse.set_cookie "django.http.HttpResponse.set_cookie"), but [cryptographic signing](https://docs.djangoproject.com/zh-hans/2.0/topics/signing/) the cookie before setting it. Use in conjunction with [`HttpRequest.get_signed_cookie()`](#django.http.HttpRequest.get_signed_cookie "django.http.HttpRequest.get_signed_cookie"). You can use the optional `salt` argument for added key strength, but you will need to remember to pass it to the corresponding [`HttpRequest.get_signed_cookie()`](#django.http.HttpRequest.get_signed_cookie "django.http.HttpRequest.get_signed_cookie") call.

`HttpResponse.``delete_cookie`(_key_, _path='/'_, _domain=None_)[¶](#django.http.HttpResponse.delete_cookie "Permalink to this definition")

Deletes the cookie with the given key. Fails silently if the key doesn't exist.

Due to the way cookies work, `path` and `domain` should be the same values you used in `set_cookie()` -- otherwise the cookie may not be deleted.

`HttpResponse.``write`(_content_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.write)[¶](#django.http.HttpResponse.write "Permalink to this definition")

This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

`HttpResponse.``flush`()[¶](#django.http.HttpResponse.flush "Permalink to this definition")

This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

`HttpResponse.``tell`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.tell)[¶](#django.http.HttpResponse.tell "Permalink to this definition")

This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a file-like object.

`HttpResponse.``getvalue`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.getvalue)[¶](#django.http.HttpResponse.getvalue "Permalink to this definition")

Returns the value of [`HttpResponse.content`](#django.http.HttpResponse.content "django.http.HttpResponse.content"). This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a stream-like object.

`HttpResponse.``readable`()[¶](#django.http.HttpResponse.readable "Permalink to this definition")

Always `False`. This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a stream-like object.

`HttpResponse.``seekable`()[¶](#django.http.HttpResponse.seekable "Permalink to this definition")

Always `False`. This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a stream-like object.

`HttpResponse.``writable`()[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.writable)[¶](#django.http.HttpResponse.writable "Permalink to this definition")

Always `True`. This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a stream-like object.

`HttpResponse.``writelines`(_lines_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponse.writelines)[¶](#django.http.HttpResponse.writelines "Permalink to this definition")

Writes a list of lines to the response. Line separators are not added. This method makes an [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") instance a stream-like object.

### `HttpResponse` subclasses[¶](#httpresponse-subclasses "Permalink to this headline")

Django includes a number of `HttpResponse` subclasses that handle different types of HTTP responses. Like `HttpResponse`, these subclasses live in [`django.http`](#module-django.http "django.http: Classes dealing with HTTP requests and responses.").

_class_ `HttpResponseRedirect`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseRedirect)[¶](#django.http.HttpResponseRedirect "Permalink to this definition")

The first argument to the constructor is required -- the path to redirect to. This can be a fully qualified URL (e.g. `'https://www.yahoo.com/search/'`), an absolute path with no domain (e.g. `'/search/'`), or even a relative path (e.g. `'search/'`). In that last case, the client browser will reconstruct the full URL itself according to the current path. See [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") for other optional constructor arguments. Note that this returns an HTTP status code 302.

`url`[¶](#django.http.HttpResponseRedirect.url "Permalink to this definition")

This read-only attribute represents the URL the response will redirect to (equivalent to the `Location` response header).

_class_ `HttpResponsePermanentRedirect`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponsePermanentRedirect)[¶](#django.http.HttpResponsePermanentRedirect "Permalink to this definition")

Like [`HttpResponseRedirect`](#django.http.HttpResponseRedirect "django.http.HttpResponseRedirect"), but it returns a permanent redirect (HTTP status code 301) instead of a "found" redirect (status code 302).

_class_ `HttpResponseNotModified`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseNotModified)[¶](#django.http.HttpResponseNotModified "Permalink to this definition")

The constructor doesn't take any arguments and no content should be added to this response. Use this to designate that a page hasn't been modified since the user's last request (status code 304).

_class_ `HttpResponseBadRequest`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseBadRequest)[¶](#django.http.HttpResponseBadRequest "Permalink to this definition")

Acts just like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") but uses a 400 status code.

_class_ `HttpResponseNotFound`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseNotFound)[¶](#django.http.HttpResponseNotFound "Permalink to this definition")

Acts just like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") but uses a 404 status code.

_class_ `HttpResponseForbidden`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseForbidden)[¶](#django.http.HttpResponseForbidden "Permalink to this definition")

Acts just like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") but uses a 403 status code.

_class_ `HttpResponseNotAllowed`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseNotAllowed)[¶](#django.http.HttpResponseNotAllowed "Permalink to this definition")

Like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse"), but uses a 405 status code. The first argument to the constructor is required: a list of permitted methods (e.g. `['GET', 'POST']`).

_class_ `HttpResponseGone`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseGone)[¶](#django.http.HttpResponseGone "Permalink to this definition")

Acts just like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") but uses a 410 status code.

_class_ `HttpResponseServerError`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#HttpResponseServerError)[¶](#django.http.HttpResponseServerError "Permalink to this definition")

Acts just like [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") but uses a 500 status code.

Note

If a custom subclass of [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") implements a `render` method, Django will treat it as emulating a [`SimpleTemplateResponse`](https://docs.djangoproject.com/zh-hans/2.0/ref/template-response/#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse"), and the `render` method must itself return a valid response object.

## `JsonResponse` objects[¶](#jsonresponse-objects "Permalink to this headline")

_class_ `JsonResponse`(_data_, _encoder=DjangoJSONEncoder_, _safe=True_, _json\_dumps\_params=None_, _\*\*kwargs_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#JsonResponse)[¶](#django.http.JsonResponse "Permalink to this definition")

An [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse") subclass that helps to create a JSON-encoded response. It inherits most behavior from its superclass with a couple differences:

Its default `Content-Type` header is set to `application/json`.

The first parameter, `data`, should be a `dict` instance. If the `safe` parameter is set to `False` (see below) it can be any JSON-serializable object.

The `encoder`, which defaults to [`django.core.serializers.json.DjangoJSONEncoder`](https://docs.djangoproject.com/zh-hans/2.0/topics/serialization/#django.core.serializers.json.DjangoJSONEncoder "django.core.serializers.json.DjangoJSONEncoder"), will be used to serialize the data. See [JSON serialization](https://docs.djangoproject.com/zh-hans/2.0/topics/serialization/#serialization-formats-json) for more details about this serializer.

The `safe` boolean parameter defaults to `True`. If it's set to `False`, any object can be passed for serialization (otherwise only `dict` instances are allowed). If `safe` is `True` and a non-`dict` object is passed as the first argument, a [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError "(in Python v3.7)") will be raised.

The `json_dumps_params` parameter is a dictionary of keyword arguments to pass to the `json.dumps()` call used to generate the response.

### Usage[¶](#id4 "Permalink to this headline")

Typical usage could look like:

\>>> from django.http import JsonResponse
\>>> response \= JsonResponse({'foo': 'bar'})
\>>> response.content
b'{"foo": "bar"}'

#### Serializing non-dictionary objects[¶](#serializing-non-dictionary-objects "Permalink to this headline")

In order to serialize objects other than `dict` you must set the `safe` parameter to `False`:

\>>> response \= JsonResponse(\[1, 2, 3\], safe\=False)

Without passing `safe=False`, a [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError "(in Python v3.7)") will be raised.

Warning

Before the [5th edition of ECMAScript](https://www.ecma-international.org/ecma-262/5.1/index.html#sec-11.1.4) it was possible to poison the JavaScript `Array` constructor. For this reason, Django does not allow passing non-dict objects to the [`JsonResponse`](#django.http.JsonResponse "django.http.JsonResponse") constructor by default. However, most modern browsers implement EcmaScript 5 which removes this attack vector. Therefore it is possible to disable this security precaution.

#### Changing the default JSON encoder[¶](#changing-the-default-json-encoder "Permalink to this headline")

If you need to use a different JSON encoder class you can pass the `encoder` parameter to the constructor method:

\>>> response \= JsonResponse(data, encoder\=MyJSONEncoder)

## `StreamingHttpResponse` objects[¶](#streaminghttpresponse-objects "Permalink to this headline")

_class_ `StreamingHttpResponse`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#StreamingHttpResponse)[¶](#django.http.StreamingHttpResponse "Permalink to this definition")

The [`StreamingHttpResponse`](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") class is used to stream a response from Django to the browser. You might want to do this if generating the response takes too long or uses too much memory. For instance, it's useful for [generating large CSV files](https://docs.djangoproject.com/zh-hans/2.0/howto/outputting-csv/#streaming-csv-files).

Performance considerations

Django is designed for short-lived requests. Streaming responses will tie a worker process for the entire duration of the response. This may result in poor performance.

Generally speaking, you should perform expensive tasks outside of the request-response cycle, rather than resorting to a streamed response.

The [`StreamingHttpResponse`](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") is not a subclass of [`HttpResponse`](#django.http.HttpResponse "django.http.HttpResponse"), because it features a slightly different API. However, it is almost identical, with the following notable differences:

-   It should be given an iterator that yields strings as content.
-   You cannot access its content, except by iterating the response object itself. This should only occur when the response is returned to the client.
-   It has no `content` attribute. Instead, it has a [`streaming_content`](#django.http.StreamingHttpResponse.streaming_content "django.http.StreamingHttpResponse.streaming_content") attribute.
-   You cannot use the file-like object `tell()` or `write()` methods. Doing so will raise an exception.

[`StreamingHttpResponse`](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") should only be used in situations where it is absolutely required that the whole content isn't iterated before transferring the data to the client. Because the content can't be accessed, many middleware can't function normally. For example the `ETag` and `Content-Length` headers can't be generated for streaming responses.

### Attributes[¶](#id5 "Permalink to this headline")

`StreamingHttpResponse.``streaming_content`[¶](#django.http.StreamingHttpResponse.streaming_content "Permalink to this definition")

An iterator of strings representing the content.

`StreamingHttpResponse.``status_code`[¶](#django.http.StreamingHttpResponse.status_code "Permalink to this definition")

The [**HTTP status code**](https://tools.ietf.org/html/rfc7231.html#section-6) for the response.

Unless [`reason_phrase`](#django.http.StreamingHttpResponse.reason_phrase "django.http.StreamingHttpResponse.reason_phrase") is explicitly set, modifying the value of `status_code` outside the constructor will also modify the value of `reason_phrase`.

`StreamingHttpResponse.``reason_phrase`[¶](#django.http.StreamingHttpResponse.reason_phrase "Permalink to this definition")

The HTTP reason phrase for the response. It uses the [**HTTP standard's**](https://tools.ietf.org/html/rfc7231.html#section-6.1) default reason phrases.

Unless explicitly set, `reason_phrase` is determined by the value of [`status_code`](#django.http.StreamingHttpResponse.status_code "django.http.StreamingHttpResponse.status_code").

`StreamingHttpResponse.``streaming`[¶](#django.http.StreamingHttpResponse.streaming "Permalink to this definition")

This is always `True`.

## `FileResponse` objects[¶](#fileresponse-objects "Permalink to this headline")

_class_ `FileResponse`[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/http/response/#FileResponse)[¶](#django.http.FileResponse "Permalink to this definition")

[`FileResponse`](#django.http.FileResponse "django.http.FileResponse") is a subclass of [`StreamingHttpResponse`](#django.http.StreamingHttpResponse "django.http.StreamingHttpResponse") optimized for binary files. It uses [wsgi.file\_wrapper](https://www.python.org/dev/peps/pep-3333/#optional-platform-specific-file-handling) if provided by the wsgi server, otherwise it streams the file out in small chunks.

`FileResponse` expects a file open in binary mode like so:

\>>> from django.http import FileResponse
\>>> response \= FileResponse(open('myfile.png', 'rb'))

The file will be closed automatically, so don't open it with a context manager.
