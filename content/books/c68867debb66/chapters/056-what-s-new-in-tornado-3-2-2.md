## June 3, 2014[¶](#june-3-2014 "永久链接至标题")

### Security fixes[¶](#security-fixes "永久链接至标题")

-   The XSRF token is now encoded with a random mask on each request. This makes it safe to include in compressed pages without being vulnerable to the [BREACH attack](http://breachattack.com). This applies to most applications that use both the `xsrf_cookies` and `gzip` options (or have gzip applied by a proxy).

### Backwards-compatibility notes[¶](#backwards-compatibility-notes "永久链接至标题")

-   If Tornado 3.2.2 is run at the same time as older versions on the same domain, there is some potential for issues with the differing cookie versions. The [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") setting `xsrf_cookie_version=1` can be used for a transitional period to generate the older cookie format on newer servers.

### Other changes[¶](#other-changes "永久链接至标题")

-   `tornado.platform.asyncio` is now compatible with `trollius` version 0.3.
