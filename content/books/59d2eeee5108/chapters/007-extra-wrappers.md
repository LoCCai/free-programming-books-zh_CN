Extra wrappers or mixins contributed by the community. These wrappers can be mixed in into request objects to add extra functionality.

Example:

from werkzeug.wrappers import Request as RequestBase
from werkzeug.contrib.wrappers import JSONRequestMixin

class Request(RequestBase, JSONRequestMixin):
    pass

Afterwards this request object provides the extra functionality of the [JSONRequestMixin](#werkzeug.contrib.wrappers.JSONRequestMixin "werkzeug.contrib.wrappers.JSONRequestMixin").

_class_ werkzeug.contrib.wrappers.JSONRequestMixin[¶](#werkzeug.contrib.wrappers.JSONRequestMixin "永久链接至目标")

Add json method to a request object. This will parse the input data through simplejson if possible.

[BadRequest](https://werkzeug-docs-cn.readthedocs.io/zh-cn/latest/exceptions.html#werkzeug.exceptions.BadRequest "werkzeug.exceptions.BadRequest") will be raised if the content-type is not json or if the data itself cannot be parsed as json.

json[¶](#werkzeug.contrib.wrappers.JSONRequestMixin.json "永久链接至目标")

Get the result of simplejson.loads if possible.

_class_ werkzeug.contrib.wrappers.ProtobufRequestMixin[¶](#werkzeug.contrib.wrappers.ProtobufRequestMixin "永久链接至目标")

Add protobuf parsing method to a request object. This will parse the input data through [protobuf](http://code.google.com/p/protobuf/) if possible.

[BadRequest](https://werkzeug-docs-cn.readthedocs.io/zh-cn/latest/exceptions.html#werkzeug.exceptions.BadRequest "werkzeug.exceptions.BadRequest") will be raised if the content-type is not protobuf or if the data itself cannot be parsed property.

parse\_protobuf(_proto\_type_)[¶](#werkzeug.contrib.wrappers.ProtobufRequestMixin.parse_protobuf "永久链接至目标")

Parse the data into an instance of proto\_type.

protobuf\_check\_initialization _= True_[¶](#werkzeug.contrib.wrappers.ProtobufRequestMixin.protobuf_check_initialization "永久链接至目标")

by default the [ProtobufRequestMixin](#werkzeug.contrib.wrappers.ProtobufRequestMixin "werkzeug.contrib.wrappers.ProtobufRequestMixin") will raise a [BadRequest](https://werkzeug-docs-cn.readthedocs.io/zh-cn/latest/exceptions.html#werkzeug.exceptions.BadRequest "werkzeug.exceptions.BadRequest") if the object is not initialized. You can bypass that check by setting this attribute to False.

_class_ werkzeug.contrib.wrappers.RoutingArgsRequestMixin[¶](#werkzeug.contrib.wrappers.RoutingArgsRequestMixin "永久链接至目标")

This request mixin adds support for the wsgiorg routing args [specification](http://www.wsgi.org/wsgi/Specifications/routing_args).

routing\_args[¶](#werkzeug.contrib.wrappers.RoutingArgsRequestMixin.routing_args "永久链接至目标")

The positional URL arguments as tuple.

routing\_vars[¶](#werkzeug.contrib.wrappers.RoutingArgsRequestMixin.routing_vars "永久链接至目标")

The keyword URL arguments as dict.

_class_ werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin[¶](#werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin "永久链接至目标")

This mixin reverses the trailing slash behavior of [script\_root](#werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.script_root "werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.script_root") and [path](#werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.path "werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.path"). This makes it possible to use urljoin() directly on the paths.

Because it changes the behavior or Request this class has to be mixed in _before_ the actual request class:

class MyRequest(ReverseSlashBehaviorRequestMixin, Request):
    pass

This example shows the differences (for an application mounted on /application and the request going to /application/foo/bar):

>   
> |   | normal behavior | reverse behavior |
> | --- | --- | --- |
> | script\_root | /application | /application/ |
> | path | /foo/bar | foo/bar |

path[¶](#werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.path "永久链接至目标")

Requested path as unicode. This works a bit like the regular path info in the WSGI environment but will not include a leading slash.

script\_root[¶](#werkzeug.contrib.wrappers.ReverseSlashBehaviorRequestMixin.script_root "永久链接至目标")

The root path of the script includling a trailing slash.

_class_ werkzeug.contrib.wrappers.DynamicCharsetRequestMixin[¶](#werkzeug.contrib.wrappers.DynamicCharsetRequestMixin "永久链接至目标")

“If this mixin is mixed into a request class it will provide a dynamic charset attribute. This means that if the charset is transmitted in the content type headers it’s used from there.

Because it changes the behavior or Request this class has to be mixed in _before_ the actual request class:

class MyRequest(DynamicCharsetRequestMixin, Request):
    pass

By default the request object assumes that the URL charset is the same as the data charset. If the charset varies on each request based on the transmitted data it’s not a good idea to let the URLs change based on that. Most browsers assume either utf-8 or latin1 for the URLs if they have troubles figuring out. It’s strongly recommended to set the URL charset to utf-8:

class MyRequest(DynamicCharsetRequestMixin, Request):
    url\_charset \= 'utf-8'

0.6 新版功能.

charset[¶](#werkzeug.contrib.wrappers.DynamicCharsetRequestMixin.charset "永久链接至目标")

The charset from the content type.

default\_charset _= 'latin1'_[¶](#werkzeug.contrib.wrappers.DynamicCharsetRequestMixin.default_charset "永久链接至目标")

the default charset that is assumed if the content type header is missing or does not contain a charset parameter. The default is latin1 which is what HTTP specifies as default charset. You may however want to set this to utf-8 to better support browsers that do not transmit a charset for incoming data.

unknown\_charset(_charset_)[¶](#werkzeug.contrib.wrappers.DynamicCharsetRequestMixin.unknown_charset "永久链接至目标")

Called if a charset was provided but is not supported by the Python codecs module. By default latin1 is assumed then to not lose any information, you may override this method to change the behavior.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>charset</strong> – the charset that was not found.</td></tr><tr><th>返回:</th><td>the replacement charset.</td></tr></tbody></table>

_class_ werkzeug.contrib.wrappers.DynamicCharsetResponseMixin[¶](#werkzeug.contrib.wrappers.DynamicCharsetResponseMixin "永久链接至目标")

If this mixin is mixed into a response class it will provide a dynamic charset attribute. This means that if the charset is looked up and stored in the Content-Type header and updates itself automatically. This also means a small performance hit but can be useful if you’re working with different charsets on responses.

Because the charset attribute is no a property at class-level, the default value is stored in default\_charset.

Because it changes the behavior or Response this class has to be mixed in _before_ the actual response class:

class MyResponse(DynamicCharsetResponseMixin, Response):
    pass

0.6 新版功能.

charset[¶](#werkzeug.contrib.wrappers.DynamicCharsetResponseMixin.charset "永久链接至目标")

The charset for the response. It’s stored inside the Content-Type header as a parameter.

default\_charset _= 'utf-8'_[¶](#werkzeug.contrib.wrappers.DynamicCharsetResponseMixin.default_charset "永久链接至目标")

the default charset.
