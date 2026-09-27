基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<embed>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素会在文档的指定位置嵌入外部内容。该内容由外部应用程序或其他交互内容来源（例如浏览器插件）提供。

## [尝试一下](#尝试一下)

```
<embed
  type="image/jpeg"
  src="https://developer.mozilla.org/shared-assets/images/examples/flowers.jpg"
  width="250"
  height="200" />
```

**备注：**本文仅记录作为 [HTML 动态标准](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element "外部链接（在新标签页中打开）")一部分所定义的元素，不涉及该元素早期的非标准化实现。

请注意，大多数现代浏览器已弃用并移除了对浏览器插件的支持，因此若希望站点能在普通用户的浏览器中正常使用，通常不宜依赖 `<embed>`。

## [属性](#属性)

此元素的属性包括[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`height`](#height)

资源的显示高度，以 [CSS 像素](https://drafts.csswg.org/css-values/#px "外部链接（在新标签页中打开）")为单位。必须为绝对值；_不允许_使用百分比。

[`src`](#src)

所嵌入资源的 URL。

[`type`](#type)

用于选择要实例化的插件的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)。

[`width`](#width)

资源的显示宽度，以 [CSS 像素](https://drafts.csswg.org/css-values/#px "外部链接（在新标签页中打开）")为单位。必须为绝对值；_不允许_使用百分比。

## [使用说明](#使用说明)

可以使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 属性调整嵌入对象在元素框架内的定位。

## [无障碍](#无障碍)

在 `embed` 元素上使用 [`title` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/title)为其内容添加标签，以便使用屏幕阅读器等辅助技术浏览的人能够理解其中包含的内容。`title` 的值应简洁描述所嵌入的内容。若没有标题，他们可能无法判断嵌入内容是什么。这种上下文切换可能令人困惑且耗时，尤其是在 `embed` 元素包含视频或音频等交互内容时。

## [示例](#示例)

html

```
<embed
  type="video/quicktime"
  src="https://developer.mozilla.org/zh-CN/docs/Web/movie.mov"
  width="640"
  height="480"
  title="我的视频标题" />
```

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容类别</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%B5%8C%E5%85%A5%E5%86%85%E5%AE%B9">嵌入内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E4%BA%A4%E4%BA%92%E5%86%85%E5%AE%B9">交互内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td>无；这是一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">空元素</a>。</td></tr><tr><th scope="row">标签省略</th><td>必须有开始标签，且不能有结束标签。</td></tr><tr><th scope="row">允许的父元素</th><td>接受嵌入内容的任何元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://w3c.github.io/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">无对应角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role"><code>document</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role"><code>img</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLEmbedElement"><code>HTMLEmbedElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-embed-element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   用于嵌入各类内容的其他元素包括 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)、[`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas)、[`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)、[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)、[`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>")、[`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)、[`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)。
-   在框架内定位与调整嵌入内容的尺寸：[`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 和 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年8月28日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed/contributors.txt)更新。
