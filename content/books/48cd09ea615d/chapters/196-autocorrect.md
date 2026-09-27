基线 2026

最近可用

自 2026年9月 起，此特性已在最新浏览器中得到支持。但在较旧的设备或浏览器中可能无法运行。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`autocorrect`** [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)是一种[枚举属性](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)，控制是否针对拼写和/或标点符号错误启用可编辑文本的自动更正特性。

具体的自动更正行为，包括替换哪些词语，取决于用户代理和底层设备提供的服务。例如，在 macOS 上，用户代理可能依赖于[注册替换文本和标点符号](https://support.apple.com/zh-cn/guide/mac-help/mh35735/mac "外部链接（在新标签页中打开）")。其他设备和浏览器可能使用不同的方法。

自动更正与以下可编辑文本元素相关：

-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素，除了 [`password`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password)、[`email`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email) 和 [`url`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url) 类型以外（这些类型不支持自动更正）。
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。
-   任何具有 [`contenteditable`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/contenteditable) 属性的元素。

可编辑元素默认情况下启用自动更正，除了在 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 内的元素以外，默认值可能从表单中继承。明确设置该属性会覆盖默认行为。

## [值](#值)

可能的值有：

[`on` 或 `""`（空字符串）](#on)

启用拼写和标点符号的自动更正特性。

[`off`](#off)

禁用可编辑文字的自动更正。

不支持自动更正的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素类型（[`password`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password)、[`email`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email) 和 [`url`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url)）始终处于 `off` 状态。

对于所有其他可编辑元素，设置上述值以外的任何其他值都会被视为 `on`。未嵌套在 `<form>` 内的元素的默认值为 `on`。

嵌套在 `<form>` 中时，如果已经设置了 `autocorrect`，则以下元素将从表单中继承其默认值：[`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。

## [示例](#示例)

### [基本示例](#基本示例)

此示例演示了 `autocorrect` 属性的基本用法。

#### HTML

我们包含了两个 `autocorrect` 属性不同的 `<input>` 元素：

html

```
<label for="vegetable">一种蔬菜：</label
><input id="vegetable" name="vegetable" type="text" autocorrect="on" />

<label for="fruit">一种水果：</label
><input id="fruit" name="fruit" type="text" autocorrect="off" />
```

#### 结果

在上述水果和蔬菜文本输入框中输入无效文本。如果你的浏览器支持自动更正，并且底层设备提供了适当的替换，则蔬菜名称输入框中的错别字应自动更正。水果名称字段中的错别字不应更正。

### [启用与禁用自动更正](#启用与禁用自动更正)

此示例演示了如何使用 `autocorrect` 属性启用与禁用自动更正。

#### HTML

以下 HTML 标记定义了一个 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)，一个 [`type="text"`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text) 类型的“名字” [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素，一个“简介” [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素和两个 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素。

“用户名”元素设置了 `autocorrect="off"`，因为自动更正名字会比较讨厌！“简介”没有指定 `autocorrect` 值，意味着启用了自动更正（我们可以设置任何除了 `off` 以外的其他值）。

html

```
<button id="reset">重置</button><label for="username">名字：</label
><input id="username" name="username" type="text" autocorrect="off" /><label
  for="bio"
  >简介：</label
><textarea id="bio" name="bio"></textarea>
```

```
<pre id="log"></pre>
```

```
#log {
  height: 75px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}

button,
input,
textarea {
  display: block;
}
```

```
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

代码通过检查原型上是否存在 `autocorrect` 来检查是否支持该特性。如果不存在，则记录这一事实。如果存在，则记录每个文本输入元素的 `autocorrect` 属性值。

为按钮添加了一个点击处理器，允许重置输入的文本和日志。

js

```
const resetButton = document.querySelector("#reset");
const userNameElement = document.querySelector("#username");
const bioElement = document.querySelector("#bio");

if (!("autocorrect" in HTMLElement.prototype)) {
  log("不支持自动更正特性");
} else {
  log(`userNameElement.autocorrect: ${userNameElement.autocorrect}`);
  log(`bioElement.autocorrect: ${bioElement.autocorrect}`);
}

resetButton.addEventListener("click", (e) => {
  userNameElement.value = "";
  bioElement.value = "";
});
```

#### 结果

如果你的浏览器支持自动更正，则“简介”和“名字”输入下方的日志区域会显示“简介”输入启用了自动更正，而“名字”输入没有。

在姓名和简介文本输入框中输入无效文本。如果设备有输入字词的替代词，则会（仅）用于自动更正“简介”输入框中的文本。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-autocorrect](https://html.spec.whatwg.org/multipage/interaction.html#attr-autocorrect) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   所有[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)
-   [`spellcheck`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/spellcheck)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autocorrect/contributors.txt)更新。
