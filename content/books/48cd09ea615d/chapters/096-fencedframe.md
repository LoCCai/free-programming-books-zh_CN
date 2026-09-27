Deprecated

To be removed

This feature is pending removal from browsers. Using it now may lead to broken functionality in future updates. Following the announcement that Chrome will maintain its current approach to third-party cookies, Chrome decided to withdraw certain Privacy Sandbox features including the `<fencedframe>` element and related APIs.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**实验性:** **这是一项[实验性技术](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Experimental_deprecated_obsolete#%E5%AE%9E%E9%AA%8C%E6%80%A7)**  
在将其用于生产之前，请仔细检查[浏览器兼容性表格](#浏览器兼容性)。

**`<fencedframe>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示一个嵌套的[浏览上下文](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context)，用于将另一个 HTML 页面嵌入到当前页面中。`<fencedframe>` 在形式和功能上与 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe) 元素非常相似，但有以下不同：

-   `<fencedframe>` 内容与嵌入网站之间通信受到限制。
-   `<fencedframe>` 可以访问跨站数据，但仅限于在非常特定的受控情况下进行，以保护用户隐私。
-   `<fencedframe>` 不能通过常规脚本进行自由操作或访问其数据（例如读取或设置源 URL）。`<fencedframe>` 内容只能通过[特定 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fenced_frame_API#%E7%94%A8%E4%BE%8B) 嵌入。
-   `<fencedframe>` 无法访问嵌入上下文的 DOM，嵌入上下文也无法访问 `<fencedframe>` 的 DOM。

`<fencedframe>` 元素是一种内置更多原生隐私特性的 `<iframe>`。它解决 `<iframe>` 的一些缺陷，比如对第三方 cookie 的依赖以及其他隐私风险。参见[围栏框架 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fenced_frame_API) 获取更多信息。

## [属性](#属性)

元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`allow`](#allow)

为 `<fencedframe>` 指定[权限策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Permissions_Policy)，该策略根据请求的来源定义 `<fencedframe>` 可用的特性。请参见[围栏框架可用的权限策略](#围栏框架可用的权限策略)了解在围栏框架上设置的策略来控制哪些特性的详细信息。

[`height`](#height)

以 CSS 像素为单位表示围栏框架高度的无单位的整数。默认值为 `150`。

[`width`](#width)

以 CSS 像素为单位表示围栏框架宽度的无单位的整数。默认值为 `300`。

## [围栏框架可用的权限策略](#围栏框架可用的权限策略)

从顶层上下文委托给围栏框架的权限，用于允许或拒绝可能会被用作通信渠道的特性，从而构成隐私威胁。因此，那些可通过[权限策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Permissions-Policy)（例如，[`camera`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Permissions-Policy/camera) 或[`geolocation`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/geolocation)）控制其可用性的标准网页特性在围栏框架内是**不可用的**。

围栏框架内策略可以启用的唯一特性是设计用于围栏框架内的特定特性：

-   [受保护的受众 API](https://developers.google.cn/privacy-sandbox/private-advertising/protected-audience "外部链接（在新标签页中打开）")
    -   `attribution-reporting`
    -   `private-aggregation`
    -   `shared-storage`
    -   `shared-storage-select-url`
-   [共享存储 API](https://developer.mozilla.org/en-US/docs/Web/API/Shared_Storage_API)
    -   `attribution-reporting`
    -   `private-aggregation`
    -   `shared-storage`
    -   `shared-storage-select-url`

当前这些特性在围栏框架内总是启用的。未来将能够通过 `<fencedframe>` 的 `allow` 属性来控制哪些特性被启用。以这种方式阻止隐私沙箱特性，也将阻止围栏框架的加载——即完全不存在通信渠道。

## [围栏框架边界间的切换焦点](#围栏框架边界间的切换焦点)

文档的激活焦点跨围栏框架边界移动的能力（即从围栏框架外的元素移动到围栏框架内的元素，反之亦然）是受限的。用户发起的操作，如点击或按 Tab 键，可以实现这种移动，因为这种情况下不存在指纹追踪的风险。

然而，尝试通过 API 调用（如 [`HTMLElement.focus()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/focus)）来跨越边界是被禁止的——恶意脚本可能会利用一系列此类调用来泄露跨边界的推断信息。

## [定位和缩放](#定位和缩放)

作为[可替换元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Replaced_elements)，`<fencedframe>` 允许使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 属性调整嵌入文档在其框内的位置。

`<fencedframe>` 的 [`config`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFencedFrameElement/config "config") 对象的内部 `contentWidth` 和 `contentHeight` 属性可用于设置嵌入内容的尺寸。在这种情况下，更改 `<fencedframe>` 的 `width` 或 `height` 将改变页面上嵌入容器的尺寸，但容器内的文档会按比例缩放以适应新的尺寸。嵌入文档的报告宽度和高度（即 [`Window.innerWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth) 和 [`Window.innerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight)）将保持不变。

## [无障碍](#无障碍)

使用辅助技术（如，屏幕阅读器）导航的用户可以使用 `<fencedframe>` 上的 [`title` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/title)为其内容添加标签。标题的值应简洁地描述嵌入的内容：

html

```
<fencedframe
  title="新的 Log 广告。来自 Blammo！"
  width="640"
  height="320"></fencedframe>
```

如果没有这个标题，用户就必须导航进入 `<fencedframe>` 才能确定其嵌入的内容是什么。这种上下文的切换可能会让人感到困惑且耗时，尤其是在包含多个 `<fencedframe>` 的页面和/或嵌入内容包含视频或音频等交互式内容的情况下。

## [示例](#示例)

要设置将在 `<fencedframe>` 中显示的内容，使用 API（如[受保护的受众](https://developers.google.cn/privacy-sandbox/private-advertising/protected-audience "外部链接（在新标签页中打开）")或[共享存储](https://developers.google.cn/privacy-sandbox/private-advertising/shared-storage "外部链接（在新标签页中打开）")）生成一个 `FencedFrameConfig` 对象，然后将其设置为 `<fencedframe>` 的 `config` 属性值。

以下示例从受保护的受众 API 的广告拍卖中获取一个 `FencedFrameConfig`，然后使用它在 `<fencedframe>` 中显示成交的广告：

html

```
<fencedframe width="640" height="320"></fencedframe>
```

js

```
const frameConfig = await navigator.runAdAuction({
  // 拍卖配置
  resolveToConfig: true,
});

const frame = document.querySelector("fencedframe");
frame.config = frameConfig;
```

**备注：**在调用 `runAdAuction()` 时，必须传入 `resolveToConfig: true` 以获得 `FencedFrameConfig` 对象。如果没有设置，则所得的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 将兑现为一个 URN，该 URN 只能在 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe) 中使用。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、嵌入内容、交互内容、可感知内容</td></tr><tr><th scope="row">允许的内容</th><td>无。</td></tr><tr><th scope="row">标签省略</th><td>无，起始和结束标签都是必须的。</td></tr><tr><th scope="row">允许的父元素</th><td>接受嵌入内容的任何元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">无对应角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/document_role"><code>document</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/img_role"><code>img</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFencedFrameElement"><code>HTMLFencedFrameElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [Fenced Frame  
\# the-fencedframe-element](https://wicg.github.io/fenced-frame/#the-fencedframe-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [围栏框架 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fenced_frame_API)
-   developers.google.cn 上的[围栏框架](https://developers.google.cn/privacy-sandbox/private-advertising/fenced-frame "外部链接（在新标签页中打开）")
-   developers.google.cn 上的[隐私沙盒](https://developers.google.cn/privacy-sandbox "外部链接（在新标签页中打开）")

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fencedframe/contributors.txt)更新。
