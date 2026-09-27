Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概述](#概述)

`<noframes>` 是个 HTML 元素，用于支持不支持 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) 元素的浏览器，或者这样配置的浏览器。

你可以在 `<noframes>` 中使用任何 HTML 元素，它预期可以在 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) 中看到，除了 [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset) 和 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) 元素。

**备注：**由于所有主流浏览器都支持帧，这个元素一般不需要使用。它也在 HTML5 中完全过时，并且应该避免使用，来遵循标准。

## [属性](#属性)

就像其他 HTML 元素那样，这个元素支持 [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

html

```
<frameset cols="50%,50%">
  <frame src="https://developer.mozilla.org/en/HTML/Element/frameset" />
  <frame src="https://developer.mozilla.org/en/HTML/Element/frame" />
  <noframes>
    <p>
      It seems your browser does not support frames or is not configured do so.
    </p>
  </noframes>
</frameset>
```

## [参见](#参见)

-   [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset)
-   [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noframes/contributors.txt)更新。
