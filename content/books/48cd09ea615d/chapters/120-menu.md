基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<menu>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素在 HTML 规范中被描述为 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 的语义替代，但浏览器将其视为与 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 没有区别（并通过无障碍树暴露）。它表示一个无序列表（由 [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li) 元素表示）。

## [尝试一下](#尝试一下)

```
<div class="news">
  <a href="#">NASA’s Webb Delivers Deepest Infrared Image of Universe Yet</a>
  <menu>
    <li><button id="save">Save for later</button></li>
    <li><button id="share">Share this news</button></li>
  </menu>
</div>
```

```
.news {
  background-color: bisque;
  padding: 1em;
  border: solid thin black;
}

menu {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin-bottom: 0;
  gap: 1em;
}
```

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

`<menu>` 和 [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 元素都用于表示无序列表。它们的关键区别在于，[`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 主要用于显示内容，而 `<menu>` 则用于交互式内容。

**备注：**在早期版本的 HTML 规范中，`<menu>` 元素还有一个额外的用例，即作为上下文菜单。此功能被认为已过时，并且不在规范中。

## [示例](#示例)

### [工具栏](#工具栏)

在这个示例中，使用 `<menu>` 元素创建了一个编辑应用程序的工具栏。

#### HTML

html

```
<menu>
  <li><button onclick="copy()">复制</button></li>
  <li><button onclick="cut()">剪切</button></li>
  <li><button onclick="paste()">粘贴</button></li>
</menu>
```

请注意，这在功能上与以下内容没有区别：

html

```
<ul>
  <li><button onclick="copy()">复制</button></li>
  <li><button onclick="cut()">剪切</button></li>
  <li><button onclick="paste()">粘贴</button></li>
</ul>
```

#### CSS

css

```
menu,
ul {
  display: flex;
  list-style: none;
  padding: 0;
  width: 400px;
}

li {
  flex-grow: 1;
}

button {
  width: 100%;
}
```

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>。如果元素的子元素包含至少一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li"><code>&lt;li&gt;</code></a> 元素：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>。</p></td></tr><tr><th scope="row">允许的内容</th><td><p>零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li"><code>&lt;li&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script"><code>&lt;script&gt;</code></a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/template"><code>&lt;template&gt;</code></a>。</p></td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/list_role">list</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/directory_role"><code>directory</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role"><code>group</code></a>、<code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role">listbox</a></code>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role"><code>menu</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menubar_role"><code>menubar</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/none_role"><code>none</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role"><code>presentation</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/radiogroup_role"><code>radiogroup</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tablist_role"><code>tablist</code></a>、<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role"><code>toolbar</code></a> 或 <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role"><code>tree</code></a>。</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMenuElement"><code>HTMLMenuElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-menu-element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-menu-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他与列表相关的 HTML 元素：[`<ol>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol)、[`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) 和 [`<li>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/li)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/menu/contributors.txt)更新。
