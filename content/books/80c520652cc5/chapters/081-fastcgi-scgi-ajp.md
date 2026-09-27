## How to use Django with FastCGI, SCGI, or AJP[¶](#how-to-use-django-with-fastcgi-scgi-or-ajp "Permalink to this headline")

Although [_WSGI_](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/index.html) is the preferred deployment platform for Django, many people use shared hosting, on which protocols such as FastCGI, SCGI or AJP are the only viable options.

Note

This document primarily focuses on FastCGI. Other protocols, such as SCGI and AJP, are also supported, through the flup Python package. See the [Protocols](#protocols) section below for specifics about SCGI and AJP.

Essentially, FastCGI is an efficient way of letting an external application serve pages to a Web server. The Web server delegates the incoming Web requests (via a socket) to FastCGI, which executes the code and passes the response back to the Web server, which, in turn, passes it back to the client’s Web browser.

Like WSGI, FastCGI allows code to stay in memory, allowing requests to be served with no startup time. While e.g. [_mod\_wsgi_](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/modwsgi.html) can either be configured embedded in the Apache Web server process or as a separate daemon process, a FastCGI process never runs inside the Web server process, always in a separate, persistent process.

Why run code in a separate process?

The traditional mod\_\* arrangements in Apache embed various scripting languages (most notably PHP, Python and Perl) inside the process space of your Web server. Although this lowers startup time – because code doesn’t have to be read off disk for every request – it comes at the cost of memory use.

Due to the nature of FastCGI, it’s even possible to have processes that run under a different user account than the Web server process. That’s a nice security benefit on shared systems, because it means you can secure your code from other users.

## Prerequisite: flup[¶](#prerequisite-flup "Permalink to this headline")

Before you can start using FastCGI with Django, you’ll need to install [flup](http://www.saddi.com/software/flup/), a Python library for dealing with FastCGI. Version 0.5 or newer should work fine.

## Starting your FastCGI server[¶](#starting-your-fastcgi-server "Permalink to this headline")

FastCGI operates on a client-server model, and in most cases you’ll be starting the FastCGI process on your own. Your Web server (be it Apache, lighttpd, or otherwise) only contacts your Django-FastCGI process when the server needs a dynamic page to be loaded. Because the daemon is already running with the code in memory, it’s able to serve the response very quickly.

Note

If you’re on a shared hosting system, you’ll probably be forced to use Web server-managed FastCGI processes. See the section below on running Django with Web server-managed processes for more information.

A Web server can connect to a FastCGI server in one of two ways: It can use either a Unix domain socket (a “named pipe” on Win32 systems), or it can use a TCP socket. What you choose is a manner of preference; a TCP socket is usually easier due to permissions issues.

To start your server, first change into the directory of your project (wherever your [_manage.py_](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html) is), and then run the [runfcgi](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-runfcgi) command:

./manage.py runfcgi \[options\]

If you specify help as the only option after [runfcgi](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-runfcgi), it’ll display a list of all the available options.

You’ll need to specify either a [socket](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-socket), a [protocol](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-protocol) or both [host](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-host) and [port](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-port). Then, when you set up your Web server, you’ll just need to point it at the host/port or socket you specified when starting the FastCGI server. See the [examples](#examples), below.

### Protocols[¶](#protocols "Permalink to this headline")

Django supports all the protocols that [flup](http://www.saddi.com/software/flup/) does, namely [fastcgi](http://www.fastcgi.com/), [SCGI](http://python.ca/scgi/protocol.txt) and [AJP1.3](http://tomcat.apache.org/connectors-doc/ajp/ajpv13a.html) (the Apache JServ Protocol, version 1.3). Select your preferred protocol by using the [protocol=<protocol\_name>](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-protocol) option with ./manage.py runfcgi – where <protocol\_name> may be one of: fcgi (the default), scgi or ajp. For example:

./manage.py runfcgi protocol\=scgi

### Examples[¶](#examples "Permalink to this headline")

Running a threaded server on a TCP port:

./manage.py runfcgi method\=threaded host\=127.0.0.1 port\=3033

Running a preforked server on a Unix domain socket:

./manage.py runfcgi method\=prefork socket\=/home/user/mysite.sock pidfile\=django.pid

Socket security

Django’s default umask requires that the webserver and the Django fastcgi process be run with the same group **and** user. For increased security, you can run them under the same group but as different users. If you do this, you will need to set the umask to 0002 using the umask argument to runfcgi.

Run without daemonizing (backgrounding) the process (good for debugging):

./manage.py runfcgi daemonize\=false socket\=/tmp/mysite.sock maxrequests\=1

### Stopping the FastCGI daemon[¶](#stopping-the-fastcgi-daemon "Permalink to this headline")

If you have the process running in the foreground, it’s easy enough to stop it: Simply hitting Ctrl-C will stop and quit the FastCGI server. However, when you’re dealing with background processes, you’ll need to resort to the Unix kill command.

If you specify the [pidfile](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-option-pidfile) option to [runfcgi](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html#django-admin-runfcgi), you can kill the running FastCGI daemon like this:

kill \`cat $PIDFILE\`

...where $PIDFILE is the pidfile you specified.

To easily restart your FastCGI daemon on Unix, try this small shell script:

#!/bin/bash

\# Replace these three settings.
PROJDIR\="/home/user/myproject"
PIDFILE\="$PROJDIR/mysite.pid"
SOCKET\="$PROJDIR/mysite.sock"

cd $PROJDIR
if \[ -f $PIDFILE \]; then
    kill \`cat -- $PIDFILE\`
    rm -f -- $PIDFILE
fi

exec /usr/bin/env - \\
  PYTHONPATH\="../python:.." \\
  ./manage.py runfcgi socket\=$SOCKET pidfile\=$PIDFILE

## Apache setup[¶](#apache-setup "Permalink to this headline")

To use Django with Apache and FastCGI, you’ll need Apache installed and configured, with [mod\_fastcgi](http://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html) installed and enabled. Consult the Apache documentation for instructions.

Once you’ve got that set up, point Apache at your Django FastCGI instance by editing the httpd.conf (Apache configuration) file. You’ll need to do two things:

-   Use the FastCGIExternalServer directive to specify the location of your FastCGI server.
-   Use mod\_rewrite to point URLs at FastCGI as appropriate.

### Specifying the location of the FastCGI server[¶](#specifying-the-location-of-the-fastcgi-server "Permalink to this headline")

The FastCGIExternalServer directive tells Apache how to find your FastCGI server. As the [FastCGIExternalServer docs](http://www.fastcgi.com/mod_fastcgi/docs/mod_fastcgi.html#FastCgiExternalServer) explain, you can specify either a socket or a host. Here are examples of both:

\# Connect to FastCGI via a socket / named pipe.
FastCGIExternalServer /home/user/public\_html/mysite.fcgi -socket /home/user/mysite.sock

\# Connect to FastCGI via a TCP host/port.
FastCGIExternalServer /home/user/public\_html/mysite.fcgi -host 127.0.0.1:3033

In either case, the file /home/user/public\_html/mysite.fcgi doesn’t actually have to exist. It’s just a URL used by the Web server internally – a hook for signifying which requests at a URL should be handled by FastCGI. (More on this in the next section.)

### Using mod\_rewrite to point URLs at FastCGI[¶](#using-mod-rewrite-to-point-urls-at-fastcgi "Permalink to this headline")

The second step is telling Apache to use FastCGI for URLs that match a certain pattern. To do this, use the [mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) module and rewrite URLs to mysite.fcgi (or whatever you specified in the FastCGIExternalServer directive, as explained in the previous section).

In this example, we tell Apache to use FastCGI to handle any request that doesn’t represent a file on the filesystem and doesn’t start with /media/. This is probably the most common case, if you’re using Django’s admin site:

<VirtualHost 12.34.56.78\>
  ServerName example.com
  DocumentRoot /home/user/public\_html
  Alias /media /home/user/python/django/contrib/admin/media
  RewriteEngine On
  RewriteRule ^/(media.\*)$ /$1 \[QSA,L,PT\]
  RewriteCond %{REQUEST\_FILENAME} !-f
  RewriteRule ^/(.\*)$ /mysite.fcgi/$1 \[QSA,L\]
</VirtualHost>

Django will automatically use the pre-rewrite version of the URL when constructing URLs with the [{% url %}](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-url) template tag (and similar methods).

### Using mod\_fcgid as alternative to mod\_fastcgi[¶](#using-mod-fcgid-as-alternative-to-mod-fastcgi "Permalink to this headline")

Another way to serve applications through FastCGI is by using Apache’s [mod\_fcgid](http://httpd.apache.org/mod_fcgid/) module. Compared to mod\_fastcgi mod\_fcgid handles FastCGI applications differently in that it manages the spawning of worker processes by itself and doesn’t offer something like FastCGIExternalServer. This means that the configuration looks slightly different.

In effect, you have to go the way of adding a script handler similar to what is described later on regarding running Django in a [_shared-hosting environment_](#apache-shared-hosting). For further details please refer to the [mod\_fcgid reference](http://httpd.apache.org/mod_fcgid/mod/mod_fcgid.html)

## lighttpd setup[¶](#lighttpd-setup "Permalink to this headline")

[lighttpd](http://www.lighttpd.net/) is a lightweight Web server commonly used for serving static files. It supports FastCGI natively and, thus, is a good choice for serving both static and dynamic pages, if your site doesn’t have any Apache-specific needs.

Make sure mod\_fastcgi is in your modules list, somewhere after mod\_rewrite and mod\_access, but not after mod\_accesslog. You’ll probably want mod\_alias as well, for serving admin media.

Add the following to your lighttpd config file:

server.document\-root \= "/home/user/public\_html"
fastcgi.server \= (
    "/mysite.fcgi" \=> (
        "main" \=> (
            # Use host / port instead of socket for TCP fastcgi
            # "host" \=> "127.0.0.1",
            # "port" \=> 3033,
            "socket" \=> "/home/user/mysite.sock",
            "check-local" \=> "disable",
        )
    ),
)
alias.url \= (
    "/media" \=> "/home/user/django/contrib/admin/media/",
)

url.rewrite\-once \= (
    "^(/media.\*)$" \=> "$1",
    "^/favicon\\.ico$" \=> "/media/favicon.ico",
    "^(/.\*)$" \=> "/mysite.fcgi$1",
)

### Running multiple Django sites on one lighttpd[¶](#running-multiple-django-sites-on-one-lighttpd "Permalink to this headline")

lighttpd lets you use “conditional configuration” to allow configuration to be customized per host. To specify multiple FastCGI sites, just add a conditional block around your FastCGI config for each site:

\# If the hostname is 'www.example1.com'...
$HTTP\["host"\] \== "www.example1.com" {
    server.document-root \= "/foo/site1"
    fastcgi.server \= (
       ...
    )
    ...
}

\# If the hostname is 'www.example2.com'...
$HTTP\["host"\] \== "www.example2.com" {
    server.document-root \= "/foo/site2"
    fastcgi.server \= (
       ...
    )
    ...
}

You can also run multiple Django installations on the same site simply by specifying multiple entries in the fastcgi.server directive. Add one FastCGI host for each.

## Cherokee setup[¶](#cherokee-setup "Permalink to this headline")

Cherokee is a very fast, flexible and easy to configure Web Server. It supports the widespread technologies nowadays: FastCGI, SCGI, PHP, CGI, SSI, TLS and SSL encrypted connections, Virtual hosts, Authentication, on the fly encoding, Load Balancing, Apache compatible log files, Data Base Balancer, Reverse HTTP Proxy and much more.

The Cherokee project provides a documentation to [setting up Django](http://www.cherokee-project.com/doc/cookbook_django.html) with Cherokee.

## Forcing the URL prefix to a particular value[¶](#forcing-the-url-prefix-to-a-particular-value "Permalink to this headline")

Because many of these fastcgi-based solutions require rewriting the URL at some point inside the Web server, the path information that Django sees may not resemble the original URL that was passed in. This is a problem if the Django application is being served from under a particular prefix and you want your URLs from the [{% url %}](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html#std:templatetag-url) tag to look like the prefix, rather than the rewritten version, which might contain, for example, mysite.fcgi.

Django makes a good attempt to work out what the real script name prefix should be. In particular, if the Web server sets the SCRIPT\_URL (specific to Apache’s mod\_rewrite), or REDIRECT\_URL (set by a few servers, including Apache + mod\_rewrite in some situations), Django will work out the original prefix automatically.

In the cases where Django cannot work out the prefix correctly and where you want the original value to be used in URLs, you can set the [FORCE\_SCRIPT\_NAME](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-FORCE_SCRIPT_NAME) setting in your main settings file. This sets the script name uniformly for every URL served via that settings file. Thus you’ll need to use different settings files if you want different sets of URLs to have different script names in this case, but that is a rare situation.

As an example of how to use it, if your Django configuration is serving all of the URLs under '/' and you wanted to use this setting, you would set FORCE\_SCRIPT\_NAME \= '' in your settings file.
