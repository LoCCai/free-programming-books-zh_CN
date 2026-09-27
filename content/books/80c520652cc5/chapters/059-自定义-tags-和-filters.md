Django’s template system comes with a wide variety of [_built-in tags and filters_](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html) designed to address the presentation logic needs of your application. Nevertheless, you may find yourself needing functionality that is not covered by the core set of template primitives. You can extend the template engine by defining custom tags and filters using Python, and then make them available to your templates using the [{% load %}](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-load) tag.

## Code layout[¶](#code-layout "Permalink to this headline")

Custom template tags and filters must live inside a Django app. If they relate to an existing app it makes sense to bundle them there; otherwise, you should create a new app to hold them.

The app should contain a templatetags directory, at the same level as models.py, views.py, etc. If this doesn’t already exist, create it - don’t forget the \_\_init\_\_.py file to ensure the directory is treated as a Python package.

Your custom tags and filters will live in a module inside the templatetags directory. The name of the module file is the name you’ll use to load the tags later, so be careful to pick a name that won’t clash with custom tags and filters in another app.

For example, if your custom tags/filters are in a file called poll\_extras.py, your app layout might look like this:

polls/
    models.py
    templatetags/
        \_\_init\_\_.py
        poll\_extras.py
    views.py

And in your template you would use the following:

{% load poll\_extras %}

The app that contains the custom tags must be in [INSTALLED\_APPS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-INSTALLED_APPS) in order for the [{% load %}](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-load) tag to work. This is a security feature: It allows you to host Python code for many template libraries on a single host machine without enabling access to all of them for every Django installation.

There’s no limit on how many modules you put in the templatetags package. Just keep in mind that a [{% load %}](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-load) statement will load tags/filters for the given Python module name, not the name of the app.

To be a valid tag library, the module must contain a module-level variable named register that is a template.Library instance, in which all the tags and filters are registered. So, near the top of your module, put the following:

from django import template

register \= template.Library()

Behind the scenes

For a ton of examples, read the source code for Django’s default filters and tags. They’re in django/template/defaultfilters.py and django/template/defaulttags.py, respectively.

For more information on the [load](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-load) tag, read its documentation.

## Writing custom template filters[¶](#writing-custom-template-filters "Permalink to this headline")

Custom filters are just Python functions that take one or two arguments:

-   The value of the variable (input) – not necessarily a string.
-   The value of the argument – this can have a default value, or be left out altogether.

For example, in the filter {{ var|foo:"bar" }}, the filter foo would be passed the variable var and the argument "bar".

Filter functions should always return something. They shouldn’t raise exceptions. They should fail silently. In case of error, they should return either the original input or an empty string – whichever makes more sense.

Here’s an example filter definition:

def cut(value, arg):
    """Removes all values of arg from the given string"""
    return value.replace(arg, '')

And here’s an example of how that filter would be used:

{{ somevariable|cut:"0" }}

Most filters don’t take arguments. In this case, just leave the argument out of your function. Example:

def lower(value): \# Only one argument.
    """Converts a string into all lowercase"""
    return value.lower()

### Registering custom filters[¶](#registering-custom-filters "Permalink to this headline")

