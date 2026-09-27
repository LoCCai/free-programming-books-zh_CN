**`placeholder`** 属性定义了当表单控件没有值时在控件中显示的文本。占位符文本应简要提示用户应向控件输入的预期数据类型。

有效的占位符文本包括暗示预期数据类型的单词或短语，而不是解释或提示。不得使用占位符代替 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)。如果表单控件的值不是空，占位符就不可见，因此使用 `placeholder` 而不是 `<label>` 来提示会损害可用性和无障碍性。

以下输入类型支持 `placeholder` 属性：`[text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text)`、`[search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/search)`、`[url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url)`、`[tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/tel)`、`[email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email)` 和 `[password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password)`。``[`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)`` 元素也支持该功能。下面的[示例](#示例)显示了 `placeholder` 属性的使用情况，以解释输入字段的预期格式。

**备注：**`placeholder` 属性不能包含换行（LF）或回车（CR）。如果值中包含这两种字符，占位符文本将被裁剪。

## [无障碍考虑](#无障碍考虑)

占位符只能用来举例说明应输入表单的数据类型，绝不能用来替代 `<label>` 元素；这样做会损害无障碍性和用户体验。

`<label>` 的文本在视觉上和程序上都与其对应的表单控件相关联。屏幕阅读器默认情况下不会宣告占位符内容，但会宣告标签内容；标签会告知辅助技术用户应在控件中输入哪些数据。标签还能改善指针设备用户的使用体验：当用户点击或触摸 `<label>` 时，焦点会移动到标签的相关表单控件上。

占位符不能代替标签，即使对不依赖辅助技术的人来说也是如此。占位符文本显示的颜色对比度低于默认表单控件文本。这样设计的目的是不想让用户分不清哪些是占位符文本，哪些是已填写的表单字段。然而，这种对比度的缺乏可能会给低视力用户带来困扰。此外，当用户开始输入文本时，占位符文本就会从表单字段中消失。如果占位符文本包含的说明信息或示例消失了，就会让有认知问题的用户感到困惑，如果占位符包含标签，就会使表单无法访问。

## [示例](#示例)

### [HTML](#html)

html

```
<form action="/zh-CN/docs/Web/HTML/Attributes/placeholder">
  <label for="name">输入你的名字：</label>
  <input type="text" id="name" name="name" placeholder="如 Mike Shinoda" />
  <button type="submit">提交</button>
</form>
```

### [结果](#结果)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-placeholder](https://html.spec.whatwg.org/multipage/input.html#attr-input-placeholder) |
| [HTML  
\# attr-textarea-placeholder](https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-placeholder) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.placeholder](#html.elements.input.placeholder)

### [html.elements.textarea.placeholder](#html.elements.textarea.placeholder)

## [参见](#参见)

-   HTML [`title`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/title)
-   CSS [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:placeholder-shown) 伪类选择器
-   CSS [`::placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::placeholder) 伪元素选择器

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月4日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/placeholder/contributors.txt)更新。
