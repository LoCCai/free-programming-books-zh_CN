基线

广泛可用

自 2020年1月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<slot>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素是——[Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)技术套件的一部分——它是一个在 web 组件内部的占位符，你可以使用自己的标记来填充该占位符，从而创建单独的 DOM 树并将其一起呈现。

## [属性](#属性)

此元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`name`](#name)

插槽名称。

**具名插槽**是具有 `name` 属性的 `<slot>` 元素。

## [示例](#示例)

html

```
<template id="element-details-template">
  <style>
    details {
      font-family: "Open Sans Light", Helvetica, Arial, sans-serif;
    }
    .name {
      font-weight: bold;
      color: #217ac0;
      font-size: 120%;
    }
    h4 {
      margin: 10px 0 -8px 0;
      background: #217ac0;
      color: white;
      padding: 2px 6px;
      border: 1px solid #cee9f9;
      border-radius: 4px;
    }
    .attributes {
      margin-left: 22px;
      font-size: 90%;
    }
    .attributes p {
      margin-left: 16px;
      font-style: italic;
    }
  </style>
  <details>
    <summary>
      <code class="name">
        &lt;<slot name="element-name">需要名称</slot>&gt;
      </code>
      <span class="desc"><slot name="description">需要描述</slot></span>
    </summary>
    <div class="attributes">
      <h4>属性</h4>
      <slot name="attributes"><p>无</p></slot>
    </div>
  </details>
  <hr />
</template>
```

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E9%80%8F%E6%98%8E%E5%86%85%E5%AE%B9%E6%A8%A1%E5%9E%8B">透明内容</a></td></tr><tr><th scope="row">事件</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event" title="slotchange"><code>slotchange</code></a></td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的 <code>role</code></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSlotElement"><code>HTMLSlotElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-slot-element](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element) |
| [DOM  
\# shadow-tree-slots](https://dom.spec.whatwg.org/#shadow-tree-slots) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   HTML [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template) 元素
-   HTML [`slot`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/slot) 属性
-   CSS [`::slotted`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::slotted) 伪元素
-   CSS [`:has-slotted`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has-slotted) 伪类
-   [CSS 域](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scoping)模块

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/slot/contributors.txt)更新。
