## 问题

如何在代码中得到客户端信息？比如：来源页面(referring page)或是客户端浏览器类型

## 解法

使用web.ctx即可。首先讲一点架构的东西：web.ctx基于threadeddict类，又被叫做ThreadDict。这个类创建了一个类似字典(dictionary-like)的对象，对象中的值都是与线程id相对应的。这样做很妙,因为很多用户同时访问系统时，这个字典对象能做到仅为某一特定的HTTP请求提供数据(因为没有数据共享，所以对象是线程安全的)

web.ctx保存每个HTTP请求的特定信息，比如客户端环境变量。假设，我们想知道正在访问某页面的用户是从哪个网页跳转而来的：

## 例子

```
class example:
    def GET(self):
        referer = web.ctx.env.get('HTTP_REFERER', 'http://google.com')
        raise web.seeother(referer)
```

上述代码用web.ctx.env获取HTTP\_REFERER的值。如果HTTP＿REFERER不存在，就会将google.com做为默认值。接下来，用户就会被重定向回到之前的来源页面。

web.ctx另一个特性，是它可以被loadhook赋值。例如：当一个请求被处理时，会话(Session)就会被设置并保存在web.ctx中。由于web.ctx是线程安全的，所以我们可以象使用普通的python对象一样，来操作会话(Session)。

## ‘ctx’中的数据成员

### Request

-   `environ` 又被写做. `env` – 包含标准WSGI环境变量的字典。
-   `home` – 应用的http根路径(译注：可以理解为应用的起始网址，协议＋站点域名＋应用所在路径)例：_http://example.org/admin_
-   `homedomain` – 应用所在站点(可以理解为协议＋域名) _http://example.org_
-   `homepath` – 当前应用所在的路径，例如： _/admin_
-   `host` – 主机名（域名）＋用户请求的端口（如果没有的话，就是默认的80端口），例如： _example.org_, _example.org:8080_
-   `ip` – 用户的IP地址，例如： _xxx.xxx.xxx.xxx_
-   `method` – 所用的HTTP方法，例如： _GET_
-   `path` – 用户请求路径，它是基于当前应用的相对路径。在子应用中，匹配外部应用的那部分网址将被去掉。例如：主应用在`code.py`中，而子应用在`admin.py`中。在`code.py`中, 我们将`/admin`关联到`admin.app`。 在`admin.py`中, 将`/stories`关联到`stories`类。在 `stories`中, `web.ctx.path`就是`/stories`, 而非`/admin/stories`。形如： _/articles/845_
-   `protocol` – 所用协议，例如： _https_
-   `query` – 跟在’？’字符后面的查询字符串。如果不存在查询参数，它就是一个空字符串。例如： _?fourlegs=good&twolegs=bad_
-   `fullpath` 可以视为 `path + query` – 包含查询参数的请求路径，但不包括’homepath’。例如：_/articles/845?fourlegs=good&twolegs=bad_

### Response

-   `status` – HTTP状态码（默认是’200 OK’) _401 Unauthorized 未经授权_
-   `headers` – 包含HTTP头信息(headers)的二元组列表。
-   `output` – 包含响应实体的字符串。
