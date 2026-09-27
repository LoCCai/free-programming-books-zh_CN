基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML `<form>` 元素**表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。

## [尝试一下](#尝试一下)

```
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>
```

```
form.form-example {
  display: table;
}

div.form-example {
  display: table-row;
}

label,
input {
  display: table-cell;
  margin-bottom: 10px;
}

label {
  padding-right: 10px;
}
```

可以用 [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:valid) 和 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:invalid) CSS 伪类来设置 `<form>` 元素的样式，此时样式的表现取决于表单中的 [`elements`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/elements "elements") 是否有效。

## [属性](#属性)

此元素拥有[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`accept`](#accept)

一个逗号分隔的列表，包括服务器能接受的内容类型。

**备注：****此属性已在 HTML5 中被移除并且不再被使用**。作为替代，可以使用 `<input type=file>` 元素中的 [`accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#accept) 属性。

[`accept-charset`](#accept-charset)

服务器接受的[字符编码](https://developer.mozilla.org/zh-CN/docs/Glossary/Character_encoding)。规范允许使用单个不区分大小写的值——`"UTF-8"`，反应了这种编码的普遍性（历史上，可以以逗号分隔列表或空格分隔列表的形式指定多个字符编码）。

[`autocapitalize`](#autocapitalize)

这是一个被 iOS Safari 使用的非标准属性。当用户在一些表单的文本后代控件中，输入/编辑一些文本值时，此属性控制了这些文本值的首字母是否大写或者使用其他的大写样式。如果 `autocapitalize` 属性在某个单独的表单后代控件被指定的话，那么此单独的设定会覆盖原来表单范围内的 `autocapitalize` 设定。默认值为 `sentences`。可以选择的值如下：

-   `none`：完全禁用自动首字母大写。
-   `sentences`：自动对每句话首字母大写。
-   `words`：自动对每个单词首字母大写。
-   `characters`：自动大写所有的字母。

[`autocomplete`](#autocomplete)

用于指示 input 元素是否能够拥有一个默认值，此默认值是由浏览器自动补全的。此设定可以被属于此表单的子元素的 `autocomplete` 属性覆盖。可能的值有：

-   `off`：浏览器可能不会自动补全条目（在疑似登录表单中，浏览器倾向于忽略该值，而提供密码自动填充功能，参见[自动填充属性和登录](https://developer.mozilla.org/zh-CN/docs/Web/Security/Practical_implementation_guides/Turning_off_form_autocompletion#autocomplete_%E5%B1%9E%E6%80%A7%E5%92%8C%E7%99%BB%E5%BD%95%E5%AD%97%E6%AE%B5)）
-   `on`：浏览器可自动补全条目

[`name`](#name)

表单的名称。该值不能是空字符串，而且在其所在的表单集合中的所有表单（`form`）元素之中必须是独一无二的（如果有的话）。

[`rel`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel)

控制注释和表单创建的链接类型。注释包括 [`external`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#external)、[`nofollow`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#nofollow)、[`opener`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#opener)、[`noopener`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#noopener) 和 [`noreferrer`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#noreferrer)。链接类型包括 [`help`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#help)、[`prev`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#prev)、[`next`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#next)、[`search`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#search) 和 [`license`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel#license)。[`rel`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel) 值是这些枚举值的空格分隔列表。

### [关于提交表单的属性](#关于提交表单的属性)

下列属性控制提交表单时的行为。

[`action`](#action)

处理表单提交的 URL。这个值可被 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input type="submit">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 或 [`<input type="image">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 元素上的 [`formaction`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#formaction) 属性覆盖。

[`enctype`](#enctype)

当 `method` 属性值为 `post` 时，`enctype` 就是将表单的内容提交给服务器的 [MIME 类型](https://zh.wikipedia.org/wiki/互联网媒体类型 "外部链接（在新标签页中打开）")。可能的取值有：

-   `application/x-www-form-urlencoded`：未指定属性时的默认值。
-   `multipart/form-data`：当表单包含 `type=file` 的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素时使用此值。
-   `text/plain`：出现于 HTML5，用于调试。这个值可被 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input type="submit">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 或 [`<input type="image">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 元素上的 [`formenctype`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#formenctype) 属性覆盖。

[`method`](#method)

浏览器使用这种 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 方法来提交 表单。可能的值有：

-   `post`：[`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Methods/POST) 方法；表单数据会包含在表单体内然后发送给服务器。
-   `get`（默认）：[`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Methods/GET) 方法；表单数据会附加在 `action` 属性的 URL 中，并以 `?` 作为分隔符，[没有副作用](https://developer.mozilla.org/zh-CN/docs/Glossary/Idempotent)时使用这个方法。
-   `dialog`：如果表单在 [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog) 元素中，提交时关闭对话框。此值可以被 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input type="submit">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 或 [`<input type="image">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 元素中的 [`formmethod`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#formmethod) 属性覆盖。

[`novalidate`](#novalidate)

此布尔值属性表示提交表单时不需要验证表单。如果没有声明该属性（因此表单需要通过验证）。该属性可以被表单中的 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input type="submit">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 或 [`<input type="image">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 元素中的 [`formnovalidate`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#formnovalidate) 属性覆盖。

[`target`](#target)

表示在提交表单之后，在哪里显示响应信息。这是一个_浏览上下文_的名字/关键字（如标签页、窗口或 iframe）。下述关键字有特别含义：

-   `_self`（默认）：在相同浏览上下文中加载。
-   `_blank`：在新的未命名的浏览上下文中加载。
-   `_parent`：在当前上下文的父级浏览上下文中加载，如果没有父级，则与 `_self` 表现一致。
-   `_top`：在最顶级的浏览上下文中（即当前上下文的一个没有父级的祖先浏览上下文），如果没有父级，则与 `_self` 表现一致。此值可以被 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input type="submit">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 或 [`<input type="image">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 元素中的 [`formtarget`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button#formtarget) 属性覆盖。

## [示例](#示例)

### [HTML](#html)

html

```
<!-- 向当前 URL 发送 GET 请求的表单 -->
<form method="get">
  <label> 姓名：<input name="submitted-name" autocomplete="name" /> </label>
  <button>保存</button>
</form>

<!-- 向当前 URL 发送 POST 请求的表单 -->
<form method="post">
  <label> 姓名：<input name="submitted-name" autocomplete="name" /> </label>
  <button>保存</button>
</form>

<!-- 带有字段集（fieldset）、标题（legend）和标签（label）的表单 -->
<form method="post">
  <fieldset>
    <legend>是否同意该条款？</legend>
    <label><input type="radio" name="radio" value="yes" />是</label>
    <label><input type="radio" name="radio" value="no" />否</label>
  </fieldset>
</form>
```

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a></td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>，但不能包含 <code>&lt;form&gt;</code> 元素</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/form_role">form</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role">search</a></code>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a> 或 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement"><code>HTMLFormElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-form-element](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [HTML 表单指南](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms)
-   还有其他的一些元素也用于创建表单：[`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist)、[`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)、[`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend)、[`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)、[`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup)、[`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)、[`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。
-   获取表单中的元素列表：[`HTMLFormElement.elements`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/elements)
-   [ARIA：Form 角色](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/form_role)
-   [ARIA：Search 角色](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form/contributors.txt)更新。
