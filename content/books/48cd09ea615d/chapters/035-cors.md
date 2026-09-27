## 跨源资源共享

**跨源资源共享**（Cross-Origin Resource Sharing，CORS）是一个由一系列传输的 [HTTP 标头](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP_header)组成的系统。这些 HTTP 标头决定浏览器是否阻止前端 JavaScript 代码获取跨源请求的响应。

[同源安全策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Defenses/Same-origin_policy)默认阻止“跨源”获取资源。但是 CORS 给了 Web 服务器这样的权限，即服务器可以选择允许跨源请求访问到它们的资源。

## [CORS 标头](#cors_标头)

[`Access-Control-Allow-Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin)

指示响应的资源是否可以被给定的来源共享。

[`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials)

指示当请求的凭据标记为 true 时，是否可以暴露对该请求的响应给脚本。

[`Access-Control-Allow-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers)

用在对预检请求的响应中，指示实际的请求中可以使用哪些 HTTP 标头。

[`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Methods)

指定对预检请求的响应中，哪些 HTTP 方法允许访问请求的资源。

[`Access-Control-Expose-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers)

通过列出标头的名称，指示响应中的哪些标头可以暴露给脚本。

[`Access-Control-Max-Age`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age)

指示预检请求的结果能被缓存多久。

[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Headers)

用于发起一个预检请求，告知服务器正式请求会使用哪些 HTTP 标头。

[`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Access-Control-Request-Method)

用于发起一个预检请求，告知服务器正式请求会使用哪一种 [HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Methods)。

[`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Origin)

指示获取资源的请求是从什么源发起的。

[`Timing-Allow-Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Timing-Allow-Origin)

指定允许查看通过[资源时间 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API/Resource_timing) 获取的属性值的来源，否则由于跨源限制，这些属性值会被报告为零。

## [参见](#参见)

-   [跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)
-   维基百科上的[跨源资源共享](https://zh.wikipedia.org/wiki/跨來源資源共享 "外部链接（在新标签页中打开）")
-   [Fetch 规范](https://fetch.spec.whatwg.org "外部链接（在新标签页中打开）")

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年12月2日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS/contributors.txt)更新。
