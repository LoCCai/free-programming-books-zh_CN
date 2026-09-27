**`size`** 属性定义了 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素的宽度和 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 元素的高度。对于 `input`，如果 `type` 属性是 [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text) 或 [password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password) ，那么它就是字符数。字符数必须是 0 或更大的整数。如果没有指定 `size`，或指定的值无效，则不会声明输入的大小，表单控件将采用基于用户代理的默认宽度。如果 CSS 目标元素的属性会影响宽度，则 CSS 优先。

`size` 属性对约束验证没有影响。

## [尝试一下](#尝试一下)

```
<label for="firstName">First Name:</label>
<input id="firstName" name="firstName" type="text" size="10" />

<label for="lastName">Last Name:</label>
<input id="lastName" name="lastName" type="text" size="20" />

<label for="fruit">Favourite fruit:</label>
<select id="fruit" name="fruit" size="2">
  <option>Orange</option>
  <option>Banana</option>
  <option>Apple</option>
</select>
```

```
label {
  display: block;
  margin-top: 1rem;
}
```

## [示例](#示例)

通过在某些输入类型上添加 `size` 可以控制输入的宽度。在选择项上添加 size 会改变高度，从而定义在关闭状态下有多少选项是可见的。

html

```
<label for="fruit">选择一种水果</label>
<input type="text" size="15" id="fruit" />
<label for="vegetable">选择一种蔬菜</label>
<input type="text" id="vegetable" />

<select name="fruits" size="5">
  <option>香蕉</option>
  <option>樱桃</option>
  <option>草莓</option>
  <option>榴莲</option>
  <option>蓝莓</option>
</select>

<select name="vegetables" size="5">
  <option>胡萝卜</option>
  <option>黄瓜</option>
  <option>菜花</option>
  <option>芹菜</option>
  <option>油麦菜</option>
</select>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-select-size](https://html.spec.whatwg.org/multipage/form-elements.html#attr-select-size) |
| [HTML  
\# attr-input-size](https://html.spec.whatwg.org/multipage/input.html#attr-input-size) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.select.size](#html.elements.select.size)

### [html.elements.input.size](#html.elements.input.size)

## [参见](#参见)

-   [`maxlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/maxlength)
-   [`minlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/minlength)
-   [`pattern`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/pattern)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/size/contributors.txt)更新。
