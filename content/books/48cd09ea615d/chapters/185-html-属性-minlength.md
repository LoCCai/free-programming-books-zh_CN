**`minlength`** 属性定义了用户可以在 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 中输入的[字符串长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)的最小值。该属性的值必须是非负整数。

字符串长度是以 UTF-16 码元为单位进行计算的，通常（[对大多数文本而言](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length#%E9%95%BF%E5%BA%A6%E4%B8%8D%E7%AD%89%E4%BA%8E%E5%AD%97%E7%AC%A6%E6%95%B0%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2)）等同于字符个数。如果未指定 `minlength`，或指定了无效值，则输入将没有最小长度限制。该值必须小于或等于 [maxlength](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/maxlength) 的值，否则该值将永远无效，因为不可能同时满足这两个条件。

如果字段文本值的长度小于 `minlength` 的 UTF-16 码元长度，输入将无法通过约束验证，[`validityState.tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort) 将返回 `true`。只有当用户更改值时，才会应用限制验证。一旦提交失败，某些浏览器会显示错误信息，说明所需的最小长度和当前长度。

`minlength` 不意味着输入为 [`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required)；只有当用户输入了一个值时，输入才会违反 `minlength` 约束。如果输入不是 `required` 的，即使设置了 `minlength`，也可以提交空字符串。

## [尝试一下](#尝试一下)

```
<label for="name">Product name:</label>
<input
  id="name"
  name="name"
  type="text"
  value="Shampoo"
  minlength="3"
  maxlength="20"
  required />

<label for="description">Product description:</label>
<textarea
  id="description"
  name="description"
  minlength="10"
  maxlength="40"
  required></textarea>
```

```
label {
  display: block;
  margin-top: 1em;
}

input:valid,
textarea:valid {
  background-color: palegreen;
}
```

## [示例](#示例)

通过指定 `minlength="5"`，值要么为空，要么至少为 5 个字符时才为有效。

html

```
<label for="fruit">输入长度至少为 5 个字母的水果名称</label>
<input type="text" minlength="5" id="fruit" />
```

我们可以使用伪类，根据值是否有效来设计元素样式。只要值为空或其长度大于等于 5，该值就是有效的。如 _Lime_ 是无效的，而 _lemon_ 是有效的。

css

```
input {
  border: 2px solid currentcolor;
}
input:invalid {
  border: 2px dashed red;
}
input:invalid:focus {
  background-image: linear-gradient(pink, lightgreen);
}
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-minlength](https://html.spec.whatwg.org/multipage/input.html#attr-input-minlength) |
| [HTML  
\# attr-textarea-minlength](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-minlength) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.minlength](#html.elements.input.minlength)

### [html.elements.textarea.minlength](#html.elements.textarea.minlength)

## [参见](#参见)

-   [`maxlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/maxlength)
-   [`size`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/size)
-   [`pattern`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/pattern)
-   [约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [表单验证](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/minlength/contributors.txt)更新。
