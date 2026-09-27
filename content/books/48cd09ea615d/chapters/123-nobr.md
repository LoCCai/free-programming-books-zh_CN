Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概述](#概述)

HTML `<nobr>` 元素阻止文本自动拆分成新行，所以它展示为长的一行，可能还需要滚动。这个标签不是标准的 HTML，并且不应该使用。反之应该使用 CSS 属性 [`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/white-space)，像这样：

css

```
<span style="white-space: nowrap">Long line with no breaks</span>
```

## [参见](#参见)

-   [`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/white-space)
-   [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/overflow)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nobr/contributors.txt)更新。
