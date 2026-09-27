## May 5, 2014[¶](#may-5-2014 "永久链接至标题")

### Security fixes[¶](#security-fixes "永久链接至标题")

-   The signed-value format used by [`RequestHandler.set_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_secure_cookie "tornado.web.RequestHandler.set_secure_cookie") and [`RequestHandler.get_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_secure_cookie "tornado.web.RequestHandler.get_secure_cookie") has changed to be more secure. **This is a disruptive change**. The `secure_cookie` functions take new `version` parameters to support transitions between cookie formats.
-   The new cookie format fixes a vulnerability that may be present in applications that use multiple cookies where the name of one cookie is a prefix of the name of another.
-   To minimize disruption, cookies in the older format will be accepted by default until they expire. Applications that may be vulnerable can reject all cookies in the older format by passing `min_version=2` to [`RequestHandler.get_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_secure_cookie "tornado.web.RequestHandler.get_secure_cookie").
-   Thanks to Joost Pol of [Certified Secure](https://www.certifiedsecure.com) for reporting this issue.

### Backwards-compatibility notes[¶](#backwards-compatibility-notes "永久链接至标题")

-   Signed cookies issued by [`RequestHandler.set_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_secure_cookie "tornado.web.RequestHandler.set_secure_cookie") in Tornado 3.2.1 cannot be read by older releases. If you need to run 3.2.1 in parallel with older releases, you can pass `version=1` to [`RequestHandler.set_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_secure_cookie "tornado.web.RequestHandler.set_secure_cookie") to issue cookies that are backwards-compatible (but have a known weakness, so this option should only be used for a transitional period).

### Other changes[¶](#other-changes "永久链接至标题")

-   The C extension used to speed up the websocket module now compiles correctly on Windows with MSVC and 64-bit mode. The fallback to the pure-Python alternative now works correctly on Mac OS X machines with no C compiler installed.
