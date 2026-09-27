## Jun 21, 2011[¶](#jun-21-2011 "永久链接至标题")

Major changes:
\* Template output is automatically escaped by default; see backwards
  compatibility note below.
\* The default AsyncHTTPClient implementation is now simple\_httpclient.
\* Python 3.2 is now supported.

Backwards compatibility:
\* Template autoescaping is enabled by default.  Applications upgrading from
  a previous release of Tornado must either disable autoescaping or adapt
  their templates to work with it.  For most applications, the simplest
  way to do this is to pass autoescape\=None to the Application constructor.
  Note that this affects certain built\-in methods, e.g. xsrf\_form\_html
  and linkify, which must now be called with {% raw %} instead of {}
\* Applications that wish to continue using curl\_httpclient instead of
  simple\_httpclient may do so by calling
    AsyncHTTPClient.configure("tornado.curl\_httpclient.CurlAsyncHTTPClient")
  at the beginning of the process.  Users of Python 2.5 will probably want
  to use curl\_httpclient as simple\_httpclient only supports ssl on Python 2.6+.
\* Python 3 compatibility involved many changes throughout the codebase,
  so users are encouraged to test their applications more thoroughly than
  usual when upgrading to this release.

Other changes in this release:
\* Templates support several new directives:
  \- {% autoescape ...%} to control escaping behavior
  \- {% raw ... %} for unescaped output
  \- {% module ... %} for calling UIModules
\* {% module Template(path, \*\*kwargs) %} may now be used to call another
  template with an independent namespace
\* All IOStream callbacks are now run directly on the IOLoop via add\_callback.
\* HTTPServer now supports IPv6 where available.  To disable, pass
  family\=socket.AF\_INET to HTTPServer.bind().
\* HTTPClient now supports IPv6, configurable via allow\_ipv6\=bool on the
  HTTPRequest.  allow\_ipv6 defaults to false on simple\_httpclient and true
  on curl\_httpclient.
\* RequestHandlers can use an encoding other than utf\-8 for query parameters
  by overriding decode\_argument()
\* Performance improvements, especially for applications that use a lot of
  IOLoop timeouts
\* HTTP OPTIONS method no longer requires an XSRF token.
\* JSON output (RequestHandler.write(dict)) now sets Content\-Type to
  application/json
\* Etag computation can now be customized or disabled by overriding
  RequestHandler.compute\_etag
\* USE\_SIMPLE\_HTTPCLIENT environment variable is no longer supported.
  Use AsyncHTTPClient.configure instead.
