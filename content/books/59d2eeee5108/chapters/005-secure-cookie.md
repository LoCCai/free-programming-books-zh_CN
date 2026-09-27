This module implements a cookie that is not alterable from the client because it adds a checksum the server checks for. You can use it as session replacement if all you have is a user id or something to mark a logged in user.

Keep in mind that the data is still readable from the client as a normal cookie is. However you don’t have to store and flush the sessions you have at the server.

Example usage:

\>>> from werkzeug.contrib.securecookie import SecureCookie
\>>> x \= SecureCookie({"foo": 42, "baz": (1, 2, 3)}, "deadbeef")

Dumping into a string so that one can store it in a cookie:

\>>> value \= x.serialize()

Loading from that string again:

\>>> x \= SecureCookie.unserialize(value, "deadbeef")
\>>> x\["baz"\]
(1, 2, 3)

If someone modifies the cookie and the checksum is wrong the unserialize method will fail silently and return a new empty SecureCookie object.

Keep in mind that the values will be visible in the cookie so do not store data in a cookie you don’t want the user to see.

## Application Integration[¶](#application-integration "永久链接至标题")

If you are using the werkzeug request objects you could integrate the secure cookie into your application like this:

from werkzeug.utils import cached\_property
from werkzeug.wrappers import BaseRequest
from werkzeug.contrib.securecookie import SecureCookie

\# don't use this key but a different one; you could just use
\# os.urandom(20) to get something random
SECRET\_KEY \= '\\xfa\\xdd\\xb8z\\xae\\xe0}4\\x8b\\xea'

class Request(BaseRequest):

    @cached\_property
    def client\_session(self):
        data \= self.cookies.get('session\_data')
        if not data:
            return SecureCookie(secret\_key\=SECRET\_KEY)
        return SecureCookie.unserialize(data, SECRET\_KEY)

def application(environ, start\_response):
    request \= Request(environ, start\_response)

    \# get a response object here
    response \= ...

    if request.client\_session.should\_save:
        session\_data \= request.client\_session.serialize()
        response.set\_cookie('session\_data', session\_data,
                            httponly\=True)
    return response(environ, start\_response)

A less verbose integration can be achieved by using shorthand methods:

class Request(BaseRequest):

    @cached\_property
    def client\_session(self):
        return SecureCookie.load\_cookie(self, secret\_key\=COOKIE\_SECRET)

def application(environ, start\_response):
    request \= Request(environ, start\_response)

    \# get a response object here
    response \= ...

    request.client\_session.save\_cookie(response)
    return response(environ, start\_response)

## Security[¶](#security "永久链接至标题")

The default implementation uses Pickle as this is the only module that used to be available in the standard library when this module was created. If you have simplejson available it’s strongly recommended to create a subclass and replace the serialization method:

import json
from werkzeug.contrib.securecookie import SecureCookie

class JSONSecureCookie(SecureCookie):
    serialization\_method \= json

The weakness of Pickle is that if someone gains access to the secret key the attacker can not only modify the session but also execute arbitrary code on the server.

## Reference[¶](#reference "永久链接至标题")

