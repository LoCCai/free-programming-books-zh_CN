基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<html>`** 元素表示 HTML 文档的根（顶级元素），所以它也被称为_根元素_。其他所有元素必须是此元素的后代。

## [属性](#属性)

该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`version`](#version)

指定用于组织当前文档的 HTML [文档类型定义](https://developer.mozilla.org/zh-CN/docs/Glossary/Doctype)的版本。这个属性已不再需要，因为这与文档类型声明中的版本信息重复。

[`xmlns`](#xmlns)

指定文档的 [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML) [命名空间](https://developer.mozilla.org/zh-CN/docs/Glossary/Namespace)。默认的值是 `"http://www.w3.org/1999/xhtml"`。这在由 XML [解析器](https://developer.mozilla.org/zh-CN/docs/Glossary/Parser)解析的文档中是必需的，而在 text/html 文档中是可选的。

## [示例](#示例)

html

```
<!doctype html>
<html lang="zh">
  <head>
    <!-- … -->
  </head>
  <body>
    <!-- … -->
  </body>
</html>
```

## [无障碍考虑](#无障碍考虑)

虽然 HTML 并不要求作者指定 `<html>` 元素的开始和结束标记，但作者必须这样做，因为这将允许他们为网页指定 [`lang`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#lang)。根据 [RFC 5646: 识别语言的标签（也称为 BCP 47）](https://datatracker.ietf.org/doc/html/rfc5646 "外部链接（在新标签页中打开）")，在 `<html>` 元素上提供一个带有有效语言标记的 `lang` 属性，将有助于屏幕阅读技术确定要宣告的适当语言。标识语言标签应描述页面大部分内容所使用的语言。如果没有它，屏幕阅读器通常会默认使用操作系统设置的语言，这可能会导致发音错误。

在 `<html>` 元素中包含一个有效的 `lang` 声明，还可以确保页面的 [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head) 中包含的重要元数据（如页面的 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)）也会被正确地宣告。

-   [MDN | 理解 WCAG，准则 3.1 的解释](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Understandable#%E5%87%86%E5%88%99_3.1%E2%80%94%E2%80%94%E5%8F%AF%E8%AF%BB%E6%80%A7%EF%BC%9A%E4%BD%BF%E6%96%87%E6%9C%AC%E5%86%85%E5%AE%B9%E5%8F%AF%E8%AF%BB%EF%BC%8C%E5%8F%AF%E7%90%86%E8%A7%A3)
-   [理解成功标准 3.1.1 | W3C 理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html "外部链接（在新标签页中打开）")

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无</td></tr><tr><th scope="row">允许的内容</th><td>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素，后跟一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body"><code>&lt;body&gt;</code></a> 元素</td></tr><tr><th scope="row">标签省略</th><td>如果 <code>&lt;html&gt;</code> 元素中的第一个元素不是注释，则可以省略开始标签。<br>如果 <code>&lt;html&gt;</code> 元素没有紧接着注释，则可以省略结束标签。</td></tr><tr><th scope="row">允许的父元素</th><td>无。这是文档的根元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role">document</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的角色（<code>role</code>）</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLHtmlElement"><code>HTMLHtmlElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-html-element](https://html.spec.whatwg.org/multipage/semantics.html#the-html-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   MathML 顶级元素：[`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>")
-   SVG 顶级元素：[`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html/contributors.txt)更新。
