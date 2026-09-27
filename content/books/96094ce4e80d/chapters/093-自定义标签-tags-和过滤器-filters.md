Django's template language comes with a wide variety of [built-in tags and filters](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/) designed to address the presentation logic needs of your application. Nevertheless, you may find yourself needing functionality that is not covered by the core set of template primitives. You can extend the template engine by defining custom tags and filters using Python, and then make them available to your templates using the [`{% load %}`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-load) tag.

## Code layout[¶](#code-layout "Permalink to this headline")

The most common place to specify custom template tags and filters is inside a Django app. If they relate to an existing app, it makes sense to bundle them there; otherwise, they can be added to a new app. When a Django app is added to [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-INSTALLED_APPS), any tags it defines in the conventional location described below are automatically made available to load within templates.

The app should contain a `templatetags` directory, at the same level as `models.py`, `views.py`, etc. If this doesn't already exist, create it - don't forget the `__init__.py` file to ensure the directory is treated as a Python package.

开发服务器并不会自动重启

After adding the `templatetags` module, you will need to restart your server before you can use the tags or filters in templates.

Your custom tags and filters will live in a module inside the `templatetags` directory. The name of the module file is the name you'll use to load the tags later, so be careful to pick a name that won't clash with custom tags and filters in another app.

For example, if your custom tags/filters are in a file called `poll_extras.py`, your app layout might look like this:

polls/
    \_\_init\_\_.py
    models.py
    templatetags/
        \_\_init\_\_.py
        poll\_extras.py
    views.py

And in your template you would use the following:

{% load poll\_extras %}

