## Django 自定义异常处理页面源码解读

这个解读来源于一个读者的反馈，于是花了几分钟看了下这部分源码，打算用十分钟的时间写一下，预计阅读需要 5 分钟。

## 自定义异常页面

Django 提供了常见的错误的页面，比如

-   说用户访问了一个不存在的路径，引发的 404
-   系统发生了一个异常，出现了 500

一个好的网站应该可以给用户友好的信息提示，比如：“服务器提了一个问题”之类的，然后给用户一个引导。对于商业网站需要注意的是_错误页面的流量也是流量_，应该有明确的引导。

在 Django 中定义这类处理很简单，只需要在 urls.py 中配置：

```
# 参考：https://github.com/the5fire/typeidea/blob/deploy-to-cloud/typeidea/typeidea/urls.py#L24
handler404 = Handler404.as_view()
handler500 = Handler50x.as_view()
```

当然你需要定义这里面的 Handler50x：

```
class Handler404(CommonViewMixin, TemplateView):
    template_name = '404.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context, status=404)


class Handler50x(CommonViewMixin, TemplateView):
    template_name = '50x.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context, status=500)
```

这样就可以简单的控制出错时展示给用户的页面了。需要注意的是，这个配置只会在非 Debug 模式下有效。

## Django Error Handler 源码解析

要看这部分源码的第一步是判断 Django 可能会在哪处理这个异常。有很多方法，这里是说一种，从请求的入口开始撸。

注意我看到版本是 Django 2.0.1

1 WSGI Handler 的部分

```
# 代码：https://github.com/the5fire/django-inside/blob/84f272e1206554b43c86c0f7a50f37d1f3efbc28/django/core/handlers/wsgi.py#L135
class WSGIHandler(base.BaseHandler):
    request_class = WSGIRequest

    def __init__(self, *args, **kwargs):
        super(WSGIHandler, self).__init__(*args, **kwargs)
        self.load_middleware()

    def __call__(self, environ, start_response):
        set_script_prefix(get_script_name(environ))
        signals.request_started.send(sender=self.__class__, environ=environ)
        request = self.request_class(environ)
        response = self.get_response(request)  # the5fire: 注意这儿
        # ... the5fire:省略其他
```

2 BaseHandler 中的 get\_response

```
    # ref: https://github.com/the5fire/django-inside/blob/84f272e1206554b43c86c0f7a50f37d1f3efbc28/django/core/handlers/base.py#L94
    def get_response(self, request):
        """Return an HttpResponse object for the given HttpRequest."""
        # Setup default url resolver for this thread
        set_urlconf(settings.ROOT_URLCONF)

        response = self._middleware_chain(request)  # the5fire: 这里进去

        response._closable_objects.append(request)

        # If the exception handler returns a TemplateResponse that has not
        # been rendered, force it to be rendered.
        if not getattr(response, 'is_rendered', True) and callable(getattr(response, 'render', None)):
            response = response.render()

        if response.status_code == 404:
            logger.warning(
                'Not Found: %s', request.path,
                extra={'status_code': 404, 'request': request},
            )

        return response
```

3 被包装的 \_middleware\_chain

```
    # https://github.com/the5fire/django-inside/blob/84f272e1206554b43c86c0f7a50f37d1f3efbc28/django/core/handlers/base.py#L76
    def load_middleware(self):
        """
        Populate middleware lists from settings.MIDDLEWARE.

        Must be called after the environment is fixed (see __call__ in subclasses).
        """
        self._request_middleware = []
        self._view_middleware = []
        self._template_response_middleware = []
        self._response_middleware = []
        self._exception_middleware = []

        handler = convert_exception_to_response(self._get_response)
        for middleware_path in reversed(settings.MIDDLEWARE):
            middleware = import_string(middleware_path)
            # ...  the5fire：忽略中间这些代码
            handler = convert_exception_to_response(mw_instance)

        # We only assign to this when initialization is complete as it is used
        # as a flag for initialization being complete.
        self._middleware_chain = handler
```

4 具体处理异常的部分

```
    def convert_exception_to_response(get_response):
        """
        Wrap the given get_response callable in exception-to-response conversion.

        All exceptions will be converted. All known 4xx exceptions (Http404,
        PermissionDenied, MultiPartParserError, SuspiciousOperation) will be
        converted to the appropriate response, and all other exceptions will be
        converted to 500 responses.

        This decorator is automatically applied to all middleware to ensure that
        no middleware leaks an exception and that the next middleware in the stack
        can rely on getting a response instead of an exception.
        """
        @wraps(get_response)
        def inner(request):
            try:
                response = get_response(request)
            except Exception as exc:
                response = response_for_exception(request, exc)  # the5fire: 这里进去
            return response
        return inner


    def response_for_exception(request, exc):
        if isinstance(exc, Http404):
            if settings.DEBUG:
                response = debug.technical_404_response(request, exc)
            else:
                response = get_exception_response(request, get_resolver(get_urlconf()), 404, exc)

        # ... the5fire: 省略掉一大坨类似的代码

        else:
            signals.got_request_exception.send(sender=None, request=request)
            # the5fire: 下面这一行，具体的处理逻辑。
            response = handle_uncaught_exception(request, get_resolver(get_urlconf()), sys.exc_info())

        # Force a TemplateResponse to be rendered.
        if not getattr(response, 'is_rendered', True) and callable(getattr(response, 'render', None)):
            response = response.render()

        return response
```

5 异常处理逻辑

```
    # https://github.com/the5fire/django-inside/blob/84f272e1206554b43c86c0f7a50f37d1f3efbc28/django/core/handlers/exception.py#L107
    def handle_uncaught_exception(request, resolver, exc_info):
        """
        Processing for any otherwise uncaught exceptions (those that will
        generate HTTP 500 responses).
        """
        if settings.DEBUG_PROPAGATE_EXCEPTIONS:
            raise

        logger.error(
            'Internal Server Error: %s', request.path,
            exc_info=exc_info,
            extra={'status_code': 500, 'request': request},
        )

        if settings.DEBUG:
            return debug.technical_500_response(request, *exc_info)

        # Return an HttpResponse that displays a friendly error message.
        # the5fire: 这里会解析到对应的handler ，比如我们定义的那个
        callback, param_dict = resolver.resolve_error_handler(500)
        return callback(request, **param_dict)
```

6 最终解析到 urls/resolvers.py 中

```
    # 完整代码: https://github.com/the5fire/django-inside/blob/84f272e1206554b43c86c0f7a50f37d1f3efbc28/django/urls/resolvers.py#L555
    def resolve_error_handler(self, view_type):
        callback = getattr(self.urlconf_module, 'handler%s' % view_type, None)  # the5fire: 这里就是去获取 urls.py 中对应的配置
        if not callback:
            # No handler specified in file; use lazy import, since
            # django.conf.urls imports this file.
            from django.conf import urls
            callback = getattr(urls, 'handler%s' % view_type)
        return get_callable(callback), {}
```

## 最后

实际上花了比预计更多的时间来把完整的代码贴出来，以及明确对应的版本。在 Django 1.11 中的处理逻辑有些不同。

实际阅读时间也会比预计的久，但如果能理解这个过程，你对于Django也会有更深的进步。
