-   [Laruence 项目手册](https://www.laruence.com/manual/laruence-php-manual.html)
    -   [Yaf](https://www.laruence.com/manual/book.yaf.html) — 超高性能PHP框架
    -   [Yar](https://www.laruence.com/manual/book.yar.html) — 高性能并发RPC框架
    -   [Yaconf](https://www.laruence.com/manual/book.yaconf.html) — 常驻内存的INI配置容器
    -   [Yac](https://www.laruence.com/manual/book.yac.html) — 无锁共享内存缓存
    -   [Taint](https://www.laruence.com/manual/book.taint.html) — XSS与注入漏洞检测器

这套手册收录了我自己的五个项目，我参与维护的项目不包括在内。Yaf 是我的第一个项目，2010 年前后我在百度，公司内部的 PHP 框架很多，有的为了性能不得不舍弃标准，有的为了标准不得不舍弃性能，于是我用 C 写了 Yaf 来统一它们——当时在百度内部叫 AP 框架，后来因为正在研究 yacc/flex，就借这个词把名字改成了 Yaf。Yar 是我写的第二个扩展，2012年的时候吧，那时我在新浪微博负责性能优化：一个微博首页可能要顺序请求上百个接口，非常耗时；把微博整体改写到 Yaf 之上后，我写了 Yar，靠并行调用把上百个接口的耗时从依次累加压缩到最慢那一个接口的耗时。同一时期微博还有一个白名单接口，维护着几百万个词、需要实时更新，每次都要请求，于是我又配套写了 Yar-c，为 PHP 提供一个极其高效的 Yar协议的C 服务来完成白名单查询。Yaconf 也出自微博时期，项目最初叫做Weibo\_Conf：微博有大量配置，之前用 PHP数组、YAML 保存管理，虽然用了一些缓存技术，但管理起来非常复杂、运维难度也很高，通过Yaconf把所有配置统一成INI格式，部署在 Root 目录下、Web 用户无权访问，也增加了安全性。微博大量使用 memcached 来做本机缓存，用Redis做集群缓存，针对微博的应用特点写了 Yac，无锁设计，替换Memcached来做本机缓存，带来一个量级的缓存性能提升。此外我还写了 Taint，在运行时检测 XSS 与注入漏洞，它是我写过最复杂的一个扩展。
