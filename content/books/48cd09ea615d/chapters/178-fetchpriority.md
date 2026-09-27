基线 2024

最近可用

自 2024年10月 起，此特性已在最新浏览器中得到支持。但在较旧的设备或浏览器中可能无法运行。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`fetchpriority`** 属性允许开发者向浏览器发出信号：在加载过程中提前获取特定图片对用户体验的影响程度，可能与浏览器在分配内部优先级时合理推断的结果存在差异。浏览器据此可相应提高或降低该图片的优先级，从而可能比默认情况更早或更晚地加载该图片。

此属性可以应用于 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link) 和 [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script) 元素，它还拥有一个 [SVG 对应版本](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/fetchpriority)。

获取优先级可与[预加载](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload)属性配合使用，使开发者能够提升资源的优先级，使其优先于那些默认优先级较高但影响较小的资源。例如，若开发者确认某张图片对网站的[最大内容绘制](https://developer.mozilla.org/zh-CN/docs/Glossary/Largest_contentful_paint)（LCP）指标贡献显著，可为该图片添加 [`<link rel="preload">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload)，再通过 `fetchpriority` 属性进一步提升其优先级。

请注意，任何获取操作的内部优先级以及 `fetchpriority` 对优先级的影响，完全取决于浏览器。

此属性为[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)属性，可以具有以下值之一：

[`high`](#high)

以高于其他外部资源的优先级获取外部资源。

[`low`](#low)

以低于其他外部资源的优先级获取外部资源。

[`auto`](#auto)

不设置获取优先级的偏好。当未设置值或设置了无效值时使用此选项。这是默认值。

## [使用说明](#使用说明)

该属性应谨慎使用，因为过度或错误的优先级设置会降低性能。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-img-fetchpriority](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-fetchpriority) |
| [HTML  
\# attr-link-fetchpriority](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-fetchpriority) |
| [HTML  
\# attr-script-fetchpriority](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-fetchpriority) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.img.fetchpriority](#html.elements.img.fetchpriority)

### [html.elements.link.fetchpriority](#html.elements.link.fetchpriority)

### [html.elements.script.fetchpriority](#html.elements.script.fetchpriority)

## [参见](#参见)

-   SVG [`fetchpriority`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/fetchpriority) 属性

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月18日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/fetchpriority/contributors.txt)更新。
