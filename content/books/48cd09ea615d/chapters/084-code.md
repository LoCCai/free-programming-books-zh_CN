基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<code>`** 元素为其显示的内容添加用以表明其中的文本是一段简短的计算机代码的样式。默认情况下，内容文本使用[用户代理](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)默认的等宽字体显示。

## [尝试一下](#尝试一下)

```
<p>
  The <code>push()</code> method adds one or more elements to the end of an
  array and returns the new length of the array.
</p>
```

```
code {
  background-color: #eee;
  border-radius: 3px;
  font-family: courier, monospace;
  padding: 0 3px;
}
```

## [属性](#属性)

此元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

这是一段包含 `<code>` 的文字：

html

```
<p>
  函数
  <code>selectAll()</code>
  将高亮显示输入字段中的所有文本，以便用户可以复制或删除文本。
</p>
```

### [结果](#结果)

## [备注](#备注)

要表示多行代码，可在 [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre) 元素中封装 `<code>` 元素。`<code>` 元素本身只能表示一段代码短语或一行代码。

可为 `code` 选择器定义 CSS 规则，以覆盖浏览器的默认字体。用户设置的首选项可能优先于指定的 CSS。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/structural_roles#%E5%8C%85%E5%90%AB_html_%E7%AD%89%E4%BB%B7%E5%BD%A2%E5%BC%8F%E7%9A%84%E7%BB%93%E6%9E%84%E8%A7%92%E8%89%B2">code</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任何</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a>，在 Gecko 1.9.2（包括 Firefox 4）版本之前，Firefox 为该元素实现了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSpanElement"><code>HTMLSpanElement</code></a> 接口。</td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-code-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-code-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/samp)
-   [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/kbd)
-   [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/var)
-   [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code/contributors.txt)更新。
