当 **`readonly`** 布尔属性存在时，元素是不可变的，意味着用户无法编辑控件。

## [尝试一下](#尝试一下)

```
<label for="firstName">First Name:</label>
<input id="firstName" name="firstName" type="text" value="Adam" />

<label for="age">Age:</label>
<input id="age" name="age" type="number" value="42" readonly />

<label for="hobbies">Hobbies:</label>
<textarea id="hobbies" name="hobbies" readonly>Baseball</textarea>
```

```
label {
  display: block;
  margin-top: 1em;
}

input:read-only,
textarea:read-only {
  background-color: silver;
}
```

## [概述](#概述)

如果在 input 元素上指定了 `readonly` 属性，由于用户无法编辑输入内容，因此该元素不参与约束验证。

`[text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text)`、`[search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/search)`、`[url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url)`、`[tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/tel)`、`[email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email)`、`[password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password)`、`[date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)`、`[month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month)`、`[week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week)`、`[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)`、`[datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)`、`[number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number)` 这些 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 类型和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 表单控件元素均支持 `readonly` 属性。如果这些输入类型和元素中存在这个属性，则匹配 [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-only) 伪类。如果不包含该属性，则将匹配 [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-write) 伪类。

该属性不支持 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 或已不可变的 input 类型，也与之无关，如 `[checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/checkbox)`、`[radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/radio)` 或根据定义不能以值开头的 input 类型，如 `[file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file)` input 类型。`[range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range)` 和 `[color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/color)` 都有默认值。`[hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/hidden)` input 类型也不支持该属性，因为用户不可能填写隐藏的表单。也不支持任何按钮类型，包括 `image`。

**备注：**只有文本控件可以设置为只读，因为对于其他控件（如复选框和按钮）来说，只读和禁用之间没有任何有用的区别，所以 `readonly` 属性并不适用。

当输入具有 `readonly` 属性时，[`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-only) 伪类也适用于该输入。反之，支持 `readonly` 属性但未设置该属性的输入将匹配 [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-write) 伪类。

### [属性交互](#属性交互)

[`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/disabled) 与 `readonly` 的区别在于，只读控件仍可发挥作用，仍可被聚焦，而禁用控件不能接收聚焦，不能随表单提交，一般在启用前不能作为控件发挥作用。

由于只读字段不能通过用户交互改变其值，因此 [`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required) 对同时指定了 `readonly` 属性的输入没有任何影响。

动态修改只读属性值的唯一方法是通过脚本。

**备注：**`required` 属性不可以在指定了 `readonly` 属性上的 input 控件上使用。

### [可用性](#可用性)

浏览器会显示 `readonly` 属性。

### [约束验证](#约束验证)

如果元素是只读的，则用户不能更新该元素的值，元素的值也不参与约束验证。

## [示例](#示例)

### [HTML](#html)

html

```
<div class="group">
  <input type="text" value="一些值" readonly="readonly" id="text" />
  <label for="text">文本框</label>
</div>
<div class="group">
  <input type="date" value="2020-01-01" readonly="readonly" id="date" />
  <label for="date">日期</label>
</div>
<div class="group">
  <input type="email" value="一些值" readonly="readonly" id="email" />
  <label for="email">电子邮件</label>
</div>
<div class="group">
  <input type="password" value="一些值" readonly="readonly" id="pwd" />
  <label for="pwd">密码</label>
</div>
<div class="group">
  <textarea readonly="readonly" id="ta">一些值</textarea>
  <label for="ta">消息</label>
</div>
```

### [结果](#结果)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-readonly](https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly) |
| [HTML  
\# attr-textarea-readonly](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-readonly) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.readonly](#html.elements.input.readonly)

### [html.elements.textarea.readonly](#html.elements.textarea.readonly)

## [参见](#参见)

-   [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-only) 和 [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-write) 伪类
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/readonly/contributors.txt)更新。
