## Clickjacking Protection[¶](#module-django.middleware.clickjacking "Permalink to this headline")

The clickjacking middleware and decorators provide easy-to-use protection against [clickjacking](http://en.wikipedia.org/wiki/Clickjacking). This type of attack occurs when a malicious site tricks a user into clicking on a concealed element of another site which they have loaded in a hidden frame or iframe.

New in Django 1.4: The clickjacking middleware and decorators were added.

## An example of clickjacking[¶](#an-example-of-clickjacking "Permalink to this headline")

Suppose an online store has a page where a logged in user can click “Buy Now” to purchase an item. A user has chosen to stay logged into the store all the time for convenience. An attacker site might create an “I Like Ponies” button on one of their own pages, and load the store’s page in a transparent iframe such that the “Buy Now” button is invisibly overlaid on the “I Like Ponies” button. If the user visits the attacker site and clicks “I Like Ponies” he will inadvertently click on the online store’s “Buy Now” button and unknowingly purchase the item.

## Preventing clickjacking[¶](#preventing-clickjacking "Permalink to this headline")

Modern browsers honor the [X-Frame-Options](https://developer.mozilla.org/en/The_X-FRAME-OPTIONS_response_header) HTTP header that indicates whether or not a resource is allowed to load within a frame or iframe. If the response contains the header with a value of SAMEORIGIN then the browser will only load the resource in a frame if the request originated from the same site. If the header is set to DENY then the browser will block the resource from loading in a frame no matter which site made the request.

Django provides a few simple ways to include this header in responses from your site:

1.  A simple middleware that sets the header in all responses.
2.  A set of view decorators that can be used to override the middleware or to only set the header for certain views.

## How to use it[¶](#how-to-use-it "Permalink to this headline")

### Setting X-Frame-Options for all responses[¶](#setting-x-frame-options-for-all-responses "Permalink to this headline")

To set the same X-Frame-Options value for all responses in your site, add 'django.middleware.clickjacking.XFrameOptionsMiddleware' to [MIDDLEWARE\_CLASSES](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-MIDDLEWARE_CLASSES):

MIDDLEWARE\_CLASSES = (
    ...
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ...
)

By default, the middleware will set the X-Frame-Options header to SAMEORIGIN for every outgoing HttpResponse. If you want DENY instead, set the [X\_FRAME\_OPTIONS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-X_FRAME_OPTIONS) setting:

X\_FRAME\_OPTIONS \= 'DENY'

When using the middleware there may be some views where you do **not** want the X-Frame-Options header set. For those cases, you can use a view decorator that tells the middleware not to set the header:

from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe\_options\_exempt

@xframe\_options\_exempt
def ok\_to\_load\_in\_a\_frame(request):
    return HttpResponse("This page is safe to load in a frame on any site.")

### Setting X-Frame-Options per view[¶](#setting-x-frame-options-per-view "Permalink to this headline")

To set the X-Frame-Options header on a per view basis, Django provides these decorators:

from django.http import HttpResponse
from django.views.decorators.clickjacking import xframe\_options\_deny
from django.views.decorators.clickjacking import xframe\_options\_sameorigin

@xframe\_options\_deny
def view\_one(request):
    return HttpResponse("I won't display in any frame!")

@xframe\_options\_sameorigin
def view\_two(request):
    return HttpResponse("Display in a frame if it's from the same origin as me.")

Note that you can use the decorators in conjunction with the middleware. Use of a decorator overrides the middleware.

## Limitations[¶](#limitations "Permalink to this headline")

The X-Frame-Options header will only protect against clickjacking in a modern browser. Older browsers will quietly ignore the header and need [other clickjacking prevention techniques](http://en.wikipedia.org/wiki/Clickjacking#Prevention).

### Browsers that support X-Frame-Options[¶](#browsers-that-support-x-frame-options "Permalink to this headline")

-   Internet Explorer 8+
-   Firefox 3.6.9+
-   Opera 10.5+
-   Safari 4+
-   Chrome 4.1+
