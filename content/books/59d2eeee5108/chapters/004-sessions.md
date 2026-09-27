This module contains some helper classes that help one to add session support to a python WSGI application. For full client-side session storage see [securecookie](https://werkzeug-docs-cn.readthedocs.io/zh-cn/latest/contrib/securecookie.html#module-werkzeug.contrib.securecookie "werkzeug.contrib.securecookie") which implements a secure, client-side session storage.

## Application Integration[¶](#application-integration "永久链接至标题")

from werkzeug.contrib.sessions import SessionMiddleware, \\
     FilesystemSessionStore

app \= SessionMiddleware(app, FilesystemSessionStore())

The current session will then appear in the WSGI environment as werkzeug.session. However it’s recommended to not use the middleware but the stores directly in the application. However for very simple scripts a middleware for sessions could be sufficient.

This module does not implement methods or ways to check if a session is expired. That should be done by a cronjob and storage specific. For example to prune unused filesystem sessions one could check the modified time of the files. It sessions are stored in the database the new() method should add an expiration timestamp for the session.

For better flexibility it’s recommended to not use the middleware but the store and session object directly in the application dispatching:

session\_store \= FilesystemSessionStore()

def application(environ, start\_response):
    request \= Request(environ)
    sid \= request.cookies.get('cookie\_name')
    if sid is None:
        request.session \= session\_store.new()
    else:
        request.session \= session\_store.get(sid)
    response \= get\_the\_response\_object(request)
    if request.session.should\_save:
        session\_store.save(request.session)
        response.set\_cookie('cookie\_name', request.session.sid)
    return response(environ, start\_response)

## Reference[¶](#reference "永久链接至标题")

_class_ werkzeug.contrib.sessions.Session(_data_, _sid_, _new=False_)[¶](#werkzeug.contrib.sessions.Session "永久链接至目标")

Subclass of a dict that keeps track of direct object changes. Changes in mutable structures are not tracked, for those you have to set modified to True by hand.

sid[¶](#werkzeug.contrib.sessions.Session.sid "永久链接至目标")

The session ID as string.

new[¶](#werkzeug.contrib.sessions.Session.new "永久链接至目标")

True is the cookie was newly created, otherwise False

modified[¶](#werkzeug.contrib.sessions.Session.modified "永久链接至目标")

Whenever an item on the cookie is set, this attribute is set to True. However this does not track modifications inside mutable objects in the session:

\>>> c \= Session({}, sid\='deadbeefbabe2c00ffee')
\>>> c\["foo"\] \= \[1, 2, 3\]
\>>> c.modified
True
\>>> c.modified \= False
\>>> c\["foo"\].append(4)
\>>> c.modified
False

In that situation it has to be set to modified by hand so that [should\_save](#werkzeug.contrib.sessions.Session.should_save "werkzeug.contrib.sessions.Session.should_save") can pick it up.

should\_save[¶](#werkzeug.contrib.sessions.Session.should_save "永久链接至目标")

True if the session should be saved.

在 0.6 版更改: By default the session is now only saved if the session is modified, not if it is new like it was before.

_class_ werkzeug.contrib.sessions.SessionStore(_session\_class=None_)[¶](#werkzeug.contrib.sessions.SessionStore "永久链接至目标")

Baseclass for all session stores. The Werkzeug contrib module does not implement any useful stores besides the filesystem store, application developers are encouraged to create their own stores.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>session_class</strong> – The session class to use. Defaults to <a href="#werkzeug.contrib.sessions.Session" title="werkzeug.contrib.sessions.Session"><tt><span>Session</span></tt></a>.</td></tr></tbody></table>

delete(_session_)[¶](#werkzeug.contrib.sessions.SessionStore.delete "永久链接至目标")

Delete a session.

generate\_key(_salt=None_)[¶](#werkzeug.contrib.sessions.SessionStore.generate_key "永久链接至目标")

Simple function that generates a new session key.

get(_sid_)[¶](#werkzeug.contrib.sessions.SessionStore.get "永久链接至目标")

Get a session for this sid or a new session object. This method has to check if the session key is valid and create a new session if that wasn’t the case.

is\_valid\_key(_key_)[¶](#werkzeug.contrib.sessions.SessionStore.is_valid_key "永久链接至目标")

Check if a key has the correct format.

new()[¶](#werkzeug.contrib.sessions.SessionStore.new "永久链接至目标")

Generate a new session.

save(_session_)[¶](#werkzeug.contrib.sessions.SessionStore.save "永久链接至目标")

Save a session.

save\_if\_modified(_session_)[¶](#werkzeug.contrib.sessions.SessionStore.save_if_modified "永久链接至目标")

Save if a session class wants an update.

_class_ werkzeug.contrib.sessions.FilesystemSessionStore(_path=None_, _filename\_template='werkzeug\_%s.sess'_, _session\_class=None_, _renew\_missing=False_, _mode=420_)[¶](#werkzeug.contrib.sessions.FilesystemSessionStore "永久链接至目标")

Simple example session store that saves sessions on the filesystem. This store works best on POSIX systems and Windows Vista / Windows Server 2008 and newer.

在 0.6 版更改: renew\_missing was added. Previously this was considered True, now the default changed to False and it can be explicitly deactivated.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>path</strong> – the path to the folder used for storing the sessions. If not provided the default temporary directory is used.</li><li><strong>filename_template</strong> – a string template used to give the session a filename. <tt><span>%s</span></tt> is replaced with the session id.</li><li><strong>session_class</strong> – The session class to use. Defaults to <a href="#werkzeug.contrib.sessions.Session" title="werkzeug.contrib.sessions.Session"><tt><span>Session</span></tt></a>.</li><li><strong>renew_missing</strong> – set to <cite>True</cite> if you want the store to give the user a new sid if the session was not yet saved.</li></ul></td></tr></tbody></table>

list()[¶](#werkzeug.contrib.sessions.FilesystemSessionStore.list "永久链接至目标")

Lists all sessions in the store.

0.6 新版功能.

_class_ werkzeug.contrib.sessions.SessionMiddleware(_app_, _store_, _cookie\_name='session\_id'_, _cookie\_age=None_, _cookie\_expires=None_, _cookie\_path='/'_, _cookie\_domain=None_, _cookie\_secure=None_, _cookie\_httponly=False_, _environ\_key='werkzeug.session'_)[¶](#werkzeug.contrib.sessions.SessionMiddleware "永久链接至目标")

A simple middleware that puts the session object of a store provided into the WSGI environ. It automatically sets cookies and restores sessions.

However a middleware is not the preferred solution because it won’t be as fast as sessions managed by the application itself and will put a key into the WSGI environment only relevant for the application which is against the concept of WSGI.

The cookie parameters are the same as for the dump\_cookie() function just prefixed with cookie\_. Additionally max\_age is called cookie\_age and not cookie\_max\_age because of backwards compatibility.
