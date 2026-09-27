基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes) **`contenteditable`** 是一个枚举属性，表示元素是否可被用户编辑。如果可以，浏览器会修改元素的组件以允许编辑。

## [尝试一下](#尝试一下)

```
<blockquote contenteditable="true">
  <p>Edit this content to add your own quote</p>
</blockquote>

<cite contenteditable="true">-- Write your own name here</cite>
```

```
blockquote {
  background: #eee;
  border-radius: 5px;
  margin: 16px 0;
}

blockquote p {
  padding: 15px;
}

cite {
  margin: 16px 32px;
  font-weight: bold;
}

blockquote p::before {
  content: "\201C";
}

blockquote p::after {
  content: "\201D";
}

[contenteditable="true"] {
  caret-color: red;
}
```

该属性必须是下面的值之一：

-   `true` 或_空字符串_，表示元素是可编辑的。
-   `false` 表示元素不是可编辑的。
-   `plaintext-only` 表示元素的原始文本是可编辑的，但富文本格式会被禁用。

如果没有设置该属性的值（例如：`<label contenteditable>Example Label</label>`），则其值被视为空字符串。

如果没给出该属性或设置了无效的属性值，则其默认值_继承_自父元素：即，如果父元素可编辑，该子元素也可编辑。

注意，虽然该属性允许设定的值包括 `true` 和 `false`，但该属性仍是一个[_枚举_](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)属性而非_布尔_属性。

你可以使用 CSS [`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/caret-color) 属性设置用于绘制文本插入 [caret](https://developer.mozilla.org/zh-CN/docs/Glossary/Caret) 的颜色。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-contenteditable](https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   所有的[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)
-   [`HTMLElement.contentEditable`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/contentEditable) 和 [`HTMLElement.isContentEditable`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/isContentEditable)
-   CSS [`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/caret-color) 属性
-   [Element `input` 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/input_event)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/contenteditable/contributors.txt)更新。
