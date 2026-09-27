基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素 **`<iframe>`** 表示嵌套的[浏览上下文](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context)。它能够将另一个 HTML 页面嵌入到当前页面中。

## [尝试一下](#尝试一下)

```
<iframe
  id="inlineFrameExample"
  title="Inline Frame Example"
  width="300"
  height="200"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
</iframe>
```

```
iframe {
  border: 1px solid black;
  width: 100%; /* takes precedence over the width set with the HTML width attribute */
}
```

每个嵌入的浏览上下文都有自己的[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)并且允许 URL 导航。每个嵌入式浏览上下文的导航都会被线性嵌入到_顶级_浏览上下文的[会话历史记录](https://developer.mozilla.org/zh-CN/docs/Web/API/History)中。包含嵌入内容的浏览上下文称为_父级浏览上下文_。_顶级_浏览上下文（没有父级）通常是由 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象表示的浏览器窗口。

**警告：**页面上的每个 `<iframe>` 都需要增加内存和其他计算资源，这是因为每个浏览上下文都拥有完整的文档环境。虽然理论上来说你能够在代码中写出来无限多的 `<iframe>`，但是你最好还是先检查是否存在性能问题。

## [属性](#属性)

该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`allow`](#allow)

用于为 `<iframe>` 指定其[权限策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Permissions_Policy)。该策略根据请求的来源规定 `<iframe>` 可以使用哪些特性（例如，访问麦克风、摄像头、电池、web 共享等）。

示例请参见 `Permissions-Policy` 中的 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Permissions-Policy#iframe)。

[`allowfullscreen`](#allowfullscreen)

设置为 `true` 时，可以通过调用 `<iframe>` 的 [`requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen "requestFullscreen()") 方法激活全屏模式。

**备注：**这是一个历史遗留属性，已经被重新定义为 `allow="fullscreen"`。

[`allowpaymentrequest`](#allowpaymentrequest)

设置为 `true` 时，跨源的 `<iframe>` 就可以调用[支付请求 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Payment_Request_API)。

**备注：**这是一个历史遗留属性，已经被重新定义为 `allow="payment"`。

[`browsingtopics`](#browsingtopics)

一个布尔属性，如果存在，则指定当前用户选定的主题应该与 `<iframe>` 源的请求一起发送。更多信息请参见[使用主题 API](https://developer.mozilla.org/en-US/docs/Web/API/Topics_API)。

[`credentialless`](#credentialless)

设置为 `true` 可以将 `<iframe>` 设为无凭据模式，这意味着将内容加载到新的临时上下文中。它无法访问与其来源相关的网络、cookie 和存储数据。它使用一个新上下文（生命周期局限于顶层文档的生命周期）。作为补偿，可以解除 [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)（COEP）嵌入规则的限制，所以设置了 COEP 的文档可以嵌入未设置的第三方文档。更多信息请参见 [iFrame 无凭据模式](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/IFrame_credentialless)。

[`csp`](#csp)

对嵌入的资源配置[内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP)。查看 [`HTMLIFrameElement.csp`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/csp) 获取详情。

[`height`](#height)

以 CSS 像素格式指定框架的高度。默认值为 `150`。

[`loading`](#loading)

表示浏览器应当何时加载 iframe：

[`eager`](#eager)

在页面加载时立即加载 iframe（默认值）。

[`lazy`](#lazy)

推迟 iframe 的加载，直到达到浏览器定义的[可视视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Visual_Viewport)的计算距离。目的是在浏览器确定需要它前，避免占用获取框架所需的网络和存储带宽。这改进了在大多数使用场景中的性能表现，尤其是减少了页面的首次加载时间。

**备注：**只有当 JavaScript 启用时才会推迟加载。这是一个反跟踪措施。

[`name`](#name)

可定位嵌入的浏览上下文的名称。该名称可以用作 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a)、[`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 或 [`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base) 元素的 `target` 属性值，也可以用作 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 和 [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button) 元素的 `formtarget` 属性值，还可以用作 [`window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open "window.open()") 方法的 `windowName` 参数值。

[`referrerpolicy`](#referrerpolicy)

表示在获取 iframe 资源时发送哪个 [referrer](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/referrer)：

[`no-referrer`](#no-referrer)

不发送 [`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Referer) 标头。

[`no-referrer-when-downgrade`](#no-referrer-when-downgrade)

向不受 [TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS)（[HTTPS](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTPS)）保护的[源](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)发送请求时，不发送 [`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Referer) 标头。

[`origin`](#origin)

发送的 referrer 仅包含来源（referring）页面的源（origin）：其[协议](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL)、[主机](https://developer.mozilla.org/zh-CN/docs/Glossary/Host)和[端口](https://developer.mozilla.org/zh-CN/docs/Glossary/Port)。

[`origin-when-cross-origin`](#origin-when-cross-origin)

当 referrer 被发送到其他源时，其仅限于协议、主机和端口。同源的导航仍会包含路径。

[`same-origin`](#same-origin)

对于[同源](https://developer.mozilla.org/zh-CN/docs/Glossary/Same-origin_policy)请求，发送 referrer；跨源请求不会包含 referrer 信息。

[`strict-origin`](#strict-origin)

仅当被请求页面和来源页面具有相同的协议安全等级（HTTPS→HTTPS）时才发送 referrer，如果目标具有较低的安全等级（HTTPS→HTTP），则不会发送。

[`strict-origin-when-cross-origin`（默认值）](#strict-origin-when-cross-origin)

当发起同源请求时，发送完整的 URL；当仅具有相同协议安全等级（HTTPS→HTTPS）时，只发送源；当目标具有较低的安全等级（HTTPS→HTTP）时，则不会发送此标头。

[`unsafe-url`](#unsafe-url)

始终在 referrer 标头中包含源_和_路径（但不包括[片段标识符](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement/hash)、[密码](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement/password)和[用户名](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement/username)）。**这个值是不安全的**，因为这样做会向不安全的源暴露受 TLS 保护的资源的源和路径。

[`sandbox`](#sandbox)

控制应用于嵌入在 `<iframe>` 中的内容的限制。该属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定的限制：

[`allow-downloads`](#allow-downloads)

允许通过带有 [download](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#download) 属性的 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a) 或 [`<area>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/area) 元素或者通过导航来下载文件，无论是用户通过点击链接触发，还是在用户没有交互的情况下通过 JS 代码触发。

[`allow-forms`](#allow-forms)

允许页面提交表单。如果没有使用该关键字，表单会正常显示，但是无法校验输入内容、发送数据到 Web 服务器或是关闭对话框。

[`allow-modals`](#allow-modals)

允许页面通过 [`Window.alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)、[`Window.confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm)、[`Window.print()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/print) 和 [`Window.prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) 打开模态窗口；无论有无该关键字，打开 [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog) 是被允许的。它同样允许页面接收 [`BeforeUnloadEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/BeforeUnloadEvent) 事件。

[`allow-orientation-lock`](#allow-orientation-lock)

允许资源[锁定屏幕方向](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen/lockOrientation)。

[`allow-pointer-lock`](#allow-pointer-lock)

允许页面使用[指针锁定 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_Lock_API)。

[`allow-popups`](#allow-popups)

允许弹窗（例如 [`Window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)、`target="_blank"`、[`Window.showModalDialog()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDialogElement/showModal)）。如果没有使用该关键字，相应的功能会静默失败。

[`allow-popups-to-escape-sandbox`](#allow-popups-to-escape-sandbox)

允许沙箱化的文档打开新的浏览上下文，并且新浏览上下文不会继承沙箱标记。例如，安全地沙箱化一个第三方的广告页面，而不会在广告链接到的新页面中启用相同的限制条件。如果不包含这个标记，重定向的页面、弹出窗口或新标签页将受到与源 `<iframe>` 相同的沙盒限制。

[`allow-presentation`](#allow-presentation)

允许主文档控制是否允许 iframe 开启[演示会话](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest)。

[`allow-same-origin`](#allow-same-origin)

如果没有使用该关键字，资源将被视为来自一个特殊的源（始终使[同源策略](https://developer.mozilla.org/zh-CN/docs/Glossary/Same-origin_policy)失败）。（可以阻止对[数据存储/cookie](https://developer.mozilla.org/zh-CN/docs/Web/Security/Defenses/Same-origin_policy#%E8%B7%A8%E6%BA%90%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8%E8%AE%BF%E9%97%AE) 和一些 JavaScript API 的潜在访问）。

[`allow-scripts`](#allow-scripts)

允许页面运行脚本（但不能创建弹窗）。如果没有使用该关键字，则不允许该操作。

[`allow-storage-access-by-user-activation`](#allow-storage-access-by-user-activation)

允许 `<iframe>` 中的文档通过[储存访问 API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API "储存访问 API") 请求访问非分区 cookie。

[`allow-top-navigation`](#allow-top-navigation)

允许资源导航顶级（即名称为 `_top` 的）浏览上下文。

[`allow-top-navigation-by-user-activation`](#allow-top-navigation-by-user-activation)

允许资源导航顶级浏览上下文（但只能由用户手势启动）。

[`allow-top-navigation-to-custom-protocols`](#allow-top-navigation-to-custom-protocols)

允许导航到浏览器内置的或[由网站注册](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/registerProtocolHandler)的非 `http` 协议页面。此特性也可以由 `allow-popups` 或 `allow-top-navigation` 关键词激活。

**备注：**

-   当被嵌入的文档与主页面同源时，**强烈建议不要**同时使用 `allow-scripts` 和 `allow-same-origin`。如果同时使用，嵌入的文档就可以删除 `sandbox` 属性——会使得安全性还不如不用 `sandbox` 属性。
-   如果攻击者可以在沙箱化的 `iframe` 之外展示内容，例如用户在新标签页中打开框架，那么沙箱化也就没有意义了。建议把这种内容放置到_独立的来源_中，以减小可能的损害。

**备注：**在带有 `sandbox` 属性的 `<iframe>` 嵌入的页面中，当用户被重定向，打开一个弹出窗口或者打开一个新标签页时，新的浏览上下文同样受到 `sandbox` 的限制。这可能会产生问题——例如，如果一个页面被嵌入到没有设置 `sandbox="allow-forms"` 或 `sandbox="allow-popups-to-escape-sandbox"` 属性的 `<iframe>` 时，当这个页面在独立的标签页中打开一个新站点，这个页面的表单提交将会静默失败。

[`src`](#src)

被嵌入的页面的 URL 地址。使用 `about:blank` 值可以嵌入一个遵从[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Defenses/Same-origin_policy)的空白页。还需要注意的是，在 Firefox（版本 65 及更高版本）、基于 Chromium 的浏览器、Safari/iOS 中使用代码移除 `iframe` 的 src 属性（例如通过 [`Element.removeAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttribute)）会导致 `about:blank` 被载入框架。

**备注：**在解析任何相对 URL（例如锚点链接）时，`about:blank` 页面会使用嵌入的文档的 URL 作为它的基准 URL。

[`srcdoc`](#srcdoc)

要嵌入的内联 HTML，会覆盖 `src` 属性。其内容应遵循完整的 HTML 文档的语法（包含文档类型指令、`<html>`、`<body>` 标签等，虽然绝大多数标签可以被省略，仅保留主体内容）。该文档会以 `about:srcdoc` 作为其位置。如果浏览器不支持 `srcdoc` 属性，其会回退到 `src` 属性的 URL。

**备注：**在解析任何相对 URL（例如锚点链接）时，`about:srcdoc` 页面会使用嵌入的文档的 URL 作为它的基准 URL。

[`width`](#width)

框架的宽度（以 CSS 像素为单位）。默认值是 `300`。

### [已弃用的属性](#已弃用的属性)

下面这些属性已被弃用，并且可能不再被所有的用户代理支持。你应避免在新的内容中使用它们，也应尽量从已有的内容中移除它们。

[`align`](#align)

此元素相对于周围上下文的对齐方式。

[`frameborder`](#frameborder)

值为 `1`（默认值）时，显示此框架的边框。值为 `0` 时移除框架的边框。但是请使用 CSS 属性 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/border) 来控制 `<iframe>` 的边框。

[`longdesc`](#longdesc)

表示框架内容的长描述的 URL。由于广泛的误用，该属性对于无图形界面的浏览器不起作用。

[`marginheight`](#marginheight)

框架的内容距其上边框与下边框的距离（以像素为单位）。

[`marginwidth`](#marginwidth)

框架的内容距其左边框和右边框的距离（以像素为单位）。

[`scrolling`](#scrolling)

指示浏览器是否应为框架提供滚动条：

[`auto`](#auto)

仅当框架的内容超出框架的尺寸时显示滚动条。

[`yes`](#yes)

始终显示滚动条。

[`no`](#no)

从不显示滚动条。

## [脚本](#脚本)

内联框架，就像 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/frame) 元素一样，会被包含在 [`window.frames`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frames) 伪数组中。

有了 DOM [`HTMLIFrameElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement) 对象，脚本可以通过 [`contentWindow`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentWindow "contentWindow") 属性访问内联框架的 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象。[`contentDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentDocument "contentDocument") 属性引用了 `<iframe>` 内部的 `document` 元素（等同于 `contentWindow.document`）。

在框架内部，脚本可以通过 [`window.parent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/parent) 获取父窗口的引用。

脚本访问框架内容必须遵守[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Defenses/Same-origin_policy)。脚本无法访问非同源的 `window` 对象的几乎所有属性（包括框架中的脚本访问框架的父级文档的情况）。跨源通信可以通过 [`Window.postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 来实现。

## [定位和缩放](#定位和缩放)

作为一个[可替换元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Replaced_elements)，可以使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 来调整 `<iframe>` 元素内嵌入的文档的位置。

## [`error` 和 `load` 事件行为](#error_和_load_事件行为)

`<iframe>` 上触发的 `error` 和 `load` 事件常用于检测本地网络中 HTTP 服务器的 URL。因此，作为保护措施，浏览器不会触发 `<iframe>` 上的 [error](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/error_event) 事件，而 [load](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/load_event) 事件总是被触发，即使 `<iframe>` 的内容加载失败。

## [无障碍](#无障碍)

使用 `iframe` 的 [`title` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/title)来标识框架的主要内容，这样可以极大方便使用辅助技术（例如屏幕阅读器）浏览网页的人。框架的标题应该清楚地描述框架的内容，例如：

html

```
<iframe
  title="鳄梨的维基百科页面"
  src="https://zh.wikipedia.org/wiki/鳄梨"></iframe>
```

如果没有标题，他们就只能浏览每个 `<iframe>` 来确定嵌入的内容。上下文的切换会令人迷惑而且非常消耗时间，尤其是当页面中包含很多 `<iframe>` 或者互动内容如音视频等的时候。

## [示例](#示例)

### [一个简单的 <iframe>](#一个简单的_iframe)

这个示例将页面 [https://example.org](https://example.org "外部链接（在新标签页中打开）") 嵌入到一个 iframe 中。这是一个常见的 iframe 使用案例：嵌入来自另一个网站的内容。例如，下面的这个运行实例本身和页面顶部的[尝试一下](#尝试一下)示例，都是 MDN 通过使用 `<iframe>` 嵌入了其他地方的内容。

#### HTML

html

```
<iframe
  src="https://example.org"
  title="iframe 示例 1"
  width="400"
  height="300">
</iframe>
```

#### 结果

### [在 <iframe> 中嵌入源代码](#在_iframe_中嵌入源代码)

这个示例直接在 iframe 中渲染源代码。它可以结合 `sandbox` 属性在显示用户生成的内容时防止脚本注入。

请注意在使用 `srcdoc` 时，在嵌入内容中的任何相对 URL 都将会相对于嵌入该内容的页面的 URL 进行解析，如果你想要使用锚链接指向嵌入内容，你需要明确使用 `about:srcdoc` 作为基准 URL。

#### HTML

html

```
<article>
  <footer>九分钟以前，<i>jc</i> 写道：</footer>
  <iframe
    sandbox
    srcdoc="<p>有两种使用 <code>iframe</code> 元素的方法：</p>
<ol>
<li><a href=&quot;about:srcdoc#embed_another&quot;>嵌入来自另一个页面的内容</a></li>
<li><a href=&quot;about:srcdoc#embed_user&quot;>嵌入用户生成的内容</a></li>
</ol>
<h2 id=&quot;embed_another&quot;>嵌入来自另一个页面的内容</h2>
<p>使用 <code>src</code> 属性来指定要嵌入的页面的 URL：</p>
<pre><code>&amp;lt;iframe src=&quot;https://example.org&quot;&amp;gt;&amp;lt;/iframe&amp;gt;</code></pre>
<h2 id=&quot;embed_user&quot;>嵌入用户生成的内容</h2>
<p>使用 <code>srcdoc</code> 属性来指定要嵌入的内容。这篇文章本身就是一个例子！</p>
"
    width="500"
    height="250"
></iframe>
</article>
```

在使用 `srcdoc` 时，如何进行转义：

-   首先，编写 HTML 内容，像正常 HTML 一样转义需要转义字符（例如 `<`、`>`、`&` 等）。
-   在 `srcdoc` 属性中 `&lt;` 和 `<` 代表相同的字符。因此，在 HTML 中要将它们修改为实际需要的转义序列，将所有的 `&` 替换为 `&amp;`。例如 `&lt;` 修改为 `&amp;lt;`，`&amp;` 修改为 `&amp;amp;`。
-   替换所有的双引号（`"`）为 `&quot;` 以防止 `srcdoc` 属性被提前终止。（如果你使用 `'`，那么你应该将 `'` 替换为 `&apos;`）。这个步骤在上一个步骤后执行，所以 `&quot;` 不会变成 `&amp;quot;`。

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、嵌入内容、交互内容、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td>无。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>接受嵌入内容的任何元素</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role"><code>document</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role"><code>img</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement"><code>HTMLIFrameElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-iframe-element](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [CSP：frame-ancestors](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
-   [隐私、权限和信息安全](https://developer.mozilla.org/zh-CN/docs/Web/Privacy)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年12月2日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe/contributors.txt)更新。
