**`crossorigin`** 属性在 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)、[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 元素中有效，它们提供对 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS) 的支持，定义该元素如何处理跨源请求，从而实现对该元素获取数据的 CORS 请求的配置。根据元素的不同，该属性可以是一个 CORS 设置属性。

在媒体元素上所使用的 `crossorigin` 内容属性为 CORS 设置属性。

这些属性是[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)的，并具有以下可能的值：

[`anonymous`](#anonymous)

请求使用了 CORS 标头，且证书标志被设置为 `'same-origin'`。没有通过 cookies、客户端 SSL 证书或 HTTP 认证交换**用户凭据**，除非目的地是同一来源。

[`use-credentials`](#use-credentials)

请求使用了 CORS 标头，且证书标志被设置为 `'include'`。总是包含**用户凭据**。

[`""`](#sect)

将属性名称设置为空值，如 `crossorigin` 或 `crossorigin=""`，与设置为 `anonymous` 的效果一样。

不合法的关键字或空字符串会视为 `anonymous` 关键字。

默认情况下（即未指定该属性时），CORS 根本不会使用。用户代理不会要求对资源进行完全访问的许可，在跨源请求的情况下，将根据相关元素的类型进行某些限制：

**备注：**在 Firefox 83 版本之前，`rel="icon"` 元素不支持 `crossorigin` 属性。也有一个 [Chrome 的未解决的议题](https://bugs.chromium.org/p/chromium/issues/detail?id=1121645 "外部链接（在新标签页中打开）")。

### [示例：使用 `crossorigin` 的 `<script>` 元素](#示例：使用_crossorigin_的_script_元素)

你可以使用下面的 [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script) 元素告诉浏览器执行来自 `https://example.com/example-framework.js` 的脚本且不发送用户凭据。

html

```
<script
  src="https://example.com/example-framework.js"
  crossorigin="anonymous"></script>
```

### [示例：带有用户凭据的 Web 清单](#示例：带有用户凭据的_web_清单)

在获取需要用户凭据的[清单](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Manifest)时，即使是同源的情况，属性值也必须设置为 `use-credentials`。

html

```
<link rel="manifest" href="/app.webmanifest" crossorigin="use-credentials" />
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# cors-settings-attributes](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.audio.crossorigin](#html.elements.audio.crossorigin)

### [html.elements.img.crossorigin](#html.elements.img.crossorigin)

### [html.elements.link.crossorigin](#html.elements.link.crossorigin)

### [html.elements.script.crossorigin](#html.elements.script.crossorigin)

### [html.elements.video.crossorigin](#html.elements.video.crossorigin)

## [参见](#参见)

-   [跨源资源共享（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)
-   [HTML 属性：`rel`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/crossorigin/contributors.txt)更新。
