基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<body>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示 HTML 文档的内容。文档中只能有一个 `<body>` 元素。

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)、事件属性和弃用属性：

### [事件属性](#事件属性)

**备注：**以下每个事件属性名称都链接到其对应的 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 接口事件。你可以使用 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 来监听这些事件，而不是将 `oneventname` 属性添加到 `<body>` 元素。

[`onafterprint`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/afterprint_event)

当用户打印文档后调用的函数。

[`onbeforeprint`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeprint_event)

当用户要求打印文档时调用的函数。

[`onbeforeunload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event)

当文档即将卸载时调用的函数。

[`onblur`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/blur_event)

当文档失去焦点时调用的函数。

[`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/error_event)

当文档无法正常加载时调用的函数。

[`onfocus`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/focus_event)

当文档收到焦点时调用的函数。

[`onhashchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event)

当文档当前地址的片段标识符部分（以 `'#'` 字符开头）发生变化时调用的函数。

[`onlanguagechange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/languagechange_event)

当首选语言发生变化时调用的函数。

[`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event)

当文档加载完成后调用的函数。

[`onmessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/message_event)

当文档收到消息时调用的函数。

[`onmessageerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/messageerror_event)

当文档收到无法反序列化的消息时调用的函数。

[`onoffline`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/offline_event)

当网络通信失败时调用的函数。

[`ononline`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/online_event)

当网络通信恢复后调用的函数。

[`onpageswap`](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageswap_event)

当你浏览文档时，上一个文档即将卸载时调用的函数。

[`onpagehide`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pagehide_event)

当浏览器在显示会话历史记录中的另一个页面时隐藏当前页面时调用的函数。

[`onpagereveal`](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagereveal_event)

当文档首次渲染时调用的函数，无论是从网络加载新文档还是激活文档。

[`onpageshow`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pageshow_event)

当浏览器因导航而显示窗口文档时调用的函数。

[`onpopstate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)

当用户浏览会话历史时调用的函数。

[`onresize`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resize_event)

当文档大小调整时调用的函数。

[`onrejectionhandled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/rejectionhandled_event)

当 JavaScript [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 被延迟处理时调用的函数。

[`onstorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/storage_event)

当存储区域发生变化时调用的函数。

[`onunhandledrejection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event)

当一个没有拒绝处理器的 JavaScript [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 被拒绝时调用的函数。

[`onunload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unload_event)

当文档即将被卸载时调用的函数。

### [已弃用的属性](#已弃用的属性)

**警告：**请勿使用这些已弃用的属性；应选择每个弃用属性所列的 CSS 替代方案。

[`alink`](#alink)

选中时超链接文本的颜色。请结合使用 CSS [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性，配合 [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:active) 和 [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:focus) 伪类。

[`background`](#background)

用作背景的图片的 URI。请改用 CSS 的 [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-image) 属性。

[`bgcolor`](#bgcolor)

文档的背景颜色。请改用 CSS 的 [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color) 属性。

[`bottommargin`](#bottommargin)

body 底部的外边距。请改用 CSS 的 [`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-bottom) 属性（或逻辑属性 [`margin-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-block-end)）。

[`leftmargin`](#leftmargin)

body 左侧的外边距。请改用 CSS 的 [`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-left) 属性（或逻辑属性 [`margin-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-inline-start)）。

[`link`](#link)

未访问超文本链接文本的颜色。请结合使用 CSS [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性和 [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:link) 伪类来代替。

[`rightmargin`](#rightmargin)

body 右侧的外边距。请结合使用 CSS [`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-right) 属性（或逻辑属性 [`margin-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-inline-end)）。

[`text`](#text)

文字的前景色。请改用 CSS 的 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性。

[`topmargin`](#topmargin)

body 顶部的外边距。请结合使用 CSS [`margin-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-top) 属性（或逻辑属性 [`margin-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-block-start)）。

[`vlink`](#vlink)

已访问超文本链接文本的颜色。请结合使用 CSS [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性和 [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:visited) 伪类来代替。

## [示例](#示例)

html

```
<html lang="zh-CN">
  <head>
    <title>文档标题</title>
  </head>
  <body>
    <p>
      <code>&lt;body&gt;</code> HTML 元素代表 HTML
      文档的内容。一个文档中只能有一个 <code>&lt;body&gt;</code> 元素。
    </p>
  </body>
</html>
```

### [结果](#结果)

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>如果开始标签内的第一个内容不是空格符、注释、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script"><code>&lt;script&gt;</code></a> 元素或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style"><code>&lt;style&gt;</code></a> 元素，则可以省略起始标签。如果 <code>&lt;body&gt;</code> 元素有内容或有开始标记，且后面没有紧跟注释，则可以省略结束标记。</td></tr><tr><th scope="row">允许的父元素</th><td>它必须是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html"><code>&lt;html&gt;</code></a> 元素的第二个元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role">generic</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLBodyElement"><code>HTMLBodyElement</code></a><ul><li><code>&lt;body&gt;</code> 元素使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLBodyElement"><code>HTMLBodyElement</code></a> 接口。</li><li>你可以通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/body"><code>document.body</code></a> 属性访问 <code>&lt;body&gt;</code> 元素。</li></ul></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-body-element](https://html.spec.whatwg.org/multipage/sections.html#the-body-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<html>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html)
-   [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head)
-   [事件处理器（概述）](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Events)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body/contributors.txt)更新。
