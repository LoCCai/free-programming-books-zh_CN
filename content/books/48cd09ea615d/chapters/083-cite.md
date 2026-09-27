基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<cite>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素用于标记创作作品的标题。该引用可根据与引用元数据相关的、适合上下文的惯例采用缩写形式。

## [尝试一下](#尝试一下)

```
<figure>
  <blockquote>
    <p>那是四月里明媚而寒冷的一天，时钟正敲响十三下。</p>
  </blockquote>
  <figcaption>
    乔治·奥威尔《
    <cite><a href="http://www.george-orwell.org/1984/0.html">一九八四</a></cite>
    》第一部第一章的首句。
  </figcaption>
</figure>
```

```
cite {
  /* 在此添加你的样式 */
}
```

## [属性](#属性)

此元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

在 `<cite>` 元素的语境中，创作作品可以是以下其中一种：

-   一本书
-   一篇研究论文
-   一篇散文
-   一首诗
-   一份乐谱
-   一首歌曲
-   一部戏剧或电影剧本
-   一部电影
-   一档电视节目
-   一款游戏
-   一座雕塑
-   一幅画
-   一场戏剧演出
-   一部戏剧
-   一部歌剧
-   一部音乐剧
-   一场展览
-   一份法律案件报告
-   一个计算机程序
-   一个网站
-   一个网页
-   一篇博客文章或评论
-   一篇论坛帖子或评论
-   一条推文
-   一条 Facebook 帖子
-   一份书面或口头陈述
-   等等。

若要标明包含在 [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote) 或 [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) 元素中的引文来源，请在该元素上使用 [`cite`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote#cite) 属性。

通常，浏览器默认以斜体样式呈现 `<cite>` 元素的内容。若要避免这一点，请对 `<cite>` 元素应用 CSS [`font-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-style) 属性。

## [示例](#示例)

html

```
<p>更多信息请参见 <cite>[ISO-0000]</cite>。</p>
```

### [结果](#结果)

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://w3c.github.io/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任意</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a>。在 Gecko 1.9.2（Firefox 4）及更早版本中，Firefox 对该元素实现的是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSpanElement"><code>HTMLSpanElement</code></a> 接口。</td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-cite-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   用于长引用的 [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote) 元素。
-   用于行内引用的 [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) 元素，以及 [`cite`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q#cite) 属性。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月7日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite/contributors.txt)更新。
