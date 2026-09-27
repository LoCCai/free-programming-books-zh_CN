基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<footer>`** 元素表示其最近的祖先[分段内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%88%86%E6%AE%B5%E5%86%85%E5%AE%B9)的页脚或[分段根](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements#%E6%A0%87%E6%B3%A8%E7%AB%A0%E8%8A%82%E5%86%85%E5%AE%B9)元素。`<footer>` 通常包含有关该部分作者、版权数据或相关文档链接的信息。

## [尝试一下](#尝试一下)

```
<article>
  <h1>How to be a wizard</h1>
  <ol>
    <li>Grow a long, majestic beard.</li>
    <li>Wear a tall, pointed hat.</li>
    <li>Have I mentioned the beard?</li>
  </ol>
  <footer>
    <p>© 2018 Gandalf</p>
  </footer>
</article>
```

```
article {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

footer {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #45a1ff;
  color: #fff;
}
```

## [属性](#属性)

该元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

-   在 [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address) 元素中包含有关作者的信息，该元素可以包含在 `<footer>` 元素中。
-   当最近的祖先分段内容或分段根元素是 body 元素时，页脚适用于整个页面。
-   `<footer>` 元素不是分段内容，因此不会在[大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)中引入新的分段。

## [示例](#示例)

html

```
<body>
  <h3>FIFA 世界杯最佳射手</h3>
  <ol>
    <li>米罗斯拉夫 · 克洛泽，16</li>
    <li>罗纳尔多 · 纳扎里奥，15</li>
    <li>格尔德 · 穆勒，14</li>
  </ol>

  <footer>
    <small> 版权所有 © 2023 足球历史档案馆。保留所有权利。 </small>
  </footer>
</body>
```

css

```
footer {
  text-align: center;
  padding: 5px;
  background-color: #abbaba;
  color: #000;
}
```

## [无障碍考虑](#无障碍考虑)

在 Safari 13 发布之前，`contentinfo` [地标角色](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Accessibility/WAI-ARIA_basics#%E8%B7%AF%E7%89%8C%E5%9C%B0%E6%A0%87)无法通过 [VoiceOver](https://help.apple.com/voiceover/info/guide/ "外部链接（在新标签页中打开）") 正确显示。如果需要支持传统的 Safari 浏览器，请在 `footer` 元素中添加 `role="contentinfo"` 以确保正确显示地标。

-   相关：[WebKit Bugzilla: 146930 - AX：HTML 原生元素（页眉、页脚、主页、旁页、导航）应与 ARIA 地标一样工作，但有时却不一样](https://webkit.org/b/146930 "外部链接（在新标签页中打开）")

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>，但不可以有 <code>&lt;footer&gt;</code> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header"><code>&lt;header&gt;</code></a> 后代。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始和结束标签都是必需的。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。请注意，<code>&lt;footer&gt;</code> 元素不得是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address"><code>&lt;address&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header"><code>&lt;header&gt;</code></a> 或其他 <code>&lt;footer&gt;</code> 元素的后代。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role">contentinfo</a> 或 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role">generic</a> 如果是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article">article</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside">aside</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main">main</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav">nav</a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section">section</a> 元素的后代，则为 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role">contentinfo</a> 或 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role">generic</a>，或一个具有 <code>role=<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/article_role">article</a></code>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role">complementary</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/main_role">main</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/navigation_role">navigation</a> 或 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role">region</a> 的元素</td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role"><code>group</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-footer-element](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他与分节相关的元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[h1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h2](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h3](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、 [h4](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h6](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)
-   [使用 HTML 分节和大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)
-   [ARIA：Contentinfo 角色](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/contentinfo_role)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月17日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer/contributors.txt)更新。
