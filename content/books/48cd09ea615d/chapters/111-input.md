## [尝试一下](#尝试一下)

```
<label for="name">名称（4~8 个字符）：</label>

<input
  type="text"
  id="name"
  name="name"
  required
  minlength="4"
  maxlength="8"
  size="10" />
```

```
label {
  display: block;
  font:
    1rem "Fira Sans",
    sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}
```

## [<input> 类型](#input_类型)

`<input>` 的工作方式相当程度上取决于 [`type`](#type) 属性的值，不同的 type 值会在各自的参考页中进行介绍。如果未指定此属性，则采用的默认类型为 `text`。

可用的值包括：

  
| 类型 | 描述 | 基本示例 |
| --- | --- | --- |
| [button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/button) | 没有默认行为的按钮，上面显示 [`value`](#value) 属性的值，默认为空。 | 
```
<input type="button" name="button" value="Button" />
```



 |
| [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/checkbox) | 复选框，可将其值设为选中或未选中。 | 

```
<input type="checkbox" name="checkbox"/>
```



 |
| [color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/color) | 用于指定颜色的控件；在支持的浏览器中，激活时会打开取色器。 | 

```
<input type="color" name="color"/>
```



 |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date) | 输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 | 

```
<input type="date" name="date"/>
```



 |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local) | 输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮。 | 

```
<input type="datetime-local" name="datetime-local"/>
```



 |
| [email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email) | 编辑邮箱地址的字段。类似 `text` 输入，但在支持的浏览器和带有动态键盘的设备上会有验证参数和相应的键盘。 | 

```
<input type="email" name="email"/>
```



 |
| [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) | 让用户选择文件的控件。使用 [`accept`](#accept) 属性规定控件能选择的文件类型。 | 

```
<input type="file" accept="image/*, text/*" name="file"/>
```



 |
| [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/hidden) | 不显示的控件，其值仍会提交到服务器。举个例子，右边就是一个隐形的控件。 | 

```
<input id="userId" name="userId" type="hidden" value="abc123">
```



 |
| [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) | 图形化 `submit` 按钮。显示的图像由 `src` 属性决定。如果 [`src`](#src) 属性缺失，就会显示 [`alt`](#alt) 的内容。 | 

```
<input type="image" name="image" src="" alt="image input"/>
```



 |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month) | 输入年和月的控件，没有时区。 | 

```
<input type="month" name="month"/>
```



 |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) | 用于输入数字的控件。如果支持的话，会显示滚动按钮并提供默认验证。拥有动态键盘的设备上会显示数字键盘。 | 

```
<input type="number" name="number"/>
```



 |
| [password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/password) | 单行的文本区域，其值会被隐藏。如果站点不安全，会警告用户。 | 

```
<input type="password" name="password"/>
```



 |
| [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/radio) | 单选按钮，允许在多个拥有相同 [`name`](#name) 值的选项中选中其中一个。 | 

```
<input type="radio" name="radio"/>
```



 |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) | 用于输入数值的控件，其精确值并不重要。控件是一个范围组件，默认值为正中间的值。同时使用 [`min`](#min) 和 [`max`](#max) 来规定可接受值的范围。 | 

```
<input type="range" name="range" min="0" max="25"/>
```



 |
| [reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/reset) | 此按钮将表单的所有内容重置为默认值。不推荐使用该类型。 | 

```
<input type="reset" name="reset"/>
```



 |
| [search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/search) | 用于搜索字符串的单行文字区域。输入文本中的换行会被自动去除。在支持的浏览器中可能有一个删除按钮，用于清除整个区域。拥有动态键盘的设备上的回车图标会变成搜索图标。 | 

```
<input type="search" name="search"/>
```



 |
| [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) | 用于提交表单的按钮。 | 

```
<input type="submit" name="submit"/>
```



 |
| [tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/tel) | 用于输入电话号码的控件。拥有动态键盘的设备上会显示电话数字键盘。 | 

```
<input type="tel" name="tel"/>
```



 |
| [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text) | 默认值。单行的文本字段，输入值中的换行会被自动去除。 | 

```
<input type="text" name="text"/>
```



 |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time) | 用于输入时间的控件，不包括时区。 | 

```
<input type="time" name="time"/>
```



 |
| [url](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url) | 用于输入 URL 的控件。类似 `text` 输入，但有验证参数，在支持动态键盘的设备上有相应的键盘。 | 

```
<input type="url" name="url"/>
```



 |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week) | 用于输入以年和周数组成的日期，不带时区。 | 

```
<input type="week" name="week"/>
```



 |
| 废弃的值 |
| `datetime` | 用于输入基于 UTC 时区的日期和时间（时、分、秒及秒的小数部分）。 | 

```
<input type="datetime" name="datetime"/>
```



 |

## [属性](#属性)

