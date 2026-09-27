The CSRF middleware and template tag provides easy-to-use protection against [Cross Site Request Forgeries](https://www.squarefree.com/securitytips/web-developers.html#CSRF). This type of attack occurs when a malicious website contains a link, a form button or some JavaScript that is intended to perform some action on your website, using the credentials of a logged-in user who visits the malicious site in their browser. A related type of attack, 'login CSRF', where an attacking site tricks a user's browser into logging into a site with someone else's credentials, is also covered.

The first defense against CSRF attacks is to ensure that GET requests (and other 'safe' methods, as defined by [**RFC 7231#section-4.2.1**](https://tools.ietf.org/html/rfc7231.html#section-4.2.1)) are side effect free. Requests via 'unsafe' methods, such as POST, PUT, and DELETE, can then be protected by following the steps below.

## How to use it[¶](#how-to-use-it "Permalink to this headline")

To take advantage of CSRF protection in your views, follow these steps:

1.  The CSRF middleware is activated by default in the [`MIDDLEWARE`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-MIDDLEWARE) setting. If you override that setting, remember that `'django.middleware.csrf.CsrfViewMiddleware'` should come before any view middleware that assume that CSRF attacks have been dealt with.
    
    If you disabled it, which is not recommended, you can use [`csrf_protect()`](#django.views.decorators.csrf.csrf_protect "django.views.decorators.csrf.csrf_protect") on particular views you want to protect (see below).
    
2.  In any template that uses a POST form, use the [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) tag inside the `<form>` element if the form is for an internal URL, e.g.:
    
    <form method\="post"\>{% csrf\_token %}
    
    This should not be done for POST forms that target external URLs, since that would cause the CSRF token to be leaked, leading to a vulnerability.
    
3.  In the corresponding view functions, ensure that [`RequestContext`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/api/#django.template.RequestContext "django.template.RequestContext") is used to render the response so that `{% csrf_token %}` will work properly. If you're using the [`render()`](https://docs.djangoproject.com/zh-hans/2.0/topics/http/shortcuts/#django.shortcuts.render "django.shortcuts.render") function, generic views, or contrib apps, you are covered already since these all use `RequestContext`.
    

### AJAX[¶](#ajax "Permalink to this headline")

While the above method can be used for AJAX POST requests, it has some inconveniences: you have to remember to pass the CSRF token in as POST data with every POST request. For this reason, there is an alternative method: on each XMLHttpRequest, set a custom `X-CSRFToken` header to the value of the CSRF token. This is often easier, because many JavaScript frameworks provide hooks that allow headers to be set on every request.

First, you must get the CSRF token. How to do that depends on whether or not the [`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS) setting is enabled.

#### Acquiring the token if [`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS) is `False`[¶](#acquiring-the-token-if-csrf-use-sessions-is-false "Permalink to this headline")

The recommended source for the token is the `csrftoken` cookie, which will be set if you've enabled CSRF protection for your views as outlined above.

Note

The CSRF token cookie is named `csrftoken` by default, but you can control the cookie name via the [`CSRF_COOKIE_NAME`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_COOKIE_NAME) setting.

The CSRF header name is `HTTP_X_CSRFTOKEN` by default, but you can customize it using the [`CSRF_HEADER_NAME`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_HEADER_NAME) setting.

Acquiring the token is straightforward:

// using jQuery
function getCookie(name) {
    var cookieValue \= null;
    if (document.cookie && document.cookie !== '') {
        var cookies \= document.cookie.split(';');
        for (var i \= 0; i < cookies.length; i++) {
            var cookie \= jQuery.trim(cookies\[i\]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) \=== (name + '=')) {
                cookieValue \= decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken \= getCookie('csrftoken');

The above code could be simplified by using the [JavaScript Cookie library](https://github.com/js-cookie/js-cookie/) to replace `getCookie`:

var csrftoken \= Cookies.get('csrftoken');

Note

The CSRF token is also present in the DOM, but only if explicitly included using [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) in a template. The cookie contains the canonical token; the `CsrfViewMiddleware` will prefer the cookie to the token in the DOM. Regardless, you're guaranteed to have the cookie if the token is present in the DOM, so you should use the cookie!

Warning

If your view is not rendering a template containing the [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) template tag, Django might not set the CSRF token cookie. This is common in cases where forms are dynamically added to the page. To address this case, Django provides a view decorator which forces setting of the cookie: [`ensure_csrf_cookie()`](#django.views.decorators.csrf.ensure_csrf_cookie "django.views.decorators.csrf.ensure_csrf_cookie").

#### Acquiring the token if [`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS) is `True`[¶](#acquiring-the-token-if-csrf-use-sessions-is-true "Permalink to this headline")

If you activate [`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS), you must include the CSRF token in your HTML and read the token from the DOM with JavaScript:

{% csrf\_token %}
<script type\="text/javascript"\>
// using jQuery
var csrftoken \= jQuery("\[name=csrfmiddlewaretoken\]").val();
</script\>

#### Setting the token on the AJAX request[¶](#setting-the-token-on-the-ajax-request "Permalink to this headline")

Finally, you'll have to actually set the header on your AJAX request, while protecting the CSRF token from being sent to other domains using [settings.crossDomain](https://api.jquery.com/jQuery.ajax/) in jQuery 1.5.1 and newer:

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

If you're using AngularJS 1.1.3 and newer, it's sufficient to configure the `$http` provider with the cookie and header names:

$httpProvider.defaults.xsrfCookieName \= 'csrftoken';
$httpProvider.defaults.xsrfHeaderName \= 'X-CSRFToken';

### Using CSRF in Jinja2 templates[¶](#using-csrf-in-jinja2-templates "Permalink to this headline")

Django's [`Jinja2`](https://docs.djangoproject.com/zh-hans/2.0/topics/templates/#django.template.backends.jinja2.Jinja2 "django.template.backends.jinja2.Jinja2") template backend adds `{{ csrf_input }}` to the context of all templates which is equivalent to `{% csrf_token %}` in the Django template language. For example:

<form method\="post"\>{{ csrf\_input }}

### The decorator method[¶](#module-django.views.decorators.csrf "Permalink to this headline")

Rather than adding `CsrfViewMiddleware` as a blanket protection, you can use the `csrf_protect` decorator, which has exactly the same functionality, on particular views that need the protection. It must be used **both** on views that insert the CSRF token in the output, and on those that accept the POST form data. (These are often the same view function, but not always).

Use of the decorator by itself is **not recommended**, since if you forget to use it, you will have a security hole. The 'belt and braces' strategy of using both is fine, and will incur minimal overhead.

`csrf_protect`(_view_)[¶](#django.views.decorators.csrf.csrf_protect "Permalink to this definition")

Decorator that provides the protection of `CsrfViewMiddleware` to a view.

Usage:

from django.shortcuts import render
from django.views.decorators.csrf import csrf\_protect

@csrf\_protect
def my\_view(request):
    c \= {}
    \# ...
    return render(request, "a\_template.html", c)

If you are using class-based views, you can refer to [Decorating class-based views](https://docs.djangoproject.com/zh-hans/2.0/topics/class-based-views/intro/#id1).

## Rejected requests[¶](#rejected-requests "Permalink to this headline")

By default, a '403 Forbidden' response is sent to the user if an incoming request fails the checks performed by `CsrfViewMiddleware`. This should usually only be seen when there is a genuine Cross Site Request Forgery, or when, due to a programming error, the CSRF token has not been included with a POST form.

The error page, however, is not very friendly, so you may want to provide your own view for handling this condition. To do this, simply set the [`CSRF_FAILURE_VIEW`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_FAILURE_VIEW) setting.

CSRF failures are logged as warnings to the [django.security.csrf](https://docs.djangoproject.com/zh-hans/2.0/topics/logging/#django-security-logger) logger.

Changed in Django 1.11:

In older versions, CSRF failures are logged to the `django.request` logger.

## How it works[¶](#how-it-works "Permalink to this headline")

The CSRF protection is based on the following things:

1.  A CSRF cookie that is based on a random secret value, which other sites will not have access to.
    
    This cookie is set by `CsrfViewMiddleware`. It is sent with every response that has called `django.middleware.csrf.get_token()` (the function used internally to retrieve the CSRF token), if it wasn't already set on the request.
    
    In order to protect against [BREACH](http://breachattack.com/) attacks, the token is not simply the secret; a random salt is prepended to the secret and used to scramble it.
    
    For security reasons, the value of the secret is changed each time a user logs in.
    
2.  A hidden form field with the name 'csrfmiddlewaretoken' present in all outgoing POST forms. The value of this field is, again, the value of the secret, with a salt which is both added to it and used to scramble it. The salt is regenerated on every call to `get_token()` so that the form field value is changed in every such response.
    
    This part is done by the template tag.
    
3.  For all incoming requests that are not using HTTP GET, HEAD, OPTIONS or TRACE, a CSRF cookie must be present, and the 'csrfmiddlewaretoken' field must be present and correct. If it isn't, the user will get a 403 error.
    
    When validating the 'csrfmiddlewaretoken' field value, only the secret, not the full token, is compared with the secret in the cookie value. This allows the use of ever-changing tokens. While each request may use its own token, the secret remains common to all.
    
    This check is done by `CsrfViewMiddleware`.
    
4.  In addition, for HTTPS requests, strict referer checking is done by `CsrfViewMiddleware`. This means that even if a subdomain can set or modify cookies on your domain, it can't force a user to post to your application since that request won't come from your own exact domain.
    
    This also addresses a man-in-the-middle attack that's possible under HTTPS when using a session independent secret, due to the fact that HTTP `Set-Cookie` headers are (unfortunately) accepted by clients even when they are talking to a site under HTTPS. (Referer checking is not done for HTTP requests because the presence of the `Referer` header isn't reliable enough under HTTP.)
    
    If the [`CSRF_COOKIE_DOMAIN`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_COOKIE_DOMAIN) setting is set, the referer is compared against it. This setting supports subdomains. For example, `CSRF_COOKIE_DOMAIN = '.example.com'` will allow POST requests from `www.example.com` and `api.example.com`. If the setting is not set, then the referer must match the HTTP `Host` header.
    
    Expanding the accepted referers beyond the current host or cookie domain can be done with the [`CSRF_TRUSTED_ORIGINS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_TRUSTED_ORIGINS) setting.
    

This ensures that only forms that have originated from trusted domains can be used to POST data back.

It deliberately ignores GET requests (and other requests that are defined as 'safe' by [**RFC 7231**](https://tools.ietf.org/html/rfc7231.html)). These requests ought never to have any potentially dangerous side effects , and so a CSRF attack with a GET request ought to be harmless. [**RFC 7231**](https://tools.ietf.org/html/rfc7231.html) defines POST, PUT, and DELETE as 'unsafe', and all other methods are also assumed to be unsafe, for maximum protection.

The CSRF protection cannot protect against man-in-the-middle attacks, so use [HTTPS](https://docs.djangoproject.com/zh-hans/2.0/topics/security/#security-recommendation-ssl) with [HTTP Strict Transport Security](https://docs.djangoproject.com/zh-hans/2.0/ref/middleware/#http-strict-transport-security). It also assumes [validation of the HOST header](https://docs.djangoproject.com/zh-hans/2.0/topics/security/#host-headers-virtual-hosting) and that there aren't any [cross-site scripting vulnerabilities](https://docs.djangoproject.com/zh-hans/2.0/topics/security/#cross-site-scripting) on your site (because XSS vulnerabilities already let an attacker do anything a CSRF vulnerability allows and much worse).

Removing the `Referer` header

To avoid disclosing the referrer URL to third-party sites, you might want to [disable the referer](https://www.w3.org/TR/referrer-policy/#referrer-policy-delivery) on your site's `<a>` tags. For example, you might use the `<meta name="referrer" content="no-referrer">` tag or include the `Referrer-Policy: no-referrer` header. Due to the CSRF protection's strict referer checking on HTTPS requests, those techniques cause a CSRF failure on requests with 'unsafe' methods. Instead, use alternatives like `<a rel="noreferrer" ...>"` for links to third-party sites.

## Caching[¶](#caching "Permalink to this headline")

If the [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) template tag is used by a template (or the `get_token` function is called some other way), `CsrfViewMiddleware` will add a cookie and a `Vary: Cookie` header to the response. This means that the middleware will play well with the cache middleware if it is used as instructed (`UpdateCacheMiddleware` goes before all other middleware).

However, if you use cache decorators on individual views, the CSRF middleware will not yet have been able to set the Vary header or the CSRF cookie, and the response will be cached without either one. In this case, on any views that will require a CSRF token to be inserted you should use the [`django.views.decorators.csrf.csrf_protect()`](#django.views.decorators.csrf.csrf_protect "django.views.decorators.csrf.csrf_protect") decorator first:

from django.views.decorators.cache import cache\_page
from django.views.decorators.csrf import csrf\_protect

@cache\_page(60 \* 15)
@csrf\_protect
def my\_view(request):
    ...

If you are using class-based views, you can refer to [Decorating class-based views](https://docs.djangoproject.com/zh-hans/2.0/topics/class-based-views/intro/#id1).

## Testing[¶](#testing "Permalink to this headline")

The `CsrfViewMiddleware` will usually be a big hindrance to testing view functions, due to the need for the CSRF token which must be sent with every POST request. For this reason, Django's HTTP client for tests has been modified to set a flag on requests which relaxes the middleware and the `csrf_protect` decorator so that they no longer rejects requests. In every other respect (e.g. sending cookies etc.), they behave the same.

If, for some reason, you _want_ the test client to perform CSRF checks, you can create an instance of the test client that enforces CSRF checks:

\>>> from django.test import Client
\>>> csrf\_client \= Client(enforce\_csrf\_checks\=True)

## Limitations[¶](#limitations "Permalink to this headline")

Subdomains within a site will be able to set cookies on the client for the whole domain. By setting the cookie and using a corresponding token, subdomains will be able to circumvent the CSRF protection. The only way to avoid this is to ensure that subdomains are controlled by trusted users (or, are at least unable to set cookies). Note that even without CSRF, there are other vulnerabilities, such as session fixation, that make giving subdomains to untrusted parties a bad idea, and these vulnerabilities cannot easily be fixed with current browsers.

## Edge cases[¶](#edge-cases "Permalink to this headline")

Certain views can have unusual requirements that mean they don't fit the normal pattern envisaged here. A number of utilities can be useful in these situations. The scenarios they might be needed in are described in the following section.

### Utilities[¶](#utilities "Permalink to this headline")

The examples below assume you are using function-based views. If you are working with class-based views, you can refer to [Decorating class-based views](https://docs.djangoproject.com/zh-hans/2.0/topics/class-based-views/intro/#id1).

`csrf_exempt`(_view_)[\[source\]](https://docs.djangoproject.com/zh-hans/2.0/_modules/django/views/decorators/csrf/#csrf_exempt)[¶](#django.views.decorators.csrf.csrf_exempt "Permalink to this definition")

This decorator marks a view as being exempt from the protection ensured by the middleware. Example:

from django.http import HttpResponse
from django.views.decorators.csrf import csrf\_exempt

@csrf\_exempt
def my\_view(request):
    return HttpResponse('Hello world')

`requires_csrf_token`(_view_)[¶](#django.views.decorators.csrf.requires_csrf_token "Permalink to this definition")

Normally the [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) template tag will not work if `CsrfViewMiddleware.process_view` or an equivalent like `csrf_protect` has not run. The view decorator `requires_csrf_token` can be used to ensure the template tag does work. This decorator works similarly to `csrf_protect`, but never rejects an incoming request.

Example:

from django.shortcuts import render
from django.views.decorators.csrf import requires\_csrf\_token

@requires\_csrf\_token
def my\_view(request):
    c \= {}
    \# ...
    return render(request, "a\_template.html", c)

`ensure_csrf_cookie`(_view_)[¶](#django.views.decorators.csrf.ensure_csrf_cookie "Permalink to this definition")

This decorator forces a view to send the CSRF cookie.

### Scenarios[¶](#scenarios "Permalink to this headline")

#### CSRF protection should be disabled for just a few views[¶](#csrf-protection-should-be-disabled-for-just-a-few-views "Permalink to this headline")

Most views requires CSRF protection, but a few do not.

Solution: rather than disabling the middleware and applying `csrf_protect` to all the views that need it, enable the middleware and use [`csrf_exempt()`](#django.views.decorators.csrf.csrf_exempt "django.views.decorators.csrf.csrf_exempt").

#### CsrfViewMiddleware.process\_view not used[¶](#csrfviewmiddleware-process-view-not-used "Permalink to this headline")

There are cases when `CsrfViewMiddleware.process_view` may not have run before your view is run - 404 and 500 handlers, for example - but you still need the CSRF token in a form.

Solution: use [`requires_csrf_token()`](#django.views.decorators.csrf.requires_csrf_token "django.views.decorators.csrf.requires_csrf_token")

#### Unprotected view needs the CSRF token[¶](#unprotected-view-needs-the-csrf-token "Permalink to this headline")

There may be some views that are unprotected and have been exempted by `csrf_exempt`, but still need to include the CSRF token.

Solution: use [`csrf_exempt()`](#django.views.decorators.csrf.csrf_exempt "django.views.decorators.csrf.csrf_exempt") followed by [`requires_csrf_token()`](#django.views.decorators.csrf.requires_csrf_token "django.views.decorators.csrf.requires_csrf_token"). (i.e. `requires_csrf_token` should be the innermost decorator).

#### View needs protection for one path[¶](#view-needs-protection-for-one-path "Permalink to this headline")

A view needs CSRF protection under one set of conditions only, and mustn't have it for the rest of the time.

Solution: use [`csrf_exempt()`](#django.views.decorators.csrf.csrf_exempt "django.views.decorators.csrf.csrf_exempt") for the whole view function, and [`csrf_protect()`](#django.views.decorators.csrf.csrf_protect "django.views.decorators.csrf.csrf_protect") for the path within it that needs protection. Example:

from django.views.decorators.csrf import csrf\_exempt, csrf\_protect

@csrf\_exempt
def my\_view(request):

    @csrf\_protect
    def protected\_path(request):
        do\_something()

    if some\_condition():
       return protected\_path(request)
    else:
       do\_something\_else()

#### Page uses AJAX without any HTML form[¶](#page-uses-ajax-without-any-html-form "Permalink to this headline")

A page makes a POST request via AJAX, and the page does not have an HTML form with a [`csrf_token`](https://docs.djangoproject.com/zh-hans/2.0/ref/templates/builtins/#std:templatetag-csrf_token) that would cause the required CSRF cookie to be sent.

Solution: use [`ensure_csrf_cookie()`](#django.views.decorators.csrf.ensure_csrf_cookie "django.views.decorators.csrf.ensure_csrf_cookie") on the view that sends the page.

## Contrib and reusable apps[¶](#contrib-and-reusable-apps "Permalink to this headline")

Because it is possible for the developer to turn off the `CsrfViewMiddleware`, all relevant views in contrib apps use the `csrf_protect` decorator to ensure the security of these applications against CSRF. It is recommended that the developers of other reusable apps that want the same guarantees also use the `csrf_protect` decorator on their views.

## Frequently Asked Questions[¶](#frequently-asked-questions "Permalink to this headline")

### Is posting an arbitrary CSRF token pair (cookie and POST data) a vulnerability?[¶](#is-posting-an-arbitrary-csrf-token-pair-cookie-and-post-data-a-vulnerability "Permalink to this headline")

No, this is by design. Without a man-in-the-middle attack, there is no way for an attacker to send a CSRF token cookie to a victim's browser, so a successful attack would need to obtain the victim's browser's cookie via XSS or similar, in which case an attacker usually doesn't need CSRF attacks.

Some security audit tools flag this as a problem but as mentioned before, an attacker cannot steal a user's browser's CSRF cookie. "Stealing" or modifying _your own_ token using Firebug, Chrome dev tools, etc. isn't a vulnerability.

### Is it a problem that Django's CSRF protection isn't linked to a session by default?[¶](#is-it-a-problem-that-django-s-csrf-protection-isn-t-linked-to-a-session-by-default "Permalink to this headline")

No, this is by design. Not linking CSRF protection to a session allows using the protection on sites such as a pastebin that allow submissions from anonymous users which don't have a session.

If you wish to store the CSRF token in the user's session, use the [`CSRF_USE_SESSIONS`](https://docs.djangoproject.com/zh-hans/2.0/ref/settings/#std:setting-CSRF_USE_SESSIONS) setting.

### Why might a user encounter a CSRF validation failure after logging in?[¶](#why-might-a-user-encounter-a-csrf-validation-failure-after-logging-in "Permalink to this headline")

For security reasons, CSRF tokens are rotated each time a user logs in. Any page with a form generated before a login will have an old, invalid CSRF token and need to be reloaded. This might happen if a user uses the back button after a login or if they log in in a different browser tab.