_class_ werkzeug.contrib.securecookie.SecureCookie(_data=None_, _secret\_key=None_, _new=True_)[¶](#werkzeug.contrib.securecookie.SecureCookie "永久链接至目标")

Represents a secure cookie. You can subclass this class and provide an alternative mac method. The import thing is that the mac method is a function with a similar interface to the hashlib. Required methods are update() and digest().

Example usage:

\>>> x \= SecureCookie({"foo": 42, "baz": (1, 2, 3)}, "deadbeef")
\>>> x\["foo"\]
42
\>>> x\["baz"\]
(1, 2, 3)
\>>> x\["blafasel"\] \= 23
\>>> x.should\_save
True

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>data</strong> – the initial data. Either a dict, list of tuples or <cite>None</cite>.</li><li><strong>secret_key</strong> – the secret key. If not set <cite>None</cite> or not specified it has to be set before <a href="#werkzeug.contrib.securecookie.SecureCookie.serialize" title="werkzeug.contrib.securecookie.SecureCookie.serialize"><tt><span>serialize()</span></tt></a> is called.</li><li><strong>new</strong> – The initial value of the <cite>new</cite> flag.</li></ul></td></tr></tbody></table>

new[¶](#werkzeug.contrib.securecookie.SecureCookie.new "永久链接至目标")

True if the cookie was newly created, otherwise False

modified[¶](#werkzeug.contrib.securecookie.SecureCookie.modified "永久链接至目标")

Whenever an item on the cookie is set, this attribute is set to True. However this does not track modifications inside mutable objects in the cookie:

\>>> c \= SecureCookie()
\>>> c\["foo"\] \= \[1, 2, 3\]
\>>> c.modified
True
\>>> c.modified \= False
\>>> c\["foo"\].append(4)
\>>> c.modified
False

In that situation it has to be set to modified by hand so that [should\_save](#werkzeug.contrib.securecookie.SecureCookie.should_save "werkzeug.contrib.securecookie.SecureCookie.should_save") can pick it up.

hash\_method()[¶](#werkzeug.contrib.securecookie.SecureCookie.hash_method "永久链接至目标")

The hash method to use. This has to be a module with a new function or a function that creates a hashlib object. Such as hashlib.md5 Subclasses can override this attribute. The default hash is sha1. Make sure to wrap this in staticmethod() if you store an arbitrary function there such as hashlib.sha1 which might be implemented as a function.

_classmethod_ load\_cookie(_request_, _key='session'_, _secret\_key=None_)[¶](#werkzeug.contrib.securecookie.SecureCookie.load_cookie "永久链接至目标")

Loads a [SecureCookie](#werkzeug.contrib.securecookie.SecureCookie "werkzeug.contrib.securecookie.SecureCookie") from a cookie in request. If the cookie is not set, a new [SecureCookie](#werkzeug.contrib.securecookie.SecureCookie "werkzeug.contrib.securecookie.SecureCookie") instanced is returned.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>request</strong> – a request object that has a <cite>cookies</cite> attribute which is a dict of all cookie values.</li><li><strong>key</strong> – the name of the cookie.</li><li><strong>secret_key</strong> – the secret key used to unquote the cookie. Always provide the value even though it has no default!</li></ul></td></tr></tbody></table>

_classmethod_ quote(_value_)[¶](#werkzeug.contrib.securecookie.SecureCookie.quote "永久链接至目标")

Quote the value for the cookie. This can be any object supported by [serialization\_method](#werkzeug.contrib.securecookie.SecureCookie.serialization_method "werkzeug.contrib.securecookie.SecureCookie.serialization_method").

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>value</strong> – the value to quote.</td></tr></tbody></table>

quote\_base64 _= True_[¶](#werkzeug.contrib.securecookie.SecureCookie.quote_base64 "永久链接至目标")

if the contents should be base64 quoted. This can be disabled if the serialization process returns cookie safe strings only.

save\_cookie(_response_, _key='session'_, _expires=None_, _session\_expires=None_, _max\_age=None_, _path='/'_, _domain=None_, _secure=None_, _httponly=False_, _force=False_)[¶](#werkzeug.contrib.securecookie.SecureCookie.save_cookie "永久链接至目标")

Saves the SecureCookie in a cookie on response object. All parameters that are not described here are forwarded directly to set\_cookie().

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>response</strong> – a response object that has a <tt><span>set_cookie()</span></tt> method.</li><li><strong>key</strong> – the name of the cookie.</li><li><strong>session_expires</strong> – the expiration date of the secure cookie stored information. If this is not provided the cookie <cite>expires</cite> date is used instead.</li></ul></td></tr></tbody></table>

serialization\_method _= <module 'pickle' from '/usr/lib/python2.7/pickle.pyc'>_[¶](#werkzeug.contrib.securecookie.SecureCookie.serialization_method "永久链接至目标")

the module used for serialization. Unless overriden by subclasses the standard pickle module is used.

serialize(_expires=None_)[¶](#werkzeug.contrib.securecookie.SecureCookie.serialize "永久链接至目标")

Serialize the secure cookie into a string.

If expires is provided, the session will be automatically invalidated after expiration when you unseralize it. This provides better protection against session cookie theft.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>expires</strong> – an optional expiration date for the cookie (a <tt><span>datetime.datetime</span></tt> object)</td></tr></tbody></table>

should\_save[¶](#werkzeug.contrib.securecookie.SecureCookie.should_save "永久链接至目标")

True if the session should be saved. By default this is only true for [modified](#werkzeug.contrib.securecookie.SecureCookie.modified "werkzeug.contrib.securecookie.SecureCookie.modified") cookies, not [new](#werkzeug.contrib.securecookie.SecureCookie.new "werkzeug.contrib.securecookie.SecureCookie.new").

_classmethod_ unquote(_value_)[¶](#werkzeug.contrib.securecookie.SecureCookie.unquote "永久链接至目标")

Unquote the value for the cookie. If unquoting does not work a [UnquoteError](#werkzeug.contrib.securecookie.UnquoteError "werkzeug.contrib.securecookie.UnquoteError") is raised.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>value</strong> – the value to unquote.</td></tr></tbody></table>

_classmethod_ unserialize(_string_, _secret\_key_)[¶](#werkzeug.contrib.securecookie.SecureCookie.unserialize "永久链接至目标")

Load the secure cookie from a serialized string.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>string</strong> – the cookie value to unserialize.</li><li><strong>secret_key</strong> – the secret key used to serialize the cookie.</li></ul></td></tr><tr><th>返回:</th><td><p>a new <a href="#werkzeug.contrib.securecookie.SecureCookie" title="werkzeug.contrib.securecookie.SecureCookie"><tt><span>SecureCookie</span></tt></a>.</p></td></tr></tbody></table>

_exception_ werkzeug.contrib.securecookie.UnquoteError[¶](#werkzeug.contrib.securecookie.UnquoteError "永久链接至目标")

Internal exception used to signal failures on quoting.
