基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 的 **`<style>`** 元素包含文档的样式信息或文档的部分内容。其中的 CSS 会应用于包含 `<style>` 元素的文档内容。

## [尝试一下](#尝试一下)

```
<style>
  p {
    color: #26b72b;
  }
  code {
    font-weight: bold;
  }
</style>

<p>
  This text will be green. Inline styles take precedence over CSS included
  externally.
</p>

<p style="color: blue">
  The <code>style</code> attribute can override it, though.
</p>
```

```
p {
  color: #f00;
}
```

`<style>` 元素必须包含在文档的 [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head) 内。一般来说，最好将样式放在外部样式表中，然后使用 [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link) 元素应用它们。

如果在文档中包含多个 `<style>` 和 `<link>` 元素，它们将按照在文档中包含的顺序应用到 DOM，请确保按照正确的顺序包含它们，以避免出现意想不到的层叠问题。

与 `<link>` 元素的方式相同，`<style>` 元素可以包含用于[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Media_queries)的 `media` 属性，这样就可以根据视口宽度等媒体特性，有选择性地将内部样式表应用到文档中。

## [属性](#属性)

该元素包含所有[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`blocking`](#blocking)

该属性明确指出在获取关键子资源时应阻止某些操作。通常，[`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@import) 样式表被视为关键子资源，而 [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-image) 和字体则不被视为关键子资源。要阻止的操作必须是下面列出的以空格分隔的阻止标记列表。

-   `render`：屏幕上的内容渲染被阻断。

[`media`](#media)

该属性规定该样式适用于哪个媒体。属性的取值为[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Media_queries/Using)，如果属性缺失，则默认为 `all`。

[`nonce`](#nonce)

用于允许在 [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src) 中使用内联样式的密码学 nonce（只使用一次的数字）。每次传输策略时，服务器都必须生成一个唯一的 nonce 值。提供一个无法猜测的 nonce 值至关重要，否则绕过资源策略将变得微不足道。

[`title`](#title)

该属性指定[替代样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/alternate_stylesheet)集。

### [已弃用的属性](#已弃用的属性)

[`type`](#type)

不应提供该属性：如果提供，唯一允许的值是空字符串或不区分大小写匹配的 `text/css`。

## [示例](#示例)

### [基础样式表](#基础样式表)

在下面的例子中，我们将简短的样式应用到文档中：

html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>测试页面</title>
    <style>
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>这是一个段落。</p>
  </body>
</html>
```

### [多个样式元素](#多个样式元素)

在本例中，我们包含了两个 `<style>` 元素。请注意，如果后一个 `<style>` 元素中的[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Cascade/Specificity)相同，那么后一个元素中的冲突声明将覆盖前一个元素中的冲突声明。

html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>测试页面</title>
    <style>
      p {
        color: white;
        background-color: blue;
        padding: 5px;
        border: 1px solid black;
      }
    </style>
    <style>
      p {
        color: blue;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>这是一个段落。</p>
  </body>
</html>
```

### [包含媒体查询](#包含媒体查询)

在这个示例中，我们在前一个示例的基础上，在第二个 `<style>` 元素上加入了 `media` 属性，因此只有当视口宽度小于 500px 时才会应用该属性。

html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>测试页面</title>
    <style>
      p {
        color: white;
        background-color: blue;
        padding: 5px;
        border: 1px solid black;
      }
    </style>
    <style media="all and (max-width: 500px)">
      p {
        color: blue;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>这是一个段落。</p>
  </body>
</html>
```

## [技术概要](#技术概要)

<table><tbody><tr><th><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>。</td></tr><tr><th>允许的内容</th><td>与 <code>type</code> 属性匹配的文本内容，即 <code>text/css</code>。</td></tr><tr><th>标签省略</th><td>开始和结束标签都不允许省略。</td></tr><tr><th>允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有相应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th>DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLStyleElement"><code>HTMLStyleElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-style-element](https://html.spec.whatwg.org/multipage/semantics.html#the-style-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link) 元素允许我们在文档中应用外部样式表。
-   [替代样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/alternate_stylesheet)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style/contributors.txt)更新。
