Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概述](#概述)

`<frame>` 是 HTML 元素，它定义了一个特定区域，另一个 HTML 文档可以在里面展示。帧应该在 [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset) 中使用。

`<frame>` 的使用不应提倡，因为有一些缺点，比如性能问题，以及使用屏幕阅读器的用户缺少无障碍。比起 `<frame>`，[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe) 更应该提倡。

## [属性](#属性)

就像其他 HTML 元素一样，这个元素支持 [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`src`](#src)

这个属性指定了由帧展示的文档。

[`name`](#name)

这个属性用于给帧添加标签。如果没有标签，所有链接都会在它们所在的帧中打开。

[`noresize`](#noresize)

这个属性避免让用户改变帧的大小。

[`scrolling`](#scrolling)

这个属性定义了滚动条的存在。如果不使用这个属性，浏览器会按需放置滚动条。有两个选择：`"yes"` 用于展示滚动条，即使是多余的；`"no"` 用于不展示滚动条，即使它是必要的。

[`marginheight`](#marginheight)

这个属性定义了帧之间的边距有多高。

[`marginwidth`](#marginwidth)

这个属性定义了帧之间的边距有多宽。

[`frameborder`](#frameborder)

这个属性允许你为帧添加边框。

## [示例](#示例)

html

```
<frameset cols="50%,50%">
  <frame src="https://developer.mozilla.org/en/HTML/Element/iframe" />
  <frame src="https://developer.mozilla.org/en/HTML/Element/frame" />
</frameset>
```

## [参见](#参见)

-   [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset)
-   [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame/contributors.txt)更新。
