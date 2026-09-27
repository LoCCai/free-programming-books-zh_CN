基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`content`** 属性指定了由 `<meta>` 标签的 [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name) 属性定义的元数据名称的值。它接受一个字符串作为其值，并且预期的语法会根据所使用的 `name` 的值的变化而变化。

## [值](#值)

`content` 属性接受的值的类型取决于 `name` 的值。 有关特定格式和类型的详细信息，请参阅 [`<meta>` `name` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name)页面。

## [示例](#示例)

### [设置文档的元数据描述](#设置文档的元数据描述)

以下示例中，`<meta>` 标签使用 `name=description` 为文档设置“元数据描述”。`content` 属性提供了元数据的值：

html

```
<meta
  name="description"
  content="HTML 参考文档描述了 HTML 的所有元素和属性，包括适用于所有元素的全局属性。" />
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-meta-content](https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-content) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   `<meta>` [`name`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name) 属性

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/content/contributors.txt)更新。
