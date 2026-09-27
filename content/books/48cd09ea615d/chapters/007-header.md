基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<header>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示介绍性内容，通常是一组介绍性或导航性辅助内容。它可能包含一些标题元素，也可能包含徽标、搜索表单、作者姓名和其他元素。

## [尝试一下](#尝试一下)

```
<header>
  <a class="logo" href="#">Cute Puppies Express!</a>
</header>

<article>
  <header>
    <h1>Beagles</h1>
    <time>08.12.2014</time>
  </header>
  <p>
    I love beagles <em>so</em> much! Like, really, a lot. They’re adorable and
    their ears are so, so snugly soft!
  </p>
</article>
```

```
.logo {
  background: left / cover
    url("/shared-assets/images/examples/puppy-header.jpg");
  display: flex;
  height: 120px;
  align-items: center;
  justify-content: center;
  font:
    bold calc(1em + 2 * (100vw - 120px) / 100) "Dancing Script",
    fantasy;
  color: #ff0083;
  text-shadow: #000 2px 2px 0.2rem;
}

header > h1 {
  margin-bottom: 0;
}

header > time {
  font: italic 0.7rem sans-serif;
}
```

## [使用说明](#使用说明)

`<header>` 元素的意义与网站范围内的 [`banner`](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role) 地标角色相同，除非嵌套在分段内容内。在这种情况下，`<header>` 元素不再是地标。

`<header>` 元素可以定义一个全局站点标题，在无障碍树中描述为 `banner`。它通常包括一个徽标、公司名称、搜索功能，以及可能的全局导航或标语。它通常位于页面的顶端。

否则，它是在无障碍树中的一个 `section`，通常包含周围部分的标题（`h1` – `h6` 元素）和可选的副标题，但这并**不是**必要的。

### [历史用法](#历史用法)

`<header>` 元素最初在 HTML 的早期用于标题。在[第一个网站](https://info.cern.ch/ "外部链接（在新标签页中打开）")中可以看到。在某个时间点，标题变成了 [`<h1>` 至 `<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)，使 `<header>` 可以自由地扮演一个不一样的角色。

## [属性](#属性)

此元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [无障碍](#无障碍)

当 `<header>` 元素的上下文为 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) 元素时，它定义了一个 [`banner`](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role) 地标。当 HTML 标题元素是 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav) 或 [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section) 元素的后代时，则不视为 banner 地标。

## [示例](#示例)

### [页面标题](#页面标题)

html

```
<header>
  <h1>主页标题</h1>
  <img src="https://developer.mozilla.org/zh-CN/docs/Web/mdn-logo-sm.png" alt="MDN 徽标" />
</header>
```

#### 结果

### [文章标题](#文章标题)

html

```
<article>
  <header>
    <h2>行星地球</h2>
    <p>
      作者：Jane Smith，发布日期：<time datetime="2017-10-04"
        >2017 年 10 月 4 日</time
      >
    </p>
  </header>
  <p>我们生活在一个蓝绿相间的星球上，有许多东西还未曾见过。</p>
  <p><a href="https://example.com/the-planet-earth/">继续阅读……</a></p>
</article>
```

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>，但没有 <code>&lt;header&gt;</code> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer"><code>&lt;footer&gt;</code></a> 后代。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#flow_content">流式内容</a>的元素。请注意，<code>&lt;header&gt;</code> 元素不得是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address"><code>&lt;address&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer"><code>&lt;footer&gt;</code></a> 或另一个 <code>&lt;header&gt;</code> 元素的后代。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td>如果是 <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article">article</a></code>、<code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside">aside</a></code>、<code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main">main</a></code>、<code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav">nav</a></code> 或是 <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section">section</a></code> 元素的后代，或者是带有 <code>role=<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/article_role">article</a></code>、<code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/complementary_role">complementary</a></code>、<code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/main_role">main</a></code>、<code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/navigation_role">navigation</a></code> 或 <code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role">region</a></code> 属性的元素的后代，则为 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role">generic</a>；否则为 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role">banner</a>。</td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role"><code>group</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-header-element](https://html.spec.whatwg.org/multipage/sections.html#the-header-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他与章节相关的元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[h1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h2](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h3](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h4](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h6](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header/contributors.txt)更新。
