## TemplateResponse and SimpleTemplateResponse[¶](#module-django.template.response "Permalink to this headline")

Standard [HttpResponse](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpResponse "django.http.HttpResponse") objects are static structures. They are provided with a block of pre-rendered content at time of construction, and while that content can be modified, it isn’t in a form that makes it easy to perform modifications.

However, it can sometimes be beneficial to allow decorators or middleware to modify a response _after_ it has been constructed by the view. For example, you may want to change the template that is used, or put additional data into the context.

TemplateResponse provides a way to do just that. Unlike basic [HttpResponse](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpResponse "django.http.HttpResponse") objects, TemplateResponse objects retain the details of the template and context that was provided by the view to compute the response. The final output of the response is not computed until it is needed, later in the response process.

## SimpleTemplateResponse objects[¶](#simpletemplateresponse-objects "Permalink to this headline")

_class_ SimpleTemplateResponse[¶](#django.template.response.SimpleTemplateResponse "Permalink to this definition")

### Attributes[¶](#attributes "Permalink to this headline")

SimpleTemplateResponse.template\_name[¶](#django.template.response.SimpleTemplateResponse.template_name "Permalink to this definition")

The name of the template to be rendered. Accepts a [Template](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Template "django.template.Template") object, a path to a template or list of template paths.

Example: \['foo.html', 'path/to/bar.html'\]

SimpleTemplateResponse.context\_data[¶](#django.template.response.SimpleTemplateResponse.context_data "Permalink to this definition")

The context data to be used when rendering the template. It can be a dictionary or a context object.

Example: {'foo': 123}

SimpleTemplateResponse.rendered\_content[¶](#django.template.response.SimpleTemplateResponse.rendered_content "Permalink to this definition")

The current rendered value of the response content, using the current template and context data.

SimpleTemplateResponse.is\_rendered[¶](#django.template.response.SimpleTemplateResponse.is_rendered "Permalink to this definition")

A boolean indicating whether the response content has been rendered.

### Methods[¶](#methods "Permalink to this headline")

SimpleTemplateResponse.\_\_init\_\_(_template_, _context=None_, _content\_type=None_, _status=None_)[¶](#django.template.response.SimpleTemplateResponse.__init__ "Permalink to this definition")

Instantiates a [SimpleTemplateResponse](#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse") object with the given template, context, content type, and HTTP status.

template

The full name of a template, or a sequence of template names. [Template](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Template "django.template.Template") instances can also be used.

context

A dictionary of values to add to the template context. By default, this is an empty dictionary. [Context](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Context "django.template.Context") objects are also accepted as context values.

status

The HTTP Status code for the response.

content\_type

> Changed in Django 1.5.
> 
> Historically, this parameter was only called mimetype (now deprecated), but since this is actually the value included in the HTTP Content-Type header, it can also include the character set encoding, which makes it more than just a MIME type specification. If mimetype is specified (not None), that value is used. Otherwise, content\_type is used. If neither is given, [DEFAULT\_CONTENT\_TYPE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CONTENT_TYPE) is used.

SimpleTemplateResponse.resolve\_context(_context_)[¶](#django.template.response.SimpleTemplateResponse.resolve_context "Permalink to this definition")

Converts context data into a context instance that can be used for rendering a template. Accepts a dictionary of context data or a context object. Returns a [Context](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Context "django.template.Context") instance containing the provided data.

Override this method in order to customize context instantiation.

SimpleTemplateResponse.resolve\_template(_template_)[¶](#django.template.response.SimpleTemplateResponse.resolve_template "Permalink to this definition")

Resolves the template instance to use for rendering. Accepts a path of a template to use, or a sequence of template paths. [Template](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Template "django.template.Template") instances may also be provided. Returns the [Template](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Template "django.template.Template") instance to be rendered.

Override this method in order to customize template rendering.

SimpleTemplateResponse.add\_post\_render\_callback()[¶](#django.template.response.SimpleTemplateResponse.add_post_render_callback "Permalink to this definition")

Add a callback that will be invoked after rendering has taken place. This hook can be used to defer certain processing operations (such as caching) until after rendering has occurred.

If the [SimpleTemplateResponse](#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse") has already been rendered, the callback will be invoked immediately.

When called, callbacks will be passed a single argument – the rendered [SimpleTemplateResponse](#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse") instance.

If the callback returns a value that is not None, this will be used as the response instead of the original response object (and will be passed to the next post rendering callback etc.)

SimpleTemplateResponse.render()[¶](#django.template.response.SimpleTemplateResponse.render "Permalink to this definition")

Sets response.content to the result obtained by [SimpleTemplateResponse.rendered\_content](#django.template.response.SimpleTemplateResponse.rendered_content "django.template.response.SimpleTemplateResponse.rendered_content"), runs all post-rendering callbacks, and returns the resulting response object.

render() will only have an effect the first time it is called. On subsequent calls, it will return the result obtained from the first call.

## TemplateResponse objects[¶](#templateresponse-objects "Permalink to this headline")

_class_ TemplateResponse[¶](#django.template.response.TemplateResponse "Permalink to this definition")

TemplateResponse is a subclass of [SimpleTemplateResponse](#django.template.response.SimpleTemplateResponse "django.template.response.SimpleTemplateResponse") that uses a [RequestContext](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.RequestContext "django.template.RequestContext") instead of a [Context](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Context "django.template.Context").

### Methods[¶](#id1 "Permalink to this headline")

TemplateResponse.\_\_init\_\_(_request_, _template_, _context=None_, _content\_type=None_, _status=None_, _current\_app=None_)[¶](#django.template.response.TemplateResponse.__init__ "Permalink to this definition")

Instantiates an TemplateResponse object with the given template, context, MIME type and HTTP status.

request

An [HttpRequest](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpRequest "django.http.HttpRequest") instance.

template

The full name of a template, or a sequence of template names. [Template](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Template "django.template.Template") instances can also be used.

context

A dictionary of values to add to the template context. By default, this is an empty dictionary. [Context](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html#django.template.Context "django.template.Context") objects are also accepted as context values.

status

The HTTP Status code for the response.

content\_type

> Changed in Django 1.5.
> 
> Historically, this parameter was only called mimetype (now deprecated), but since this is actually the value included in the HTTP Content-Type header, it can also include the character set encoding, which makes it more than just a MIME type specification. If mimetype is specified (not None), that value is used. Otherwise, content\_type is used. If neither is given, [DEFAULT\_CONTENT\_TYPE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DEFAULT_CONTENT_TYPE) is used.

current\_app

A hint indicating which application contains the current view. See the [_namespaced URL resolution strategy_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html#topics-http-reversing-url-namespaces) for more information.

## The rendering process[¶](#the-rendering-process "Permalink to this headline")

Before a [TemplateResponse](#django.template.response.TemplateResponse "django.template.response.TemplateResponse") instance can be returned to the client, it must be rendered. The rendering process takes the intermediate representation of template and context, and turns it into the final byte stream that can be served to the client.

There are three circumstances under which a TemplateResponse will be rendered:

-   When the TemplateResponse instance is explicitly rendered, using the [SimpleTemplateResponse.render()](#django.template.response.SimpleTemplateResponse.render "django.template.response.SimpleTemplateResponse.render") method.
-   When the content of the response is explicitly set by assigning response.content.
-   After passing through template response middleware, but before passing through response middleware.

A TemplateResponse can only be rendered once. The first call to [SimpleTemplateResponse.render()](#django.template.response.SimpleTemplateResponse.render "django.template.response.SimpleTemplateResponse.render") sets the content of the response; subsequent rendering calls do not change the response content.

However, when response.content is explicitly assigned, the change is always applied. If you want to force the content to be re-rendered, you can re-evaluate the rendered content, and assign the content of the response manually:

\# Set up a rendered TemplateResponse
>>> t = TemplateResponse(request, 'original.html', {})
>>> t.render()
>>> print(t.content)
Original content

# Re-rendering doesn't change content
>>> t.template\_name = 'new.html'
>>> t.render()
>>> print(t.content)
Original content

# Assigning content does change, no render() call required
>>> t.content = t.rendered\_content
>>> print(t.content)
New content

### Post-render callbacks[¶](#post-render-callbacks "Permalink to this headline")

Some operations – such as caching – cannot be performed on an unrendered template. They must be performed on a fully complete and rendered response.

If you’re using middleware, the solution is easy. Middleware provides multiple opportunities to process a response on exit from a view. If you put behavior in the Response middleware is guaranteed to execute after template rendering has taken place.

However, if you’re using a decorator, the same opportunities do not exist. Any behavior defined in a decorator is handled immediately.

To compensate for this (and any other analogous use cases), [TemplateResponse](#django.template.response.TemplateResponse "django.template.response.TemplateResponse") allows you to register callbacks that will be invoked when rendering has completed. Using this callback, you can defer critical processing until a point where you can guarantee that rendered content will be available.

To define a post-render callback, just define a function that takes a single argument – response – and register that function with the template response:

def my\_render\_callback(response):
    \# Do content-sensitive processing
    do\_post\_processing()

def my\_view(request):
    \# Create a response
    response \= TemplateResponse(request, 'mytemplate.html', {})
    \# Register the callback
    response.add\_post\_render\_callback(my\_render\_callback)
    \# Return the response
    return response

my\_render\_callback() will be invoked after the mytemplate.html has been rendered, and will be provided the fully rendered [TemplateResponse](#django.template.response.TemplateResponse "django.template.response.TemplateResponse") instance as an argument.

If the template has already been rendered, the callback will be invoked immediately.

## Using TemplateResponse and SimpleTemplateResponse[¶](#using-templateresponse-and-simpletemplateresponse "Permalink to this headline")

A TemplateResponse object can be used anywhere that a normal HttpResponse can be used. It can also be used as an alternative to calling [render\_to\_response()](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/shortcuts.html#django.shortcuts.render_to_response "django.shortcuts.render_to_response").

For example, the following simple view returns a [TemplateResponse()](#django.template.response.TemplateResponse "django.template.response.TemplateResponse") with a simple template, and a context containing a queryset:

from django.template.response import TemplateResponse

def blog\_index(request):
    return TemplateResponse(request, 'entry\_list.html', {'entries': Entry.objects.all()})
