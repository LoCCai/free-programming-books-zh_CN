**`maxlength`** 属性定义了用户可以在 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 中输入的[字符串长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)的最大值。该属性的值必须是非负整数。

字符串长度是以 UTF-16 码元为单位进行计算的，通常（[对于大多数语言脚本](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length#%E9%95%BF%E5%BA%A6%E4%B8%8D%E7%AD%89%E4%BA%8E%E5%AD%97%E7%AC%A6%E6%95%B0%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2)）等同于字符个数。如果未指定 `maxlength`，或指定了无效值，则输入将没有最大长度限制。

任何 `maxlength` 的值必须大于或等于 [`minlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/minlength) 的值（如果存在且有效）。如果字段文本值的长度超过了 `maxlength` 的 UTF-16 码元长度，输入将无法通过约束验证。约束验证仅在用户更改值时应用。

### [约束验证](#约束验证)

虽然浏览器通常会阻止用户输入超过 maxlength 属性允许的文本长度，但如果输入的长度确实超出了 maxlength 的限制，[`ValidityState`](https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState) 对象的 [`tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong "tooLong") 属性会返回 true。

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

html

```
<input type="password" maxlength="4" />
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-maxlength](https://html.spec.whatwg.org/multipage/input.html#attr-input-maxlength) |
| [HTML  
\# attr-textarea-maxlength](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-maxlength) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.maxlength](#html.elements.input.maxlength)

### [html.elements.textarea.maxlength](#html.elements.textarea.maxlength)

## [参见](#参见)

-   [`minlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/minlength)
-   [`size`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/size)
-   [`pattern`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/pattern)
-   [约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [表单验证](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/maxlength/contributors.txt)更新。
