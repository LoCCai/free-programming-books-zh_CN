## [尝试一下](#尝试一下)

```
<video controls width="250" height="200" muted>
  <source src="https://developer.mozilla.org/shared-assets/videos/flower.webm" type="video/webm" />
  <source src="https://developer.mozilla.org/shared-assets/videos/flower.mp4" type="video/mp4" />
  Download the
  <a href="/shared-assets/videos/flower.webm">WEBM</a>
  or
  <a href="/shared-assets/videos/flower.mp4">MP4</a>
  video.
</video>
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无</td></tr><tr><th scope="row">允许的内容</th><td>无；这是一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">空元素</a>。</td></tr><tr><th scope="row">标签省略</th><td>必须有一个开始标签，不可以有结束标签。</td></tr><tr><th scope="row">允许的父元素</th><td><div><p>一个媒体元素（<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio"><code>&lt;audio&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video"><code>&lt;video&gt;</code></a>）且必须放置在<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/track"><code>&lt;track&gt;</code></a> 元素之前。</p></div><div><p>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture"><code>&lt;picture&gt;</code></a> 元素，且必须放置在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img"><code>&lt;img&gt;</code></a> 元素之前。</p></div></td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有相应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement"><code>HTMLSourceElement</code></a></td></tr></tbody></table>

## [属性](#属性)

此元素支持所有的[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)，此外，还支持以下属性：

[`type`](#type)

指定[图像的 MIME 媒体类型](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Image_types)或[其他媒体类型](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers)，可选择包含 [`codecs` 参数](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/codecs_parameter)。

[`src`](#src)

指定媒体资源的 URL。如果 `<source>` 的父节点是 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 或 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)，则必须指定该属性。如果父元素是 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture) 则不允许指定该属性。

[`srcset`](#srcset)

指定由逗号分隔的一个或多个图片 URL 及其描述符的列表。如果 `<source>` 的父节点是 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)，则必须指定该属性。如果父节点为 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 或 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 则不允许指定该属性。

列表由逗号分隔的字符串组成，表示浏览器可能使用的一组图像。每个字符串由以下内容组成：

-   指定图像位置的 URL。
-   可选的宽度描述符——直接以 `"w"` 结尾的正整数，如 `300w`。
-   可选的像素密度描述符——直接以 `"x"` 结尾的正浮点数，如 `2x`。

列表中的每个字符串必须有一个宽度描述符或一个像素密度描述符才有效。这两个描述符不能同时使用；整个列表中只能统一使用一个描述符。列表中每个描述符的值都必须是唯一的。浏览器会根据这些描述符在给定时间点选择最合适的图像来显示。如果未指定描述符，默认值为 `1x`。如果还存在 `sizes` 属性，则每个字符串都必须包含一个宽度描述符。如果浏览器不支持 `srcset`，则将使用 `src` 作为默认图像源。

[`sizes`](#sizes)

指定描述图片最终呈现宽度的源尺寸列表。如果 `<source>` 的父节点是 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)，则允许指定该属性。如果父元素是 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 或 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 则不允许指定该属性。

列表由以逗号分隔的源尺寸组成。每个源尺寸都是媒体条件——长度对。在布局页面之前，浏览器会使用这些信息来确定 [`srcset`](#srcset) 中要显示的图像。请注意，只有在随 `srcset` 提供宽度描述符而不是像素密度描述符的情况下，`sizes` 才会生效（例如，应使用 `200w` 而不是 `2x`）。

[`media`](#media)

为资源的预期媒体指定[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Media_queries)。

[`height`](#height)

以像素为单位指定图片的固有高度。如果 `<source>` 的父元素是 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)，则允许指定该属性。如果父元素是 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 或 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 则不允许指定该属性。

高度值必须是不含单位的整数。

[`width`](#width)

以像素为单位指定图片的固有宽度。如果 `<source>` 的父元素是 [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)，则允许指定该属性。如果父元素是 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 或 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 则不允许指定该属性。

宽度值必须是不含单位的整数。

## [使用说明](#使用说明)

`<source>`元素是[**空元素**](https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element)，这意味着它不仅没有内容，也没有结束标记。也就是说，在 HTML 中永远_不会_使用“`</source>`”。

浏览器会通过 `<source>` 元素列表来查找它所支持的格式。浏览器会使用它能显示的第一个格式。对于每个 `<source>` 元素：

-   如果未指定 `type` 属性，浏览器会从服务器检索媒体类型，并确定是否可以显示。如果媒体无法呈现，浏览器会检查列表中的下一个 `<source>`。
-   如果指定了 `type` 属性，浏览器会立即将其与可显示的媒体类型进行比较。如果不支持该类型，浏览器会跳过服务器查询，直接检查下一个 `<source>` 元素。

如果没有一个 `<source>` 元素提供可用的源：

-   如果是 `<picture>` 元素，浏览器将退回到使用 `<picture>` 元素的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 子元素中指定的图片。
-   如果是 `<audio>` 或 `<video>` 元素，浏览器将恢复显示该元素的开头和结尾标记之间的内容。

有关网页浏览器支持的图像格式以及如何选择合适格式的信息，请参阅[图像文件类型和格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Image_types)。有关可使用的视频和音频媒体类型的详细信息，请参阅[媒体类型和格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)。

## [示例](#示例)

### [将 `type` 属性与 `<video>` 搭配使用](#将_type_属性与_video_搭配使用)

本例演示了如何提供不同格式的视频：WebM 适用于支持 WebM 的浏览器，Ogg 适用于支持 Ogg 的浏览器，QuickTime 适用于支持 QuickTime 的浏览器。如果浏览器不支持 `<audio>` 或 `<video>` 元素，则会显示通知。如果浏览器支持该元素，但不支持任何指定格式，则会引发 `error` 事件，默认媒体控件（如果启用）将显示错误。有关使用哪些媒体文件格式及其浏览器支持的更多详情，请参阅我们的[媒体类型和格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)。

html

```
<video controls>
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/foo.webm" type="video/webm" />
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/foo.ogg" type="video/ogg" />
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/foo.mov" type="video/quicktime" />
  抱歉，你的浏览器不支持 HTML 视频。
