基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<meta>`** 元素表示那些不能由其他 HTML 元相关（meta-related）元素表示的[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)信息。如：[`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)、[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style) 或 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)。

<table><tbody><tr><th><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>。如果 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/itemprop"><code>itemprop</code></a> 属性存在：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%88%86%E6%AE%B5%E5%86%85%E5%AE%B9">分段内容</a></td></tr><tr><th>允许的内容</th><td>无；这是一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">空元素</a>。</td></tr><tr><th>标签省略</th><td>由于这是一个空元素，所以必须有开始标签并且不能有结束标签。</td></tr><tr><th>允许的父元素</th><td><ul><li><code>&lt;meta charset&gt;</code>、<code>&lt;meta http-equiv&gt;</code>：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素。如果 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta#http-equiv" aria-current="page"><code>http-equiv</code></a> 不是编码声明，它也可以放在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript"><code>&lt;noscript&gt;</code></a> 元素中，它本身在一个 <code>&lt;head&gt;</code> 元素内部。</li><li><code>&lt;meta name&gt;</code>：任何可以接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>的元素。</li><li><code>&lt;meta itemprop&gt;</code>：任何可以接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>或<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。</li></ul></td></tr><tr><th scope="row">默认的无障碍角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有相应的角色</a></td></tr><tr><th scope="row">允许的无障碍角色</th><td>没有允许的<code>角色（role）</code></td></tr><tr><th>DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMetaElement"><code>HTMLMetaElement</code></a></td></tr></tbody></table>

`<meta>` 元素定义的元数据的类型包括以下几种：

-   如果设置了 [`name`](#name) 属性，`<meta>` 元素提供的是文档级别（_document-level_）的元数据，应用于整个页面。
-   如果设置了 [`http-equiv`](#http-equiv) 属性，`<meta>` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
-   如果设置了 [`charset`](#charset) 属性，`<meta>` 元素是一个字符集声明，告诉文档使用哪种字符编码。
-   如果设置了 [`itemprop`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#itemprop) 属性，`<meta>` 元素提供用户定义的元数据。

## [属性](#属性)

此元素包括[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

**备注：**[`name`](#name) 属性在 `<meta>` 元素中具有特殊的语义；另外，当一个 `<meta>` 标签中，有 [`name`](#name)、[`http-equiv`](#http-equiv) 或者 [`charset`](#charset) 三者中任何一个属性时，[`itemprop`](#itemprop) 属性不能被使用。

[`charset`](#charset)

该属性声明了文档的字符编码。如果存在该属性，则其值必须是字符串 `"utf-8"` 的不区分 ASCII 大小写的匹配，因为 UTF-8 是 HTML5 文档的唯一有效编码。声明字符编码的 `<meta>` 元素必须完全位于文档的前 1024 个字节内。

[`content`](#content)

此属性包含 [`http-equiv`](#http-equiv) 或 [`name`](#name) 属性的值，具体取决于所使用的值。

[`http-equiv`](#http-equiv)

属性定义了一个编译指示指令。这个属性叫做 `http-equiv(alent)` 是因为所有允许的值都是特定 HTTP 标头的名称，如下：

-   `content-security-policy` 允许页面作者定义当前页面的[内容策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)。内容策略常用来指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。
    
-   `content-type` 声明 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types)和文档的字符编码。如果使用 `content-type` 属性，与之在同一个 `<meta>` 元素中使用的 [`content`](#content) 属性的值必须是 `"text/html; charset=utf-8"`。这相当于一个具有指定 `charset` 属性的 `<meta>` 元素，并对其在文档中的放置位置有相同的限制。**注意**：该属性只能用于 MIME 类型为 `text/html` 的文档，不能用于 MIME 类型为 XML 的文档。
    
-   `default-style`
    
    设置默认 [CSS 样式表](https://developer.mozilla.org/zh-CN/docs/Web/CSS)组的名称。
    
-   `x-ua-compatible` 如果指定，则 `content` 属性必须具有值 `"IE=edge"`。用户代理必须忽略此指示。
    
-   `refresh` 这个属性指定：
    
    -   页面重新加载的秒数——仅当 [`content`](#content) 属性包含非负整数时。
    -   页面重定向到指定链接的秒数——仅当 content 属性包含非负整数后跟字符串“`;url=`”和有效的 URL 时。

[`name`](#name)

`name` 和 `content` 属性可以一起使用，以名 - 值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。 在[标准元数据名称](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name)中查看 HTML 规范等规范中定义的标准元数据名称。

## [示例](#示例)

html

```
<meta charset="utf-8" />

<!-- Redirect page after 3 seconds -->
<meta http-equiv="refresh" content="3;url=https://www.mozilla.org" />
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-meta-element](https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [标准元数据名称](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name)
-   [学习：`<meta>`](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata#%E5%85%83%E6%95%B0%E6%8D%AE%EF%BC%9Ameta_%E5%85%83%E7%B4%A0)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/contributors.txt)更新。
