基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<small>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素代表旁注和小字印刷（如版权和法律文本），与其样式的呈现方式无关。默认情况下，它以比其中的文本小一号的字体大小呈现，例如从 `small` 变为 `x-small`。

## [尝试一下](#尝试一下)

```
<p>
  MDN Web Docs is a learning platform for Web technologies and the software that
  powers the Web.
</p>

<hr />

<p>
  <small
    >The content is licensed under a Creative Commons Attribution-ShareAlike 2.5
    Generic License.</small
  >
</p>
```

```
small {
  font-size: 0.7em;
}
```

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

### [基本用法](#基本用法)

html

```
<p>
  这是第一句。
  <small>整个句子采用了较小的字体显示。</small>
</p>
```

#### 结果

### [CSS 替代](#css_替代)

html

```
<p>
  这是第一句。
  <span style="font-size:0.8em">整个句子采用了较小的字体显示。</span>
</p>
```

#### 结果

## [备注](#备注)

尽管 `<small>` 元素像 [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b) 和 [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i) 元素一样，可能被认为违反了结构与表现分离的原则，但这三个元素在 HTML 中都是有效的。建议作者根据实际情况使用 `<small>` 或者 CSS 来做判断。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a></td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>或<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role">generic</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任意</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-small-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-small-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b)
-   [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub) 和 [`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup)
-   [`<font>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/font)
-   [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style)
-   HTML 4.01 规范：[字体样式](https://www.w3.org/TR/html4/present/graphics.html#h-15.2 "外部链接（在新标签页中打开）")

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small/contributors.txt)更新。
