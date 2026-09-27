Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<acronym>`** 元素允许作者明确声明一个构成单词首字母缩略字或缩写的字符序列。

**警告：**请不要使用该元素，而应使用 [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr) 元素代替。

## [属性](#属性)

该元素仅具有所有元素所共有的[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [DOM 接口](#dom_接口)

该元素实现了 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口。

## [示例](#示例)

html

```
<p>
  万维网（<acronym title="World Wide Web">WWW</acronym>）是因特网的组成部分。
</p>
```

### [结果](#结果)

## [默认样式](#默认样式)

尽管这个标签的目的纯粹是为了方便作者，但其默认样式因浏览器而异：

-   Opera、Firefox、Chrome 和其他的一些浏览器在元素内容添加一条点状下划线。
-   一小部分浏览器不仅添加点状下划线，而且将其设为小型大写字母；为避免这种样式，可以在 CSS 中添加类似 [`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-variant)`: none` 的内容来处理这种情况。

因此强烈建议 Web 作者明确设置此元素的样式，或选择接受浏览器之间的差异。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# acronym](https://html.spec.whatwg.org/multipage/obsolete.html#acronym) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr) HTML 元素

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/acronym/contributors.txt)更新。
