## [主根元素](#主根元素)

| 元素 | 描述 |
| --- | --- |
| [`<html>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/html) | 表示一个 HTML 文档的根（顶级元素），所以它也被称为_根元素_。所有其它元素必须是此元素的后代。 |

## [文档元数据](#文档元数据)

元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如[搜索引擎](https://developer.mozilla.org/zh-CN/docs/Glossary/Search_engine)、[浏览器](https://developer.mozilla.org/zh-CN/docs/Glossary/Browser)等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。

| 元素 | 描述 |
| --- | --- |
| [`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base) | 指定用于一个文档中包含的所有相对 URL 的基础 URL。一个文档中只能有一个该元素。 |
| [`<head>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head) | 包含机器可读的文档相关的配置信息（元数据），包括文档的[标题](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)、[脚本](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)和[样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style)等。 |
| [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link) | 指定当前文档与外部资源的关系。该元素最常用于链接 CSS，此外也可以被用来创建站点图标（比如“favicon”样式图标和移动设备上用以显示在主屏幕的图标）。 |
| [`<meta>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta) | 表示那些不能由其它 HTML 元相关元素表示的[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)信息。如：[`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)、[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style) 或 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title)。 |
| [`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/style) | 包含文档或文档部分内容的样式信息。它包含 CSS 样式，这些样式将应用于包含此元素的文档内容。 |
| [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/title) | 定义文档的标题，显示在[浏览器](https://developer.mozilla.org/zh-CN/docs/Glossary/Browser)的标题栏或标签页上。它仅包含文本；元素内部的 HTML 标签（如有）也将被视为纯文本。 |

## [分区根元素](#分区根元素)

| 元素 | 描述 |
| --- | --- |
| [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) | 表示文档的内容。文档中只能有一个该元素。 |

## [内容分区](#内容分区)

内容分区元素允许你将文档内容从逻辑上进行组织划分。使用包括页眉、页脚、导航和标题等分区元素，来为页面内容创建明确的大纲，以便区分各个章节的内容。

| 元素 | 描述 |
| --- | --- |
| [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address) | 表示其中的 HTML 提供了某个人、某些人或某个组织的联系信息。 |
| [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article) | 代表文档、页面、应用程序或网站中一个自包含的组成部分，旨在独立分发或重复使用（例如在联合发布中）。示例包括论坛帖子、杂志或报纸文章、博客条目、产品卡片、用户提交的评论、交互式小部件或小工具，以及任何其他独立的内容项。 |
| [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside) | 表示文档的一部分，其内容仅与文档的主要内容间接相关。其通常以侧边栏或标注框（call-out box）的形式出现。 |
| [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer) | 表示最近的一个父[分段内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%88%86%E6%AE%B5%E5%86%85%E5%AE%B9)或[分区根](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)元素的页脚。`<footer>` 通常包含该章节作者、版权数据或者与文档相关的链接等信息。 |
| [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header) | 表示介绍性内容，通常包含一组介绍性的或是辅助导航的实用元素。它可能包含一些标题元素，但也可能包含其它元素，比如徽标、搜索表单、作者名称和其它元素。 |
| [`<h1>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<h2>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<h3>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<h4>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<h5>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements) | 表示六个不同的级别的章节标题，`<h1>` 级别最高，而 `<h6>` 级别最低。 |
| [`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup) | 表示与任何次要内容（如副标题、替代标题或标语）组合的标题。 |
| [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/main) | 呈现了文档正文的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。 |
| [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav) | 表示页面的一部分，其目的是在当前文档或其它文档中提供导航链接。导航部分的常见示例是菜单、目录和索引。 |
| [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section) | 表示文档中一个通用的独立部分，该部分没有更具体语义元素可代表。除极少数例外情况外，章节应始终带有标题。 |
| [`<search>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/search) | 表示包含一组表单控件或其他内容的部件，这些内容与执行搜索或过滤操作相关。 |

## [文本内容](#文本内容)

使用 HTML 文本内容元素来组织在开标签 [`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body) 和闭标签 `</body>` 里的块或章节的内容。这些元素能标识内容的宗旨或结构，而这对于[无障碍](https://developer.mozilla.org/zh-CN/docs/Glossary/Accessibility)和[搜索引擎优化](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)很重要。

| 元素 | 描述 |
| --- | --- |
| [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote) | 代表其中的文字是引用内容。在渲染时，这部分的内容通常会有一定的缩进。引文来源的 URL 地址可以使用属性 `cite` 给出，而来源的文本可以使用 [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite) 元素给出。 |
| [`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dd) | 用来指明一个描述列表（[`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl)）元素中先前术语（[`<dt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dt)）的描述、定义或值。 |
| [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) | 一个通用型的流式内容容器，在不使用 CSS 的情况下，其对内容或布局没有任何影响，直到通过某种方式设置样式（例如，将样式直接应用于该元素，或将[弹性盒子](https://developer.mozilla.org/zh-CN/docs/Glossary/Flexbox)等布局模型应用于其父元素）。 |
| [`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl) | 一个包含一组术语（使用 [`<dt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dt) 元素指定）以及描述（由 [`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dd) 元素提供）的列表。通常用于展示词汇表或者元数据（键—值对列表）。 |
| [`<dt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dt) | 在描述或定义列表中声明一个术语。该元素仅能作为 [`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl) 的子元素出现。通常在该元素后面会跟着一个 [`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dd) 元素；但多个连续出现的 `<dt>` 元素也将由出现在它们后面的第一个 [`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dd) 元素定义。 |
| [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption) | 描述其父元素 [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figure) 里其它内容的标题或图例。 |
| [`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figure) | 表示一段独立的内容，可能包含 [`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption) 元素定义的标题。该插图、标题和其中的内容通常作为一个独立的引用单元。 |
| [`<hr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hr) | 表示段落级元素之间的主题转换：例如，一个故事中的场景的改变，或一个章节的主题的改变。 |
| [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li) | 表示列表里的条目。它必须包含在一个父元素里：有序列表（[`<ol>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol)）、无序列表（[`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul)）或者菜单（[`<menu>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/menu)）。在菜单或者无序列表里，列表条目通常用点排列显示；在有序列表里，列表条目通常在左边显示按升序排列的计数，例如数字或者字母。 |
| [`<menu>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/menu) | [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 的语意替换，但被浏览器视为（并向无障碍树暴露为）与 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 没有区别。它表示了条目的无序列表（使用 [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li) 表示）。 |
| [`<ol>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol) | 表示有序列表，通常渲染为一个带编号的列表。 |
| [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) | 表示文本的一个段落。该元素通常表现为通过空行和/或首行缩进与相邻块分隔的文本块。但 HTML 段落可以与任何相关内容（例如，图像或表单字段）构成结构分组。 |
| [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre) | 表示预定义格式文本。在该元素中的文本通常按照 HTML 文件中的编排，以非比例或[等宽](https://zh.wikipedia.org/wiki/等宽字体 "外部链接（在新标签页中打开）")字体的形式展现出来，文本中的空白符都会显示出来。 |
| [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) | 表示一系列无序的列表项目，通常渲染为项目符号列表。 |

## [行内文本语义](#行内文本语义)

使用 HTML 行内文本语义定义单词、内容、或任意文字的语义、结构或样式。

| 元素 | 描述 |
| --- | --- |
| [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a) | 可以通过它的 `href` 属性创建通向其它网页、文件、电子邮件地址、同一页面内的位置或任何其它 URL 的超链接。 |
| [`<abbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/abbr) | 用于代表缩写。 |
| [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b) | 用于吸引读者对元素内容的注意，这些内容本身并未被赋予特殊重要性。该元素原名为粗体（Boldface）元素，多数浏览器仍会将其文本显示为粗体。尽管如此，你不应将 `<b>` 元素用于显示粗体文字；替代方案是使用 CSS [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-weight) 属性来创建粗体文字。 |
| [`<bdi>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdi) | 告诉浏览器的双向算法将其包含的文本与周围的文本隔离，当网站动态插入一些文本且不知道所插入文本的方向性时，此功能特别有用。 |
| [`<bdo>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/bdo) | 覆盖当前文本的方向性，使内部文本以不同方向渲染。 |
| [`<br>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/br) | 在文本中生成一个换行（回车）符号。此元素在写诗和地址时很有用，这些地方的换行都非常重要。 |
| [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite) | 用于包含引用作品的标题。这个引用可能是一个根据适当的上下文约定关联引用的元数据的缩写。 |
| [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code) | 以一种旨在表明其中的内容是计算机代码片段的方式显示其内容。默认情况下，它以用户代理的默认等宽字体显示。 |
| [`<data>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/data) | 将指定内容和机器可读的翻译联系在一起。但是，如果内容是与时间或者日期相关的，则一定要使用 `<time>` 元素。 |
| [`<dfn>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dfn) | 用于表示在定义短语或句子的上下文中定义的术语。父级 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) 元素、[`<dt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dt)/[`<dd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dd) 对，或与 `<dfn>` 元素最近的分区元素被认定为是术语的定义。 |
| [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/em) | 标记出需要用户着重阅读的内容，`<em>` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。 |
| [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i) | 用于表现因某些原因需要区分普通文本的一系列文本。例如惯用文本、技术术语、分类名称等。它通常使用斜体表示，这也是该元素（`<i>`）命名的来源。 |
| [`<kbd>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/kbd) | 表示一段内联文本，文本来自键盘、语音输入或其他文本输入设备的用户输入。按照惯例，用户代理默认使用其默认的等宽字体显示 `<kbd>` 元素的内容，尽管这不是 HTML 标准强制要求的。 |
| [`<mark>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/mark) | 表示为引用或符号目的而标记或突出显示的文本，这是由于标记的段落在封闭上下文中的相关性或重要性造成的。 |
| [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) | 表示所附文本为简短的行内引用。大多数现代浏览器通过将文本包裹在引号内来实现这一点。此元素适用于不需要分段的短文本；对于长的文本的引用请使用 [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote) 元素。 |
| [`<rp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rp) | 用于为那些不能使用 [`<ruby>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ruby) 元素展示 ruby 注解的浏览器，提供回退的圆括号。一个 `<rp>` 元素应该包裹一个左括号或右括号，这些括号将包含注解文本的 [`<rt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rt) 元素包裹起来。 |
| [`<rt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rt) | 指定 ruby 注解的 ruby 文本组件，用于描述东亚字符的发音、翻译或音译信息。该元素始终在 [`<ruby>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ruby) 元素中使用。 |
| [`<ruby>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ruby) | 用来在基础文本上方、下方或一旁展现小注解，通常用于显示东亚字符的发音。它还用于注解其他类型的文本，但这种用法不太常见。 |
| [`<s>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/s) | 使用删除线渲染文本，即在文本上添加一条横线。使用 `<s>` 元素表示不再相关或不再准确的内容。但当需要标注文档编辑痕迹时，`<s>` 元素并不适用；为此，请酌情使用 [`<del>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/del) 和 [`<ins>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ins) 元素，它们更加适合这个场景。 |
| [`<samp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/samp) | 用于标识计算机程序输出，通常使用浏览器默认的等宽字体来渲染（例如 [Courier](https://zh.wikipedia.org/wiki/Courier "外部链接（在新标签页中打开）") 或 Lucida Console）。 |
| [`<small>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small) | 代表旁注和小字体，如版权和法律等独立于其样式展示的文本。默认情况下，它将其中的文本使用小一号的字体渲染，例如从 `small` 到 `x-small`。 |
| [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/span) | 短语内容的通用行内容器，并没有任何特殊语义。可以使用它来编组元素以达到某种样式意图（通过使用 `class` 或者 `id` 属性），或者这些元素有着共同的属性，比如 `lang`。应该在没有其他合适的语义元素时才使用它。`<span>` 与 div 元素很相似，但 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 是[块级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)，而 `<span>` 则是[行级元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Inline-level_content)。 |
| [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strong) | 表示其内容十分重要、严肃或紧迫。浏览器通常用粗体显示。 |
| [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub) | 定义因排版原因而应显示为下标的内联文本。下标通常显示得更小且更低。 |
| [`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup) | 定义因排版原因而应显示为上标的内联文本。上标通常显示得更小且更高。 |
| [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time) | 表示特定的时间段。可能包括 `datetime` 属性，以将日期转换为机器可读的格式，从而获得更好的搜索引擎结果或自定义功能（如，提醒）。 |
| [`<u>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/u) | 表示一段行内文本，其呈现方式应表明该文本带有非文本注释。默认情况下，该文本以单实线下划线形式渲染，但可通过 CSS 进行修改。 |
| [`<var>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/var) | 表示数学表达式或编程上下文中的变量名称。尽管该行为取决于浏览器，但通常使用当前字体的斜体形式显示。 |
| [`<wbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/wbr) | 表示一个换行机会——文本中浏览器可选择在此处断行的位置，尽管根据其换行规则，该位置原本不会自动断行。 |

## [图片和多媒体](#图片和多媒体)

HTML 支持各种多媒体资源，例如图像、音频和视频。

| 元素 | 描述 |
| --- | --- |
| [`<area>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/area) | 在图片上定义一个可点击区域。_图像映射_（image map）允许图像上的几何区域与[超链接](https://developer.mozilla.org/zh-CN/docs/Glossary/Hyperlink)关联。 |
| [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) | 用于在文档中嵌入音频内容。它可以包含一个或多个音频资源，这些音频资源可以使用 `src` 属性或者 source 元素来进行表示：浏览器将会选择最合适的一个来使用。也可以使用 [`MediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream) 将这个元素用于流式媒体。 |
| [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) | 将一张图像嵌入文档。 |
| [`<map>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/map) | 与 [`<area>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/area) 元素一起使用，以定义一个图像映射（可点击链接区域）。 |
| [`<track>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/track) | 作为媒体元素（音频和视频）的子元素使用。它允许指定定时文本轨道（或基于时间的数据），例如自动处理字幕。这些轨道采用 [WebVTT 格式](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)（`.vtt` 文件）——即 Web 视频文本轨道。 |
| [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) | 在文档中嵌入支持视频播放的媒体播放器。对于音频内容，也可以使用 `<video>` 标签，但 `audio` 元素可能提供更合适的用户体验。 |

## [内嵌内容](#内嵌内容)

除了常规的多媒体内容，HTML 可以包括各种其他的内容，即使它并不容易交互。

| 元素 | 描述 |
| --- | --- |
| [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed) | 将外部内容嵌入文档中的指定位置。此内容由外部应用程序或其他交互式内容源（如浏览器插件）提供。 |
| [`<fencedframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fencedframe) | 表示一个嵌套浏览上下文，类似于 `<iframe>`，但内置了更多原生隐私功能。 |
| [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe) | 表示嵌套的浏览上下文。它能够将另一个 HTML 页面嵌入到当前页面中。 |
| [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object) | 表示引入一个外部资源，这个资源可能是一张图片、嵌入的浏览上下文，亦或是一个插件所使用的资源。 |
| [`<picture>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/picture) | 通过包含零或多个 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素和一个 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素来为不同的显示/设备场景提供图像版本。 |
| [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) | 为 picture、audio 或 video 元素指定多个媒体资源。这是一个空元素，这意味着它没有内容，也没有闭合标签。通常会提供多种文件格式的相同媒体内容，以确保兼容性，因为不同浏览器对[图像文件格式](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Image_types)和[媒体文件格式](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)的支持存在差异。 |

## [SVG 和 MathML](#svg_和_mathml)

你可以使用 [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg) 或 [`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>") 元素将 [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG) 或 [MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML) 内容直接嵌入 HTML 文档。

| 元素 | 描述 |
| --- | --- |
| [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/svg) | 定义新坐标系和[视口](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Attribute/viewBox)的容器。它被用作 SVG 文档的最外层元素，但也可用于在 SVG 或 HTML 文档中嵌入 SVG 片段。 |
| [`<math>`](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Reference/Element/math "<math>") | MathML 中的顶级元素。每一个有效的 MathML 实例都必须封装在其中。此外，不能在另一个此类元素中嵌套第二个 `<math>` 元素，但可以在其中包含任意个其他的子元素。 |

## [脚本](#脚本)

为了创建动态内容和 Web 应用程序，HTML 支持使用脚本语言，最突出的就是 JavaScript。有一些特定的元素用于支持此功能。

| 元素 | 描述 |
| --- | --- |
| [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas) | 用来通过[画布脚本 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 或 [WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 绘制图形及图形动画的容器元素。 |
| [`<noscript>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noscript) | 定义一段 HTML 代码，当页面上的脚本类型不受支持或浏览器当前关闭脚本功能时，将插入该段代码。 |
| [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script) | 用于嵌入可执行脚本或数据。这通常用作嵌入或者引用 JavaScript 代码。`<script>` 元素也能在其他语言中使用，比如 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 的 GLSL 着色器语言和 [JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)。 |

## [划定编辑范围](#划定编辑范围)

这些元素能标示出某个文本被更改过的部分。

| 元素 | 描述 |
| --- | --- |
| [`<del>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/del) | 表示一些被从文档中删除的文本内容。比如可以在需要显示修改记录或者源代码差异的情况使用这个标签。`<ins>` 标签的作用恰恰与此相反：表示文档中添加的文本。 |
| [`<ins>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ins) | 表示一些添加到文档中的文本内容。你可以使用 `<del>` 元素来类似地表示已从文档中删除的文本。 |

## [表格内容](#表格内容)

这里的元素用于创建和处理表格数据。

| 元素 | 描述 |
| --- | --- |
| [`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption) | 指定表格的标题。 |
| [`<col>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/col) | 定义列组中的一列或多列，该列组由其隐式或显式父元素 [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup) 表示。`<col>` 元素仅在作为未定义 [`span`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup#span) 属性的 [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup) 元素的子元素时才有效。 |
| [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup) | 定义表中的一组列。 |
| [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table) | 表示表格数据——即以二维表格形式呈现的信息，该表格由包含数据的行和列单元格组成。 |
| [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody) | 封装了一系列表格的行（[`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) 元素），代表了它们是表格主要内容的组成部分。 |
| [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td) | 作为 [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) 元素的子元素，它定义了包含数据的表格单元格。 |
| [`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot) | 封装一组表格行（[`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) 元素），表示它们构成表格的尾部，包含关于表格列的信息。这通常是对列的总结，例如某列中给定数字的总和。 |
| [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th) | 作为 [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) 元素的子元素，它定义了一个单元格作为一组表格单元格的标题。该组的性质可通过 [`scope`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th#scope) 和 [`headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th#headers) 属性进行显式定义。 |
| [`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead) | 封装一组表格行（[`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) 元素），表示它们构成表格的表头，包含关于表格列的信息。通常以列标题（[`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th) 元素）的形式呈现。 |
| [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr) | 定义表格中的行。同一行可同时出现 [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td)（数据单元格）和 [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th)（列头单元格）元素。 |

## [表单](#表单)

HTML 提供了许多可一起使用的元素，这些元素能用来创建一个用户可以填写并提交到网站或应用程序的表单。详情请参阅 [HTML 表单指南](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms)。

| 元素 | 描述 |
| --- | --- |
| [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button) | 一个可交互元素（可通过用户的鼠标、键盘、手指、声音指令或其他辅助技术激活）。一旦被激活，它就会执行一个动作，例如提交[表单](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms)或打开对话框。 |
| [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist) | 包含了一组 [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option) 元素，这些元素表示其它表单控件可供选择的值。 |
| [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset) | 用于对 web 表单中的控件和标签（[`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label)）进行分组。 |
| [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) | 表示文档中的一个区域，此区域包含交互控件，用于向 Web 服务器提交信息。 |
| [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) | 用于为基于 Web 的表单创建交互式控件，以便接受来自用户的数据。取决于设备和用户代理的不同，表单可以使用各种类型的输入数据和控件。`<input>` 元素是目前是 HTML 中最强大、最复杂的元素之一，因为它有大量的输入类型和属性组合。 |
| [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) | 表示用户界面中某个元素的说明。 |
| [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend) | 用于表示其父元素 [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset) 的内容标题。 |
| [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) | 用来显示已知范围的标量值或者分数值。 |
| [`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup) | 为 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 元素中的选项创建分组。 |
| [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option) | 用于定义在 [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select)、[`<optgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup) 或 [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist) 元素中包含的选项。`<option>` 可以在弹出窗口和 HTML 文档中的其他项目列表中表示菜单项。 |
| [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output) | 网站或应用程序可以将计算或用户操作的结果注入其中的容器元素。 |
| [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) | 用来显示一项任务的完成进度，通常情况下该元素显示为一个进度条。 |
| [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) | 表示一个提供选项菜单的控件。 |
| [`<selectedcontent>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/selectedcontent) | 显示闭合 `<select>` 元素内当前选中的 `<option>` 标签的内容。 |
| [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea) | 表示一个多行纯文本编辑控件，当你希望用户输入一段相当长的、不限格式的文本，例如评论或反馈表单中的一段意见时，这很有用。 |

## [交互元素](#交互元素)

HTML 提供了一系列有助于创建交互式用户界面对象的元素。

| 元素 | 描述 |
| --- | --- |
| [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details) | 创建一个挂件，仅在被切换成“展开”状态时，它才会显示内含的信息。必须使用 [`<summary>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/summary) 元素为该部件提供概要或者标签。 |
| [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog) | 表示一个对话框或其他交互式组件，例如一个可关闭警告、检查器或子窗口。 |
| [`<summary>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/summary) | 用作 details 元素内容的摘要、标题或图例。点击 `<summary>` 元素会翻转父元素 [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details) 的展开和关闭状态。 |

## [Web 组件](#web_组件)

Web 组件是一种与 HTML 相关联的技术，简单来说，它允许开发者创建自定义元素，并如同普通的 HTML 一样使用它们。另外，也可以创建经过自定义的标准 HTML 元素。

| 元素 | 描述 |
| --- | --- |
| [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot) | 作为 [Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)技术套件的一部分，该元素是 web 组件内的占位符，你可以使用你自己的标记填充它，从而让你创建单独的 DOM 树并一起呈现它们。 |
| [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template) | 一种保存 HTML 的机制，它不会在加载页面时立即渲染，但随后可以在运行时使用 JavaScript 实例化。 |

## [过时的和弃用的元素](#过时的和弃用的元素)

**警告：**这些是已弃用的旧 HTML 元素，不应再使用。**绝不应在新项目中使用它们，并应尽快在旧项目中替换它们**。此处仅为完整性而列出。

| 元素 | 描述 |
| --- | --- |
| [`<acronym>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/acronym) | 允许作者明确地声明一个字符序列，它们构成一个单词的首字母缩写或简略语。 |
| [`<big>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/big) | 以比周围文本大一号的字体渲染其封闭的文本（例如，`medium` 变 `large`）。最大不超过浏览器允许的最大字体。 |
| [`<center>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/center) | 以水平居中的形式显示包含在元素中的块级或行级内容。 |
| `<content>` | [Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)技术套件的废弃部分——用于[影子 DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM) 内部作为插入点，并且不可用于任何正常的 HTML。现在已被 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot) 元素代替，它在 DOM 中创建一个位置，影子 DOM 会插入到这里。请使用 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot) 代替。 |
| [`<dir>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dir) | 被作为一个文件和/或文件夹的目录的容器，可能还有用户代理应用的样式与图标。请不要使用此过时的元素；请使用用于列表的 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 元素代替，包含文件列表。 |
| [`<font>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/font) | 定义内容的字体大小、颜色与外观。 |
| [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) | 定义一个特定区域，另一个 HTML 文档可以在里面展示。frame 应该在 [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset) 中使用。 |
| [`<frameset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frameset) | 用于包含 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) 元素。 |
| `<image>` | [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素古老而又缺乏支持的前身。不应使用它。 |
| [`<marquee>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/marquee) | 用来插入一段滚动的文字。你可以使用它的属性控制当文本到达容器边缘发生的事情。 |
| `<menuitem>` | 表示一个用户可以通过弹出式菜单来执行的命令。这包括上下文菜单，以及按钮可能附带的菜单。 |
| [`<nobr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nobr) | 阻止文本自动拆分成新行，可能导致用户必须水平滚动才能看到文本的所有内容。 |
| [`<noembed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noembed) | 是个废除的和不标准的方式，用于向不支持 [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/embed) 或不支持作者希望的[嵌入内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%B5%8C%E5%85%A5%E5%86%85%E5%AE%B9)的浏览器提供替代（回退）内容。这个元素在 HTML 4.01 起废除，回退内容应该插在 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object) 的开始和结束标签之间。 |
| [`<noframes>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/noframes) | 在不支持（或禁用支持）[`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) 元素的浏览器中提供要显示的内容。虽然大多数常用浏览器都支持 frame，但也有例外，包括一些特殊用途的浏览器（移动终端的浏览器和文本模式浏览器）。 |
| [`<param>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/param) | 为 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/object) 元素定义参数。 |
| [`<plaintext>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/plaintext) | 将起始标签后面的任何东西渲染为纯文本，忽略随后的任何 HTML 内容。它没有闭合标签，因为任何后面的东西都会看做纯文本。 |
| [`<rb>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rb) | 用于分隔 ruby 注解的基本文本组件（即正在注解的文本）。一个 `<rb>` 元素应该包装基本文本的每个单独的原子段。 |
| [`<rtc>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rtc) | 包含文字的语义注解，用于在 [`<rb>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rb) 元素中展示。[`<rb>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rb) 元素可以拥有发音（[`<rt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rt)）和语义（[`<rtc>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/rtc)）注解。 |
| `<shadow>` | [Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)技术套件的废弃部分——目的是用作影子 DOM 插入点。如果你在影子宿主下面创建了多个影子根，你就可能已经使用了它。请使用 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot) 代替。 |
| [`<strike>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strike) | 在文本上放置水平的删除线。 |
| [`<tt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tt) | 创建内联文本，使用用户代理默认的等宽字体渲染。这个元素用于给文本排版，使其等宽展示，就像电报、纯文本屏幕或行式打印机那样。 |
| [`<xmp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/xmp) | 渲染在开始和结束标签之间的文本，而不解释中间的 HTML 内容，并使用等宽字体。HTML2 规范建议它应该渲染得足够宽以允许每行 80 个字符。 |

## [参见](#参见)

-   [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 接口

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年12月9日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/contributors.txt)更新。
