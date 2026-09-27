有限可用

此特性不属于基线，因为它尚未在主流浏览器中得到支持。

Want more browser support for this feature? [Tell us why.](https://github.com/web-platform-dx/developer-signals/issues/51)

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<datalist>`** 元素包含了一组 [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option) 元素，这些元素表示其他表单控件可选值。

## [尝试一下](#尝试一下)

```
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>
```

```
label {
  display: block;
  margin-bottom: 10px;
}
```

-   _[内容范畴](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories)_[流内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#flow_content)，[段落内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#phrasing_content)。
-   _允许内容_要么 [段落内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#phrasing_content) 要么 0 个或多个 [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option)元素。
-   _标签省略_：不允许，开始标签和结束标签都不能省略。
-   _允许父级元素_任何接受[段落内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#phrasing_content)的元素。
-   \_Permitted ARIA roles\_None
-   _DOM 接口_[`HTMLDataListElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDataListElement)

## [属性](#属性)

该元素除了公用的[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)之外，没有其他属性。

## [示例](#示例)

html

```
<label
  >Choose a browser from this list: <input list="browsers" name="myBrowser"
/></label>
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Internet Explorer"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```

### [结果](#结果)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-datalist-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素，它更特殊的 [`list`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#list) 属性;
-   [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option)元素。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist/contributors.txt)更新。
