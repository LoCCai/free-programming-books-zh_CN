## 内容分类

大多数 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素都属于一个或多个**内容类别**——这些类别对具有共同特征的元素进行分组。这是一个松散的分组（它实际上并没有在这些类别的元素之间建立关系），但它们有助于定义和描述这些类别的共同行为及其相关规则，特别是在你遇到它们的复杂细节时。元素也有可能不属于其中的_任何_类别。

以下是三种类型的内容分类：

-   主内容类，描述了很多元素共享的规则；
-   表单相关的内容类，描述了表单相关元素共有的规则；
-   特殊内容类，描述了仅仅在少数元素（有时仅在特定的上下文中）共享的规则。

**备注：**对这些内容类别及其功能的更详细的讨论超出了本文的范围；如果你想了解这些内容，请阅读 [HTML 规范的相关部分](https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content "外部链接（在新标签页中打开）")。

![显示各种内容类别相互之间是如何关联的维恩图。后面的部分以文本形式解释这些关系。](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories/content_categories_venn.png)

## [主内容分类](#主内容分类)

### [元数据内容](#元数据内容)

属于_元数据内容_（Metadata content）的元素可以修改文档其余部分的呈现或行为、建立与其他文档的链接，或者传达其他_带外_信息。

属于这一类的元素有：[`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)、[`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta)、[`<noscript>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)、[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style) 和 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)。

### [流式内容](#流式内容)

流式内容（Flow content）是一个广泛的类别，包括大多数可以包含在 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) 元素之内的元素，包括标题元素、分段元素、短语元素、嵌入元素、交互元素和表单相关元素。它还包括文本节点（但不包括那些只由空白字符组成的节点）。

流式元素有：

-   [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a)
-   [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr)
-   [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)
-   [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)
-   [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)
-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)
-   [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b)
-   [`<bdo>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdo)
-   [`<bdi>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdi)
-   [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote)
-   [`<br>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/br)
-   [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)
-   [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas)
-   [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite)
-   [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code)
-   [`<data>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/data)
-   [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist)
-   [`<del>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/del)
-   [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details)
-   [`<dfn>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dfn)
-   [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog)
-   [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div)
-   [`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl)
-   [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/em)
-   [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed)
-   [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)
-   [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figure)
-   [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)
-   [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form)
-   [`<h1>`\-`<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)
-   [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)
-   [`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)
-   [`<hr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hr)
-   [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i)
-   [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)
-   [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<ins>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ins)
-   [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/kbd)
-   [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)
-   [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main)
-   [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map)
-   [`<mark>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/mark)
-   [`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>")
-   [`<menu>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/menu)
-   [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)
-   [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)
-   [`<noscript>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript)
-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)
-   [`<ol>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol)
-   [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)
-   [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p)
-   [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)
-   [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre)
-   [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress)
-   [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q)
-   [`<ruby>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ruby)
-   [`<s>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/s)
-   [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/samp)
-   [`<search>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/search)
-   [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
-   [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)
-   [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot)
-   [`<small>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small)
-   [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/span)
-   [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strong)
-   [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub)
-   [`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup)
-   [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg)
-   [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table)
-   [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template)
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)
-   [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time)
-   [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/u)
-   [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul)
-   [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/var)
-   [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)
-   [`<wbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/wbr)
-   纯文本

属于此类的少数其他元素，但仅限于以下特殊情况：

-   [`<area>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/area)，当它为 [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map) 元素的子元素时
-   [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)，若存在 [itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/itemprop) 属性
-   [`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta)，若存在 [itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/itemprop) 属性
-   [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style)，若存在 `scoped` 属性

### [分段内容](#分段内容)