</video>
```

### [将 `media` 属性与 `<video>` 搭配使用](#将_media_属性与_video_搭配使用)

本例演示了如何为超过一定宽度的视口提供替代源文件。当用户的浏览环境满足指定的 `media` 条件时，相关的 `<source>` 元素就会被选中。然后请求并呈现其 `src` 属性的内容。如果 `media` 条件不匹配，浏览器将转向列表中的下一个 `<source>`。下面代码中的第二个 `<source>` 选项没有 `media` 条件，因此在所有其他浏览上下文中都会选择它。

html

```
<video controls>
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/foo-large.webm" media="(min-width: 800px)" />
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/foo.webm" />
  抱歉，你的浏览器不支持 HTML 视频。
</video>
```

要了解更多示例，学习区的[视频与音频内容](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio)一文是很好的资源。

### [将 `height` 与 `width` 属性与 `<picture>` 搭配使用](#将_height_与_width_属性与_picture_搭配使用)

在本示例中，[`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture) 元素中包含了三个带有 `height` 和 `width` 属性的 `<source>` 元素。[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Media_queries/Using)允许浏览器根据[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)尺寸选择带有 `height` 和 `width` 属性的图片来显示。

html

```
<picture>
  <source
    srcset="landscape.png"
    media="(min-width: 1000px)"
    width="1000"
    height="400" />
  <source
    srcset="square.png"
    media="(min-width: 800px)"
    width="800"
    height="800" />
  <source
    srcset="portrait.png"
    media="(min-width: 600px)"
    width="600"
    height="800" />
  <img
    src="https://developer.mozilla.org/zh-CN/docs/Web/fallback.png"
    alt="当浏览器不支持来源时使用的图片"
    width="500"
    height="400" />
</picture>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-source-element](https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 元素
-   [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture) 元素
-   [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 元素
-   [图像文件类型与格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Image_types)
-   [媒体类型与格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)
-   [Web 性能](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Performance)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source/contributors.txt)更新。
