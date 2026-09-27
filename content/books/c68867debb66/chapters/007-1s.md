通常一个Tornado web应用包括一个或者多个 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 子类, 一个可以将收到的请求路由到对应handler的 [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 对象,和 一个启动服务的 `main()` 函数.

一个最小的”hello world”例子就像下面这样:

import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

def make\_app():
    return tornado.web.Application(\[
        (r"/", MainHandler),
    \])

if \_\_name\_\_ \== "\_\_main\_\_":
    app \= make\_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()

## `Application` 对象[¶](#application "永久链接至标题")

[`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 对象是负责全局配置的, 包括映射请求转发给处理程序的路由 表.

路由表是 [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") 对象(或元组)的列表, 其中每个都包含(至少)一个正则 表达式和一个处理类. 顺序问题; 第一个匹配的规则会被使用. 如果正则表达 式包含捕获组, 这些组会被作为 _路径参数_ 传递给处理函数的HTTP方法. 如果一个字典作为 [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") 的第三个参数被传递, 它会作为 _初始参数_ 传递给 [`RequestHandler.initialize`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.initialize "tornado.web.RequestHandler.initialize"). 最后 [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") 可能有一个名字 , 这将允许它被 [`RequestHandler.reverse_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.reverse_url "tornado.web.RequestHandler.reverse_url") 使用.

例如, 在这个片段中根URL `/` 映射到了 `MainHandler` , 像 `/story/` 后跟着一个数字这种形式的URL被映射到了 `StoryHandler`. 这个数字被传递(作为字符串)给 `StoryHandler.get`.

class MainHandler(RequestHandler):
    def get(self):
        self.write('<a href="%s">link to story 1</a>' %
                   self.reverse\_url("story", "1"))

class StoryHandler(RequestHandler):
    def initialize(self, db):
        self.db \= db

    def get(self, story\_id):
        self.write("this is story %s" % story\_id)

app \= Application(\[
    url(r"/", MainHandler),
    url(r"/story/(\[0-9\]+)", StoryHandler, dict(db\=db), name\="story")
    \])

[`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 构造函数有很多关键字参数可以用于自定义应用程序的行为 和使用某些特性(或者功能); 完整列表请查看 [`Application.settings`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.settings "tornado.web.Application.settings") .

## 处理输入请求[¶](#id1 "永久链接至标题")

处理请求的程序(request handler)可以使用 `self.request` 访问代表当 前请求的对象. 通过 [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") 的类定义查看完整的属性列表.

使用HTML表单格式请求的数据会被解析并且可以在一些方法中使用, 例如 [`get_query_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_query_argument "tornado.web.RequestHandler.get_query_argument") 和 [`get_body_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_body_argument "tornado.web.RequestHandler.get_body_argument").

class MyFormHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('<html><body><form action="/myform" method="POST">'
                   '<input type="text" name="message">'
                   '<input type="submit" value="Submit">'
                   '</form></body></html>')

    def post(self):
        self.set\_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get\_body\_argument("message"))

由于HTLM表单编码不确定一个标签的参数是单一值还是一个列表, [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 有明确的方法来允许应用程序表明是否它期望接收一个列表. 对于列表, 使用 [`get_query_arguments`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_query_arguments "tornado.web.RequestHandler.get_query_arguments") 和 [`get_body_arguments`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_body_arguments "tornado.web.RequestHandler.get_body_arguments") 而不是它们的单数形式.

通过一个表单上传的文件可以使用 `self.request.files`, 它遍历名字(HTML 标签 `<input type="file">` 的name)到一个文件列表. 每个文件都是一个字典的形式 `{"filename":..., "content_type":..., "body":...}`. `files` 对象是当前唯一的如果文件上传是通过一个表单包装 (i.e. a `multipart/form-data` Content-Type); 如果没用这种格式, 原生上传的数据可以调用 `self.request.body` 使用. 默认上传的文件是完全缓存在内存中的; 如果你需要处理占用内存太大的文件 可以看看 [`stream_request_body`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.stream_request_body "tornado.web.stream_request_body") 类装饰器.

由于HTML表单编码格式的怪异 (e.g. 在单数和复数参数的含糊不清), Tornado 不会试图统一表单参数和其他输入类型的参数. 特别是, 我们不解析JSON请求体. 应用程序希望使用JSON代替表单编码可以复写 [`prepare`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.prepare "tornado.web.RequestHandler.prepare") 来解析它们的请求:

def prepare(self):
    if self.request.headers\["Content-Type"\].startswith("application/json"):
        self.json\_args \= json.loads(self.request.body)
    else:
        self.json\_args \= None

## 复写RequestHandler的方法[¶](#id2 "永久链接至标题")

除了 `get()`/`post()`/等, 在 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 中的某些其他方法 被设计成了在必要的时候让子类重写. 在每个请求中, 会发生下面的调用序 列:

1.  在每次请求时生成一个新的 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 对象
2.  [`initialize()`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.initialize "tornado.web.RequestHandler.initialize") 被 [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 配置中的初始化 参数被调用. `initialize` 通常应该只保存成员变量传递的参数; 它不可能产生任何输出或者调用方法, 例如 [`send_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.send_error "tornado.web.RequestHandler.send_error").
3.  [`prepare()`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.prepare "tornado.web.RequestHandler.prepare") 被调用. 这在你所有处理子类共享的基 类中是最有用的, 无论是使用哪种HTTP方法, `prepare` 都会被调用. `prepare` 可能会产生输出; 如果它调用 [`finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish") (或者 `redirect`, 等), 处理会在这里结束.
4.  其中一种HTTP方法被调用: `get()`, `post()`, `put()`, 等. 如果URL的正则表达式包含捕获组, 它们会被作为参数传递给这个方 法.
5.  当请求结束, [`on_finish()`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.on_finish "tornado.web.RequestHandler.on_finish") 方法被调用. 对于同步 处理程序会在 `get()` (等)后立即返回; 对于异步处理程序,会在调用 [`finish()`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish") 后返回.

所有这样设计被用来复写的方法被记录在了 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 的文档中. 其中最常用的一些被复写的方法包括:

-   [`write_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.write_error "tornado.web.RequestHandler.write_error") - 输出对错误页面使用的HTML.
-   [`on_connection_close`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.on_connection_close "tornado.web.RequestHandler.on_connection_close") - 当客户端断开时被调用; 应用程序可以检测这种情况,并中断后续处理. 注意这不能保证一个关闭 的连接及时被发现.
-   [`get_current_user`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_current_user "tornado.web.RequestHandler.get_current_user") - 参考 [用户认证](https://tornado-zh.readthedocs.io/zh/latest/guide/security.html#user-authentication)
-   [`get_user_locale`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_user_locale "tornado.web.RequestHandler.get_user_locale") - 返回 [`Locale`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#tornado.locale.Locale "tornado.locale.Locale") 对象给当前 用户使用
-   [`set_default_headers`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_default_headers "tornado.web.RequestHandler.set_default_headers") - 可以被用来设置额外的响应 头(例如自定义的 `Server` 头)

## 重定向[¶](#id4 "永久链接至标题")

这里有两种主要的方式让你可以在Tornado中重定向请求: [`RequestHandler.redirect`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.redirect "tornado.web.RequestHandler.redirect") 和使用 [`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler").

你可以在一个 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 的方法中使用 `self.redirect()` 把用 户重定向到其他地方. 还有一个可选参数 `permanent` 你可以使用它来表明这个 重定向被认为是永久的. `permanent` 的默认值是 `False`, 这会生成一个 `302 Found` HTTP响应状态码, 适合类似在用户的 `POST` 请求成功后的重定向. 如果 `permanent` 是true, 会使用 `301 Moved Permanently` HTTP响应, 更适合 e.g. 在SEO友好的方法中把一个页面重定向到一个权威的URL.

[`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler") 让你直接在你 [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 路由表中配置. 例如, 配置一个 静态重定向:

app \= tornado.web.Application(\[
    url(r"/app", tornado.web.RedirectHandler,
        dict(url\="http://itunes.apple.com/my-app-id")),
    \])

[`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler") 也支持正则表达式替换. 下面的规则重定向所有以 `/pictures/` 开始的请求用 `/photos/` 前缀代替:

app \= tornado.web.Application(\[
    url(r"/photos/(.\*)", MyPhotoHandler),
    url(r"/pictures/(.\*)", tornado.web.RedirectHandler,
        dict(url\=r"/photos/\\1")),
    \])

不像 [`RequestHandler.redirect`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.redirect "tornado.web.RequestHandler.redirect"), [`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler") 默认使用永久重定向. 这是因为路由表在运行时不会改变, 而且被认为是永久的. 当在处理程序中发现重定向的时候, 可能是其他可能改变的逻辑的结果. 用 [`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler") 发送临时重定向, 需要添加 `permanent=False` 到 [`RedirectHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RedirectHandler "tornado.web.RedirectHandler") 的初始化参数.

## 异步处理[¶](#id5 "永久链接至标题")

Tornado默认会同步处理: 当 `get()`/`post()` 方法返回, 请求被认为结束 并且返回响应. 因为当一个处理程序正在运行的时候其他所有请求都被阻塞, 任何需要长时间运行的处理都应该是异步的, 这样它就可以在非阻塞的方式中调用 它的慢操作了. 这个话题更详细的内容包含在 [异步和非阻塞I/O](https://tornado-zh.readthedocs.io/zh/latest/guide/async.html) 中; 这部分是关于在 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 子类中的异步技术的细节.

使用 [`coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine") 装饰器是做异步最简单的方式. 这允许你使用 `yield` 关键 字执行非阻塞I/O, 并且直到协程返回才发送响应. 查看 [协程](https://tornado-zh.readthedocs.io/zh/latest/guide/coroutines.html) 了解 更多细节.

在某些情况下, 协程不如回调为主的风格方便, 在这种情况下 [`tornado.web.asynchronous`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.asynchronous "tornado.web.asynchronous") 装饰器可以用来代替. 当使用这个装饰器的时候, 响应不会自动发送; 而请求将一直保持开放直到callback调用 [`RequestHandler.finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish"). 这需要应用程序确保这个方法被调用或者其他用户 的浏览器简单的挂起.

这里是一个使用Tornado’s 内置的 [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 调用FriendFeed API的例 子:

class MainHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):
        http \= tornado.httpclient.AsyncHTTPClient()
        http.fetch("http://friendfeed-api.com/v2/feed/bret",
                   callback\=self.on\_response)

    def on\_response(self, response):
        if response.error: raise tornado.web.HTTPError(500)
        json \= tornado.escape.json\_decode(response.body)
        self.write("Fetched " + str(len(json\["entries"\])) + " entries "
                   "from the FriendFeed API")
        self.finish()

当 `get()` 返回, 请求还没有完成. 当HTTP客户端最终调用 `on_response()`, 这个请求仍然是开放的, 通过调用 `self.finish()`, 响应最终刷到客户端.

为了方便对比, 这里有一个使用协程的相同的例子:

class MainHandler(tornado.web.RequestHandler):
    @tornado.gen.coroutine
    def get(self):
        http \= tornado.httpclient.AsyncHTTPClient()
        response \= yield http.fetch("http://friendfeed-api.com/v2/feed/bret")
        json \= tornado.escape.json\_decode(response.body)
        self.write("Fetched " + str(len(json\["entries"\])) + " entries "
                   "from the FriendFeed API")

更多高级异步的示例, 请看 [chat example application](https://github.com/tornadoweb/tornado/tree/stable/demos/chat), 实现了一个 使用 [长轮询(long polling)](http://en.wikipedia.org/wiki/Push_technology#Long_polling) 的AJAX聊天室. 长轮询的可能想要覆盖 `on_connection_close()` 来在客户端关闭连接之后进行清 理(注意看方法的文档来查看警告).
