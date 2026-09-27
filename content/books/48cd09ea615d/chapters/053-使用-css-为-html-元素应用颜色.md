本文主要介绍 HTML 中使用 CSS 颜色的各种方法。

色彩的运用是人类表达的一种基本形式。小孩子在学会绘画前就开始尝试色彩的运用。也许这就是为什么颜色是人们在学习开发网站时最想尝试的东西之一。借助 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)，有很多方法可以为 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) [元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements)添加颜色，以创建所需的外观。

我们将会谈及添加颜色所需要的大部分内容，包括[一系列可以着色的元素与相关的 CSS 属性](#可设置颜色的内容)，[如何描述颜色](#如何描述颜色)，以及[在样式表与脚本中使用颜色的方法](#使用颜色)。同时我们还会了解如何[让用户选择颜色](#让用户选择颜色)。

然后我们会通过简短的讨论总结如何[机智地运用颜色](#机智地运用颜色)：如何选择合适的颜色，同时考虑不同视力水平的人的需求。

## [可设置颜色的内容](#可设置颜色的内容)

从 HTML 元素层面来看，所有的元素都可设置颜色。但除了元素本身之外，元素中所绘制的事物也可设置颜色，如文本、边框等等。我们将会看到一系列用于设置颜色的 CSS 属性。

在这些设置颜色的 CSS 属性中，最基础的就是 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性和 [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color) 属性了。分别用于设置 HTML 元素内容的前景色和背景色。这两个属性几乎可用于所有的 HTML 元素。

### [文本](#文本)

无论何时渲染元素，这些属性都将用于确定文本的颜色、背景以及文本上的任何装饰。

[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color)

绘制文本和任何[文本装饰](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Text_styling/Fundamentals#%E5%AD%97%E4%BD%93%E6%A0%B7%E5%BC%8F%E3%80%81%E5%AD%97%E4%BD%93%E7%B2%97%E7%BB%86%E3%80%81%E6%96%87%E6%9C%AC%E8%BD%AC%E6%8D%A2%E5%92%8C%E6%96%87%E6%9C%AC%E8%A3%85%E9%A5%B0)（如添加下划线或上划线、删除线等）时使用的颜色。

[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color)

文本的背景色。

[`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-shadow)

配置应用于文字的阴影效果。阴影选项包括阴影的基色（然后根据其他参数将基色模糊并与背景混合）。请参阅[文字阴影](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Text_styling/Fundamentals#%E6%96%87%E5%AD%97%E9%98%B4%E5%BD%B1)以了解更多信息。

[`text-decoration-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-decoration-color)

默认情况下，文本装饰（如下划线、删除线等）使用 `color` 属性作为其颜色。不过，你可以使用 `text-decoration-color` 属性覆盖该行为，并为它们使用不同的颜色。

[`text-emphasis-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-emphasis-color)

绘制文本中每个字符旁边的强调符号时使用的颜色。主要用于绘制东亚语言的文本。

[`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/caret-color)

在元素中绘制[光标](https://developer.mozilla.org/zh-CN/docs/Glossary/Caret)时使用的颜色（有时也称为文本输入光标）。这仅对可编辑的元素有用，如 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) 或设置了 HTML [`contenteditable`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes#contenteditable) 属性的元素。

### [盒](#盒)

每个元素都是一个包含某种内容的盒子，除了盒子中的内容外，还有背景和边框。

[边框](#边框_2)

请参阅[边框](#边框)一节，了解可用于设置方框边框颜色的 CSS 属性列表。

[`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color)

在元素中没有前景内容的区域使用的背景色。

[`column-rule-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/column-rule-color)

绘制文本分隔线时使用的颜色。

[`outline-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/outline-color)

在元素外部绘制轮廓时使用的颜色。该轮廓与边框不同，它不会在文档中预留空间（因此可能会与其他内容重叠）。它通常用作焦点指示器，显示哪个元素将接收输入事件。

### [边框](#边框)

任何元素都可以在其周围绘制[边框](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Backgrounds_and_borders)。基本的元素边框是围绕元素内容边缘绘制的一条线。请参阅[盒模型](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Box_model)了解元素与其边框之间的关系，并参阅文章[使用 CSS 为边框添加样式](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Backgrounds_and_borders)了解为边框应用样式的更多信息。

你可以使用 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border) 简写属性，这样就可以一次性配置边框的所有内容（包括边框的非颜色特性，如[宽度](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-width)、[样式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-style)（实线、虚线等）等等）。

[`border-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-color)

为元素边框的每一侧指定一种颜色。

[`border-left-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-left-color)、[`border-right-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-right-color)、[`border-top-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-top-color) 和 [`border-bottom-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-bottom-color)

设置元素边框相应边的颜色。

[`border-block-start-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-block-start-color) 和 [`border-block-end-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-block-end-color)

通过这些属性，你可以设置用于绘制边框的颜色，这些颜色最靠近边框所包围的区块的起始和结束位置。在从左到右的书写模式下（如英文的书写方式），块向的起始边框是上边缘，结束边框是下边缘。这与行向开始和结束不同，行向开始和结束是左右边缘（对应于方框中每行文本的开始和结束位置）。

[`border-inline-start-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-inline-start-color) 和 [`border-inline-end-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border-inline-end-color)

通过这些选项，你可以为最靠近方框内文本行开头和结尾的边框边缘着色。至于是哪一边，取决于 [`writing-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/writing-mode)、[`direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/direction) 和 [`text-orientation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-orientation) 属性，它们通常（但不总是）用于根据显示语言调整文本方向。例如，如果盒子的文本是从右到左显示的，那么 `border-inline-start-color` 就会应用到边框的右侧。

### [其他使用颜色的方式](#其他使用颜色的方式)

CSS 并不是唯一支持颜色的 web 技术。同时还有其他支持颜色的图形技术。

HTML [Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

可让你在 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas) 元素中绘制二维位图图形。请参阅我们的 [Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)了解更多信息。

[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)（可缩放矢量图形）

SVG 可让你使用绘制特定形状、图案和线条的命令来绘制图像。SVG 命令的格式为 XML，可以直接嵌入网页，也可以像其他类型的图像一样，使用 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素放置在网页中。

[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)

网络图形库是一种基于 OpenGL ES 的 API，用于在 Web 上绘制高性能的 2D 和 3D 图形。请参阅我们的 [WebGL 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial)了解更多信息。

## [使用颜色](#使用颜色)

现在，你已经知道有哪些 CSS 属性可以让你为元素着色，也知道了可以用来描述颜色的格式，你可以将它们组合在一起，开始使用颜色了。正如你在[可设置颜色的内容](#可设置颜色的内容)下的列表中所看到的，有很多事物都可以用 CSS 着色。让我们从两个方面来看看：在[样式表](https://developer.mozilla.org/zh-CN/docs/Glossary/Style_sheet)中使用颜色，以及使用 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 代码添加和更改颜色，以改变元素的样式。

### [在样式表中指定颜色](#在样式表中指定颜色)

为元素应用颜色的最简单方法，也是你通常会采用的方法，就是在呈现元素时使用的 CSS 中指定颜色。虽然我们不会使用前面提到的每一个属性，但我们会看几个示例。这个概念在任何使用颜色的地方都是一样的。

让我们来看一个示例，首先看看我们要达到的效果：

#### HTML

创建上述示例的 HTML 代码如下所示：

html

```
<div class="wrapper">
  <div class="box boxLeft">
    <p>这是第一个盒子。</p>
  </div>
  <div class="box boxRight">
    <p>这是第二个盒子。</p>
  </div>
</div>
```

这非常简单，只需使用一个 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 作为内容的包装，内容由另外两个 `<div>` 组成，每个框中都有一个段落（[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p)），每个段落的样式各不相同。

像往常一样，神奇的事情发生在 CSS 中，我们将在 CSS 中应用颜色并定义上述 HTML 的布局。

#### CSS

我们将逐一查看创建上述结果的 CSS，以便逐一回顾有趣的部分。

css

```
.wrapper {
  width: 620px;
  height: 110px;
  margin: 0;
  padding: 10px;
  border: 6px solid mediumturquoise;
}
```

`.wrapper` 类用于为 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 指定样式，而 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 则封装了我们所有的其他内容。将使用 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/height) 来确定容器的大小，以及其 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/margin) 和 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/padding)。

在这里，我们更感兴趣的是使用 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border) 属性在元素外边缘建立一个边框。该边框是一条宽 6 像素的实线，颜色为 `mediumturquoise`。

我们的两个彩色盒子有许多共同属性，因此接下来我们要建立一个定义这些共同属性的类 `.box`：

css

```
.box {
  width: 290px;
  height: 100px;
  margin: 0;
  padding: 4px 6px;
  font:
    28px "Marker Felt",
    "Zapfino",
    cursive;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

简而言之，`.box` 确定了每个盒子的大小以及内部使用的字体配置。我们还利用 [CSS 弹性盒布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Flexible_box_layout)，轻松将每个盒子的内容居中。我们使用 [`display: flex`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display) 启用 `flex` 模式，并将 [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/justify-content) 和 [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/align-items) 都设置为 `center`。然后，我们就可以为两个盒子分别创建一个类，定义两者不同的属性。

css

```
.boxLeft {
  float: left;
  background-color: rgb(245, 130, 130);
  outline: 2px solid darkred;
}
```

`.boxLeft` 类巧妙地将方框浮动到左侧，然后设置颜色：

-   将 CSS [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color) 属性的值改为 `rgb(245,130,130)`，即可设置方框的背景颜色。
-   为方框定义轮廓。与更常用的 `border` 不同，[`outline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/outline) 完全不影响布局；它画在元素框外的任何东西的顶部，而不是像 `border` 那样腾出空间。这个轮廓是一条两像素粗的暗红色实线。注意在指定颜色时使用了 `darkred` 关键字。
-   请注意，我们没有明确设置文本颜色。这意味着，[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 的值将从定义它的最近的包含元素继承。默认情况下，就是黑色。

css

```
.boxRight {
  float: right;
  background-color: hsl(270deg, 50%, 75%);
  outline: 4px dashed rgb(110, 20, 120);
  color: hsl(0deg, 100%, 100%);
  text-decoration: underline wavy #88ff88;
  text-shadow: 2px 2px 3px black;
}
```

**备注：**当尝试在 Safari 中显示它时，它将无法正常显示。因为 Safari 不支持 `text-decoration: underline wavy #88ff88`。

最后，`.boxRight` 类描述了绘制在右侧的方框的独特属性。它的配置是将方框浮动到右侧，使其出现在前一个方框的旁边。然后确定以下颜色：

-   `background-color` 是使用 `hsl(270deg, 50%, 75%)` 指定的 HSL 值设置的。这是一种中紫色。
-   方框的 `outline` 用于指定将方框括在一条四像素粗的虚线中，该虚线的颜色是略深一些的紫色（`rgb(110, 20, 120)`）。
-   前景（文本）颜色通过将 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/color) 属性设置为 `hsl(0deg,100%,100%)` 来指定。这是指定白色的多种方法之一。
-   我们使用 [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-decoration) 在文字下方添加一条绿色波浪线。
-   最后，使用 [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-shadow) 为文字添加一点阴影。其 `color` 参数设置为 `black`。

## [让用户选择颜色](#让用户选择颜色)

在许多情况下，网站可能需要让用户选择一种颜色。也许你有一个可定制的用户界面，或者你正在实现一个绘图应用程序。也许你有可编辑的文本，需要让用户选择文本颜色。或者，你的应用程序可以让用户为文件夹或项目指定颜色。虽然从历史上看，有必要实现自己的[颜色选择器](https://en.wikipedia.org/wiki/Color_picker "外部链接（在新标签页中打开）")，但 HTML 现在支持浏览器通过 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素，使用 `"color"` 作为其 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#type) 属性的值，提供一个开箱即用的颜色选择器。

`<input>` 元素仅使用上述[十六进制字符串表示法](#十六进制字符串表示法)表示一种颜色。

### [示例：选择一个颜色](#示例：选择一个颜色)

我们来看一个简单的示例，用户可以选择一种颜色。当用户调整颜色时，示例周围的边框会发生变化，以反映新的颜色。完成并选择最终颜色后，颜色选择器的值就会显示出来。

**备注：**在 macOS 上，关闭颜色选择器窗口即表示已完成颜色选择。

#### HTML

这里的 HTML 创建了一个包含颜色选择器控件（标签使用 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 元素创建）和一个空段落元素（[`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p)）的盒子，我们将在其中输出 JavaScript 代码中的一些文本。

html

```
<div id="box">
  <label for="colorPicker">边框颜色：</label>
  <input type="color" value="#8888ff" id="colorPicker" />
  <p id="output"></p>
</div>
```

#### CSS

CSS 为盒子设定了大小，并为外观设定了一些基本样式。此外，还为边框设定了 2 像素的宽度和边框颜色。

css

```
#box {
  width: 500px;
  height: 200px;
  border: 2px solid rgb(245, 220, 225);
  padding: 4px 6px;
  font:
    16px "Lucida Grande",
    "Helvetica",
    "Arial",
    "sans-serif";
}
```

#### JavaScript

此处的脚本负责更新边框的起始颜色，使其与颜色选择器的值相匹配。然后添加两个事件处理程序，以处理来自 [`<input type="color">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/color) 元素的输入。

js

```
const colorPicker = document.getElementById("colorPicker");
const box = document.getElementById("box");
const output = document.getElementById("output");

box.style.borderColor = colorPicker.value;

colorPicker.addEventListener(
  "input",
  (event) => {
    box.style.borderColor = event.target.value;
  },
  false,
);

colorPicker.addEventListener(
  "change",
  (event) => {
    output.innerText = `颜色已设置为 ${colorPicker.value}。`;
  },
  false,
);
```

每次元素的值发生变化，即每次用户调整颜色选择器中的颜色时，[`input`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/input_event "input") 事件就会被发送。每次该事件发生时，我们都会设置方框的边框颜色，使其与颜色选择器的当前值相匹配。

当颜色选择器的值最终确定时，我们会收到 [`change`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/change_event "change") 事件。我们的回应是将 ID 为 `"output"` 的 `<p>` 元素的内容设置为描述最终选定颜色的字符串。

## [参见](#参见)

-   [绘制图形](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Client-side_APIs/Drawing_graphics)
-   [Web 上的图形](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_images#web_%E4%B8%8A%E7%9A%84%E5%85%B6%E4%BB%96%E5%9B%BE%E5%BD%A2)
-   [CSS 颜色模块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Colors)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年2月25日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Colors/Applying_color/contributors.txt)更新。