The app that contains the custom tags must be in [`INSTALLED_APPS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-INSTALLED_APPS) in order for the [`{% load %}`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-load) tag to work. This is a security feature: It allows you to host Python code for many template libraries on a single host machine without enabling access to all of them for every Django installation.

There's no limit on how many modules you put in the `templatetags` package. Just keep in mind that a [`{% load %}`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-load) statement will load tags/filters for the given Python module name, not the name of the app.

To be a valid tag library, the module must contain a module-level variable named `register` that is a `template.Library` instance, in which all the tags and filters are registered. So, near the top of your module, put the following:

from django import template

register \= template.Library()

Alternatively, template tag modules can be registered through the `'libraries'` argument to [`DjangoTemplates`](https://docs.djangoproject.com/zh-hans/2.0/topics/templates/#django.template.backends.django.DjangoTemplates "django.template.backends.django.DjangoTemplates"). This is useful if you want to use a different label from the template tag module name when loading template tags. It also enables you to register tags without installing an application.

Behind the scenes

For a ton of examples, read the source code for Django's default filters and tags. They're in `django/template/defaultfilters.py` and `django/template/defaulttags.py`, respectively.

For more information on the [`load`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-load) tag, read its documentation.

## Writing custom template filters[¶](#writing-custom-template-filters "Permalink to this headline")

Custom filters are just Python functions that take one or two arguments:

-   The value of the variable (input) -- not necessarily a string.
-   The value of the argument -- this can have a default value, or be left out altogether.

For example, in the filter `{{ var|foo:"bar" }}`, the filter `foo` would be passed the variable `var` and the argument `"bar"`.

Since the template language doesn't provide exception handling, any exception raised from a template filter will be exposed as a server error. Thus, filter functions should avoid raising exceptions if there is a reasonable fallback value to return. In case of input that represents a clear bug in a template, raising an exception may still be better than silent failure which hides the bug.

这是一个过滤器定义的例子：

def cut(value, arg):
    """Removes all values of arg from the given string"""
    return value.replace(arg, '')

这个例子展示了如何使用这个过滤器：

{{ somevariable|cut:"0" }}

Most filters don't take arguments. In this case, just leave the argument out of your function. Example:

def lower(value): \# Only one argument.
    """Converts a string into all lowercase"""
    return value.lower()

### 注册自定义过滤器[¶](#registering-custom-filters "Permalink to this headline")

`django.template.Library.``filter`()[¶](#django.template.Library.filter "Permalink to this definition")

Once you've written your filter definition, you need to register it with your `Library` instance, to make it available to Django's template language:

register.filter('cut', cut)
register.filter('lower', lower)

The `Library.filter()` method takes two arguments:

1.  筛选器的名称——字符串。
2.  The compilation function -- a Python function (not the name of the function as a string).

You can use `register.filter()` as a decorator instead:

@register.filter(name\='cut')
def cut(value, arg):
    return value.replace(arg, '')

@register.filter
def lower(value):
    return value.lower()

If you leave off the `name` argument, as in the second example above, Django will use the function's name as the filter name.

Finally, `register.filter()` also accepts three keyword arguments, `is_safe`, `needs_autoescape`, and `expects_localtime`. These arguments are described in [filters and auto-escaping](#filters-auto-escaping) and [filters and time zones](#filters-timezones) below.

### Template filters that expect strings[¶](#template-filters-that-expect-strings "Permalink to this headline")

`django.template.defaultfilters.``stringfilter`()[¶](#django.template.defaultfilters.stringfilter "Permalink to this definition")

If you're writing a template filter that only expects a string as the first argument, you should use the decorator `stringfilter`. This will convert an object to its string value before being passed to your function:

from django import template
from django.template.defaultfilters import stringfilter

register \= template.Library()

@register.filter
@stringfilter
def lower(value):
    return value.lower()

This way, you'll be able to pass, say, an integer to this filter, and it won't cause an `AttributeError` (because integers don't have `lower()` methods).

### 筛选器和自动转义[¶](#filters-and-auto-escaping "Permalink to this headline")

When writing a custom filter, give some thought to how the filter will interact with Django's auto-escaping behavior. Note that two types of strings can be passed around inside the template code:

-   **Raw strings** are the native Python strings. On output, they're escaped if auto-escaping is in effect and presented unchanged, otherwise.
    
-   **Safe strings** are strings that have been marked safe from further escaping at output time. Any necessary escaping has already been done. They're commonly used for output that contains raw HTML that is intended to be interpreted as-is on the client side.
    
    Internally, these strings are of type [`SafeText`](https://docs.djangoproject.com/zh-hans/2.0/ref/utils/#django.utils.safestring.SafeText "django.utils.safestring.SafeText"). You can test for them using code like:
    
    from django.utils.safestring import SafeText
    
    if isinstance(value, SafeText):
        \# Do something with the "safe" string.
        ...
    

Template filter code falls into one of two situations:

1.  Your filter does not introduce any HTML-unsafe characters (`<`, `>`, `'`, `"` or `&`) into the result that were not already present. In this case, you can let Django take care of all the auto-escaping handling for you. All you need to do is set the `is_safe` flag to `True` when you register your filter function, like so:
    
    @register.filter(is\_safe\=True)
    def myfilter(value):
        return value
    
    This flag tells Django that if a "safe" string is passed into your filter, the result will still be "safe" and if a non-safe string is passed in, Django will automatically escape it, if necessary.
    
    You can think of this as meaning "this filter is safe -- it doesn't introduce any possibility of unsafe HTML."
    
    The reason `is_safe` is necessary is because there are plenty of normal string operations that will turn a `SafeData` object back into a normal `str` object and, rather than try to catch them all, which would be very difficult, Django repairs the damage after the filter has completed.
    
    For example, suppose you have a filter that adds the string `xx` to the end of any input. Since this introduces no dangerous HTML characters to the result (aside from any that were already present), you should mark your filter with `is_safe`:
    
    @register.filter(is\_safe\=True)
    def add\_xx(value):
        return '%sxx' % value
    
    When this filter is used in a template where auto-escaping is enabled, Django will escape the output whenever the input is not already marked as "safe".
    
    By default, `is_safe` is `False`, and you can omit it from any filters where it isn't required.
    
    Be careful when deciding if your filter really does leave safe strings as safe. If you're _removing_ characters, you might inadvertently leave unbalanced HTML tags or entities in the result. For example, removing a `>` from the input might turn `<a>` into `<a`, which would need to be escaped on output to avoid causing problems. Similarly, removing a semicolon (`;`) can turn `&amp;` into `&amp`, which is no longer a valid entity and thus needs further escaping. Most cases won't be nearly this tricky, but keep an eye out for any problems like that when reviewing your code.
    
    Marking a filter `is_safe` will coerce the filter's return value to a string. If your filter should return a boolean or other non-string value, marking it `is_safe` will probably have unintended consequences (such as converting a boolean False to the string 'False').
    
2.  Alternatively, your filter code can manually take care of any necessary escaping. This is necessary when you're introducing new HTML markup into the result. You want to mark the output as safe from further escaping so that your HTML markup isn't escaped further, so you'll need to handle the input yourself.
    
    To mark the output as a safe string, use [`django.utils.safestring.mark_safe()`](https://docs.djangoproject.com/zh-hans/2.0/ref/utils/#django.utils.safestring.mark_safe "django.utils.safestring.mark_safe").
    
    Be careful, though. You need to do more than just mark the output as safe. You need to ensure it really _is_ safe, and what you do depends on whether auto-escaping is in effect. The idea is to write filters that can operate in templates where auto-escaping is either on or off in order to make things easier for your template authors.
    
    In order for your filter to know the current auto-escaping state, set the `needs_autoescape` flag to `True` when you register your filter function. (If you don't specify this flag, it defaults to `False`). This flag tells Django that your filter function wants to be passed an extra keyword argument, called `autoescape`, that is `True` if auto-escaping is in effect and `False` otherwise. It is recommended to set the default of the `autoescape` parameter to `True`, so that if you call the function from Python code it will have escaping enabled by default.
    
    For example, let's write a filter that emphasizes the first character of a string:
    
    from django import template
    from django.utils.html import conditional\_escape
    from django.utils.safestring import mark\_safe
    
    register \= template.Library()
    
    @register.filter(needs\_autoescape\=True)
    def initial\_letter\_filter(text, autoescape\=True):
        first, other \= text\[0\], text\[1:\]
        if autoescape:
            esc \= conditional\_escape
        else:
            esc \= lambda x: x
        result \= '<strong>%s</strong>%s' % (esc(first), esc(other))
        return mark\_safe(result)
    
    The `needs_autoescape` flag and the `autoescape` keyword argument mean that our function will know whether automatic escaping is in effect when the filter is called. We use `autoescape` to decide whether the input data needs to be passed through `django.utils.html.conditional_escape` or not. (In the latter case, we just use the identity function as the "escape" function.) The `conditional_escape()` function is like `escape()` except it only escapes input that is **not** a `SafeData` instance. If a `SafeData` instance is passed to `conditional_escape()`, the data is returned unchanged.
    
    Finally, in the above example, we remember to mark the result as safe so that our HTML is inserted directly into the template without further escaping.
    
    There's no need to worry about the `is_safe` flag in this case (although including it wouldn't hurt anything). Whenever you manually handle the auto-escaping issues and return a safe string, the `is_safe` flag won't change anything either way.
    

Warning

Avoiding XSS vulnerabilities when reusing built-in filters

Django's built-in filters have `autoescape=True` by default in order to get the proper autoescaping behavior and avoid a cross-site script vulnerability.

In older versions of Django, be careful when reusing Django's built-in filters as `autoescape` defaults to `None`. You'll need to pass `autoescape=True` to get autoescaping.

For example, if you wanted to write a custom filter called `urlize_and_linebreaks` that combined the [`urlize`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatefilter-urlize) and [`linebreaksbr`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatefilter-linebreaksbr) filters, the filter would look like:

from django.template.defaultfilters import linebreaksbr, urlize

@register.filter(needs\_autoescape\=True)
def urlize\_and\_linebreaks(text, autoescape\=True):
    return linebreaksbr(
        urlize(text, autoescape\=autoescape),
        autoescape\=autoescape
    )

接下来：

{{ comment|urlize\_and\_linebreaks }}

would be equivalent to:

{{ comment|urlize|linebreaksbr }}

### 过滤器和时区[¶](#filters-and-time-zones "Permalink to this headline")

If you write a custom filter that operates on [`datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.7)") objects, you'll usually register it with the `expects_localtime` flag set to `True`:

@register.filter(expects\_localtime\=True)
def businesshours(value):
    try:
        return 9 <= value.hour < 17
    except AttributeError:
        return ''

When this flag is set, if the first argument to your filter is a time zone aware datetime, Django will convert it to the current time zone before passing it to your filter when appropriate, according to [rules for time zones conversions in templates](https://docs.djangoproject.com/zh-hans/2.0/topics/i18n/timezones/#time-zones-in-templates).