django.template.Library.filter()[¶](#django.template.Library.filter "Permalink to this definition")

Once you’ve written your filter definition, you need to register it with your Library instance, to make it available to Django’s template language:

register.filter('cut', cut)
register.filter('lower', lower)

The Library.filter() method takes two arguments:

1.  The name of the filter – a string.
2.  The compilation function – a Python function (not the name of the function as a string).

You can use register.filter() as a decorator instead:

@register.filter(name\='cut')
def cut(value, arg):
    return value.replace(arg, '')

@register.filter
def lower(value):
    return value.lower()

If you leave off the name argument, as in the second example above, Django will use the function’s name as the filter name.

Finally, register.filter() also accepts three keyword arguments, is\_safe, needs\_autoescape, and expects\_localtime. These arguments are described in [_filters and auto-escaping_](#filters-auto-escaping) and [_filters and time zones_](#filters-timezones) below.

### Template filters that expect strings[¶](#template-filters-that-expect-strings "Permalink to this headline")

django.template.defaultfilters.stringfilter()[¶](#django.template.defaultfilters.stringfilter "Permalink to this definition")

If you’re writing a template filter that only expects a string as the first argument, you should use the decorator stringfilter. This will convert an object to its string value before being passed to your function:

from django import template
from django.template.defaultfilters import stringfilter

register \= template.Library()

@register.filter
@stringfilter
def lower(value):
    return value.lower()

This way, you’ll be able to pass, say, an integer to this filter, and it won’t cause an AttributeError (because integers don’t have lower() methods).

### Filters and auto-escaping[¶](#filters-and-auto-escaping "Permalink to this headline")

When writing a custom filter, give some thought to how the filter will interact with Django’s auto-escaping behavior. Note that three types of strings can be passed around inside the template code:

-   **Raw strings** are the native Python str or unicode types. On output, they’re escaped if auto-escaping is in effect and presented unchanged, otherwise.
    
-   **Safe strings** are strings that have been marked safe from further escaping at output time. Any necessary escaping has already been done. They’re commonly used for output that contains raw HTML that is intended to be interpreted as-is on the client side.
    
    Internally, these strings are of type SafeBytes or SafeText. They share a common base class of SafeData, so you can test for them using code like:
    
    if isinstance(value, SafeData):
        \# Do something with the "safe" string.
        ...
    
-   **Strings marked as “needing escaping”** are _always_ escaped on output, regardless of whether they are in an [autoescape](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-autoescape) block or not. These strings are only escaped once, however, even if auto-escaping applies.
    
    Internally, these strings are of type EscapeBytes or EscapeText. Generally you don’t have to worry about these; they exist for the implementation of the [escape](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatefilter-escape) filter.
    

Template filter code falls into one of two situations:

1.  Your filter does not introduce any HTML-unsafe characters (<, \>, ', " or &) into the result that were not already present. In this case, you can let Django take care of all the auto-escaping handling for you. All you need to do is set the is\_safe flag to True when you register your filter function, like so:
    
    @register.filter(is\_safe\=True)
    def myfilter(value):
        return value
    
    This flag tells Django that if a “safe” string is passed into your filter, the result will still be “safe” and if a non-safe string is passed in, Django will automatically escape it, if necessary.
    
    You can think of this as meaning “this filter is safe – it doesn’t introduce any possibility of unsafe HTML.”
    
    The reason is\_safe is necessary is because there are plenty of normal string operations that will turn a SafeData object back into a normal str or unicode object and, rather than try to catch them all, which would be very difficult, Django repairs the damage after the filter has completed.
    
    For example, suppose you have a filter that adds the string xx to the end of any input. Since this introduces no dangerous HTML characters to the result (aside from any that were already present), you should mark your filter with is\_safe:
    
    @register.filter(is\_safe\=True)
    def add\_xx(value):
        return '%sxx' % value
    
    When this filter is used in a template where auto-escaping is enabled, Django will escape the output whenever the input is not already marked as “safe”.
    
    By default, is\_safe is False, and you can omit it from any filters where it isn’t required.
    
    Be careful when deciding if your filter really does leave safe strings as safe. If you’re _removing_ characters, you might inadvertently leave unbalanced HTML tags or entities in the result. For example, removing a \> from the input might turn <a> into <a, which would need to be escaped on output to avoid causing problems. Similarly, removing a semicolon (;) can turn &amp; into &amp, which is no longer a valid entity and thus needs further escaping. Most cases won’t be nearly this tricky, but keep an eye out for any problems like that when reviewing your code.
    
    Marking a filter is\_safe will coerce the filter’s return value to a string. If your filter should return a boolean or other non-string value, marking it is\_safe will probably have unintended consequences (such as converting a boolean False to the string ‘False’).
    
2.  Alternatively, your filter code can manually take care of any necessary escaping. This is necessary when you’re introducing new HTML markup into the result. You want to mark the output as safe from further escaping so that your HTML markup isn’t escaped further, so you’ll need to handle the input yourself.
    
    To mark the output as a safe string, use [django.utils.safestring.mark\_safe()](https://django-chinese-docs.readthedocs.io/en/latest/ref/utils.html#django.utils.safestring.mark_safe "django.utils.safestring.mark_safe").
    
    Be careful, though. You need to do more than just mark the output as safe. You need to ensure it really _is_ safe, and what you do depends on whether auto-escaping is in effect. The idea is to write filters than can operate in templates where auto-escaping is either on or off in order to make things easier for your template authors.
    
    In order for your filter to know the current auto-escaping state, set the needs\_autoescape flag to True when you register your filter function. (If you don’t specify this flag, it defaults to False). This flag tells Django that your filter function wants to be passed an extra keyword argument, called autoescape, that is True if auto-escaping is in effect and False otherwise.
    
    For example, let’s write a filter that emphasizes the first character of a string:
    
    from django.utils.html import conditional\_escape
    from django.utils.safestring import mark\_safe
    
    @register.filter(needs\_autoescape\=True)
    def initial\_letter\_filter(text, autoescape\=None):
        first, other \= text\[0\], text\[1:\]
        if autoescape:
            esc \= conditional\_escape
        else:
            esc \= lambda x: x
        result \= '<strong>%s</strong>%s' % (esc(first), esc(other))
        return mark\_safe(result)
    
    The needs\_autoescape flag and the autoescape keyword argument mean that our function will know whether automatic escaping is in effect when the filter is called. We use autoescape to decide whether the input data needs to be passed through django.utils.html.conditional\_escape or not. (In the latter case, we just use the identity function as the “escape” function.) The conditional\_escape() function is like escape() except it only escapes input that is **not** a SafeData instance. If a SafeData instance is passed to conditional\_escape(), the data is returned unchanged.
    
    Finally, in the above example, we remember to mark the result as safe so that our HTML is inserted directly into the template without further escaping.
    
    There’s no need to worry about the is\_safe flag in this case (although including it wouldn’t hurt anything). Whenever you manually handle the auto-escaping issues and return a safe string, the is\_safe flag won’t change anything either way.
    

Changed in Django 1.4.

is\_safe and needs\_autoescape used to be attributes of the filter function; this syntax is deprecated.

@register.filter
def myfilter(value):
    return value
myfilter.is\_safe \= True

@register.filter
def initial\_letter\_filter(text, autoescape\=None):
    \# ...
    return mark\_safe(result)
initial\_letter\_filter.needs\_autoescape \= True

### Filters and time zones[¶](#filters-and-time-zones "Permalink to this headline")

New in Django 1.4.

If you write a custom filter that operates on [datetime](http://docs.python.org/2.7/library/datetime.html#datetime.datetime "(in Python v2.7)") objects, you’ll usually register it with the expects\_localtime flag set to True:

@register.filter(expects\_localtime\=True)
def businesshours(value):
    try:
        return 9 <= value.hour < 17
    except AttributeError:
        return ''

When this flag is set, if the first argument to your filter is a time zone aware datetime, Django will convert it to the current time zone before passing it to your filter when appropriate, according to [_rules for time zones conversions in templates_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/timezones.html#time-zones-in-templates).
