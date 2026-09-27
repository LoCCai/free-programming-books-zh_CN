基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<head>`** 元素包含机器可读的文档相关信息（[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)），如文档的[标题](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)、[脚本](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)和[样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style)。

**备注：**`<head>` 主要保存供机器处理的信息，而非人类可读信息。对于人类可见的信息，如顶级标题和列出的作者，请参见 [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header) 元素。

## [属性](#属性)

该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`profile`](#profile)

由[空白字符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace)分隔的一个或多个元数据配置文件的 [URI](https://developer.mozilla.org/zh-CN/docs/Glossary/URI)。

## [示例](#示例)

html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>文档标题</title>
  </head>
</html>
```

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无</td></tr><tr><th scope="row">允许的内容</th><td><p>如果文档是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe"><code>&lt;iframe&gt;</code></a> <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe#srcdoc"><code>srcdoc</code></a> 文档，或者标题信息可从更高级别的协议（如 HTML 电子邮件中的主题行）中获得，则允许包含零个或多个元数据内容元素。</p><p>否则，可包含一个或多个元数据内容元素，其中 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title"><code>&lt;title&gt;</code></a> 元素恰好有一个。</p></td></tr><tr><th scope="row">标签省略</th><td>如果 <code>&lt;head&gt;</code> 元素内的第一个内容是一个元素，则可以省略开始标记。<br>如果 <code>&lt;head&gt;</code> 元素后的第一个内容不是空格符或注释，则可以省略结束标记。</td></tr><tr><th scope="row">允许的父元素</th><td>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html"><code>&lt;html&gt;</code></a> 元素，作为它的第一个子元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有相应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLHeadElement"><code>HTMLHeadElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-head-element](https://html.spec.whatwg.org/multipage/semantics.html#the-head-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   可用于 `<head>` 内部的元素：
    -   [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)
    -   [`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base)
    -   [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)
    -   [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style)
    -   [`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta)
    -   [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
    -   [`<noscript>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript)
    -   [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head/contributors.txt)更新。
