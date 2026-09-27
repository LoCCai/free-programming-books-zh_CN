基线

广泛可用

自 2023年8月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`dirname`** 属性描述了提交表单时元素文本内容的方向，可用于 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素和一些 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 类型。浏览器使用此属性值来决定用户输入的文本是从左到右，还是从右到左的。当使用此属性值时，元素的文本方向性值与作为字段名称的 `dirname` 属性值一起包含在表单提交数据中。

## [使用说明](#使用说明)

`dirname` 属性可用于任意 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素及 [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/hidden)、[text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text)、[search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/search)、[tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/tel)、[url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url)、[email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email)、[password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password)、[submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit)、[reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/reset) 或 [button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/button) 这些类型的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素。

提交数据的格式为 `{dirname_value}={direction}`，其中 `{dirname_value}` 是 `dirname` 属性的值，`{direction}` 是文本的方向性值。例如，如果用户在具有 `name="comment"` 和 `dirname="comment-direction"` 的元素中输入“Hello”，则 `GET` 请求的 URL 编码的表单提交数据将为 `comment=Hello&comment-direction=ltr`。方向性值为以下之一：

[`rtl`](#rtl)

用户输入文本的书写方向是从右到左。

[`ltr`](#ltr)

用户输入文本的书写方向是从左到右。

如果未指定文本方向性，用户代理将使用包含表单的父元素的方向性；如果未指定父元素的方向性，则使用用户代理的默认方向性。

## [示例](#示例)

### [textarea 元素方向性](#textarea_元素方向性)

在本示例中，textarea 元素的 `dir="auto"` 属性允许用户输入的文本自动决定文本的方向性。

html

```
<form method="get" action="https://www.example.com/submit">
  <textarea name="comment" dir="auto" dirname="comment-direction">سيب</textarea>
  <button type="submit">致以问候</button>
</form>
```

当用户提交表单时，用户代理包含两个字段：其中一个为具有“سيب”值的 `comment`，另外一个为具有“rtl”值的 `comment-direction`。URL 编码的提交体看起来像这样：

url

```
https://www.example.com/submit?comment=%D8%B3%D9%8A%D8%A8&comment-direction=rtl
```

### [input 元素方向性](#input_元素方向性)

在本示例中，input 元素的 `dir="auto"` 属性允许用户输入的文本自动决定文本的方向性。

html

```
<form method="get" action="https://www.example.com/submit">
  <input
    type="text"
    name="comment-input"
    dir="auto"
    dirname="comment-direction"
    value="Hello" />
  <button type="submit">致以问候</button>
</form>
```

当用户提交表单时，用户代理包含两个字段：其中一个为具有“Hello”值的 `comment-input`，另外一个为具有“ltr”值的 `comment-direction`：

url

```
https://www.example.com/submit?comment-input=Hello&comment-direction=ltr
```

### [继承方向性](#继承方向性)

以下 `<input>` 和 `<textarea>` 元素并不具有 `dir` 属性，故它们继承了父元素的显式方向性（即 `rtl`）：

html

```
<div dir="rtl">
  <form method="get" action="https://www.example.com/submit">
    <input
      type="text"
      name="user"
      dirname="user-direction"
      value="LTR Username" />
    <textarea name="comment" dirname="comment-direction">LTR Comment</textarea>
    <button type="submit">发表评论</button>
  </form>
</div>
```

URL 编码的提交体类似如下：

url

```
https://www.example.com/submit?user=LTR+Username&user-direction=rtl&comment=LTR+Comment&comment-direction=rtl
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-fe-dirname](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-dirname) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.textarea.dirname](#html.elements.textarea.dirname)

### [html.elements.input.dirname](#html.elements.input.dirname)

## [参见](#参见)

-   [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/dir)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/dirname/contributors.txt)更新。