`<input>` 元素由于拥有诸多属性而异常强大，其中前文举例说明的 [`type`](#type) 属性尤其重要。由于所有 `<input>` 元素无论是哪种 `type`，都基于 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) 接口，所以理论上说，它们共享一套相同的属性。但实际上大部分属性只作用于特定一组 `type`。此外，一些属性作用于 `<input>` 的方式取决于 `<input>` 的 `type` 属性，不同的 `type` 有不同的效果。

下面的表格列出了所有属性，每个属性都有简短的描述。表格后的列表更详细地描述了各个属性及它们与哪些 input 类型相关。与大部分或者全部 input 类型都相关的属性会讲述更多细节。一些针对特定 input 类型的属性，或者所有 input 类型都有，但在特定的 input 类型上有特定表现的属性，会在相应的类型页面中说明。这个元素包含全局属性，一些针对 `<input>` 元素有额外意义的全局属性也会特别说明。

`<input>` 元素包含的属性包含[全局的 HTML 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)和以下这些额外属性：

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| [`accept`](#accept) | `file` | 文件上传控件中预期文件类型的提示 |
| [`alpha`](#alpha) | `color` | 颜色的透明度 |
| [`alt`](#alt) | `image` | 图片类型的 alt 属性。对无障碍是必需的 |
| [`autocapitalize`](#autocapitalize) | 除了 `url`、`email` 和 `password` 以外 | 控制输入文本的自动大写行为 |
| [`autocomplete`](#autocomplete) | 除了 `checkbox`、`radio` 和按钮以外 | 表单自动填充特性提示 |
| [`capture`](#capture) | `file` | 文件上传控件中媒体捕获方法的提示 |
| [`checked`](#checked) | `checkbox`、`radio` | 控件是否选中 |
| [`colorspace`](#colorspace) | `color` | 选择颜色值时需要使用的[颜色空间](https://developer.mozilla.org/zh-CN/docs/Glossary/Color_space) |
| [`dirname`](#dirname) | `hidden`、`text`、`search`、`url`、`tel`、`email` | 表单字段的名称，用于在提交表单时发送元素的方向性 |
| [`disabled`](#disabled) | 所有类型 | 表单控件是否禁用 |
| [`form`](#form) | 所有类型 | 将控件与表单元素建立联系 |
| [`formaction`](#formaction) | `image`、`submit` | 要提交表单的 URL 地址 |
| [`formenctype`](#formenctype) | `image`、`submit` | 提交表单时使用的表单数据编码类型 |
| [`formmethod`](#formmethod) | `image`、`submit` | 提交表单时所使用的 HTTP 方法 |
| [`formnovalidate`](#formnovalidate) | `image`、`submit` | 绕过表单提交时的表单控件验证 |
| [`formtarget`](#formtarget) | `image`、`submit` | 提交表单时的浏览上下文 |
| [`height`](#height) | `image` | 与 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素的 height 属性有相同含义，垂直方向上的维度值 |
| [`list`](#list) | 除了 `hidden`、`password`、`checkbox`、`radio` 和按钮以外 | 自动完成选项的 [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist) 的 id 属性的值 |
| [`max`](#max) | `date`、`month`、`week`、`time`、`datetime-local`、`number`、`range` | 最大值 |
| [`maxlength`](#maxlength) | `text`、`search`、`url`、`tel`、`email`、`password` | `value` 的最大长度（字符数） |
| [`min`](#min) | `date`、`month`、`week`、`time`、`datetime-local`、`number`、`range` | 最小值 |
| [`minlength`](#minlength) | `text`、`search`、`url`、`tel`、`email`、`password` | `value` 的最小长度（字符数） |
| [`multiple`](#multiple) | `email`、`file` | 布尔值。是否允许多个值 |
| [`name`](#name) | 所有类型 | 表单的控件名称，作为键值对的一部分与表单一同提交 |
| [`pattern`](#pattern) | `text`、`search`、`url`、`tel`、`email`、`password` | 为了使得 `value` 有效，必须符合的模式 |
| [`placeholder`](#placeholder) | `text`、`search`、`url`、`tel`、`email`、`password`、`number` | 当没有值设定时，出现在表单控件上的文字 |
| [`popovertarget`](#popovertarget) | `button` | 将 `<input type="button">` 指定为弹出框元素的控制项 |
| [`popovertargetaction`](#popovertargetaction) | `button` | 指定弹出框控件应执行的操作 |
| [`readonly`](#readonly) | 除了 `hidden`、`range`、`color`、`checkbox`、`radio` 和按钮以外 | 布尔值。如果存在，其中的值将不可编辑。 |
| [`required`](#required) | 除了 `hidden`、`range`、`color` 和按钮以外 | 布尔值。如果存在，一个值是必需的，或者必须勾选该值才能提交表格。 |
| [`size`](#size) | `text`、`search`、`url`、`tel`、`email`、`password` | 控件的尺寸 |
| [`src`](#src) | `image` | 与 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素的 `src` 属性含义相同，图片资源的地址 |
| [`step`](#step) | `date`、`month`、`week`、`time`、`datetime-local`、`number`、`range` | 有效的增量值 |
| [`type`](#type) | 所有类型 | 表单控件的类型 |
| [`value`](#value) | 所有类型 | 表单控件的初始值 |
| [`width`](#width) | `image` | 与 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素的 `width` 属性含义相同 |

一些额外的非标准属性被列在标准属性的描述之后。

### [单独的属性](#单独的属性)

[`accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept)

仅对 `file` 输入类型有效。`accept` 属性定义了 `file` 上传控件可选择文件类型的列表。参见 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) 输入类型以了解更多信息。

[`alpha`](#alpha)

仅对 `color` 输入类型有效，`alpha` 属性使终端用户能够设置所选颜色的透明度。

[`alt`](#alt)

仅对 `image` 按钮有效。`alt` 属性提供了图片的替代文字，在图片的 [`src`](#src) 属性缺失或对应资源加载失败时，会显示该属性的值。参见 [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 输入类型以了解更多信息。

[`autocapitalize`](#autocapitalize)

控制输入文本是否自动首字母大写，以及采用何种方式实现。更多信息请参阅 [`autocapitalize`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autocapitalize) 全局属性页面。

[`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete)

（**不是**一个布尔属性！）[`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete) 属性将一个以空白字符分隔的字符串作为其值，描述输入应该提供什么类型的自动完成功能。一个典型的自动完成的实现是回忆以前在同一输入字段中输入的值，但也可能存在更复杂的自动完成形式。例如，浏览器可以与设备的联系人列表集成，在电子邮件输入栏中自动完成 `email` 地址。参见 [`autocomplete`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete#%E5%80%BC) 以了解允许的值。

`autocomplete` 属性对 `hidden`、`text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`range`、`color` 和 `password` 类型的输入有效。该属性对于那些不返回数值或文本数据的输入控件没有效果，对除了 `checkbox`、`radio`、`file` 和任何按钮类型的所有输入类型均有效。

查看 [`autocomplete` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete)以了解额外信息，包括密码安全相关说明，以及 `hidden` 输入类型与其他输入类型在 `autocomplete` 属性上的细微差异。

[`autofocus`](#autofocus)

一个布尔属性，如果存在，表示当页面加载完毕（或包含该元素的 [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog) 显示完毕）时，该 input 元素应该自动拥有焦点。

文档中只有一个表单元素可以具有 `autofocus` 属性。如果该属性设置到多于一个元素上，会聚焦第一个具有该属性的元素。

`autofocus` 不能应用于类型为 `hidden` 的输入控件上，因为隐藏的控件不可聚焦。

**警告：**自动聚焦表单控件会使使用读屏技术的视力障碍者和有认知障碍的人感到困惑。当指定了 `autofocus` 时，读屏器会将用户“传送”到表单控件上，而不会事先警告他们。

在应用 `autofocus` 属性时，要仔细考虑无障碍问题。自动聚焦于一个控件会导致页面在加载时滚动。焦点也会导致动态键盘在某些触摸设备上显示。虽然屏幕阅读器会宣告收到焦点的表单控件的标签，但屏幕阅读器不会宣告标签之前的任何内容，在小设备上的视力良好的用户同样会错过先前内容构成的上下文信息。

[`capture`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/capture)

在 HTML 媒体捕获规范中引入，仅对 `file` 输入类型有效，`capture` 属性定义了应该使用哪种媒体（如麦克风、视频或相机）来捕获一个新文件，以便在支持场景中用 `file` 上传控件上传。参见 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) 输入类型。

[`checked`](#checked)

布尔属性，对于 `radio` 和 `checkbox` 类型有效。如果在 `radio` 类型上出现，代表该单选按钮是当前同名称组中所选定的那一个。如果在 `checkbox` 类型上出现，代表页面加载时，默认选择该复选框，这并_不_代表复选框当前是否选择：如果复选框状态改变，该内容属性不会反馈这种改变，只会更新 [`HTMLInputElement` 的 `checked` IDL 属性](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)。

**备注：**与其他输入控件不同，复选框和单选按钮的值只会在 `checked` 状态时才会包括在提交的数据中。如果当前是 `checked` 状态，复选框的名称和值就会被提交。

例如，`name` 为 `fruit` 的复选框含有 `value` 为 `cherry` 的一项，且该复选框为选中状态，提交的表单数据将包含 `fruit=cherry`；如果复选框为非活动状态，它不会列入到表单数据中。复选框和单选按钮的默认 `value` 值为 `on`。

[`colorspace`](#colorspace)

仅对 `color` 输入类型有效。`colorspace` 属性指定了 `type="color"` 所使用的[色彩空间](https://developer.mozilla.org/zh-CN/docs/Glossary/Color_space)。可能的[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)值包括：

-   `"limited-srgb"`：颜色属于 [sRGB](https://developer.mozilla.org/zh-CN/docs/Glossary/RGB) 色彩空间，其中包括 [`rgb()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/color_value/rgb)、[`hsl()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/color_value/hsl)、[`hwb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hwb) 和 [`<hex-color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/hex-color) 值。颜色值限制为每个 `r`、`g` 和 `b` 分量 8 位。这是默认值。
-   `"display-p3"`：[Display P3 色彩空间](https://developer.mozilla.org/zh-CN/docs/Glossary/Color_space#display-p3)，例如：`color(display-p3 1.84 -0.19 0.72 / 0.6)`

[`dirname`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/dirname)

对 `hidden`、`text`、`search`、`url`、`tel` 和 `email` 输入类型有效。`dirname` 属性允许提交元素的方向性。当包含这个属性时，表单控件将提交两个名称/值对：第一个是 [`name`](#name) 和 [`value`](#value)，第二个是 `dirname` 作为名称，其值为浏览器设置的 `ltr` 或 `rtl`。

html

```
<form action="page.html" method="post">
  <label
    >水果：
    <input type="text" name="fruit" dirname="fruit.dir" value="cherry" />
  </label>
  <input type="submit" />
</form>
<!-- page.html?fruit=cherry&fruit.dir=ltr -->
```

当提交上述表单时，会发送 `name` / `value` 对 `fruit=cherry` 和 `dirname` / 方向对 `fruit.dir=ltr`。更多信息请参见 [`dirname` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/dirname)。

[`disabled`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/disabled)

一个布尔属性，如果存在的话，表示用户不应该与该输入进行交互。禁用的输入通常以较暗的颜色呈现，或使用一些其他形式的指示，表明该字段不能使用。

具体来说，禁用的输入不会接收 [`click`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event "click") 事件，而且禁用的输入不会随表单提交。

[`form`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/form)

一个字符串，指定该输入与之相关的 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素（即其**表单所有者**）。如果存在该属性，该字符串的值必须与相同文档中的 `<form>` 元素的 [`id`](#id) 相同。如果没有指定该属性，该 `<input>` 元素与最近包含它的表单相关。

`form` 属性可以让你在文档的任何地方放置一个输入控件，但在文档的其他地方包含一个表单。

**备注：**一个输入只能与一个表单相关。

[`formaction`](#formaction)

仅对 `image` 和 `submit` 输入类型有效。参见 [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 输入类型介绍以获得更多信息。

[`formenctype`](#formenctype)

仅对 `image` 和 `submit` 输入类型有效。参见 [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 输入类型介绍以获得更多信息。

[`formmethod`](#formmethod)

仅对 `image` 和 `submit` 输入类型有效。参见 [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 输入类型介绍以获得更多信息。

[`formnovalidate`](#formnovalidate)

仅对 `image` 和 `submit` 输入类型有效。参见 [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 输入类型介绍以获得更多信息。

[`formtarget`](#formtarget)

仅对 `image` 和 `submit` 输入类型有效。参见 [submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/submit) 输入类型介绍以获得更多信息。

[`height`](#height)

仅对 `image` 输入按钮有效。`height` 是要显示代表图形提交按钮的图片的高度。参见 [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 输入类型。

[`id`](#id)

全局属性，对所有元素有效，包括所有的输入类型，它定义了一个唯一的标识符（ID），在整个文档中必须是唯一的。其目的是为了在链接时识别该元素。该值被用作 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 的 `for` 属性的值，以便将标签与表单控件连接起来。参见 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)。

[`inputmode`](#inputmode)

对所有元素都有效的全局值，它为浏览器提供了一个提示，说明在编辑这个元素或其内容时要使用的虚拟键盘配置类型。值包括 `none`、`text`、`tel`、`url`、`email`、`numeric`、`decimal` 和 `search`。

[`list`](#list)

给予 `list` 属性的值应该是位于同一文档中的 [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist) 元素的 [`id`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/id "id")。`<datalist>` 提供了一个预定义值的列表，向用户建议这个输入。列表中任何与 [`type`](#type) 不兼容的值都不包括在建议的选项中。所提供的值是建议，不是要求：用户可以从这个预定义的列表中选择，或者提供不同的值。

在 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`range` 和 `color` 上均有效。

根据规范，`hidden`、`password`、`checkbox`、`radio`、`file` 及任何按钮类型不支持 `list` 属性。

根据浏览器的不同，用户可能会看到一个建议的自定义调色板、沿着一个范围的跳动标记、甚至是一个像 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 一样打开但允许非列表值的输入。查看[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)，了解其他输入类型。

参见 [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist) 元素。

[`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max)

对 `date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `range` 输入类型有效，定义了允许值范围内的最大值。如果输入到元素中的 [`value`](#value) 超过此值，则该元素将无法通过[约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)。如果 `max` 属性的值不是数字，则元素没有最大值。

有一种特殊情况：如果数据类型是周期性的（如日期或时间），`max` 的值可能低于 `min` 的值，这表明范围可以环绕；例如，这允许你指定一个从晚上 10 点到凌晨 4 点的时间范围。

[`maxlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/maxlength)

对 `text`、`search`、`url`、`tel`、`email` 和 `password` 类型有效。它定义了用户可以输入到该字段中的最大字符数（以 [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Glossary/UTF-16)为单位）。必须为大于等于 `0` 的整数。如果未指定 `maxlength` 或指定了无效的值，则该字段将没有最大值。这个值也必须大于等于 `minlength` 的值。

如果文本框中的字符数大于 `maxlength` [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Glossary/UTF-16)长度，则输入将无法通过[约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)。默认情况下，浏览器将阻止用户输入超过 `maxlength` 属性所指定的值的字符。参见[客户端验证](#客户端验证)一节以了解更多信息。

[`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min)

对 `date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `range` 输入类型有效，定义了允许值范围内的最小值。如果输入到元素的 [`value`](#value) 小于此值，则该元素将无法通过[约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)。如果 `min` 指定的值不是数字，则元素没有最小值。

该值必须小于或等于 `max` 属性的值。如果 `min` 属性存在但没有指定或无效，则不应用 `min` 值。如果 `min` 属性有效，并且非空值小于 `min` 属性所允许的最小值，约束验证将阻止表单提交。参见[客户端验证](#客户端验证)一节以获取更多信息。

有一种特殊情况：如果数据类型是周期性的（如日期或时间），`min` 的值可能高于 `max` 的值，这表明范围可以环绕；例如，这允许你指定一个从晚上 10 点到凌晨 4 点的时间范围。

[`minlength`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/minlength)

对 `text`、`search`、`url`、`tel`、`email` 和 `password` 类型有效。它定义了用户可以输入到该字段中的最小字符数（以 [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Glossary/UTF-16)为单位）。该值必须是小于等于 `maxlength` 指定的值的非负整数值。如果未指定 `minlength` 或指定了无效的值，则元素没有最小值。

如果输入字段的文本长度小于 `minlength` [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Glossary/UTF-16)的长度，输入将无法通过[约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)，阻止表单提交。参见[客户端验证](#客户端验证)一节以了解更多信息。

[`multiple`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/multiple)

如果设置了 `multiple` 布尔属性，意味着用户可以在电子邮件部件中输入逗号分隔的电子邮件地址，或者可以通过 `file` 输入选择多个文件。参见 [email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email) 和 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) 输入类型。

[`name`](#name)

一个指定输入控件名称的字符串。当表单数据被提交时，这个名字会和控件的值一起提交。

通常把 `name` 看作是一个必需的属性（即使它不是）。如果一个输入没有指定 `name`，或者 `name` 是空的，那么这个输入的值就不会和表单一起提交！禁用的控件、未选中的单选按钮、未选中的复选框和重置按钮也不会被发送。

考虑这两个特殊情况：

1.  `_charset_`：如果被用作 [hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/hidden) 类型的 `<input>` 元素的名称，该输入的 `value` 会被[用户代理](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)自动设置为提交表单时使用的字符编码。
2.  `isindex`：由于历史原因，不允许使用 [`isindex`](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name "外部链接（在新标签页中打开）") 这个名字。

[`name`](#name) 属性对单选按钮的行为完全不同。

在一个同名的单选按钮组中，一次只能选中一个单选按钮。选择该组中的任何一个单选按钮会自动取消对同一组中当前被选中的单选按钮的选择。如果表单被提交，这一个被选中的单选按钮的值会和名称一起被发送。

当通过 Tab 键进入一系列同名的单选按钮组时，如果有一个被选中，将聚焦该单选按钮。如果它们没有按源顺序分组，如果组中有一个被选中，当遇到组中的第一个时，Tab 键进入组开始，跳过所有没有选中的。换句话说，如果存在选中项，Tab 键就会跳过该组中未被选中的单选按钮；如果不存在，当到达同名组中的第一个按钮时，就会聚焦该单选按钮组。

一旦组中的一个单选按钮有了焦点，使用箭头键将浏览所有同名的单选按钮，即使这些单选按钮在源顺序中没有被分组。

如果一个输入元素具有 `name`，该名称成为包含它的表单元素的 [`HTMLFormElement.elements`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/elements) 属性。如果有两个 `name` 分别设置为 `guest` 和 `hat-size` 的输入元素，可以使用如下代码：

js

```
let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
```

此段代码运行后，`guestName` 将成为 `guest` 字段的 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)，`hatSize` 将成为 `hat-size` 字段的 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)。

**警告：**避免给表单元素一个与表单内置属性相对应的 `name`，因为这样你就会用这个对相应输入的引用来覆盖预定义的属性或方法。

[`pattern`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/pattern)

对 `text`、`search`、`url`、`tel`、`email` 和 `password` 类型有效。为了使 [`value`](#value) 通过[约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)，必须满足 `pattern` 属性给定的正则表达式。它必须是 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 类型的有效 JavaScript 正则表达式，并且已在我们的[正则表达式指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)中进行了说明。模式文本周围不应指定正斜杠。在编译正则表达式时：

1.  模式将被隐式包裹在 `^(?:` 和 `)$` 中，使得匹配必须与输入值的_全部_内容进行比对，即 `^(?:<pattern>)$`。
2.  默认启用 `'v'` 标志，使模式被视为 Unicode 码点的序列，而非 [ASCII](https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII)。

如果 `pattern` 属性存在，但是未指定模式或无效，则不应用任何正则表达式，并且将完全忽略此属性。如果模式属性是有效的，并且该非空值与模式不匹配，约束验证将阻止表单提交。如果存在 [`multiple`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/multiple) 属性，则编译后的正则表达式将与每个逗号分隔的值进行匹配。

**备注：**如果使用了 `pattern` 属性，要在附近告知用户所期望的输入格式。你可以包含 [`title`](#title) 属性来解释满足模式的需求说明，大多数浏览器将它们显示为工具提示（tooltip）。对于无障碍来说，视觉的解释是必要的，工具提示是一种改进点。

参见[客户端验证](#客户端验证)一节以了解更多信息。

[`placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/placeholder)

对 `text`、`search`、`url`、`tel`、`email`、`password` 和 `number` 有效。`placeholder` 属性可向用户提供有关该字段中需要什么样的信息的简短提示。它应该是一个单词或短语来说明预期的数据类型，而不是说明性消息。文本中_不得_包含回车符或换行符。例如，某个字段需要收集用户的姓氏，其标签为“姓氏”，一个适合的占位文字可能是“如：赵”。

**备注：**`placeholder` 属性在语义上不如其他解释表单的方式有用，而且会对你的内容造成意想不到的技术问题。参见[标签](#标签)以获得更多信息。

[`popovertarget`](#popovertarget)

将 `<input type="button">` 元素转换为弹出框控制按钮；其值为要控制的弹出框元素的 ID。更多详情请参阅 [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API "Popover API") 专题页面。通过 `popovertarget` 属性建立弹出框与其调用按钮的关系，还具有以下两个实用效果：

-   浏览器会自动创建隐式 [`aria-details`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-details) 属性，并在弹出框显示时将其置于键盘焦点导航顺序的合理位置。这使得弹出框对键盘及辅助技术（AT）用户更具可访问性（参见[弹出框无障碍特性](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#%E5%BC%B9%E5%87%BA%E6%A1%86%E6%97%A0%E9%9A%9C%E7%A2%8D%E7%89%B9%E6%80%A7)）。
-   浏览器会在两者间建立隐式锚点关联，便于通过 [CSS 锚点定位](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)将弹出框定位于其控制项周围。更多细节请参阅[弹出框锚点定位](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#popover_anchor_positioning)。

[`popovertargetaction`](#popovertargetaction)

指定由控件 `<input type="button">` 控制的弹出框元素应执行的操作。可能值包括：

[`"hide"`](#hide)

按钮将隐藏已显示的弹出框。若尝试隐藏已隐藏的弹出框，则不执行任何操作。

[`"show"`](#show)

按钮将显示隐藏的弹出框。若尝试显示已显示的弹出框，则不执行任何操作。

[`"toggle"`](#toggle)

按钮将切换弹出框的显示状态。若弹出框处于隐藏状态，则显示；若处于显示状态，则隐藏。若省略 `popovertargetaction` 属性，则 `"toggle"` 为控制按钮默认执行的操作。

[`readonly`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/readonly)

一个布尔属性，如果存在，则表示该字段不能由用户编辑。`readonly` 属性支持 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `password` 输入类型。

参见 [HTML 属性：`readonly`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/readonly) 以了解更多信息。

[`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required)

`required` 是一个布尔属性，如果存在，则表示用户必须在提交表单之前指定一个非空值。`required` 属性支持 `text`、`search`、`url`、`tel`、`email`、`date`、`month`、`week`、`time`、`datetime-local`、`number`、`password`、`checkbox`、`radio` 和 `file` 输入类型。

参见[客户端验证](#客户端验证)和 [HTML 属性：`required`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/required)以了解更多信息。

[`size`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/size)

对 `email`、`password`、`tel`、`url` 和 `text` 有效。`size` 属性指示显示输入控件的多少。基本上创建了与设置 CSS [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/width) 属性相同的结果，但有一些特殊性，值的具体单位取决于输入类型。对于 `password` 和 `text`，它是字符数量（或 `em` 单位大小），默认值是 `20`。对于其他情况，是像素值（或 `px` 单位大小）。CSS `width` 的优先级高于 `size` 属性。

[`src`](#src)

仅对 `image` 输入按钮有效。`src` 参数为字符串，用于指定要显示的图像文件 URL，该图像将作为图形化提交按钮呈现。参见 [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 输入类型。

[`step`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/step)

对 `date`、`month`、`week`、`time`、`datetime-local`、`number` 和 `range` 输入类型有效。[`step`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/step) 属性指定了值必须满足的粒度。仅当值与步长基准值相差整数步时才有效。步长基准值为：若指定则为 [`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min)，否则为 [`value`](#value)，若两者均未提供则为 `0`（`week` 属性除外，其默认步长基准值为 -259,200,000，代表 `1970-W01` 周的起始点）。

如果没有明确包含它：

-   `step` 对于类型为 `number` 和 `range` 的默认值为 1。
-   每一种日期/事件输入类型有一个适合的默认 `step` 值，请查阅相关的页面以获取：[`date`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date#step)、[`datetime-local`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local#step)、[`month`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month#step)、[`time`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time#step) 和 [`week`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week#step)。

值必须为一个正数（整数或小数）或特殊值 `any`（意味着不指定任何步进值，任意值都可以接受（除其他制约因素如 [`min`](#min) 或 [`max`](#min) 之外））。

如果没有明确设置 `any`，`number`、日期/时间输入类型和 `range` 输入类型的有效值等于步进的基础——[`min`](#min) 值和步进值的增量，如果指定的话，最高为 [`max`](#max) 值。

例如，如果存在这样一个元素 `<input type="number" min="10" step="2">`，那么任何大于等于 `10` 的偶整数都是有效的。如果省略（`<input type="number">`），任何整数都有效，但浮点数（如 `4.2`）无效，因为 `step` 默认为 `1`。为了使 `4.2` 有效，`step` 必须被设置为 `any`、0.1、0.2 或任何 `min` 值以 `.2` 结尾的数字，例如 `<input type="number" min="-5.2">`。

**备注：**当用户输入的数据不符合步进配置时，该值在约束验证中被认为是无效的，将匹配 `:invalid` 伪类。

参见[客户端验证](#客户端验证)以获取更多信息。

[`tabindex`](#tabindex)

对所有元素有效的全局属性，包括所有的输入类型，是一个整数属性，表示该元素如果参与顺序键盘导航，是否可以接受输入焦点（可聚焦）。由于除了隐藏类型的输入外，所有的输入类型都是可聚焦的，这个属性不应该用在表单控件上，因为这样做需要管理文档中所有元素的聚焦顺序，如果设置错误，就有可能损害可用性和无障碍性。

[`title`](#title)

对所有元素有效的全局属性，包括所有的输入类型，包含一个代表与它所属的元素相关的咨询信息的文本。这样的信息通常以工具提示的形式呈现给用户（但不必要）。标题不应作为表单控件用途的主要解释。相反，可以使用 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素，其 `for` 属性设置为表单控件的 [`id`](#id) 属性。参见下面的[标签](#标签)。

[`type`](#type)

一个字符串，指定要渲染的控件的类型。例如，要创建一个复选框，使用 `checkbox` 的值。如果省略（或指定一个未知值），则使用输入类型 `text`，创建一个纯文本输入字段。

允许的值列在了上方的 [Input 类型](#input_类型)中。

[`value`](#value)

输入控件的值。当在 HTML 中指定时，这是初始值。从那时起，它可以在任何时候用 JavaScript 访问相应的 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) 对象的 `value` 属性，用于改变或检索。`value` 属性总是可选的，不过对于 `checkbox`、`radio` 和 `hidden` 来说，应该被认为是必须的。

[`width`](#width)

仅对 `image` 输入按钮有效。`width` 是呈现在图片提交按钮上的图片宽度。参见 [image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/image) 输入类型。

### [非标准属性](#非标准属性)

以下非标准属性在某些浏览器中可以使用。一般地，除非无法实现你所需要的功能，否则不要使用它们。

| 属性 | 描述 |
| --- | --- |
| [`incremental`](#incremental) | 是否重复发送 [`search`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event "search") 事件，以便在用户仍在编辑字段值时更新实时搜索结果。**仅 WebKit 和 Blink 适用（Safari、Chrome、Opera 等）。** |
| `mozactionhint` | 
当用户在编辑字段时按下键盘的 Enter 或 Return 键时，所需要进行的动作的字符串表示，这用于决定虚拟键盘上那个键的合适的标签。**该属性已弃用，请使用 [`enterkeyhint`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/enterkeyhint) 替代。**

 |
| [`orient`](#orient) | 设置范围滑块的呈现方向。**仅 Firefox 适用。** |
| [`results`](#results) | 下拉菜单显示的最大查找结果数量。**仅 Safari 适用。** |
| [`webkitdirectory`](#webkitdirectory) | 一个布尔值，表示是否只允许用户选择一个目录（或多个目录，如果同时存在 [`multiple`](#multiple) 属性）。 |

[`incremental`](#incremental)

布尔属性 `incremental` 是 WebKit 和 Blink 的扩展（所以 Safari、Opera、Chrome 等都支持），如果存在的话，就会告诉[用户代理](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)将输入作为实时搜索处理。当用户编辑该字段的值时，用户代理将 [`search`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event "search") 事件发送到代表搜索框的 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) 对象。这使得你的代码能够在用户编辑搜索时实时更新搜索结果。

如果没有指定 `incremental` 属性，则仅当用户明确发起搜索（如按下键盘上 Enter 或 Return）时，才会发送 [`search`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event "search") 事件。

`search` 事件是限速的，因此它的发送频率不会超过实施定义的间隔。

[`orient`](#orient)

类似于影响 [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) 和 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) 元素的非标准 CSS 属性 -moz-orient，`orient` 属性定义范围滑块的方向。值包括 `horizontal`，代表范围滑块水平呈现；和 `vertical`，代表范围滑块垂直呈现。有关创建垂直表单控件的现代方法，请参阅[创建垂直表单控件](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Writing_modes/Vertical_controls)。

[`results`](#results)

只有 Safari 支持的 `results` 属性是一个数值，可以让你覆盖 `<input>` 元素原生提供的先前搜索查询下拉菜单中显示的最大条目数。

该值必须是一个非负的十进制数字。如果没有提供，或者提供了一个无效的值，则使用浏览器的默认最大条目数。

[`webkitdirectory`](#webkitdirectory)

布尔属性 `webkitdirectory` 如果存在，表示在文件选取界面中，只有目录可供用户选择。参见 [`HTMLInputElement.webkitdirectory`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/webkitdirectory) 以了解更多细节和例子。

虽然最初只为基于 WebKit 的浏览器实现，但 `webkitdirectory` 也可以在 Microsoft Edge 以及 Firefox 50 和更高版本中使用。然而，尽管它有相对广泛的支持，它仍然不是标准的，除非你没有其他选择，否则不应该使用。

## [方法](#方法)

以下方法由 DOM 中代表 `<input>` 元素的 [`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement) 接口提供。还有一些方法是由父接口 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)、[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)、[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 和 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 提供的。

[`checkValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity "checkValidity()")

如果元素的值通过了有效性检查，返回 `true`；否则，返回 `false` 并在该元素上触发 [`invalid`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/invalid_event "invalid") 事件。

[`reportValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity "reportValidity()")

如果元素的值通过了有效性检查，返回 `true`；否则，返回 `false` 并在该元素上触发 [`invalid`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/invalid_event "invalid") 事件，如果事件没有取消，将问题报告给用户。

[`select()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/select "select()")

如果 `<input>` 元素中的内容可选择，则选择其中的全部内容。对于没有可供选择的文字内容的元素（如可视化颜色选择器或日历日期输入），这个方法不做任何事情。

[`setCustomValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity "setCustomValidity()")

如果输入元素的值不合法，设置显示的自定义信息。

[`setRangeText()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText "setRangeText()")

将输入元素中指定的字符范围的内容设置为一个给定的字符串。`selectMode` 参数可以控制现有内容如何被影响。

[`setSelectionRange()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/setSelectionRange "setSelectionRange()")

在一个文本输入元素中选择指定的字符范围。对不以文本输入字段形式出现的输入没有任何作用。

[`showPicker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement/showPicker "showPicker()")

显示输入元素的浏览器选择器，该选择器通常在元素被选中时显示，但可通过按钮点击或其他用户交互触发。

[`stepDown()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown "stepDown()")

默认情况下，将一个数字输入的值减少 1，或减少指定的单位数量。

[`stepUp()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp "stepUp()")

默认情况下，将一个数字输入的值增加 1，或增加指定的单位数量。

## [CSS](#css)

输入元素作为被替换的元素，有一些功能不适用于非表单元素。有一些 CSS 选择器可以根据表单控件的 UI 特征专门针对它们，也被称为 UI 伪类。输入元素也可以用属性选择器按类型定位。有一些属性也是特别有用的。

### [UI 伪类](#ui_伪类)

与 `<input>` 元素非常相关的伪类：
| 伪类 | 描述 |
| --- | --- |
| [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:enabled) | 任何当前启用的元素，可以被激活（选择、点击、输入等）或接受焦点；也有一个禁用状态，在这个状态下，它不能被激活或接受焦点。 |
| [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:disabled) | 任何当前禁用的元素都有一个启用的状态，这意味着如果它没有被禁用，它可以被激活（选择、点击、输入等等）或接受焦点。 |
| [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-only) | 不能被用户编辑的元素。 |
| [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:read-write) | 可以被用户编辑的元素。 |
| [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:placeholder-shown) | 当前显示 [`placeholder` 文字](#placeholder)的元素，包括有 [`placeholder`](#placeholder) 显示，尚未拥有值的 `<input>` 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。 |
| [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:default) | 在一组相关元素中属于默认的表单元素。匹配 [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/checkbox) 和 [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/radio) 在页面加载或渲染时被选中的输入类型。 |
| [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:checked) | 匹配当前被选中的 [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/checkbox) 和 [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/radio) 输入类型（以及当前被选中的 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 中的 [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option)）。 |
| [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:indeterminate) | indeterminate 属性被 JavaScript 设置为真的 [checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/checkbox) 元素，表单中所有具有相同名称值的单选按钮被取消选中的 [radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/radio) 元素，以及处于不确定状态的 [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) 元素。 |
| [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:valid) | 可以应用约束验证的表单控件，并且当前是有效的。 |
| [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:invalid) | 应用了约束条件验证的表单控件，并且当前是无效的。匹配一个表单控件，它的值与它的属性设置的约束条件不一致，如 [`required`](#required)、[`pattern`](#pattern)、[`step`](#step) 和 [`max`](#max)。 |
| [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:in-range) | 一个非空的输入，其当前值在 [`min`](#min) 和 [`max`](#max) 属性以及 [`step` 指定的范围限制内。](#step) |
| [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:out-of-range) | 一个非空的输入，其当前值不在 [`min`](#min) 和 [`max`](#max) 属性以及 [`step` 指定的范围限制内。](#step) |
| [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:required) | 有 [`required`](#required) 属性设置的 `<input>`、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。只匹配可以被 required 的元素，不匹配不能被 required 的元素。 |
| [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:optional) | 没有 [`required`](#required) 属性设置的 `<input>`、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。只匹配可以被 required 的元素，不匹配不能被 required 的元素。 |
| [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:blank) | 没有值的 `<input>` 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。 |
| [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid) | 与 `:invalid` 相似，但是在失焦的情况下激活。匹配无效的输入，但只在用户交互之后，例如关注该控件、离开该控件或试图提交包含无效控件的表单。 |
| [`:open`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:open) | `<input>` 元素会显示一个选择器供用户选择值（例如 [`<input type="color">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/color)）——但仅当该元素处于打开状态时，即选择器显示时才会生效。 |

#### 伪类示例

我们可以根据复选框是否被选中来为复选框的标签添加样式。在这个例子中，我们对紧跟在复选输入之后的 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 和 [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-weight) 的 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 进行样式设置。如果 `input` 没有选中，我们没有应用任何样式。

```
<input id="checkboxInput" type="checkbox" />
<label for="checkboxInput">切换复选框状态</label>
```

css

```
input:checked + label {
  color: red;
  font-weight: bold;
}
```

### [属性选择器](#属性选择器)

使用[属性选择器](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Attribute_selectors)，可以根据表单控件的 [`type`](#type) 来锁定不同类型的表单控件。CSS 属性选择器只需根据一个属性的存在或一个给定属性的值来匹配元素。

css

```
/* 匹配密码输入 */
input[type="password"] {
}

/* 匹配合法值限制在一个范围内的表单控件 */
input[min][max] {
}

/* 匹配含有 pattern 属性的表单控件 */
input[pattern] {
}
```

### [::placeholder](#placeholder)

默认情况下，占位符文本的外观是半透明或浅灰色。[`::placeholder`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::placeholder) 伪元素是输入的 [`placeholder` 文本](#placeholder)。可以使用有限的 CSS 属性子集为其赋予样式。

css

```
::placeholder {
  color: blue;
}
```

只有适用于 [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::first-line) 伪元素的 CSS 属性子集可以在选择器中使用 `::placeholder` 的规则。

### [caret-color](#caret-color)

一个专门针对文本输入相关元素的属性是 CSS [`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/caret-color) 属性，它可以让你设置用于绘制文本输入光标的颜色：

#### HTML

html

```
<label for="textInput">请注意红色光标：</label>
<input id="textInput" class="custom" size="32" />
```

#### CSS

css

```
input.custom {
  caret-color: red;
  font:
    16px "Helvetica",
    "Arial",
    "sans-serif";
}
```

#### 结果

### [field-sizing](#field-sizing)

[`field-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing) 属性可控制表单输入框的尺寸行为（即默认情况下为其分配首选尺寸）。该属性允许覆盖默认行为，使表单控件能够根据内容自动调整尺寸。

该属性通常用于创建能紧贴内容缩放、随文本输入增长的表单字段。适用于接受直接文本输入的输入类型（例如 [`text`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/text) 和 [`url`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/url))、输入类型 [`file`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) 以及 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 元素。

### [object-position 和 object-fit](#object-position_和_object-fit)

在某些情况下（通常涉及非文本输入和专门的界面），`<input>` 元素是一个[可替换元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Replaced_elements)。当它为替换元素时，该元素在其框架内的位置和大小可以使用 CSS [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 和 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit) 属性来调整。

### [赋予样式](#赋予样式)

关于在 HTML 中为元素添加颜色的更多信息，参见：

-   [使用 CSS 为 HTML 元素添加颜色](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Colors/Applying_color)。

还可以参考：

-   [为 HTML 表单赋予样式](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Styling_web_forms)
-   [HTML 表单高级样式化](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Advanced_form_styling) 和
-   [CSS 属性兼容性表格](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms)。

## [额外特性](#额外特性)

### [标签](#标签)

需要标签来将辅助性文本与 `<input>` 联系起来。[`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素提供了关于一个表单字段的适合的解释信息（除了任何布局方面的考虑）。使用 `<label>` 解释输入至 `<input>` 或 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 的内容总是好的。

#### 关联标签

`<input>` 和 `<label>` 元素的语义配对对于屏幕阅读器等辅助技术是很有用的。通过使用 `<label>` 的 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label#for) 属性对它们进行配对，可以将标签与输入结合起来，让屏幕阅读器更精确地描述输入。

仅仅在 `<input>` 元素旁边有纯文本是不够的。相反，可用性和无障碍性要求包含隐式或显式 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)：

html

```
<!-- 非无障碍的 -->
<p>输入你的名字：<input id="name" type="text" size="30" /></p>

<!-- 隐式标签 -->
<p>
  <label>输入你的名字：<input id="name" type="text" size="30" /></label>
</p>

<!-- 显式标签 -->
<p>
  <label for="name">输入你的名字：</label>
  <input id="name" type="text" size="30" />
</p>
```

第一个示例没有无障碍性：提示和 `<input>` 元素没有关系。

除了无障碍名称外，标签还提供了一个更大的“命中”区域，供鼠标和触摸屏用户点击或触摸。通过将 `<label>` 和 `<input>` 配对，点击任何一个元素将聚焦 `<input>` 元素。如果你使用纯文本来给你的输入元素作“标签”，将不会享受到以上特性。将激活区的提示部分用于输入，对有运动控制条件的人是有帮助的。

作为 web 开发者，我们永远不要假定使用者知道所有的事情。使用 web 的人的多样性——可能延伸到你的网站中——实际上保证了你的网站的一些访问者在思维过程和/或情况上会有一些变化，导致他们在没有明确和适当的标签的情况下对你的表单有非常不同的解释。

#### 占位符不具有无障碍性

[`placeholder`](#placeholder) 属性可以让你指定在 `<input>` 元素的内容区域本身为空时出现的文本。不应该依靠占位符去理解表单。它不是一个标签，也不应该被用来替代。占位符是用来提示输入的值应该是什么样子，而不是解释。

不仅屏幕阅读器无法访问占位符，而且一旦用户在表单控件中输入任何文本，或者如果表单控件已经有一个值，占位符就会消失。具有自动页面翻译功能的浏览器在翻译时可能会跳过属性，这意味着 `placeholder` 可能不会被翻译。

**备注：**尽可能不要使用 [`placeholder`](#placeholder) 属性。如果需要标记 `<input>` 元素，请使用 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素。

### [客户端验证](#客户端验证)

**警告：**客户端验证是有用的，但它并_不能_保证服务器会收到有效的数据。如果数据必须是特定的格式，_总是_应该在服务器端进行验证，如果格式无效，则返回一个 [`400` HTTP 响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status/400)。

除了如上文 [UI 伪类](#ui_伪类)部分所述，使用 CSS 根据 [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:valid) 或 [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:invalid) 每个输入的当前状态来设计输入的样式之外，浏览器还在（试图）提交表单时提供了客户端验证。在表单提交时，如果有一个表单控件没有通过约束验证，支持的浏览器将在第一个无效的表单控件上显示一个错误信息；根据错误类型显示一个默认信息，或者由你设置的信息。

某些输入类型和其他属性对特定输入的有效值进行了限制。例如，`<input type="number" min="2" max="10" step="2">` 意味着只有数字 2、4、6、8 或 10 有效。某些错误可能发生，当值小于 2 时会发生 `rangeUnderflow` 错误，值大于 10 时会发生 `rangeOverflow` 错误，当值在 2 至 10 之间，但不是偶数（不满足 `step` 属性的需求）时会发生 `stepMismatch` 错误，如果值不是一个数字时会发生 `typeMismatch` 错误。

对于可能的值域是周期性的输入类型（也就是说，在可能的最高值时，值会绕回开始而不是结束），[`max`](#max) 和 [`min`](#min) 属性的值有可能是相反的，这表明允许的值范围从 `min` 开始，绕到可能的最低值，然后继续下去直到达到 `max`。这对日期和时间特别有用，比如你想让范围从晚上 8 点到早上 8 点：

html

```
<input type="time" min="20:00" max="08:00" name="overnight" />
```

特定的属性和它们的值会导致一个特定的错误 [`ValidityState`](https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState)：

Validity 对象的错误取决于 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 的属性及其值：
| 属性 | 相关属性 | 描述 |
| --- | --- | --- |
| [`max`](#max) | [`validityState.rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow) | 当值大于 `max` 属性所定义的最大值时发生 |
| [`maxlength`](#maxlength) | [`validityState.tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong) | 当字符数大于 `maxlength` 属性所允许的数量时发生 |
| [`min`](#min) | [`validityState.rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow) | 当值小于 `min` 属性所定义的最小值时发生 |
| [`minlength`](#minlength) | [`validityState.tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort) | 当字符数小于 `minlength` 属性所允许的数量时发生 |
| [`pattern`](#pattern) | [`validityState.patternMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch) | 当模式属性包含一个有效的正则表达式，而 `value` 与之不匹配时发生 |
| [`required`](#required) | [`validityState.valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing) | 当 `required` 存在时，但是值为 `null` 或单选钮、复选框未选中时发生 |
| [`step`](#step) | [`validityState.stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch) | 值不满足步进增量。增量默认值为 `1`，所以对于 `type="number"` 来说，只有整数才有效，`step="any"` 永远不会抛出这个错误。 |
| [`type`](#type) | [`validityState.typeMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch) | 当值的类型不正确时发生，例如，电子邮件不包含 `@`，或者不包含协议的 url。 |

如果一个表单控件没有 `required` 属性，没有值，或者是一个空字符串，都不是无效的。即使上述属性存在，除了 `required` 之外，和空字符串也不会导致错误。

我们可以对接受的值进行限制，支持的浏览器会对这些表单的数值进行原生验证，并在表单提交时提醒用户是否有错误。

除了上表中描述的错误外，`validityState` 接口还包含 `badInput`、`valid` 和 `customError` 布尔值只读属性。有效性对象包括：

-   [`validityState.valueMissing`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing)
-   [`validityState.typeMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch)
-   [`validityState.patternMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch)
-   [`validityState.tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong)
-   [`validityState.tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort)
-   [`validityState.rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow)
-   [`validityState.rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow)
-   [`validityState.stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch)
-   [`validityState.badInput`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput)
-   [`validityState.valid`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valid)
-   [`validityState.customError`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/customError)

对于这些布尔属性中的每一个，值为 `true` 表示指定的验证可能失败的原因是真实的，但 `valid` 属性除外，如果元素的值服从所有的约束，则为 `true`。

如果有错误，支持的浏览器会提醒用户，并阻止表单的提交。需要注意的是：如果自定义错误被设置为一个真值（除了空字符串或 `null` 以外的任何值），表单将被阻止提交。如果没有自定义错误信息，并且其他属性都没有返回真值，那么 `valid` 将为真，表单可以被提交。

js

```
function validate(input) {
  let validityState_object = input.validity;
  if (validityState_object.valueMissing) {
    input.setCustomValidity("需要一个值");
  } else if (validityState_object.rangeUnderflow) {
    input.setCustomValidity("值太小了");
  } else if (validityState_object.rangeOverflow) {
    input.setCustomValidity("值太大了");
  } else {
    input.setCustomValidity("");
  }
}
```

最后一行，将自定义的有效性信息设置为空字符串是至关重要的。如果用户出错，而有效性被设置，即使所有的值都是有效的，也会提交失败，直到消息为 `null`。

#### 自定义验证错误示例

如果你想在一个字段验证失败时显示一个自定义的错误信息，你需要使用[约束验证 API](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation#%E4%BD%BF%E7%94%A8_javascript_%E6%A0%A1%E9%AA%8C%E8%A1%A8%E5%8D%95)，在 `<input>`（及相关）元素上可用。以下面的表格为例：

html

```
<form>
  <label for="name">输入用户名（允许使用大小写字母）：</label>
  <input type="text" name="name" id="name" required pattern="[A-Za-z]+" />
  <button>提交</button>
</form>
```

如果你试图提交的表单没有填写有效的内容，或者是一个不符合 `pattern` 的值，基本的 HTML 表单验证功能将使其产生一个默认的错误信息。

如果你想转而显示自定义的错误信息，你可以使用下面这样的 JavaScript 代码：

js

```
const nameInput = document.querySelector("input");
nameInput.addEventListener("input", () => {
  nameInput.setCustomValidity("");
  nameInput.checkValidity();
});
nameInput.addEventListener("invalid", () => {
  if (nameInput.value === "") {
    nameInput.setCustomValidity("输入一个用户名！");
  } else {
    nameInput.setCustomValidity("用户名只能包含大写或小写字母，请再试一遍。");
  }
});
```

此示例会像这样渲染：

简单来说：

-   每次输入元素的值发生变化时，我们通过 `input` 事件处理程序运行 `checkValidity()` 方法来检查其有效状态。
-   如果值是无效的，会引发 `invalid` 事件，运行 `invalid` 事件处理函数。在这个函数中，我们使用 `if()` 块来决定值无效是因为它是空的，还是因为它不符合模式，并设置一个自定义的有效性错误信息。
-   因此，如果在按下提交按钮时，输入值是无效的，将显示其中一个自定义错误信息。
-   如果它是有效的，它就会像你所期望的那样提交。要做到这一点，必须取消自定义的有效性，通过使用空字符串调用 `setCustomValidity()` 来实现。我们在每次 `input` 事件发生时都要这样做。如果你不这样做，并且之前设置了一个自定义的有效性，那么输入将会认为无效，即使它目前包含一个有效的提交值。

**备注：**始终在客户端和服务器端验证输入约束。约束验证并不能消除在_服务器端_进行验证的必要性。无效的值仍然可以由旧的浏览器或坏的行为者发送。

**备注：**Firefox 在许多版本中支持一个专有的错误属性——`x-moz-errormessage`，它允许你以类似的方式设置自定义错误信息。从版本号 66 开始，这个属性已被移除（见 [Firefox bug 1513890](https://bugzil.la/1513890 "外部链接（在新标签页中打开）")）。

### [本地化](#本地化)

某些 `<input>` 类型所允许的输入方式取决于当地的语言。在某些地区，1,000.00 是一个有效的数字，而在其他地区，输入这个数字的有效方式是 1.000,00。

Firefox 使用以下启发式方法来确定验证用户输入的语言（至少对于 `type="number"`）。

-   尝试该元素或其任何父元素上的 `lang`/`xml:lang` 属性所指定的语言。
-   尝试任何 `Content-Language` HTTP 头所指定的语言。或者，
-   如果没有指定，则使用浏览器的区域设置。

## [无障碍](#无障碍)

### [标签](#标签_2)

在包含输入框时，添加标签是无障碍要求。此举旨在让辅助技术使用者明确输入框用途。此外，点击或触摸标签会将焦点转移至关联的表单控件，这既提升了视障用户的无障碍体验，也扩大了用户可点击/触摸的操作区域。对于尺寸微小的单选按钮和复选框而言，此设计尤为重要（甚至不可或缺）。有关标签的通用信息，请参阅[标签](#标签)。

以下示例展示了如何以上述样式关联 `<label>` 与 `<input>` 元素：需为 `<input>` 添加 `id` 属性，`<label>` 则需设置 `for` 属性，其值应与输入框的 `id` 一致。

html

```
<label for="peas">你喜欢豌豆吗？</label>
<input type="checkbox" name="peas" id="peas" />
```

### [尺寸](#尺寸)

交互元素（如表单输入框）应提供足够大的区域以便轻松激活。这有助于各类人群，包括存在运动控制障碍者，以及使用触控笔或手指等非精确输入方式的用户。建议最小交互区域尺寸为 44×44 [CSS 像素](https://w3c.github.io/wcag/guidelines/22/#dfn-css-pixels "外部链接（在新标签页中打开）")。

-   [理解成功标准 2.5.5：目标尺寸 | W3C 理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html "外部链接（在新标签页中打开）")
-   [目标尺寸与 2.5.5 准则 | Adrian Roselli](https://adrianroselli.com/2019/06/target-size-and-2-5-5.html "外部链接（在新标签页中打开）")
-   [快速测试：大尺寸触控目标 - A11Y 项目](https://www.a11yproject.com/posts/large-touch-targets/ "外部链接（在新标签页中打开）")

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、列表元素、可提交元素、可重设元素、表单相关元素<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。如果 <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#attr-type" aria-current="page">type</a></code> 不是 <code>hidden</code> 的，则也是可标签元素、可感知内容。</td></tr><tr><th scope="row">允许内容</th><td>无，这是一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">空元素</a>。</td></tr><tr><th scope="row">标签省略</th><td>必须有开始标签，不可以有结束标签。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><ul><li><code>type=button</code>： <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">button</a></code></li><li><code>type=checkbox</code>： <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/checkbox_role">checkbox</a></code></li><li><code>type=email</code><ul><li>无 <code>list</code> 属性： <code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/textbox_role">textbox</a></code></li><li>有 <code>list</code> 属性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a></li></ul></li><li><code>type=image</code>： <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">button</a></code></li><li><code>type=number</code>：<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/spinbutton_role"><code>spinbutton</code></a></li><li><code>type=radio</code>：<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/radio_role"><code>radio</code></a></li><li><code>type=range</code>：<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/slider_role"><code>slider</code></a></li><li><code>type=reset</code>: <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">button</a></code></li><li><code>type=search</code><ul><li>无 <code>list</code> 属性：<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/searchbox_role"><code>searchbox</code></a></li><li>有 <code>list</code> 属性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a></li></ul></li><li><code>type=submit</code>: <code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/button_role">button</a></code></li><li><code>type=tel</code><ul><li>无 <code>list</code> 属性： <code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/textbox_role">textbox</a></code></li><li>有 <code>list</code> 属性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a></li></ul></li><li><code>type=text</code><ul><li>无 <code>list</code> 属性： <code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/textbox_role">textbox</a></code></li><li>有 <code>list</code> 属性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a></li></ul></li><li><code>type=url</code><ul><li>无 <code>list</code> 属性： <code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/textbox_role">textbox</a></code></li><li>有 <code>list</code> 属性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a></li></ul></li><li><code>type=color|date|datetime-local|file|hidden|month|password|time|week</code>： <a href="https://w3c.github.io/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></li></ul></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><ul><li><code>type=button</code>：<code><a href="https://w3c.github.io/aria/#link" target="_blank" title="外部链接（在新标签页中打开）">link</a></code>、<code><a href="https://w3c.github.io/aria/#menuitem" target="_blank" title="外部链接（在新标签页中打开）">menuitem</a></code>、<code><a href="https://w3c.github.io/aria/#menuitemcheckbox" target="_blank" title="外部链接（在新标签页中打开）">menuitemcheckbox</a></code>、<code><a href="https://w3c.github.io/aria/#menuitemradio" target="_blank" title="外部链接（在新标签页中打开）">menuitemradio</a></code>、<code><a href="https://w3c.github.io/aria/#radio" target="_blank" title="外部链接（在新标签页中打开）">radio</a></code>、<code><a href="https://w3c.github.io/aria/#switch" target="_blank" title="外部链接（在新标签页中打开）">switch</a></code>、<code><a href="https://w3c.github.io/aria/#tab" target="_blank" title="外部链接（在新标签页中打开）">tab</a></code></li><li><code>type=checkbox</code>：<code><a href="https://w3c.github.io/aria/#button" target="_blank" title="外部链接（在新标签页中打开）">button</a></code>、<code><a href="https://w3c.github.io/aria/#menuitemcheckbox" target="_blank" title="外部链接（在新标签页中打开）">menuitemcheckbox</a></code>、<code><a href="https://w3c.github.io/aria/#option" target="_blank" title="外部链接（在新标签页中打开）">option</a></code>、<code><a href="https://w3c.github.io/aria/#switch" target="_blank" title="外部链接（在新标签页中打开）">switch</a></code></li><li><code>type=image</code>：<code><a href="https://w3c.github.io/aria/#link" target="_blank" title="外部链接（在新标签页中打开）">link</a></code>、<code><a href="https://w3c.github.io/aria/#menuitem" target="_blank" title="外部链接（在新标签页中打开）">menuitem</a></code>、<code><a href="https://w3c.github.io/aria/#menuitemcheckbox" target="_blank" title="外部链接（在新标签页中打开）">menuitemcheckbox</a></code>、<code><a href="https://w3c.github.io/aria/#menuitemradio" target="_blank" title="外部链接（在新标签页中打开）">menuitemradio</a></code>、<code><a href="https://w3c.github.io/aria/#radio" target="_blank" title="外部链接（在新标签页中打开）">radio</a></code>、<code><a href="https://w3c.github.io/aria/#switch" target="_blank" title="外部链接（在新标签页中打开）">switch</a></code></li><li><code>type=radio</code>：<code><a href="https://w3c.github.io/aria/#menuitemradio" target="_blank" title="外部链接（在新标签页中打开）">menuitemradio</a></code></li><li>没有 <code>list</code> 属性的 <code>type=text</code>： <a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role"><code>combobox</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/searchbox_role"><code>searchbox</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/spinbutton_role"><code>spinbutton</code></a></li><li><code>type=color|date|datetime-local|email|file|hidden|</code> <code>month|number|password|range|reset|search|submit|tel|url|week</code> 或有 <code>list</code> 属性的 <code>type=text</code>：没有允许的 <code>role</code></li></ul></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement"><code>HTMLInputElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-input-element](https://html.spec.whatwg.org/multipage/input.html#the-input-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   CSS [`appearance`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/appearance) 属性
-   [你的第一个表单](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Your_first_form)
-   [如何构建 HTML 表单](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
-   [原生表单控件](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Basic_native_form_controls)
-   [发送表单数据](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
-   [表单约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [为 HTML 表单添加样式](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Styling_web_forms)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年3月30日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/contributors.txt)更新。
