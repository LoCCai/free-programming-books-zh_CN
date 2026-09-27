基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML `<object>` 元素**（或者称作 _HTML 嵌入对象元素_）表示引入一个外部资源，这个资源可能是一张图片，一个嵌入的浏览上下文，亦或是一个插件所使用的资源。

## [尝试一下](#尝试一下)

```
<object
  type="video/mp4"
  data="/shared-assets/videos/flower.mp4"
  width="250"
  height="200"></object>
```

-   _[内容分类](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories)_ [Flow content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#flow_content); [phrasing content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#phrasing_content); [embedded content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#embedded_content), palpable content; if the element has a **usemap** attribute, [interactive content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#interactive_content); [listed](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#form_listed), [submittable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#form_submittable) [form-associated](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#form-associated_content) element.
-   _允许内容_ zero or more [`<param>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/param) elements, then [Transparent content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#transparent_content_models).
-   _标签省略_：不允许，开始标签和结束标签都不能省略。
-   _允许的父级元素_ Any element that accepts [embedded content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#embedded_content).
-   _DOM 接口_ [`HTMLObjectElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLObjectElement)

## [属性](#属性)

元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`archive`](#archive)

用来指名对象资源列表的以空格分隔的 URI 列表。

[`border`](#border)

元素周围的边框的宽度，单位为像素。

[`classid`](#classid)

对象实现的 URI，可以同时与 **data** 属性使用，或者使用 **data** 属性替代。

[`codebase`](#codebase)

解析 **classid**，**data** 或者 **archive** 中定义的相对路径的根路径，如果没有定义，默认为当前文档的 base URI。

[`codetype`](#codetype)

**classid** 定义的 data 的内容类型。

[`data`](#data)

一个合法的 URL 作为资源的地址，需要为 **data** 和 **type** 中至少一个设置值。

[`declare`](#declare)

取值为布尔的属性可以设置这个元素为仅声明的格式。对象必须被随后的 `<object> 元素实例化。在` HTML5 中，完整的重复 <object> 元素，可以重用元素。

[`form`](#form)

对象元素关联的 form 元素（属于的 form）。取值必须是同一文档下的一个 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素的 ID。

[`height`](#height)

资源显示的高度，单位是 CSS 像素。

[`name`](#name)

浏览上下文名称（HTML5），或者控件名称（HTML 4）。

[`standby`](#standby)

对象的实现和数据加载过程中，浏览器可以显示的信息。

[`tabindex`](#tabindex)

当前元素在文档 Tab 导航中的顺序。

[`type`](#type)

**data** 指定的资源的 MIME 类型，需要为 **data** 和 **type** 中至少一个设置值。

[`usemap`](#usemap)

指向一个 [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map) 元素的 hash-name；格式为‘#’加 map 元素 [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map#name) 元素的值。

[`width`](#width)

资源显示的宽度，单位是 CSS 像素。

## [示例](#示例)

html

```
<!-- Embed a flash movie -->
<object data="move.swf" type="application/x-shockwave-flash"></object>

<!-- Embed a flash movie with parameters -->
<object data="move.swf" type="application/x-shockwave-flash">
  <param name="foo" value="bar" />
</object>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-object-element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参阅](#参阅)

-   [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed)
-   [`<param>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/param)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object/contributors.txt)更新。
