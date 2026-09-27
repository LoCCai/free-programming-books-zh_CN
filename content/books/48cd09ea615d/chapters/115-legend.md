基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<legend>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示其父元素 [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset) 内容的标题。

## [尝试一下](#尝试一下)

```
<fieldset>
  <legend>Choose your favorite monster</legend>

  <input type="radio" id="kraken" name="monster" value="K" />
  <label for="kraken">Kraken</label><br />

  <input type="radio" id="sasquatch" name="monster" value="S" />
  <label for="sasquatch">Sasquatch</label><br />

  <input type="radio" id="mothman" name="monster" value="M" />
  <label for="mothman">Mothman</label>
</fieldset>
```

```
legend {
  background-color: #000;
  color: #fff;
  padding: 3px 6px;
}

input {
  margin: 0.4rem;
}
```

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [示例](#示例)

有关 `<legend>` 的示例，请参阅 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form)。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>和<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">标题</a>（h1–h6 元素）。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset"><code>&lt;fieldset&gt;</code></a>，其第一个子元素是此 <code>&lt;legend&gt;</code> 元素</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code>。</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLLegendElement"><code>HTMLLegendElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-legend-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [ARIA：Form 角色](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/form_role)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend/contributors.txt)更新。
