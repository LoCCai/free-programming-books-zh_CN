基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<aside>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素用于表示文档中内容仅与主内容间接相关的部分。通常以侧边栏或提示框的形式呈现。

## [尝试一下](#尝试一下)

```
<p>蝾螈是两栖动物的一种，其外形类似蜥蜴，包括幼体和成体的短腿和尾巴。</p>

<aside>
  <p>粗皮蝾螈用一种致命的神经毒素来保护自己。</p>
</aside>

<p>
  有几种蝾螈栖息在太平洋西北部的温带雨林中，其中包括恩萨蒂娜蝾螈、西北蝾螈和粗皮蝾螈。大多数蝾螈都是夜间活动，捕食昆虫、蠕虫和其他小生物。
</p>
```

```
aside {
  width: 40%;
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  float: right;
  box-shadow: inset 5px 0 5px -5px #29627e;
  font-style: italic;
  color: #29627e;
}

aside > p {
  margin: 0.5rem;
}
```

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

-   不要使用 `<aside>` 元素来标记括号内的文本，因为这种文本被视为正文的一部分。

## [示例](#示例)

### [使用 <aside>](#使用_aside)

此示例使用 `<aside>` 标签来标记文章中的一个段落。该段落与文章的主要内容仅存在间接关联：

html

```
<article>
  <p>迪士尼电影<cite>《小美人鱼》</cite>于 1989 年首次在院线上映。</p>
  <aside>
    <p>电影在上映初期就获得了 8700 万美元的票房收入。</p>
  </aside>
  <p>关于电影的更多信息……</p>
</article>
```

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%88%86%E6%AE%B5%E5%86%85%E5%AE%B9">分段内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。请注意，<code>&lt;aside&gt;</code> 元素不能是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address"><code>&lt;address&gt;</code></a> 元素的后代。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role">complementary</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/feed_role"><code>feed</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/note_role"><code>note</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role"><code>region</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role"><code>search</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-aside-element](https://html.spec.whatwg.org/multipage/sections.html#the-aside-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他与章节相关的元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[h1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h2](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h3](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h4](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h6](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)；
-   [使用 HTML 章节与大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)
-   [ARIA：Complementary 角色](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside/contributors.txt)更新。
