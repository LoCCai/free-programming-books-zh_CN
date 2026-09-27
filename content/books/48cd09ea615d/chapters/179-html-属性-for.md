**`for`** 属性是 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 和 [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output) 允许使用的属性。当用于 `<label>` 元素时，它表示该标签所描述的表单元素。当用于 `<output>` 元素时，它允许在代表输出中使用的值的元素之间建立明确的关系。

## [尝试一下](#尝试一下)

```
<p>
  <label>First Name (no "for" attribute):</label>
  <input id="first" type="text" value="Jane" />
</p>
<p>
  <label for="last">Last Name (w/ "for" attribute):</label>
  <input id="last" type="text" value="Doe" />
</p>
<p id="result">
  <strong id="result-label">Full Name:</strong>
  <output for="first last" aria-labelledby="result-label" id="output"></output>
</p>
```

```
label[for="paragraph"] {
  color: rebbeccapurple;
}

#result {
  text-align: center;
}

#result-label {
  font-size: 16pt;
}

#result-label,
#output {
  display: block;
}
```

```
const firstNameEl = document.getElementById("first");
const lastNameEl = document.getElementById("last");
const outputEl = document.getElementById("output");

function updateOutput() {
  const value = `${firstNameEl.value} ${lastNameEl.value}`;
  outputEl.innerText = value;
}

updateOutput();
firstNameEl.addEventListener("input", updateOutput);
lastNameEl.addEventListener("input", updateOutput);
```

## [使用说明](#使用说明)

当作为 `<label>` 的属性使用时，`for` 属性的值是与之相关的表单元素的`id`。

html

```
<label for="username">你的名字</label> <input type="text" id="username" />
```

作为 `<output>` 的属性使用时，`for` 属性的值是一个空格分隔的列表，其中包含用于创建输出的元素的 `id` 值。

html

```
<input type="range" id="b" name="b" value="50" /> +
<input type="number" id="a" name="a" value="10" /> =
<output name="result" for="a b">60</output>
```

## [示例](#示例)

请参阅 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 和 [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output) 的元素页面上的使用示例。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-label-for](https://html.spec.whatwg.org/multipage/forms.html#attr-label-for) |
| [HTML  
\# attr-output-for](https://html.spec.whatwg.org/multipage/form-elements.html#attr-output-for) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.label.for](#html.elements.label.for)

### [html.elements.output.for](#html.elements.output.for)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/for/contributors.txt)更新。
