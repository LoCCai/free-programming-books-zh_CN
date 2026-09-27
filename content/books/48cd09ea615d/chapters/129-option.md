## [尝试一下](#尝试一下)

```
<label for="pet-select">选择一只宠物：</label
><select id="pet-select">
  <option value="">--请选择一个选项--</option>
  <option value="dog">狗</option>
  <option value="cat">猫</option>
  <option value="hamster">仓鼠</option>
  <option value="parrot">鹦鹉</option>
  <option value="spider">蜘蛛</option>
  <option value="goldfish">金鱼</option>
</select>
```

```
label {
  font-family: sans-serif;
  font-size: 1rem;
  padding-right: 10px;
}

select {
  font-size: 0.9rem;
  padding: 2px 5px;
}
```

## [属性](#属性)

该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/disabled)

如果设置了这个布尔属性，则该选项不可被选中。浏览器通常会将这样的控件显示为灰色，并且不会接收任何浏览事件，例如鼠标点击或与焦点相关的事件。如果未设置该属性，当某个父元素是被禁用的 [`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup) 时，该元素仍然会被禁用。

[`label`](#label)

该属性是用于指示此选项含义的标签文本。如果未定义 `label` 属性，其值将取自元素的文本内容。

[`selected`](#selected)

如果存在，该布尔属性表示此选项在初始时被选中。如果该 `<option>` 元素属于一个未设置 [`multiple`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select#multiple) 属性的 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 元素，则在该 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 中只能有一个 `<option>` 具有 `selected` 属性。

[`value`](#value)

该属性的内容表示当此选项被选中时，随表单一起提交的值。如果省略该属性，其值将取自该 option 元素的文本内容。

## [使用 CSS 进行样式设置](#使用_css_进行样式设置)

对 `<option>` 元素的样式定制在历史上一直非常受限。[可自定义的 select 元素](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)介绍了能够对其进行完整自定义的新特性，使其像任何常规 DOM 元素一样可被样式化。

### [旧版 option 样式](#旧版_option_样式)

在不支持现代自定义功能的浏览器中（或在无法使用这些功能的旧代码库中），`<option>` 元素可用的样式取决于浏览器和操作系统。根据不同的操作系统，Firefox 和 Chromium 会遵循所属 `<select>` 的 [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-size)。Chromium 可能还允许设置 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color)、[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color)、[`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-family)、[`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-variant) 和 [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align)。

关于旧版 `<option>` 样式的更多细节，请参阅我们的[高级表单样式指南](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling)。

## [示例](#示例)

示例请参见 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无。</td></tr><tr><th scope="row">允许的内容</th><td>在传统的 <code>&lt;select&gt;</code> 元素中，只允许文本内容，可能包含转义字符（例如 <code>&amp;eacute;</code>）。在<a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select">可自定义的 select 元素</a>中，<code>&lt;option&gt;</code> 元素可以包含任意内容。</td></tr><tr><th scope="row">标签省略</th><td>开始标签是必需的。如果该元素后面紧跟另一个 <code>&lt;option&gt;</code> 元素或一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup"><code>&lt;optgroup&gt;</code></a>，或者父元素中没有更多内容，则结束标签是可选的。</td></tr><tr><th scope="row">允许的父元素</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select"><code>&lt;select&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup"><code>&lt;optgroup&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist"><code>&lt;datalist&gt;</code></a> 元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/option_role"><code>option</code></a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLOptionElement"><code>HTMLOptionElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-option-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他与表单相关的元素：[`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form)、[`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend)、[`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)、[`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)、[`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist)、[`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup)、[`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)、[`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) 和 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)。
-   [可自定义的 select 元素](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年12月13日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option/contributors.txt)更新。
