当布尔属性 **`disabled`** 存在时，元素将不可变、不能聚焦或与表单一同提交。用户将不能在表单控件本身或其子控件进行编辑或聚焦操作。

## [尝试一下](#尝试一下)

```
<form>
  <label for="name">Name:</label>
  <input id="name" name="name" type="text" />

  <label for="emp">Employed:</label>
  <select id="emp" name="emp" disabled>
    <option>No</option>
    <option>Yes</option>
  </select>

  <label for="empDate">Employment Date:</label>
  <input id="empDate" name="empDate" type="date" disabled />

  <label for="resume">Resume:</label>
  <input id="resume" name="resume" type="file" />
</form>
```

```
label {
  display: block;
  margin-top: 1em;
}

*:disabled {
  background-color: dimgrey;
  color: linen;
  opacity: 1;
}
```

## [总览](#总览)

如果在表单控件上指定了 `disabled` 属性，则该元素及其子控件不参与约束验证。通常浏览器会将它们打灰处理，它不会收到任何浏览事件，如鼠标点击或与焦点相关的事件。

这些元素支持 `disabled` 属性：[`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)、[`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup)、[`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)、[`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 和 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)。

这个布尔型 disabled 属性表示用户不能与该控件或其后代控件进行交互。如果没有指定这个属性，控件会从包含元素中继承其设置，例如 `fieldset`；如果没有设置 `disabled` 属性的包含元素，并且控件本身没有这个属性，那么该控件是启用的。如果在 [`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup) 上声明，选择仍然是交互式的（除非另行禁用），但选项组中的项目都不能选择。

当一个支持的元素应用了 `disabled` 属性，[`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:disabled) 伪类也适用于它。反之，支持 `disabled` 属性但没有设置该属性的元素与 [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:enabled) 伪类匹配。

这个布尔属性可以防止用户与按钮进行交互。如果没有设置这个属性，按钮仍然可以从一个包含元素中被禁用，例如 [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)；如果没有设置 `disabled` 属性的包含元素，那么按钮就是启用的。

与其他浏览器不同的是，Firefox 会在不同的页面加载中持续保持 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button) 的动态禁用状态。使用 [`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete) 属性来控制这个特性。

### [属性交互](#属性交互)

`disabled` 和 [`readonly`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/readonly) 之间的区别是，只读控件仍然可以发挥作用，仍然可以聚焦，而禁用控件不能接受聚焦，也不随表单提交，通常在启用之前不能作为控件发挥作用。

因为不能改变一个禁用字段的值，所以 [`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required) 对同时指定 `disabled` 属性的输入没有任何影响。此外，由于元素变得不可改变，大多数其他属性，如 [`pattern`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/pattern)，在控件被启用之前没有任何作用。

**备注：**`required` 属性不可在含有 `disabled` 属性的 input 元素上使用。

### [可用性](#可用性)

浏览器将禁用的表单控件显示为灰色，因为禁用的表单控件是不可改变的，不会收到焦点或任何浏览事件，如鼠标点击或与焦点相关的事件，也不会随表单提交。

如果所支持的元素上存在该属性，将匹配 [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:disabled) 伪类。如果该属性未被包含，则将匹配 [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:enabled) 伪类。如果该元素不支持 disabled 属性，该属性将没有任何作用，包括不会导致被 `:disabled` 和 `:enabled` 伪类匹配。

### [约束验证](#约束验证)

如果该元素含有 `disabled` 属性，那么该元素的值就不能聚焦，不能被用户更新，也不参与约束验证。

## [示例](#示例)

当表单控件被禁用时，许多浏览器会默认以较浅的灰色显示它们。下面是禁用复选框、单选按钮、[`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option) 和 [`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup) 的例子，以及一些通过在祖先 [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset) 元素上设置的禁用属性禁用的表单控件。[`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option) 是禁用的，但 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 本身却没有。我们可以通过为该元素而不是其子元素添加属性来禁用整个 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)。

html

```
<fieldset>
  <legend>复选框</legend>
  <p>
    <label> <input type="checkbox" name="chbox" value="regular" /> 普通 </label>
  </p>
  <p>
    <label>
      <input type="checkbox" name="chbox" value="disabled" disabled /> 禁用
    </label>
  </p>
</fieldset>

<fieldset>
  <legend>单选按钮</legend>
  <p>
    <label> <input type="radio" name="radio" value="regular" /> 普通 </label>
  </p>
  <p>
    <label>
      <input type="radio" name="radio" value="disabled" disabled /> 禁用
    </label>
  </p>
</fieldset>

<p>
  <label
    >选择一个选项：
    <select>
      <optgroup label="第一组">
        <option>选项 1.1</option>
      </optgroup>
      <optgroup label="第二组">
        <option>选项 2.1</option>
        <option disabled>选项 2.2</option>
        <option>选项 2.3</option>
      </optgroup>
      <optgroup label="第三组" disabled>
        <option>禁用的 3.1</option>
        <option>禁用的 3.2</option>
        <option>禁用的 3.3</option>
      </optgroup>
    </select>
  </label>
</p>

<fieldset disabled>
  <legend>禁用的 fieldset</legend>
  <p>
    <label> 名字：<input type="name" name="radio" value="普通" /> </label>
  </p>
  <p>
    <label>数字：<input type="number" /></label>
  </p>
</fieldset>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-fe-disabled](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled) |
| [HTML  
\# attr-optgroup-disabled](https://html.spec.whatwg.org/multipage/form-elements.html#attr-optgroup-disabled) |
| [HTML  
\# attr-option-disabled](https://html.spec.whatwg.org/multipage/form-elements.html#attr-option-disabled) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.button.disabled](#html.elements.button.disabled)

### [html.elements.fieldset.disabled](#html.elements.fieldset.disabled)

### [html.elements.input.disabled](#html.elements.input.disabled)

### [html.elements.optgroup.disabled](#html.elements.optgroup.disabled)

### [html.elements.option.disabled](#html.elements.option.disabled)

### [html.elements.select.disabled](#html.elements.select.disabled)

### [html.elements.textarea.disabled](#html.elements.textarea.disabled)

## [参见](#参见)

-   [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:disabled) 和 [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:enabled)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/disabled/contributors.txt)更新。
