0.5 新版功能.

This module includes various helpers that fix bugs in web servers. They may be necessary for some versions of a buggy web server but not others. We try to stay updated with the status of the bugs as good as possible but you have to make sure whether they fix the problem you encounter.

If you notice bugs in webservers not fixed in this module consider contributing a patch.

_class_ werkzeug.contrib.fixers.CGIRootFix(_app_, _app\_root='/'_)[¶](#werkzeug.contrib.fixers.CGIRootFix "永久链接至目标")

Wrap the application in this middleware if you are using FastCGI or CGI and you have problems with your app root being set to the cgi script’s path instead of the path users are going to visit

在 0.9 版更改: Added app\_root parameter and renamed from LighttpdCGIRootFix.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>app</strong> – the WSGI application</li><li><strong>app_root</strong> – Defaulting to <tt><span>'/'</span></tt>, you can set this to something else if your app is mounted somewhere else.</li></ul></td></tr></tbody></table>

_class_ werkzeug.contrib.fixers.PathInfoFromRequestUriFix(_app_)[¶](#werkzeug.contrib.fixers.PathInfoFromRequestUriFix "永久链接至目标")

On windows environment variables are limited to the system charset which makes it impossible to store the PATH\_INFO variable in the environment without loss of information on some systems.

This is for example a problem for CGI scripts on a Windows Apache.

This fixer works by recreating the PATH\_INFO from REQUEST\_URI, REQUEST\_URL, or UNENCODED\_URL (whatever is available). Thus the fix can only be applied if the webserver supports either of these variables.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>app</strong> – the WSGI application</td></tr></tbody></table>

_class_ werkzeug.contrib.fixers.ProxyFix(_app_, _num\_proxies=1_)[¶](#werkzeug.contrib.fixers.ProxyFix "永久链接至目标")

This middleware can be applied to add HTTP proxy support to an application that was not designed with HTTP proxies in mind. It sets REMOTE\_ADDR, HTTP\_HOST from X-Forwarded headers.

If you have more than one proxy server in front of your app, set num\_proxies accordingly.

Do not use this middleware in non-proxy setups for security reasons.

The original values of REMOTE\_ADDR and HTTP\_HOST are stored in the WSGI environment as werkzeug.proxy\_fix.orig\_remote\_addr and werkzeug.proxy\_fix.orig\_http\_host.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>app</strong> – the WSGI application</li><li><strong>num_proxies</strong> – the number of proxy servers in front of the app.</li></ul></td></tr></tbody></table>

get\_remote\_addr(_forwarded\_for_)[¶](#werkzeug.contrib.fixers.ProxyFix.get_remote_addr "永久链接至目标")

Selects the new remote addr from the given list of ips in X-Forwarded-For. By default it picks the one that the num\_proxies proxy server provides. Before 0.9 it would always pick the first.

0.8 新版功能.

This middleware can remove response headers and add others. This is for example useful to remove the Date header from responses if you are using a server that adds that header, no matter if it’s present or not or to add X-Powered-By headers:

app \= HeaderRewriterFix(app, remove\_headers\=\['Date'\],
                        add\_headers\=\[('X-Powered-By', 'WSGI')\])

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>app</strong> – the WSGI application</li><li><strong>remove_headers</strong> – a sequence of header keys that should be removed.</li><li><strong>add_headers</strong> – a sequence of <tt><span>(key,</span> <span>value)</span></tt> tuples that should be added.</li></ul></td></tr></tbody></table>

_class_ werkzeug.contrib.fixers.InternetExplorerFix(_app_, _fix\_vary=True_, _fix\_attach=True_)[¶](#werkzeug.contrib.fixers.InternetExplorerFix "永久链接至目标")

This middleware fixes a couple of bugs with Microsoft Internet Explorer. Currently the following fixes are applied:

-   removing of Vary headers for unsupported mimetypes which causes troubles with caching. Can be disabled by passing fix\_vary=False to the constructor. see: [http://support.microsoft.com/kb/824847/en-us](http://support.microsoft.com/kb/824847/en-us)
-   removes offending headers to work around caching bugs in Internet Explorer if Content-Disposition is set. Can be disabled by passing fix\_attach=False to the constructor.

If it does not detect affected Internet Explorer versions it won’t touch the request / response.
