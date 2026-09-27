基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<article>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示文档、页面、应用或网站中具有独立分发或复用意义的自包含内容块，例如论坛帖子、杂志或报纸文章、博客条目、产品卡片、用户评论、交互式组件等独立内容项。

## [尝试一下](#尝试一下)

```
<article class="forecast">
  <h1>西雅图天气预报</h1>
  <article class="day-forecast">
    <h2>2018 年 3 月 3 日</h2>
    <p>雨。</p>
  </article>
  <article class="day-forecast">
    <h2>2018 年 3 月 04 日</h2>
    <p>降雨时段。</p>
  </article>
  <article class="day-forecast">
    <h2>2018 年 3 月 05 日</h2>
    <p>大雨。</p>
  </article>
</article>
```

```
.forecast {
  margin: 0;
  padding: 0.3rem;
  background-color: #eee;
}

.forecast > h1,
.day-forecast {
  margin: 0.5rem;
  padding: 0.3rem;
  font-size: 1.2rem;
}

.day-forecast {
  background: right/contain content-box border-box no-repeat
    url("/shared-assets/images/examples/rain.svg") white;
}

.day-forecast > h2,
.day-forecast > p {
  margin: 0.2rem;
  font-size: 1rem;
}
```

一个文档中可以包含多个文章；例如，在一个博客页面中，用户滚动时依次展示的每篇文章都可以用一个 `<article>` 表示，且其中可能包含一个或多个 `<section>`。

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

-   每个 `<article>` 应该具有明确的标识，通常做法是在 `<article>` 元素内部包含一个标题元素（[`<h1>`—`<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements) 元素）来实现。
-   当 `<article>` 元素被嵌套使用时，内部元素代表与外部元素相关的文章。例如，博客文章的评论可以是嵌套在代表博客文章的 `<article>` 中的 `<article>` 元素。
-   `<article>` 元素的作者信息可以通过 [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address) 元素提供，但该方式不适用于嵌套的 `<article>` 元素。
-   `<article>` 元素的发布时间可以使用 [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time) 元素的 [`datetime`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time#datetime) 属性来描述。

## [示例](#示例)

html

```
<article class="film_review">
  <h2>侏罗纪公园</h2>
  <section class="main_review">
    <h3>评论</h3>
    <p>恐龙是伟大的！</p>
  </section>
  <section class="user_reviews">
    <h3>用户评论</h3>
    <article class="user_review">
      <h4>太吓人了！</h4>
      <p>对我来说太可怕了。</p>
      <footer>
        <p>
          发表于
          <time datetime="2015-05-16 19:00">5 月 16 日</time> 作者：Lisa。
        </p>
      </footer>
    </article>
    <article class="user_review">
      <h4>我喜欢恐龙！</h4>
      <p>我同意，恐龙是我的最爱。</p>
      <footer>
        <p>
          发表于 <time datetime="2015-05-17 19:00">5 月 17 日</time> 作者：Tom。
        </p>
      </footer>
    </article>
  </section>
  <footer>
    <p>
      发表于 <time datetime="2015-05-15 19:00">5 月 15 日</time> 作者：Staff。
    </p>
  </footer>
</article>
```

### [结果](#结果)

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%88%86%E6%AE%B5%E5%86%85%E5%AE%B9">分段内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a></td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>所有接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。注意 <code>&lt;article&gt;</code> 元素不能成为 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address"><code>&lt;address&gt;</code></a> 元素的子元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/article_role">article</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role"><code>document</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/feed_role"><code>feed</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/main_role"><code>main</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role"><code>region</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-article-element](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他分段相关元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[h1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h2](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h3](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h4](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h6](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)
-   [使用 HTML 分段和大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article/contributors.txt)更新。
