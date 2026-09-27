基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML `<blockquote>` 元素**（或者 HTML 块级引用元素），代表其中的文字是引用内容。通常在渲染时，这部分的内容会有一定的缩进（[注](#Notes) 中说明了如何更改）。若引文来源于网络，则可以将原内容的出处 URL 地址设置到 cite 特性上，若要以文本的形式告知读者引文的出处时，可以通过 [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite) 元素。

## [尝试一下](#尝试一下)

```
<div>
  <blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>
      Words can be like X-rays, if you use them properly—they’ll go through
      anything. You read and you’re pierced.
    </p>
  </blockquote>
  <p>—Aldous Huxley, <cite>Brave New World</cite></p>
</div>
```

```
div:has(> blockquote) {
  background-color: #ededed;
  margin: 10px auto;
  padding: 15px;
  border-radius: 5px;
}

blockquote p::before {
  content: "\201C";
}

blockquote p::after {
  content: "\201D";
}

blockquote + p {
  text-align: right;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">Content categories</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">Flow content</a>, sectioning root, palpable content.</td></tr><tr><th scope="row">Permitted content</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">Flow content</a>.</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">Permitted parents</th><td>Any element that accepts <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">flow content</a>.</td></tr><tr><th scope="row">Permitted ARIA roles</th><td>Any</td></tr><tr><th scope="row">DOM interface</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLQuoteElement"><code>HTMLQuoteElement</code></a></td></tr></tbody></table>

## [属性](#属性)

此元素的属性包含 [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`cite`](#cite)

是一个标注引用的信息的来源文档或者相关信息的 URL。通常用来描述能够解释引文的上下文或者引用的信息。

## [使用说明](#使用说明)

若要修改被引用内容的缩进距离，可以使用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) [`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-left) 和/或 [`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin-right) 属性，或使用 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin) 缩写属性。

若想使用在行内引用较短的内容而非创建一个单独的引用块，可使用 [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q)（Quotation）元素。

如果想要使用短引用（行间引用），可以使用[`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) 标签。

## [示例](#示例)

下面的这个例子演示了使用 `<blockquote>` 元素引用一段来自 [RFC 1149](https://datatracker.ietf.org/doc/html/rfc1149 "外部链接（在新标签页中打开）") 的内容，以禽类作为载体的 IP 数据包传输标准。

html

```
<blockquote cite="https://tools.ietf.org/html/rfc1149">
  <p>
    Avian carriers can provide high delay, low throughput, and low altitude
    service. The connection topology is limited to a single point-to-point path
    for each carrier, used with standard carriers, but many carriers can be used
    without significant interference with each other, outside of early spring.
    This is because of the 3D ether space available to the carriers, in contrast
    to the 1D ether used by IEEE802.3. The carriers have an intrinsic collision
    avoidance system, which increases availability.
  </p>
</blockquote>
```

上面的 HTML 代码将会生成：

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-blockquote-element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   适用于行内引用的 [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) 元素。
-   适用于来源引文的 [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite) 元素。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote/contributors.txt)更新。
