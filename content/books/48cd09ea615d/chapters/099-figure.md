基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<figure>`** 元素代表一段独立的内容，可能包含 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption) 元素定义的说明元素。该插图、标题和其中的内容通常作为一个独立的引用单元。

## [尝试一下](#尝试一下)

```
<figure>
  <img
    src="https://developer.mozilla.org/shared-assets/images/examples/elephant.jpg"
    alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>
```

```
figure {
  border: thin #c0c0c0 solid;
  display: flex;
  flex-flow: column;
  padding: 5px;
  max-width: 220px;
  margin: auto;
}

img {
  max-width: 220px;
  max-height: 150px;
}

figcaption {
  background-color: #222;
  color: #fff;
  font: italic smaller sans-serif;
  padding: 3px;
  text-align: center;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a></td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption"><code>&lt;figcaption&gt;</code></a> 元素，且紧随着<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>；或紧随流式内容的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption"><code>&lt;figcaption&gt;</code></a> 元素；或流式内容。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>所有接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素</td></tr><tr><th scope="row">明确的 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/figure_role">figure</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>无子 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption">figcaption</a> 元素：<a href="https://www.w3.org/TR/html-aria/#dfn-any-role" target="_blank" title="外部链接（在新标签页中打开）">any</a>，否则没有允许的角色</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [属性](#属性)

此元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

-   通常，`<figure>` 的内容为图像、插图、图表、代码片段等，在文档的主内容流中引用，但可以移动到文档的另一部分或附录而不影响主内容流。
-   通过在其中插入 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption)（作为第一个或最后一个子元素），可以将标题与 `<figure>` 元素相关联。图中找到的第一个 `<figcaption>` 元素显示为图的标题。

## [示例](#示例)

### [图像](#图像)

html

```
<!-- 只有图像 -->
<figure>
  <img
    src="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure/favicon-192x192.png"
    alt="The beautiful MDN logo." />
</figure>

<!-- 有标题的图像 -->
<figure>
  <img
    src="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure/favicon-192x192.png"
    alt="The beautiful MDN logo." />
  <figcaption>MDN Logo</figcaption>
</figure>
```

### [代码段](#代码段)

html

```
<figure>
  <figcaption>使用 <code>navigator</code> 获取浏览器的信息。</figcaption>
  <pre>
function NavigatorExample() {
  var txt;
  txt = "Browser CodeName: " + navigator.appCodeName + "; ";
  txt+= "Browser Name: " + navigator.appName + "; ";
  txt+= "Browser Version: " + navigator.appVersion  + "; ";
  txt+= "Cookies Enabled: " + navigator.cookieEnabled  + "; ";
  txt+= "Platform: " + navigator.platform  + "; ";
  txt+= "User-agent header: " + navigator.userAgent  + "; ";
  console.log("NavigatorExample", txt);
}
  </pre>
</figure>
```

### [引用](#引用)

html

```
<figure>
  <figcaption><b>Edsger Dijkstra:</b></figcaption>
  <blockquote>
    If debugging is the process of removing software bugs, then programming must
    be the process of putting them in.
  </blockquote>
</figure>
```

### [诗歌](#诗歌)

html

```
<figure>
  <p style="white-space:pre">
    Bid me discourse, I will enchant thine ear, Or like a fairy trip upon the
    green, Or, like a nymph, with long dishevelled hair, Dance on the sands, and
    yet no footing seen: Love is a spirit all compact of fire, Not gross to
    sink, but light, and will aspire.
  </p>
  <figcaption><cite>Venus and Adonis</cite>, by William Shakespeare</figcaption>
</figure>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-figure-element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption) 元素

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figure/contributors.txt)更新。
