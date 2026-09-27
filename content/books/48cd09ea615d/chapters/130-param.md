Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<param>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素为 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object) 元素定义形式参数。

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`name`](#name)

形式参数名称。

[`value`](#value)

形式参数指定值。

[`type`](#type)

仅在 `valuetype` 设置为 `ref` 时使用。指定在 value 指定的 URI 中找到的值的 MIME 类型。

[`valuetype`](#valuetype)

指定 `value` 属性类型。可能的值包括：

-   `data`：默认值。该值以字符串形式传递给对象实现。
-   `ref`：该值是存储运行时值的资源的 URI。
-   `object`：在同一文档中另一个 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object) 元素的 ID。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无。</td></tr><tr><th scope="row">允许的内容</th><td>无；它是<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">空元素</a>。</td></tr><tr><th scope="row">标签省略</th><td>必须有开始标签，且不能有结束标签。</td></tr><tr><th scope="row">允许的父元素</th><td>在任何<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>之前的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object"><code>&lt;object&gt;</code></a> 元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLParamElement"><code>HTMLParamElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# non-conforming-features](https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/param/contributors.txt)更新。
