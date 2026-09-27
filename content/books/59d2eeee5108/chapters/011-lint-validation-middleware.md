0.5 新版功能.

This module provides a middleware that performs sanity checks of the WSGI application. It checks that [**PEP 333**](http://www.python.org/dev/peps/pep-0333) is properly implemented and warns on some common HTTP errors such as non-empty responses for 304 status codes.

This module provides a middleware, the [LintMiddleware](#werkzeug.contrib.lint.LintMiddleware "werkzeug.contrib.lint.LintMiddleware"). Wrap your application with it and it will warn about common problems with WSGI and HTTP while your application is running.

It’s strongly recommended to use it during development.

_class_ werkzeug.contrib.lint.LintMiddleware(_app_)[¶](#werkzeug.contrib.lint.LintMiddleware "永久链接至目标")

This middleware wraps an application and warns on common errors. Among other thing it currently checks for the following problems:

-   invalid status codes
-   non-bytestrings sent to the WSGI server
-   strings returned from the WSGI application
-   non-empty conditional responses
-   unquoted etags
-   relative URLs in the Location header
-   unsafe calls to wsgi.input
-   unclosed iterators

Detected errors are emitted using the standard Python warnings system and usually end up on stderr.

from werkzeug.contrib.lint import LintMiddleware
app \= LintMiddleware(app)

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>app</strong> – the application to wrap</td></tr></tbody></table>