分段内容（Sectioning content）是流式内容的一个子集，可以在[当前大纲中创建一个分段](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)，它定义了 [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header) 元素、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer) 元素和[标题内容](#标题内容)的范围。

属于此类的元素有：[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav) 和 [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)。

### [标题内容](#标题内容)

标题内容（Heading content）是流式内容的一个子集，定义了分段的标题，而这个分段可能由一个明确的[分段内容](#分段内容)元素直接标记，也可能由标题本身隐式地定义。

属于此分类的元素有：[`<h1>`\-`<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements) 和 [`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)。

**备注：**尽管 [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header) 可能包含一些标题内容，但其并不是标题内容本身。

**备注：**已不再推荐使用 [`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup) 元素，因为它不能与辅助技术一起正常工作。在 HTML 5 最终定稿之前，它已从 W3C 的 HTML 规范中删除，但其仍属于 WHATWG 规范，并且仍被大多数浏览器部分支持。

### [短语内容](#短语内容)

短语内容（Phrasing content）是流式内容的一个子集，定义了文档中的文本和标记。短语内容的序列构成段落。

属于此类的元素有：

-   [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr)
-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)
-   [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b)
-   [`<bdi>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdi)
-   [`<bdo>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdo)
-   [`<br>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/br)
-   [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)
-   [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas)
-   [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite)
-   [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code)
-   [`<data>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/data)
-   [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist)
-   [`<dfn>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dfn)
-   [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/em)
-   [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed)
-   [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i)
-   [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)
-   [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/kbd)
-   [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)
-   [`<mark>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/mark)
-   [`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>")
-   [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)
-   [`<noscript>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript)
-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)
-   [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)
-   [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)
-   [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress)
-   [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q)
-   [`<ruby>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ruby)
-   [`<s>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/s)
-   [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/samp)
-   [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)
-   [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot)
-   [`<small>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small)
-   [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/span)
-   [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strong)
-   [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub)
-   [`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup)
-   [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg)
-   [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template)
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)
-   [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time)
-   [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/u)
-   [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/var)
-   [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)
-   [`<wbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/wbr)
-   纯文本（仅当所包含的内容不完全为空白字符）

一些其他的元素也属于这个分类，但仅限于以下特殊情况：

-   [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a)，当它仅包含短语内容时
-   [`<area>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/area)，当它为 [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map) 元素的子元素时
-   [`<del>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/del)，当它仅包含短语内容时
-   [`<ins>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ins)，当它仅包含短语内容时
-   [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)，若存在 [itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/itemprop) 属性
-   [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map)，当它仅包含短语内容时
-   [`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta)，若存在 [itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/itemprop) 属性

### [嵌入内容](#嵌入内容)

嵌入内容（Embedded content）是流式内容的一个子集，它导入另一种资源，或者将来自另一种标记语言或命名空间的内容插入到文档中。属于此类的元素有：

-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)
-   [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas)
-   [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed)
-   [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)
-   [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)
-   [`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>")
-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)
-   [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture)
-   [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg)
-   [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)

### [交互内容](#交互内容)

交互内容（Interactive content）是流式内容的一个子集，包含为用户交互而特别设计的元素。属于此类的元素有：

-   [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)
-   [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details)
-   [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed)
-   [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)
-   [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)

一些其他的元素也属于这个分类，但仅限于以下特殊情况：

-   [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a)，若存在 [`href`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#href) 属性
-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)，若存在 [`controls`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio#controls) 属性
-   [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img)，若存在 [`usemap`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img#usemap) 属性
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)，若 [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#type) 属性不处于隐藏（hidden）状态
-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)，若存在 [`usemap`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object#usemap) 属性
-   [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video)，若存在 [`controls`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video#controls) 属性

### [可感知内容](#可感知内容)

当内容既不是空的也不是隐藏的时候，它就是可感知（palpable）的；它是被渲染的内容，是实质性的。以流式内容为模型的元素应该至少有一个节点是可感知的。

### [表单相关内容](#表单相关内容)

表单相关内容（Form-associated content）是流式内容的一个子集，包括有表单所有者（通过 **form** 属性暴露）的元素，可以在预期有流式内容的地方使用。表单所有者要么是容纳这些元素的 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素，要么是在 **form** 属性中指定其 id 的元素。

-   [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)
-   [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)
-   [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)
-   [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)
-   [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)
-   [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress)
-   [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)
-   [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)

此类包含了几个子类：

[可列举的元素（listed）](#可列举的元素（listed）)

在 [`form.elements`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/elements "form.elements") 和 `fieldset.elements` 集合中列举出的元素。包括 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。

[可标记的元素（labelable）](#可标记的元素（labelable）)

可以与 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 相关联的元素。包括 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。

[可提交的元素（submittable）](#可提交的元素（submittable）)

包括当表单提交时可以用来组成表单数据的元素。包括 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button)、[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。

[可重置的元素（resettable）](#可重置的元素（resettable）)

当表单重置时会被重置的元素。包括 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output)、[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 和 [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)。

## [二级分类](#二级分类)

这里还有一些你需要注意的二级分类元素。

### [支持脚本元素](#支持脚本元素)

**支持脚本元素**（Script-supporting element）是不直接影响文档渲染输出的元素。相反，它们的作用是支持脚本，或者直接包含或指定脚本代码，或者指定将被脚本使用的数据。

支持脚本元素有：

-   [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)
-   [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template)

## [透明内容模型](#透明内容模型)

如果一个元素拥有透明内容（Transparent content）模型，即使将透明内容移除并使用子元素取代，其内容也必须构成有效的 HTML5。

例如，[`<del>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/del) 和 [`<ins>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ins) 是透明的：

html

```
<p>
  我们认为以下真理是<del><em>神圣而不可否认</em></del
  ><ins>不言而喻</ins>的。
</p>
```

即使这两个元素被移除，这个代码段依然是有效的（至少从代码语法上）。

html

```
<p>我们认为以下真理是<em>神圣而不可否认</em>不言而喻的。</p>
```

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories/contributors.txt)更新。
