The main problem with dynamic Web sites is, well, they’re dynamic. Each time a user requests a page, the webserver executes a lot of code, queries the database, renders templates until the visitor gets the page he sees.

This is a lot more expensive than just loading a file from the file system and sending it to the visitor.

For most Web applications, this overhead isn’t a big deal but once it becomes, you will be glad to have a cache system in place.

## How Caching Works[¶](#how-caching-works "永久链接至标题")

Caching is pretty simple. Basically you have a cache object lurking around somewhere that is connected to a remote cache or the file system or something else. When the request comes in you check if the current page is already in the cache and if so, you’re returning it from the cache. Otherwise you generate the page and put it into the cache. (Or a fragment of the page, you don’t have to cache the full thing)

Here is a simple example of how to cache a sidebar for a template:

def get\_sidebar(user):
    identifier \= 'sidebar\_for/user%d' % user.id
    value \= cache.get(identifier)
    if value is not None:
        return value
    value \= generate\_sidebar\_for(user\=user)
    cache.set(identifier, value, timeout\=60 \* 5)
    return value

## Creating a Cache Object[¶](#creating-a-cache-object "永久链接至标题")

To create a cache object you just import the cache system of your choice from the cache module and instantiate it. Then you can start working with that object:

\>>> from werkzeug.contrib.cache import SimpleCache
\>>> c \= SimpleCache()
\>>> c.set("foo", "value")
\>>> c.get("foo")
'value'
\>>> c.get("missing") is None
True

Please keep in mind that you have to create the cache and put it somewhere you have access to it (either as a module global you can import or you just put it into your WSGI application).

## Cache System API[¶](#cache-system-api "永久链接至标题")

