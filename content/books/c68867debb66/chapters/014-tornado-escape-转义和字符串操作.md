HTML, JSON, URLs, 和其他(格式)的转义/非转义方法.

也包含一些其他的各种字符串操作函数.

## 转义函数[¶](#id1 "永久链接至标题")

`tornado.escape.``xhtml_escape`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#xhtml_escape)[¶](#tornado.escape.xhtml_escape "永久链接至目标")

转义一个字符串使它在HTML 或XML 中有效.

转义这些字符 `<`, `>`, `"`, `'`, 和 `&`. 当属性值使用转义字符串必须用引号括起来.

在 3.2 版更改: 添加了单引号到转义字符串列表.

`tornado.escape.``xhtml_unescape`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#xhtml_unescape)[¶](#tornado.escape.xhtml_unescape "永久链接至目标")

反转义一个已经XML转义过的字符串.

`tornado.escape.``url_escape`(_value_, _plus=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#url_escape)[¶](#tornado.escape.url_escape "永久链接至目标")

返回一个给定值的URL 编码版本.

如果 `plus` 为true (默认值), 空格将被表示为”+”而不是”%20”. 这是适当的为查询字符串, 但不是一个URL路径组件. 注意此默认设置 和Python的urllib 模块是相反的.

3.1 新版功能: 该 `plus` 参数

`tornado.escape.``url_unescape`(_value_, _encoding='utf-8'_, _plus=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#url_unescape)[¶](#tornado.escape.url_unescape "永久链接至目标")

解码来自于URL 的给定值.

该参数可以是一个字节或unicode 字符串.

如果encoding 是None , 该结果将会是一个字节串. 否则, 该结果会是 指定编码的unicode 字符串.

如果 `plus` 是true (默认值), 加号将被解释为空格(文字加号必须被 表示为”%2B”). 这是适用于查询字符串和form-encoded 的值, 但不是URL 的路径组件. 注意该默认设置和Python 的urllib 模块是相反的.

3.1 新版功能: 该 `plus` 参数

`tornado.escape.``json_encode`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#json_encode)[¶](#tornado.escape.json_encode "永久链接至目标")

将给定的Python 对象进行JSON 编码.

`tornado.escape.``json_decode`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#json_decode)[¶](#tornado.escape.json_decode "永久链接至目标")

返回给定JSON 字符串的Python 对象.

## Byte/unicode 转换[¶](#byte-unicode "永久链接至标题")

这些函数在Tornado自身中被广泛使用, 但不应该被大多数应用程序直接 需要. 值得注意的是,许多这些功能的复杂性来源于这样一个事实: Tornado 同时支持Python 2 和Python 3.

`tornado.escape.``utf8`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#utf8)[¶](#tornado.escape.utf8 "永久链接至目标")

将字符串参数转换为字节字符串.

如果该参数已经是一个字节字符串或None, 则原样返回. 否则它必须是一个unicode 字符串并且被编码成utf8.

`tornado.escape.``to_unicode`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#to_unicode)[¶](#tornado.escape.to_unicode "永久链接至目标")

将字符串参数转换为unicode 字符串.

如果该参数已经是一个unicode 字符串或None, 则原样返回. 否则它必须是一个字节字符串并且被解码成utf8.

`tornado.escape.``native_str`()[¶](#tornado.escape.native_str "永久链接至目标")

转换一个byte 或unicode 字符串到 [`str`](https://docs.python.org/3.4/library/stdtypes.html#str "(在 Python v3.4)") 类型. 等价于 Python 2的 [`utf8`](#tornado.escape.utf8 "tornado.escape.utf8") 和Python 3的 [`to_unicode`](#tornado.escape.to_unicode "tornado.escape.to_unicode") .

`tornado.escape.``to_basestring`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#to_basestring)[¶](#tornado.escape.to_basestring "永久链接至目标")

将字符串参数转换为basestring 的子类.

在python2 中, 字节字符串和unicode 字符串几乎是可以互换的, 所以函数处理一个用户提供的参数与ascii 字符串常量相结合, 可以使用和应该返回用户提供的类型. 在python3 中, 这两个类型 不可以互换, 所以这个方法必须转换字节字符串为unicode 字符串.

`tornado.escape.``recursive_unicode`(_obj_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#recursive_unicode)[¶](#tornado.escape.recursive_unicode "永久链接至目标")

伴随一个简单的数据结构, 转换字节字符串为unicode 字符串.

支持列表, 元组, 和字典.

## 其他函数[¶](#id2 "永久链接至标题")

`tornado.escape.``linkify`(_text, shorten=False, extra\_params='', require\_protocol=False, permitted\_protocols=\['http', 'https'\]_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#linkify)[¶](#tornado.escape.linkify "永久链接至目标")

转换纯文本为带有链接的HTML.

例如: `linkify("Hello http://tornadoweb.org!")` 将返回 `Hello <a href="http://tornadoweb.org">http://tornadoweb.org</a>!`

参数:

-   `shorten`: 长url 将被缩短展示.
    
-   `extra_params`: 额外的文本中的链接标签, 或一个可调用的
    
    带有该链接作为一个参数并返回该额外的文本. e.g. `linkify(text, extra_params='rel="nofollow" class="external"')`, 或:
    
    def extra\_params\_cb(url):
        if url.startswith("http://example.com"):
            return 'class="internal"'
        else:
            return 'class="external" rel="nofollow"'
    linkify(text, extra\_params\=extra\_params\_cb)
    
-   `require_protocol`: 只有链接url 包括一个协议. 如果这是False,
    
    例如www.facebook.com 这样的url 也将被linkified.
    
-   `permitted_protocols`: 协议的列表(或集合)应该被linkified,
    
    e.g. `linkify(text, permitted_protocols=["http", "ftp", "mailto"])`. 这是非常不安全的, 包括协议, 比如 `javascript`.
    

`tornado.escape.``squeeze`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/escape.html#squeeze)[¶](#tornado.escape.squeeze "永久链接至目标")

使用单个空格代替所有空格字符组成的序列.
