基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML <section> 元素**表示 HTML 文档中一个通用独立章节，它没有更具体的语义元素来表示。一般来说会包含一个标题。

## [尝试一下](#尝试一下)

```
<h1>Choosing an Apple</h1>
<section>
  <h2>Introduction</h2>
  <p>
    This document provides a guide to help with the important task of choosing
    the correct Apple.
  </p>
</section>

<section>
  <h2>Criteria</h2>
  <p>
    There are many different criteria to be considered when choosing an Apple —
    size, color, firmness, sweetness, tartness...
  </p>
</section>
```

```
h1,
h2 {
  margin: 0;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>流式元素，章节元素，短语元素。</td></tr><tr><th scope="row">允许的内容</th><td>流式元素。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%85%83%E7%B4%A0%EF%BC%88flow_content%EF%BC%89">流式元素</a>的任何元素。请注意，<code>&lt;section&gt;</code> 元素不能是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address"><code>&lt;address&gt;</code></a> 元素的后代。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td>当该元素包含<a href="https://www.tpgi.com/what-is-an-accessible-name/" target="_blank" title="外部链接（在新标签页中打开）">可访问的名称</a>时，认为其是 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role">region</a>，否则为 <a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">No corresponding role</a>。</td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role"><code>alert</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role"><code>alertdialog</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role"><code>banner</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role"><code>complementary</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role"><code>contentinfo</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role"><code>dialog</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role"><code>document</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/feed_role"><code>feed</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/log_role"><code>log</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/main_role"><code>main</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/marquee_role"><code>marquee</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/navigation_role"><code>navigation</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role"><code>search</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role"><code>status</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tabpanel_role"><code>tabpanel</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [属性](#属性)

此元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

如上所述，`<section>` 是一个通用的分节元素，只有在没有更具体的元素来代表它的时候才可以使用。举个例子，一个导航菜单应该被包裹在 [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav) 元素中，但搜索结果列表或地图显示及其控件并没有特定的元素，可以放在 `<section>` 里面。

注意事项：

-   当该元素的内容可以作为一个独立的作品在多个媒体上发表，使用 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article) 是一个更好的选择。
-   当内容包含代表与主要内容一同展示的有用的切入信息，但不是直接的一部分（如相关链接，作者简历等），请使用 [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)。
-   当内容代表文档中的主要内容区域，请使用 [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main)。
-   将该元素作为一个样式包装时，请使用 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div)。一般来说，`<section>` 应该出现在文档大纲中。

再次重申，每个 `<section>` 都应该被标识出来，通常是将标题（`<h1>`\-`<h6>`元素）作为 `<section>` 元素的一个子元素。请看下面的例子，你可能会看到没有标题的 `<section>`。

## [示例](#示例)

### [简单的使用示例](#简单的使用示例)

#### 之前

html

```
<div>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</div>
```

#### 之后

html

```
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
```

### [没有标题的使用示例](#没有标题的使用示例)

使用 `<section>`\> 元素但不包含标题的情况，通常出现在 web 应用或用户界面的部分，而不是传统的文档结构中。在文档中，有独立的内容部分但没有标题来描述其内容，是没有任何意义的。标题对所有的读者都很有用，尤其是对使用屏幕阅读器等辅助技术的用户，同时标题也有利于搜索引擎优化。

在设置二级导航时，全局导航已经被包裹在 `<nav>` 元素中，此时可以使用 `<section>` 元素包裹一个上一个/下一个菜单作为二级导航。

html

```
<section>
  <a href="#">Previous article</a>
  <a href="#">Next article</a>
</section>
```

在设置控制应用程序的按钮栏时，需要将其作为文档中单独存在部分，但此时并不需要设置标题。

html

```
<section>
  <button class="reply">Reply</button>
  <button class="reply-all">Reply to all</button>
  <button class="fwd">Forward</button>
  <button class="del">Delete</button>>
</section>
```

没有标题的内容不会出现在文档大纲中。但如果文档大纲中需要包含这样一个 HTML 块，又不希望影响页面效果，可以通过设置隐藏标题来实现

html

```
<section>
  <h2 class="hidden">Controls</h2>
  <button class="reply">Reply</button>
  <button class="reply-all">Reply to all</button>
  <button class="fwd">Forward</button>
  <button class="del">Delete</button>>
</section>
```

确保使用一些辅助技术和对屏幕阅读器友好的 CSS 来隐藏它，就像这样。

css

```
.hidden {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```

根据内容来包含标题也有助于 SEO，因此，这是一个可以考虑的选择。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-section-element](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   相关元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`、[`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)
-   [Using HTML sections and outlines](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)
-   [ARIA: Region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role)
-   [Why You Should Choose HTML5 article Over section](https://www.smashingmagazine.com/2020/01/html5-article-section/ "外部链接（在新标签页中打开）"),by Bruce Lawson

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section/contributors.txt)更新。
