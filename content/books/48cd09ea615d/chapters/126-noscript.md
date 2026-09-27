基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<noscript>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素定义了在页面上的脚本类型不支持或浏览器当前关闭脚本时插入的 HTML 部分。

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

html

```
<noscript>
  <!-- 外部文件的锚链接 -->
  <a href="https://www.mozilla.org/">外部链接</a>
</noscript>
<p>摇滚！</p>
```

### [启用脚本后的结果](#启用脚本后的结果)

摇滚！

### [禁用脚本后的结果](#禁用脚本后的结果)

[外部链接](https://www.mozilla.org/ "外部链接（在新标签页中打开）")

摇滚！

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%85%83%E6%95%B0%E6%8D%AE%E5%86%85%E5%AE%B9">元数据内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td>当脚本被禁用并且是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素的后代时：按任意顺序，零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link"><code>&lt;link&gt;</code></a> 元素、零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style"><code>&lt;style&gt;</code></a> 元素，以及零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta"><code>&lt;meta&gt;</code></a> 元素。<br>当脚本被禁用且不是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素的后代时：任何<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E9%80%8F%E6%98%8E%E5%86%85%E5%AE%B9%E6%A8%A1%E5%9E%8B">透明内容</a>，但其后代中不得包含 <code>&lt;noscript&gt;</code> 元素。<br>否则：流内容或短语内容。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。如果没有祖先 <code>&lt;noscript&gt;</code> 元素，或者在 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素中（但仅限于 HTML 文档），同样如果没有任何祖先 <code>&lt;noscript&gt;</code> 元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-noscript-element](https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript/contributors.txt)更新。
