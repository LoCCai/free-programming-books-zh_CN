基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<fieldset>`** 元素用于对表单中的控制元素进行分组（也包括 label 元素）。

## [尝试一下](#尝试一下)

```
<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster" value="K" />
    <label for="kraken">Kraken</label><br />

    <input type="radio" id="sasquatch" name="monster" value="S" />
    <label for="sasquatch">Sasquatch</label><br />

    <input type="radio" id="mothman" name="monster" value="M" />
    <label for="mothman">Mothman</label>
  </fieldset>
</form>
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

如上述例子所示，`<fieldset>` 元素将一个 HTML 表单的一部分组成一组，内置了一个 [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) 元素作为 `fieldset` 的标题。这个元素有几个属性，最值得注意的是 `form`，其可以包含同一页面的 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素的 `id`，以使 `<fieldset>` 成为这个 `<form>` 的一部分，即使 `<fieldset>` 不在其内。还有 `disabled` 属性，可将 `<fieldset>` 及其所有内容设置为不可用。

## [属性](#属性)

这个元素包含[所有全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`disabled`](#disabled)

如果设置了这个 bool 值属性，`<fieldset>` 的所有子代表单控件也会继承这个属性。这意味着它们不可编辑，也不会随着 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 一起提交。它们也不会接收到任何浏览器事件，如鼠标点击或与聚焦相关的事件。默认情况下，浏览器会将这样的控件展示为灰色。注意，[`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) 中的表单元素不会被禁用。

[`form`](#form)

将该值设为一个 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素的 [`id`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#id) 属性值以将 `<fieldset>` 设置成这个 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 的一部分。

[`name`](#name)

元素分组的名称

**备注：**fieldset 的标题由第一个 [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) 子元素确定。

## [使用 CSS 样式](#使用_css_样式)

`<fieldset>` 有几种特别的样式方案。

它的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display) 值默认为 `block`，因此建立了一个[区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Display/Block_formatting_context)。如果将 `<fieldset>` 的 `display` 值设置为行内级别，则会表现为 `inline-block`，否则会表现为 `block`。默认情况下 `<fieldset>` 会有 `2px` `groove` 的边界围绕着内容，还有一个默认的小的内边距，还有 [`min-inline-size: min-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/min-inline-size) 。

如果其中有 [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) 元素，会放在块级框起始处的边界上。`<legend>` 的宽度会根据内容尽量收缩（shrink-wrap），同时也建立了一个格式化上下文。`display` 值会块级化（例如 `display: inline` 表现为 `block`）。

一个匿名的框会包围 `<fieldset>` 的内容，这个框继承了 `<fieldset>` 的一些属性。如果将 `<fieldset>` 的样式设置为 `display: grid` 或 `display: inline-grid`，那么这个匿名框也会是栅格上下文。如果将 `<fieldset>` 的样式设置为 `display: flex` 或 `display: inline-flex`，则匿名框也会是弹性盒上下文。除上述情况之外，匿名框默认建立块级格式化上下文。

你可以以任意方式自行设置 `<fieldset>` 和 `<legend>` 的样式以配合你的页面设计。

## [示例](#示例)

### [简单的 fieldset](#简单的_fieldset)

这个例子展示了一个非常简单的 `<fieldset>`，其中有一个 `<legend>`和一个简单的控件。

html

```
<form action="#">
  <fieldset>
    <legend>Simple fieldset</legend>
    <input type="radio" id="radio" />
    <label for="radio">Spirit of radio</label>
  </fieldset>
</form>
```

### [禁用 fieldset](#禁用_fieldset)

这个例子展示了一个被禁用的 `<fieldset>` ，其中有两个控件。注意随着 `<fieldset>` 被一起禁用的控件如何表现。

html

```
<form action="#">
  <fieldset disabled>
    <legend>Disabled fieldset</legend>
    <div>
      <label for="name">Name: </label>
      <input type="text" id="name" value="Chris" />
    </div>
    <div>
      <label for="pwd">Archetype: </label>
      <input type="password" id="pwd" value="Wookie" />
    </div>
  </fieldset>
</form>
```

## [技术概览](#技术概览)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容目录</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">Flow content</a>, <a data-href="/zh-CN/docs/Sections_and_Outlines_of_an_HTML5_document#sectioning_root" title="此文档尚未被撰写，期待你的贡献！">sectioning root</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#form_listed">listed</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#form-associated_content">form-associated</a> element, palpable content.</td></tr><tr><th scope="row">允许的内容</th><td>可选的<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend"><code>&lt;legend&gt;</code></a> 元素，后面是内容流（flow content）</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>Any element that accepts <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">flow content</a>.</td></tr><tr><th scope="row">默认 ARIA role</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role"><code>group</code></a></td></tr><tr><th scope="row">允许的 ARIA roles</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/radiogroup_role"><code>radiogroup</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFieldSetElement"><code>HTMLFieldSetElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-fieldset-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) |

## [浏览器兼容性](#浏览器兼容性)

\[1\] 在 IE11 中 disabled 的 fieldset 的子元素并不会全都被 disabled; 相关 Issues: [IE bug 817488: `input[type="file"]` not disabled inside disabled `fieldset`](https://connect.microsoft.com/IE/feedbackdetail/view/817488 "外部链接（在新标签页中打开）") and [IE bug 962368: Can still edit `input[type="text"]` within `fieldset[disabled]`](https://connect.microsoft.com/IE/feedbackdetail/view/962368/can-still-edit-input-type-text-within-fieldset-disabled "外部链接（在新标签页中打开）").

## [参见](#参见)

-   [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) 元素
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素
-   [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素
-   [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset/contributors.txt)更新。
