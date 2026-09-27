基线

广泛可用

自 2016年3月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML `<picture>` 元素**通过包含零或多个 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素和一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>` 元素的 [`src`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img#src) 属性中的 URL。然后，所选图像呈现在<img>元素占据的空间中。

## [尝试一下](#尝试一下)

```
<!--Change the browser window width to see the image change.-->

<picture>
  <source
    srcset="/shared-assets/images/examples/surfer.jpg"
    media="(orientation: portrait)" />
  <img src="https://developer.mozilla.org/shared-assets/images/examples/painted-hand.jpg" alt="" />
</picture>
```

要决定加载哪个 URL，[user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent) 检查每个 `<source>` 的 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source#srcset)、[`media`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source#media) 和 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source#type) 属性，来选择最匹配页面当前布局、显示设备特征等的兼容图像。

`<img>` 元素有两个目的：

-   描述图像的大小和其他属性及其呈现。
-   在所有的 `<source>` 元素提供的图片都不可用时提供备选图片。

`<picture>` 的常见使用场景：

-   **艺术指导**（Art direction）。针对不同 `media` 条件裁剪或修改图像（例如，在较小的显示器或图像的详细内容太多时显示较为图像的简单版本）。
    
-   遇到不支持的特定格式时，**提供替代的图像格式**。
    
-   通过加载最适合观看者显示的图像来**节省带宽和提高页面加载速度**。
    

如果要为高 DPI（Retina）显示提供更高像素密度的图像版本，请在 `<img>` 元素上使用 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img#srcset)。这使得浏览器可以在节约流量模式下选择低像素密度版本，且不需要你编写明确的 `media` 条件。

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">流内容</a>，表述内容，嵌入内容。</td></tr><tr><th scope="row">允许的内容</th><td>零或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source"><code>&lt;source&gt;</code></a> 元素，以及紧随其后的一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img"><code>&lt;img&gt;</code></a> 元素，可以混合一些脚本支持的元素。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何可以包含嵌入内容的元素。</td></tr><tr><th scope="row">允许的 ARIA roles</th><td>无</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLPictureElement"><code>HTMLPictureElement</code></a></td></tr></tbody></table>

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

你可以使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 属性调整元素框架内图像的位置，用 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit) 属性控制图片如何调整大小来适应框架。

**备注：**在子 `<img>` 元素上使用这些属性，不是 `<picture>` 元素。

## [示例](#示例)

这些示例演示了 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素的不同属性如何更改`<picture>`中图像的选择。

### [`media` 属性](#media_属性)

`media` 属性允许你提供一个用于给用户代理作为选择 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素的依据的媒体条件 (media condition)（类似于媒体查询）。如果这个媒体条件匹配结果为 `false`，那么这个 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素会被跳过。

html

```
<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 600px)" />
  <img src="https://developer.mozilla.org/zh-CN/docs/Web/mdn-logo-narrow.png" alt="MDN" />
</picture>
```

### [`type` 属性](#type_属性)

`type` 属性允许你为 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素的 `srcset` 属性指向的资源指定一个 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types)。如果用户代理不支持指定的类型，那么这个 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素会被跳过。

html

```
<picture>
  <source srcset="mdn-logo.svg" type="image/svg+xml" />
  <img src="https://developer.mozilla.org/zh-CN/docs/Web/mdn-logo.png" alt="MDN" />
</picture>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-picture-element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参考链接](#参考链接)

-   [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素
-   [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素
-   在其框架内定位和缩放图片：[`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 和 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture/contributors.txt)更新。
