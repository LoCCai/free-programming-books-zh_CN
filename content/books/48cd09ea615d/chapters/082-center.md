Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<center>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素是一个[块级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)，它在其包含元素中将其块级或行级内容水平居中显示。容器通常是（但不一定必须是）[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)。

此标签已在 HTML 4（和 XHTML 1）中被弃用，取而代之的是 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 的 [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) 属性，可以应用于 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 元素或单独的 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) 元素。对于居中块，请使用其他 CSS 属性，例如 [`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-left) 和 [`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-right) 并将它们设置为 `auto`（或设置 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin) 为 `0 auto`）。

## [DOM 接口](#dom_接口)

该元素实现了 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口。

## [示例 1](#示例_1)

html

```
<center>
  这段文字将居中。
  <p>本段也是如此。</p>
</center>
```

### [结果](#结果)

## [示例 2（CSS 替代方案）](#示例_2（css_替代方案）)

html

```
<div style="text-align:center">
  这段文字将居中。
  <p>本段也是如此。</p>
</div>
```

### [结果](#结果_2)

## [示例 3（CSS 替代方案）](#示例_3（css_替代方案）)

html

```
<p style="text-align:center">
  这段文字将居中。<br />
  这一行也是如此。
</p>
```

### [结果](#结果_3)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# center](https://html.spec.whatwg.org/multipage/obsolete.html#center) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align)
-   [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/center/contributors.txt)更新。
