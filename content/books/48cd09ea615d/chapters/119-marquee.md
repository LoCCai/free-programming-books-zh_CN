Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<marquee>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素用于插入滚动文本区域。你可以使用它的属性控制当文本到达容器边缘发生的事情。

## [属性](#属性)

[`behavior`](#behavior)

设置文本在 marquee 元素内如何滚动。可选值有 `scroll`、`slide` 和 `alternate`。如果未指定值，默认值为 `scroll`。

[`bgcolor`](#bgcolor)

通过颜色名称或十六进制值设置背景颜色。

[`direction`](#direction)

设置 marquee 内文本滚动的方向。可选值有 `left`、`right`、`up` 和 `down`。如果未指定值，默认值为 `left`。

[`height`](#height)

以像素或百分比值设置高度。

[`hspace`](#hspace)

设置水平边距。

[`loop`](#loop)

设置 marquee 滚动的次数。如果未指定值，默认值为 −1，表示 marquee 将连续滚动。

[`scrollamount`](#scrollamount)

设置每次滚动时移动的长度（以像素为单位）。默认值为 6。

[`scrolldelay`](#scrolldelay)

设置每次滚动时的时间间隔（以毫秒为单位）。默认值为 85。请注意，除非指定 `truespeed` 值，否则将忽略任何小于 60 的值，并改为使用 60。

[`truespeed`](#truespeed)

默认情况下，会忽略小于 60 的 `scrolldelay` 值。如果存在 `truespeed`，那些值不会被忽略。

[`vspace`](#vspace)

以像素或百分比值设置垂直边距。

[`width`](#width)

以像素或百分比值设置宽度。

## [事件处理器](#事件处理器)

[`onbounce`](#onbounce)

当 marquee 滚动到结尾时触发。它只能在 behavior 属性设置为 alternate 时触发。

[`onfinish`](#onfinish)

当 marquee 完成 loop 属性设置的值时触发。它只能在 loop 属性设置为大于 0 的某个数字时触发。

[`onstart`](#onstart)

当 marquee 开始滚动时触发。

## [方法](#方法)

[`start()`](#start)

开始滚动 marquee。

[`stop()`](#stop)

停止滚动 marquee。

## [示例](#示例)

html

```
<marquee>该文本将从右向左滚动</marquee>

<marquee direction="up">该文本将从下往上滚动</marquee>

<marquee
  direction="down"
  width="250"
  height="200"
  behavior="alternate"
  style="border:solid">
  <marquee behavior="alternate">该文本将弹跳</marquee>
</marquee>
```

### [结果](#结果)

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMarqueeElement"><code>HTMLMarqueeElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-marquee-element-2](https://html.spec.whatwg.org/multipage/rendering.html#the-marquee-element-2) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`HTMLMarqueeElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMarqueeElement)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/marquee/contributors.txt)更新。
