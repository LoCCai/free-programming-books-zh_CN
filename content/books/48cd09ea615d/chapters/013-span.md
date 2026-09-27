基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<span>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素是一个通用的行级容器，本身不具备特殊含义。它可被用于对元素进行编组，以便于添加样式（通过使用 [`class`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#class) 或 [`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#id) 属性），或共享属性值（例如 [`lang`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#lang) 属性）。该元素仅应在无其他合适语义元素时使用。`<span>` 与 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 元素非常相似，但是 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 是[块级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)，而 `<span>` 是一个[行级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Inline-level_content)。

## [尝试一下](#尝试一下)

```
<p>
  Add the <span class="ingredient">basil</span>,
  <span class="ingredient">pine nuts</span> and
  <span class="ingredient">garlic</span> to a blender and blend into a paste.
</p>

<p>
  Gradually add the <span class="ingredient">olive oil</span> while running the
  blender slowly.
</p>
```

```
span.ingredient {
  color: #f00;
}
```

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

### [示例 1](#示例_1)

#### HTML

html

```
<p><span>一些文本</span></p>
```

#### 结果

### [示例 2](#示例_2)

#### HTML

html

```
<li>
  <span>
    <a href="portfolio.html" target="_blank">查看我的作品集</a>
  </span>
</li>
```

#### CSS

css

```
li span {
  background: gold;
}
```

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任意</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSpanElement"><code>HTMLSpanElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-span-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-span-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   HTML [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 元素

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/span/contributors.txt)更新。
