This module contains implementations of various third-party authentication schemes.

All the classes in this file are class mixins designed to be used with the [`tornado.web.RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") class. They are used in two ways:

-   On a login handler, use methods such as `authenticate_redirect()`, `authorize_redirect()`, and `get_authenticated_user()` to establish the user’s identity and store authentication tokens to your database and/or cookies.
-   In non-login handlers, use methods such as `facebook_request()` or `twitter_request()` to use the authentication tokens to make requests to the respective services.

They all take slightly different arguments due to the fact all these services implement authentication and authorization slightly differently. See the individual service classes below for complete documentation.

Example usage for Google OAuth:

class GoogleOAuth2LoginHandler(tornado.web.RequestHandler,
                               tornado.auth.GoogleOAuth2Mixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get\_argument('code', False):
            user \= yield self.get\_authenticated\_user(
                redirect\_uri\='http://your.site.com/auth/google',
                code\=self.get\_argument('code'))
            \# Save the user with e.g. set\_secure\_cookie
        else:
            yield self.authorize\_redirect(
                redirect\_uri\='http://your.site.com/auth/google',
                client\_id\=self.settings\['google\_oauth'\]\['key'\],
                scope\=\['profile', 'email'\],
                response\_type\='code',
                extra\_params\={'approval\_prompt': 'auto'})

在 4.0 版更改: All of the callback interfaces in this module are now guaranteed to run their callback with an argument of `None` on error. Previously some functions would do this while others would simply terminate the request on their own. This change also ensures that errors are more consistently reported through the `Future` interfaces.

## Common protocols[¶](#common-protocols "永久链接至标题")

These classes implement the OpenID and OAuth standards. They will generally need to be subclassed to use them with any particular site. The degree of customization required will vary, but in most cases overridding the class attributes (which are named beginning with underscores for historical reasons) should be sufficient.

_class_ `tornado.auth.``OpenIdMixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OpenIdMixin)[¶](#tornado.auth.OpenIdMixin "永久链接至目标")

Abstract implementation of OpenID and Attribute Exchange.

Class attributes:

-   `_OPENID_ENDPOINT`: the identity provider’s URI.

`authenticate_redirect`(_callback\_uri=None, ax\_attrs=\['name', 'email', 'language', 'username'\], callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OpenIdMixin.authenticate_redirect)[¶](#tornado.auth.OpenIdMixin.authenticate_redirect "永久链接至目标")

Redirects to the authentication URL for this service.

After authentication, the service will redirect back to the given callback URI with additional parameters including `openid.mode`.

We request the given attributes for the authenticated user by default (name, email, language, and username). If you don’t need all those attributes for your app, you can request fewer with the ax\_attrs keyword argument.

在 3.1 版更改: Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and takes an optional callback. These are not strictly necessary as this method is synchronous, but they are supplied for consistency with [`OAuthMixin.authorize_redirect`](#tornado.auth.OAuthMixin.authorize_redirect "tornado.auth.OAuthMixin.authorize_redirect").

`get_authenticated_user`(_callback_, _http\_client=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OpenIdMixin.get_authenticated_user)[¶](#tornado.auth.OpenIdMixin.get_authenticated_user "永久链接至目标")

Fetches the authenticated user data upon redirect.

This method should be called by the handler that receives the redirect from the [`authenticate_redirect()`](#tornado.auth.OpenIdMixin.authenticate_redirect "tornado.auth.OpenIdMixin.authenticate_redirect") method (which is often the same as the one that calls it; in that case you would call [`get_authenticated_user`](#tornado.auth.OpenIdMixin.get_authenticated_user "tornado.auth.OpenIdMixin.get_authenticated_user") if the `openid.mode` parameter is present and [`authenticate_redirect`](#tornado.auth.OpenIdMixin.authenticate_redirect "tornado.auth.OpenIdMixin.authenticate_redirect") if it is not).

The result of this method will generally be used to set a cookie.

`get_auth_http_client`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OpenIdMixin.get_auth_http_client)[¶](#tornado.auth.OpenIdMixin.get_auth_http_client "永久链接至目标")

Returns the [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") instance to be used for auth requests.

May be overridden by subclasses to use an HTTP client other than the default.

_class_ `tornado.auth.``OAuthMixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuthMixin)[¶](#tornado.auth.OAuthMixin "永久链接至目标")

Abstract implementation of OAuth 1.0 and 1.0a.

See [`TwitterMixin`](#tornado.auth.TwitterMixin "tornado.auth.TwitterMixin") below for an example implementation.

Class attributes:

-   `_OAUTH_AUTHORIZE_URL`: The service’s OAuth authorization url.
-   `_OAUTH_ACCESS_TOKEN_URL`: The service’s OAuth access token url.
-   `_OAUTH_VERSION`: May be either “1.0” or “1.0a”.
-   `_OAUTH_NO_CALLBACKS`: Set this to True if the service requires advance registration of callbacks.

Subclasses must also override the [`_oauth_get_user_future`](#tornado.auth.OAuthMixin._oauth_get_user_future "tornado.auth.OAuthMixin._oauth_get_user_future") and [`_oauth_consumer_token`](#tornado.auth.OAuthMixin._oauth_consumer_token "tornado.auth.OAuthMixin._oauth_consumer_token") methods.

Redirects the user to obtain OAuth authorization for this service.

The `callback_uri` may be omitted if you have previously registered a callback URI with the third-party service. For some services (including Friendfeed), you must use a previously-registered callback URI and cannot specify a callback via this method.

This method sets a cookie called `_oauth_request_token` which is subsequently used (and cleared) in [`get_authenticated_user`](#tornado.auth.OAuthMixin.get_authenticated_user "tornado.auth.OAuthMixin.get_authenticated_user") for security purposes.

Note that this method is asynchronous, although it calls [`RequestHandler.finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish") for you so it may not be necessary to pass a callback or use the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") it returns. However, if this method is called from a function decorated with [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine"), you must call it with `yield` to keep the response from being closed prematurely.

在 3.1 版更改: Now returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and takes an optional callback, for compatibility with [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine").

`get_authenticated_user`(_callback_, _http\_client=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuthMixin.get_authenticated_user)[¶](#tornado.auth.OAuthMixin.get_authenticated_user "永久链接至目标")

Gets the OAuth authorized user and access token.

This method should be called from the handler for your OAuth callback URL to complete the registration process. We run the callback with the authenticated user dictionary. This dictionary will contain an `access_key` which can be used to make authorized requests to this service on behalf of the user. The dictionary will also contain other fields such as `name`, depending on the service used.

`_oauth_consumer_token`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuthMixin._oauth_consumer_token)[¶](#tornado.auth.OAuthMixin._oauth_consumer_token "永久链接至目标")

Subclasses must override this to return their OAuth consumer keys.

The return value should be a [`dict`](https://docs.python.org/3.4/library/stdtypes.html#dict "(在 Python v3.4)") with keys `key` and `secret`.

`_oauth_get_user_future`(_access\_token_, _callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuthMixin._oauth_get_user_future)[¶](#tornado.auth.OAuthMixin._oauth_get_user_future "永久链接至目标")

Subclasses must override this to get basic information about the user.

Should return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") whose result is a dictionary containing information about the user, which may have been retrieved by using `access_token` to make a request to the service.

The access token will be added to the returned dictionary to make the result of [`get_authenticated_user`](#tornado.auth.OAuthMixin.get_authenticated_user "tornado.auth.OAuthMixin.get_authenticated_user").

For backwards compatibility, the callback-based `_oauth_get_user` method is also supported.

`get_auth_http_client`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuthMixin.get_auth_http_client)[¶](#tornado.auth.OAuthMixin.get_auth_http_client "永久链接至目标")

Returns the [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") instance to be used for auth requests.

May be overridden by subclasses to use an HTTP client other than the default.

_class_ `tornado.auth.``OAuth2Mixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuth2Mixin)[¶](#tornado.auth.OAuth2Mixin "永久链接至目标")

Abstract implementation of OAuth 2.0.

See [`FacebookGraphMixin`](#tornado.auth.FacebookGraphMixin "tornado.auth.FacebookGraphMixin") or [`GoogleOAuth2Mixin`](#tornado.auth.GoogleOAuth2Mixin "tornado.auth.GoogleOAuth2Mixin") below for example implementations.

Class attributes:

-   `_OAUTH_AUTHORIZE_URL`: The service’s authorization url.
-   `_OAUTH_ACCESS_TOKEN_URL`: The service’s access token url.

`authorize_redirect`(_redirect\_uri=None_, _client\_id=None_, _client\_secret=None_, _extra\_params=None_, _callback=None_, _scope=None_, _response\_type='code'_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuth2Mixin.authorize_redirect)[¶](#tornado.auth.OAuth2Mixin.authorize_redirect "永久链接至目标")

Redirects the user to obtain OAuth authorization for this service.

Some providers require that you register a redirect URL with your application instead of passing one via this method. You should call this method to log the user in, and then call `get_authenticated_user` in the handler for your redirect URL to complete the authorization process.

在 3.1 版更改: Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and takes an optional callback. These are not strictly necessary as this method is synchronous, but they are supplied for consistency with [`OAuthMixin.authorize_redirect`](#tornado.auth.OAuthMixin.authorize_redirect "tornado.auth.OAuthMixin.authorize_redirect").

`oauth2_request`(_url_, _callback_, _access\_token=None_, _post\_args=None_, _\*\*args_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuth2Mixin.oauth2_request)[¶](#tornado.auth.OAuth2Mixin.oauth2_request "永久链接至目标")

Fetches the given URL auth an OAuth2 access token.

If the request is a POST, `post_args` should be provided. Query string arguments should be given as keyword arguments.

Example usage:

..testcode:

class MainHandler(tornado.web.RequestHandler,
                  tornado.auth.FacebookGraphMixin):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        new\_entry \= yield self.oauth2\_request(
            "https://graph.facebook.com/me/feed",
            post\_args\={"message": "I am posting from my Tornado application!"},
            access\_token\=self.current\_user\["access\_token"\])

        if not new\_entry:
            \# Call failed; perhaps missing permission?
            yield self.authorize\_redirect()
            return
        self.finish("Posted a message!")

4.3 新版功能.

`get_auth_http_client`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#OAuth2Mixin.get_auth_http_client)[¶](#tornado.auth.OAuth2Mixin.get_auth_http_client "永久链接至目标")

Returns the [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") instance to be used for auth requests.

May be overridden by subclasses to use an HTTP client other than the default.

4.3 新版功能.

## Google[¶](#google "永久链接至标题")

_class_ `tornado.auth.``GoogleOAuth2Mixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#GoogleOAuth2Mixin)[¶](#tornado.auth.GoogleOAuth2Mixin "永久链接至目标")

Google authentication using OAuth2.

In order to use, register your application with Google and copy the relevant parameters to your application settings.

-   Go to the Google Dev Console at [http://console.developers.google.com](http://console.developers.google.com)
-   Select a project, or create a new one.
-   In the sidebar on the left, select APIs & Auth.
-   In the list of APIs, find the Google+ API service and set it to ON.
-   In the sidebar on the left, select Credentials.
-   In the OAuth section of the page, select Create New Client ID.
-   Set the Redirect URI to point to your auth handler
-   Copy the “Client secret” and “Client ID” to the application settings as {“google\_oauth”: {“key”: CLIENT\_ID, “secret”: CLIENT\_SECRET}}

3.2 新版功能.

`get_authenticated_user`(_redirect\_uri_, _code_, _callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#GoogleOAuth2Mixin.get_authenticated_user)[¶](#tornado.auth.GoogleOAuth2Mixin.get_authenticated_user "永久链接至目标")

Handles the login for the Google user, returning an access token.

The result is a dictionary containing an `access_token` field (\[among others\](https://tornado-zh.readthedocs.io/zh/latest/[https://developers.google.com/identity/protocols/OAuth2WebServer#handlingtheresponse](https://developers.google.com/identity/protocols/OAuth2WebServer#handlingtheresponse))). Unlike other `get_authenticated_user` methods in this package, this method does not return any additional information about the user. The returned access token can be used with [`OAuth2Mixin.oauth2_request`](#tornado.auth.OAuth2Mixin.oauth2_request "tornado.auth.OAuth2Mixin.oauth2_request") to request additional information (perhaps from `https://www.googleapis.com/oauth2/v2/userinfo`)

Example usage:

class GoogleOAuth2LoginHandler(tornado.web.RequestHandler,
                               tornado.auth.GoogleOAuth2Mixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get\_argument('code', False):
            access \= yield self.get\_authenticated\_user(
                redirect\_uri\='http://your.site.com/auth/google',
                code\=self.get\_argument('code'))
            user \= yield self.oauth2\_request(
                "https://www.googleapis.com/oauth2/v1/userinfo",
                access\_token\=access\["access\_token"\])
            \# Save the user and access token with
            \# e.g. set\_secure\_cookie.
        else:
            yield self.authorize\_redirect(
                redirect\_uri\='http://your.site.com/auth/google',
                client\_id\=self.settings\['google\_oauth'\]\['key'\],
                scope\=\['profile', 'email'\],
                response\_type\='code',
                extra\_params\={'approval\_prompt': 'auto'})

## Facebook[¶](#facebook "永久链接至标题")

_class_ `tornado.auth.``FacebookGraphMixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#FacebookGraphMixin)[¶](#tornado.auth.FacebookGraphMixin "永久链接至目标")

Facebook authentication using the new Graph API and OAuth2.

`get_authenticated_user`(_redirect\_uri_, _client\_id_, _client\_secret_, _code_, _callback_, _extra\_fields=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#FacebookGraphMixin.get_authenticated_user)[¶](#tornado.auth.FacebookGraphMixin.get_authenticated_user "永久链接至目标")

Handles the login for the Facebook user, returning a user object.

Example usage:

class FacebookGraphLoginHandler(tornado.web.RequestHandler,
                                tornado.auth.FacebookGraphMixin):
  @tornado.gen.coroutine
  def get(self):
      if self.get\_argument("code", False):
          user \= yield self.get\_authenticated\_user(
              redirect\_uri\='/auth/facebookgraph/',
              client\_id\=self.settings\["facebook\_api\_key"\],
              client\_secret\=self.settings\["facebook\_secret"\],
              code\=self.get\_argument("code"))
          \# Save the user with e.g. set\_secure\_cookie
      else:
          yield self.authorize\_redirect(
              redirect\_uri\='/auth/facebookgraph/',
              client\_id\=self.settings\["facebook\_api\_key"\],
              extra\_params\={"scope": "read\_stream,offline\_access"})

`facebook_request`(_path_, _callback_, _access\_token=None_, _post\_args=None_, _\*\*args_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#FacebookGraphMixin.facebook_request)[¶](#tornado.auth.FacebookGraphMixin.facebook_request "永久链接至目标")

Fetches the given relative API path, e.g., “/btaylor/picture”

If the request is a POST, `post_args` should be provided. Query string arguments should be given as keyword arguments.

An introduction to the Facebook Graph API can be found at [http://developers.facebook.com/docs/api](http://developers.facebook.com/docs/api)

Many methods require an OAuth access token which you can obtain through [`authorize_redirect`](#tornado.auth.OAuth2Mixin.authorize_redirect "tornado.auth.OAuth2Mixin.authorize_redirect") and [`get_authenticated_user`](#tornado.auth.FacebookGraphMixin.get_authenticated_user "tornado.auth.FacebookGraphMixin.get_authenticated_user"). The user returned through that process includes an `access_token` attribute that can be used to make authenticated requests via this method.

Example usage:

..testcode:

class MainHandler(tornado.web.RequestHandler,
                  tornado.auth.FacebookGraphMixin):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        new\_entry \= yield self.facebook\_request(
            "/me/feed",
            post\_args\={"message": "I am posting from my Tornado application!"},
            access\_token\=self.current\_user\["access\_token"\])

        if not new\_entry:
            \# Call failed; perhaps missing permission?
            yield self.authorize\_redirect()
            return
        self.finish("Posted a message!")

The given path is relative to `self._FACEBOOK_BASE_URL`, by default “[https://graph.facebook.com](https://graph.facebook.com)”.

This method is a wrapper around [`OAuth2Mixin.oauth2_request`](#tornado.auth.OAuth2Mixin.oauth2_request "tornado.auth.OAuth2Mixin.oauth2_request"); the only difference is that this method takes a relative path, while `oauth2_request` takes a complete url.

在 3.1 版更改: Added the ability to override `self._FACEBOOK_BASE_URL`.

## Twitter[¶](#twitter "永久链接至标题")

_class_ `tornado.auth.``TwitterMixin`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#TwitterMixin)[¶](#tornado.auth.TwitterMixin "永久链接至目标")

Twitter OAuth authentication.

To authenticate with Twitter, register your application with Twitter at [http://twitter.com/apps](http://twitter.com/apps). Then copy your Consumer Key and Consumer Secret to the application [`settings`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.settings "tornado.web.Application.settings") `twitter_consumer_key` and `twitter_consumer_secret`. Use this mixin on the handler for the URL you registered as your application’s callback URL.

When your application is set up, you can use this mixin like this to authenticate the user with Twitter and get access to their stream:

class TwitterLoginHandler(tornado.web.RequestHandler,
                          tornado.auth.TwitterMixin):
    @tornado.gen.coroutine
    def get(self):
        if self.get\_argument("oauth\_token", None):
            user \= yield self.get\_authenticated\_user()
            \# Save the user using e.g. set\_secure\_cookie()
        else:
            yield self.authorize\_redirect()

The user object returned by [`get_authenticated_user`](#tornado.auth.OAuthMixin.get_authenticated_user "tornado.auth.OAuthMixin.get_authenticated_user") includes the attributes `username`, `name`, `access_token`, and all of the custom Twitter user attributes described at [https://dev.twitter.com/docs/api/1.1/get/users/show](https://dev.twitter.com/docs/api/1.1/get/users/show)

`authenticate_redirect`(_callback\_uri=None_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#TwitterMixin.authenticate_redirect)[¶](#tornado.auth.TwitterMixin.authenticate_redirect "永久链接至目标")

Just like [`authorize_redirect`](#tornado.auth.OAuthMixin.authorize_redirect "tornado.auth.OAuthMixin.authorize_redirect"), but auto-redirects if authorized.

This is generally the right interface to use if you are using Twitter for single-sign on.

在 3.1 版更改: Now returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and takes an optional callback, for compatibility with [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine").

`twitter_request`(_path_, _callback=None_, _access\_token=None_, _post\_args=None_, _\*\*args_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/auth.html#TwitterMixin.twitter_request)[¶](#tornado.auth.TwitterMixin.twitter_request "永久链接至目标")

Fetches the given API path, e.g., `statuses/user_timeline/btaylor`

The path should not include the format or API version number. (we automatically use JSON format and API version 1).

If the request is a POST, `post_args` should be provided. Query string arguments should be given as keyword arguments.

All the Twitter methods are documented at [http://dev.twitter.com/](http://dev.twitter.com/)

Many methods require an OAuth access token which you can obtain through [`authorize_redirect`](#tornado.auth.OAuthMixin.authorize_redirect "tornado.auth.OAuthMixin.authorize_redirect") and [`get_authenticated_user`](#tornado.auth.OAuthMixin.get_authenticated_user "tornado.auth.OAuthMixin.get_authenticated_user"). The user returned through that process includes an ‘access\_token’ attribute that can be used to make authenticated requests via this method. Example usage:

class MainHandler(tornado.web.RequestHandler,
                  tornado.auth.TwitterMixin):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        new\_entry \= yield self.twitter\_request(
            "/statuses/update",
            post\_args\={"status": "Testing Tornado Web Server"},
            access\_token\=self.current\_user\["access\_token"\])
        if not new\_entry:
            \# Call failed; perhaps missing permission?
            yield self.authorize\_redirect()
            return
        self.finish("Posted a message!")
