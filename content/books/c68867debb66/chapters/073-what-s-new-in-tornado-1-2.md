## Feb 20, 2011[¶](#feb-20-2011 "永久链接至标题")

We are pleased to announce the release of Tornado 1.2, available from
https://github.com/downloads/facebook/tornado/tornado-1.2.tar.gz

Backwards compatibility notes:
\* This release includes the backwards-incompatible security change from
  version 1.1.1.  Users upgrading from 1.1 or earlier should read the
  release notes from that release:
  http://groups.google.com/group/python-tornado/browse\_thread/thread/b36191c781580cde
\* StackContexts that do something other than catch exceptions may need to
  be modified to be reentrant.
  https://github.com/tornadoweb/tornado/commit/7a7e24143e77481d140fb5579bc67e4c45cbcfad
\* When XSRF tokens are used, the token must also be present on PUT and
  DELETE requests (anything but GET and HEAD)

New features:
\* A new HTTP client implementation is available in the module
  tornado.simple\_httpclient.  This HTTP client does not depend on pycurl.
  It has not yet been tested extensively in production, but is intended
  to eventually replace the pycurl-based HTTP client in a future release of
  Tornado.  To transparently replace tornado.httpclient.AsyncHTTPClient with
  this new implementation, you can set the environment variable
  USE\_SIMPLE\_HTTPCLIENT=1 (note that the next release of Tornado will
  likely include a different way to select HTTP client implementations)
\* Request logging is now done by the Application rather than the
  RequestHandler.  Logging behavior may be customized by either overriding
  Application.log\_request in a subclass or by passing log\_function
  as an Application setting
\* Application.listen(port): Convenience method as an alternative to
  explicitly creating an HTTPServer
\* tornado.escape.linkify(): Wrap urls in <a> tags
\* RequestHandler.create\_signed\_value(): Create signatures like the
  secure\_cookie methods without setting cookies.
\* tornado.testing.get\_unused\_port(): Returns a port selected in the same
  way as inAsyncHTTPTestCase
\* AsyncHTTPTestCase.fetch(): Convenience method for synchronous fetches
\* IOLoop.set\_blocking\_signal\_threshold(): Set a callback to be run when
  the IOLoop is blocked.
\* IOStream.connect(): Asynchronously connect a client socket
\* AsyncHTTPClient.handle\_callback\_exception(): May be overridden
  in subclass for custom error handling
\* httpclient.HTTPRequest has two new keyword arguments, validate\_cert and
  ca\_certs. Setting validate\_cert=False will disable all certificate checks
  when fetching https urls.  ca\_certs may be set to a filename containing
  trusted certificate authorities (defaults will be used if this is
  unspecified)
\* HTTPRequest.get\_ssl\_certificate(): Returns the client's SSL certificate
  (if client certificates were requested in the server's ssl\_options
\* StaticFileHandler can be configured to return a default file (e.g.
  index.html) when a directory is requested
\* Template directives of the form "{% from x import y %}" are now
  supported (in addition to the existing support for "{% import x
  %}"
\* FacebookGraphMixin.get\_authenticated\_user now accepts a new
  parameter 'extra\_fields' which may be used to request additional
  information about the user

Bug fixes:
\* auth: Fixed KeyError with Facebook offline\_access
\* auth: Uses request.uri instead of request.path as the default redirect
  so that parameters are preserved.
\* escape: xhtml\_escape() now returns a unicode string, not
  utf8-encoded bytes
\* ioloop: Callbacks added with add\_callback are now run in the order they
  were added
\* ioloop: PeriodicCallback.stop can now be called from inside the callback.
\* iostream: Fixed several bugs in SSLIOStream
\* iostream: Detect when the other side has closed the connection even with
  the select()-based IOLoop
\* iostream: read\_bytes(0) now works as expected
\* iostream: Fixed bug when writing large amounts of data on windows
\* iostream: Fixed infinite loop that could occur with unhandled exceptions
\* httpclient: Fix bugs when some requests use proxies and others don't
\* httpserver: HTTPRequest.protocol is now set correctly when using the
  built-in SSL support
\* httpserver: When using multiple processes, the standard library's
  random number generator is re-seeded in each child process
\* httpserver: With xheaders enabled, X-Forwarded-Proto is supported as an
  alternative to X-Scheme
\* httpserver: Fixed bugs in multipart/form-data parsing
\* locale: format\_date() now behaves sanely with dates in the future
\* locale: Updates to the language list
\* stack\_context: Fixed bug with contexts leaking through reused IOStreams
\* stack\_context: Simplified semantics and improved performance
\* web: The order of css\_files from UIModules is now preserved
\* web: Fixed error with default\_host redirect
\* web: StaticFileHandler works when os.path.sep != '/' (i.e. on Windows)
\* web: Fixed a caching-related bug in StaticFileHandler when a file's
  timestamp has changed but its contents have not.
\* web: Fixed bugs with HEAD requests and e.g. Etag headers
\* web: Fix bugs when different handlers have different static\_paths
\* web: @removeslash will no longer cause a redirect loop when applied to the
  root path
\* websocket: Now works over SSL
\* websocket: Improved compatibility with proxies

Many thanks to everyone who contributed patches, bug reports, and feedback
that went into this release!

-Ben