_class_ werkzeug.contrib.cache.BaseCache(_default\_timeout=300_)[¶](#werkzeug.contrib.cache.BaseCache "永久链接至目标")

Baseclass for the cache systems. All the cache systems implement this API or a superset of it.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>default_timeout</strong> – the default timeout that is used if no timeout is specified on <a href="#werkzeug.contrib.cache.BaseCache.set" title="werkzeug.contrib.cache.BaseCache.set"><tt><span>set()</span></tt></a>.</td></tr></tbody></table>

add(_key_, _value_, _timeout=None_)[¶](#werkzeug.contrib.cache.BaseCache.add "永久链接至目标")

Works like [set()](#werkzeug.contrib.cache.BaseCache.set "werkzeug.contrib.cache.BaseCache.set") but does not overwrite the values of already existing keys.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>key</strong> – the key to set</li><li><strong>value</strong> – the value for the key</li><li><strong>timeout</strong> – the cache timeout for the key or the default timeout if not specified.</li></ul></td></tr></tbody></table>

clear()[¶](#werkzeug.contrib.cache.BaseCache.clear "永久链接至目标")

Clears the cache. Keep in mind that not all caches support completely clearing the cache.

dec(_key_, _delta=1_)[¶](#werkzeug.contrib.cache.BaseCache.dec "永久链接至目标")

Decrements the value of a key by delta. If the key does not yet exist it is initialized with \-delta.

For supporting caches this is an atomic operation.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>key</strong> – the key to increment.</li><li><strong>delta</strong> – the delta to subtract.</li></ul></td></tr></tbody></table>

delete(_key_)[¶](#werkzeug.contrib.cache.BaseCache.delete "永久链接至目标")

Deletes key from the cache. If it does not exist in the cache nothing happens.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>key</strong> – the key to delete.</td></tr></tbody></table>

delete\_many(_\*keys_)[¶](#werkzeug.contrib.cache.BaseCache.delete_many "永久链接至目标")

Deletes multiple keys at once.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>keys</strong> – The function accepts multiple keys as positional arguments.</td></tr></tbody></table>

get(_key_)[¶](#werkzeug.contrib.cache.BaseCache.get "永久链接至目标")

Looks up key in the cache and returns the value for it. If the key does not exist None is returned instead.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>key</strong> – the key to be looked up.</td></tr></tbody></table>

get\_dict(_\*keys_)[¶](#werkzeug.contrib.cache.BaseCache.get_dict "永久链接至目标")

Works like [get\_many()](#werkzeug.contrib.cache.BaseCache.get_many "werkzeug.contrib.cache.BaseCache.get_many") but returns a dict:

d \= cache.get\_dict("foo", "bar")
foo \= d\["foo"\]
bar \= d\["bar"\]

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>keys</strong> – The function accepts multiple keys as positional arguments.</td></tr></tbody></table>

get\_many(_\*keys_)[¶](#werkzeug.contrib.cache.BaseCache.get_many "永久链接至目标")

Returns a list of values for the given keys. For each key a item in the list is created. Example:

foo, bar \= cache.get\_many("foo", "bar")

If a key can’t be looked up None is returned for that key instead.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>keys</strong> – The function accepts multiple keys as positional arguments.</td></tr></tbody></table>

inc(_key_, _delta=1_)[¶](#werkzeug.contrib.cache.BaseCache.inc "永久链接至目标")

Increments the value of a key by delta. If the key does not yet exist it is initialized with delta.

For supporting caches this is an atomic operation.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>key</strong> – the key to increment.</li><li><strong>delta</strong> – the delta to add.</li></ul></td></tr></tbody></table>

set(_key_, _value_, _timeout=None_)[¶](#werkzeug.contrib.cache.BaseCache.set "永久链接至目标")

Adds a new key/value to the cache (overwrites value, if key already exists in the cache).

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>key</strong> – the key to set</li><li><strong>value</strong> – the value for the key</li><li><strong>timeout</strong> – the cache timeout for the key (if not specified, it uses the default timeout).</li></ul></td></tr></tbody></table>

set\_many(_mapping_, _timeout=None_)[¶](#werkzeug.contrib.cache.BaseCache.set_many "永久链接至目标")

Sets multiple keys and values from a mapping.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>mapping</strong> – a mapping with the keys/values to set.</li><li><strong>timeout</strong> – the cache timeout for the key (if not specified, it uses the default timeout).</li></ul></td></tr></tbody></table>

## Cache Systems[¶](#cache-systems "永久链接至标题")

_class_ werkzeug.contrib.cache.NullCache(_default\_timeout=300_)[¶](#werkzeug.contrib.cache.NullCache "永久链接至目标")

A cache that doesn’t cache. This can be useful for unit testing.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>default_timeout</strong> – a dummy parameter that is ignored but exists for API compatibility with other caches.</td></tr></tbody></table>

_class_ werkzeug.contrib.cache.SimpleCache(_threshold=500_, _default\_timeout=300_)[¶](#werkzeug.contrib.cache.SimpleCache "永久链接至目标")

Simple memory cache for single process environments. This class exists mainly for the development server and is not 100% thread safe. It tries to use as many atomic operations as possible and no locks for simplicity but it could happen under heavy load that keys are added multiple times.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>threshold</strong> – the maximum number of items the cache stores before it starts deleting some.</li><li><strong>default_timeout</strong> – the default timeout that is used if no timeout is specified on <a href="#werkzeug.contrib.cache.BaseCache.set" title="werkzeug.contrib.cache.BaseCache.set"><tt><span>set()</span></tt></a>.</li></ul></td></tr></tbody></table>

_class_ werkzeug.contrib.cache.MemcachedCache(_servers=None_, _default\_timeout=300_, _key\_prefix=None_)[¶](#werkzeug.contrib.cache.MemcachedCache "永久链接至目标")

A cache that uses memcached as backend.

The first argument can either be an object that resembles the API of a memcache.Client or a tuple/list of server addresses. In the event that a tuple/list is passed, Werkzeug tries to import the best available memcache library.

Implementation notes: This cache backend works around some limitations in memcached to simplify the interface. For example unicode keys are encoded to utf-8 on the fly. Methods such as [get\_dict()](#werkzeug.contrib.cache.BaseCache.get_dict "werkzeug.contrib.cache.BaseCache.get_dict") return the keys in the same format as passed. Furthermore all get methods silently ignore key errors to not cause problems when untrusted user data is passed to the get methods which is often the case in web applications.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>servers</strong> – a list or tuple of server addresses or alternatively a <tt><span>memcache.Client</span></tt> or a compatible client.</li><li><strong>default_timeout</strong> – the default timeout that is used if no timeout is specified on <a href="#werkzeug.contrib.cache.BaseCache.set" title="werkzeug.contrib.cache.BaseCache.set"><tt><span>set()</span></tt></a>.</li><li><strong>key_prefix</strong> – a prefix that is added before all keys. This makes it possible to use the same memcached server for different applications. Keep in mind that <a href="#werkzeug.contrib.cache.BaseCache.clear" title="werkzeug.contrib.cache.BaseCache.clear"><tt><span>clear()</span></tt></a> will also clear keys with a different prefix.</li></ul></td></tr></tbody></table>

_class_ werkzeug.contrib.cache.GAEMemcachedCache[¶](#werkzeug.contrib.cache.GAEMemcachedCache "永久链接至目标")

This class is deprecated in favour of [MemcachedCache](#werkzeug.contrib.cache.MemcachedCache "werkzeug.contrib.cache.MemcachedCache") which now supports Google Appengine as well.

在 0.8 版更改: Deprecated in favour of [MemcachedCache](#werkzeug.contrib.cache.MemcachedCache "werkzeug.contrib.cache.MemcachedCache").

_class_ werkzeug.contrib.cache.RedisCache(_host='localhost'_, _port=6379_, _password=None_, _db=0_, _default\_timeout=300_, _key\_prefix=None_)[¶](#werkzeug.contrib.cache.RedisCache "永久链接至目标")

Uses the Redis key-value store as a cache backend.

The first argument can be either a string denoting address of the Redis server or an object resembling an instance of a redis.Redis class.

Note: Python Redis API already takes care of encoding unicode strings on the fly.

0.7 新版功能.

0.8 新版功能: key\_prefix was added.

在 0.8 版更改: This cache backend now properly serializes objects.

在 0.8.3 版更改: This cache backend now supports password authentication.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>host</strong> – address of the Redis server or an object which API is compatible with the official Python Redis client (redis-py).</li><li><strong>port</strong> – port number on which Redis server listens for connections.</li><li><strong>password</strong> – password authentication for the Redis server.</li><li><strong>db</strong> – db (zero-based numeric index) on Redis Server to connect.</li><li><strong>default_timeout</strong> – the default timeout that is used if no timeout is specified on <a href="#werkzeug.contrib.cache.BaseCache.set" title="werkzeug.contrib.cache.BaseCache.set"><tt><span>set()</span></tt></a>.</li><li><strong>key_prefix</strong> – A prefix that should be added to all keys.</li></ul></td></tr></tbody></table>

_class_ werkzeug.contrib.cache.FileSystemCache(_cache\_dir_, _threshold=500_, _default\_timeout=300_, _mode=384_)[¶](#werkzeug.contrib.cache.FileSystemCache "永久链接至目标")

A cache that stores the items on the file system. This cache depends on being the only user of the cache\_dir. Make absolutely sure that nobody but this cache stores files there or otherwise the cache will randomly delete files therein.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>cache_dir</strong> – the directory where cache files are stored.</li><li><strong>threshold</strong> – the maximum number of items the cache stores before it starts deleting some.</li><li><strong>default_timeout</strong> – the default timeout that is used if no timeout is specified on <a href="#werkzeug.contrib.cache.BaseCache.set" title="werkzeug.contrib.cache.BaseCache.set"><tt><span>set()</span></tt></a>.</li><li><strong>mode</strong> – the file mode wanted for the cache files, default 0600</li></ul></td></tr></tbody></table>
