### [属性交互](#属性交互)

由于只读字段不能更改，因此 `required` 对同时指定了 [`readonly`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/readonly) 属性的输入没有任何影响。

### [可用性](#可用性)

在包含 `required` 属性时，应在控件附近提供可见提示，告知用户 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 为必填项。此外，使用 [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:required) 伪类来定位必填表单控件，并对其进行样式设计，以表明它们是必填的。这可以提高视力正常用户的可用性。辅助技术应根据 required 属性告知用户表单控件是必填的，但添加 `aria-required="true"` 也无妨，以避免浏览器/屏幕阅读器组合还不支持 `required`。

### [约束验证](#约束验证)

如果元素为必填元素，且元素值为空字符串，则该元素会受到 [`valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing "valueMissing") 的影响，元素将匹配 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:invalid) 伪类。

## [无障碍考虑](#无障碍考虑)

向用户提供提示，告知他们特定表单控件是必填的。确保信息传递是多方面的，例如通过文字、颜色、标记和属性，这样，无论用户是色盲、存在认知差异还是使用了屏幕阅读器，都能理解相关要求。

## [示例](#示例)

### [HTML](#html)

html

```
<form>
  <div class="group">
    <input type="text" />
    <label>普通</label>
  </div>
  <div class="group">
    <input type="text" required />
    <label>必需</label>
  </div>
  <input type="submit" />
</form>
```

### [结果](#结果)

## [参见](#参见)

-   [`validityState.valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing)
-   [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:required) 和 [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:optional)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required/contributors.txt)更新。
