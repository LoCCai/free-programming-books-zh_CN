WSGI support for the Tornado web framework.

WSGI is the Python standard for web servers, and allows for interoperability between Tornado and other Python web frameworks and servers. This module provides WSGI support in two ways:

-   [`WSGIAdapter`](#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") converts a [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") to the WSGI application interface. This is useful for running a Tornado app on another HTTP server, such as Google App Engine. See the [`WSGIAdapter`](#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") class documentation for limitations that apply.
-   [`WSGIContainer`](#tornado.wsgi.WSGIContainer "tornado.wsgi.WSGIContainer") lets you run other WSGI applications and frameworks on the Tornado HTTP server. For example, with this class you can mix Django and Tornado handlers in a single server.

## Running Tornado apps on WSGI servers[¶](#running-tornado-apps-on-wsgi-servers "永久链接至标题")

_class_ `tornado.wsgi.``WSGIAdapter`(_application_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/wsgi.html#WSGIAdapter)[¶](#tornado.wsgi.WSGIAdapter "永久链接至目标")

Converts a [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") instance into a WSGI application.

Example usage:

import tornado.web
import tornado.wsgi
import wsgiref.simple\_server

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

if \_\_name\_\_ \== "\_\_main\_\_":
    application \= tornado.web.Application(\[
        (r"/", MainHandler),
    \])
    wsgi\_app \= tornado.wsgi.WSGIAdapter(application)
    server \= wsgiref.simple\_server.make\_server('', 8888, wsgi\_app)
    server.serve\_forever()

See the [appengine demo](https://github.com/tornadoweb/tornado/tree/stable/demos/appengine) for an example of using this module to run a Tornado app on Google App Engine.

In WSGI mode asynchronous methods are not supported. This means that it is not possible to use [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient"), or the [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth") or [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") modules.

4.0 新版功能.

_class_ `tornado.wsgi.``WSGIApplication`(_handlers=None_, _default\_host=''_, _transforms=None_, _\*\*settings_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/wsgi.html#WSGIApplication)[¶](#tornado.wsgi.WSGIApplication "永久链接至目标")

A WSGI equivalent of [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application").

4.0 版后已移除: Use a regular [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") and wrap it in [`WSGIAdapter`](#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") instead.

## Running WSGI apps on Tornado servers[¶](#running-wsgi-apps-on-tornado-servers "永久链接至标题")

_class_ `tornado.wsgi.``WSGIContainer`(_wsgi\_application_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/wsgi.html#WSGIContainer)[¶](#tornado.wsgi.WSGIContainer "永久链接至目标")

Makes a WSGI-compatible function runnable on Tornado’s HTTP server.

警告

WSGI is a _synchronous_ interface, while Tornado’s concurrency model is based on single-threaded asynchronous execution. This means that running a WSGI app with Tornado’s [`WSGIContainer`](#tornado.wsgi.WSGIContainer "tornado.wsgi.WSGIContainer") is _less scalable_ than running the same app in a multi-threaded WSGI server like `gunicorn` or `uwsgi`. Use [`WSGIContainer`](#tornado.wsgi.WSGIContainer "tornado.wsgi.WSGIContainer") only when there are benefits to combining Tornado and WSGI in the same process that outweigh the reduced scalability.

Wrap a WSGI function in a [`WSGIContainer`](#tornado.wsgi.WSGIContainer "tornado.wsgi.WSGIContainer") and pass it to [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") to run it. For example:

def simple\_app(environ, start\_response):
    status \= "200 OK"
    response\_headers \= \[("Content-type", "text/plain")\]
    start\_response(status, response\_headers)
    return \["Hello world!\\n"\]

container \= tornado.wsgi.WSGIContainer(simple\_app)
http\_server \= tornado.httpserver.HTTPServer(container)
http\_server.listen(8888)
tornado.ioloop.IOLoop.current().start()

This class is intended to let other frameworks (Django, web.py, etc) run on the Tornado HTTP server and I/O loop.

The [`tornado.web.FallbackHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.FallbackHandler "tornado.web.FallbackHandler") class is often useful for mixing Tornado and WSGI apps in the same server. See [https://github.com/bdarnell/django-tornado-demo](https://github.com/bdarnell/django-tornado-demo) for a complete example.

_static_ `environ`(_request_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/wsgi.html#WSGIContainer.environ)[¶](#tornado.wsgi.WSGIContainer.environ "永久链接至目标")

Converts a [`tornado.httputil.HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") to a WSGI environment.
