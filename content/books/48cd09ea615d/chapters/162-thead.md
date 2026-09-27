基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 的 **`<thead>`** 元素定义了一组定义表格的列头的行。

## [尝试一下](#尝试一下)

```
<table>
  <caption>
    Council budget (in £) 2018
  </caption>
  <thead>
    <tr>
      <th scope="col">Items</th>
      <th scope="col">Expenditure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Donuts</th>
      <td>3,000</td>
    </tr>
    <tr>
      <th scope="row">Stationery</th>
      <td>18,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Totals</th>
      <td>21,000</td>
    </tr>
  </tfoot>
</table>
```

```
thead,
tfoot {
  background-color: #2c5e77;
  color: #fff;
}

tbody {
  background-color: #e4f0f5;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td {
  text-align: center;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容类别</a></th><td>无。</td></tr><tr><th scope="row">允许内容</th><td>零或多个<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr"><code>&lt;tr&gt;</code></a>元素。</td></tr><tr><th scope="row">标签省略</th><td>开头的标签是强制的。如果<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead" aria-current="page"><code>&lt;thead&gt;</code></a> 元素后直接跟 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody"><code>&lt;tbody&gt;</code></a>或<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot"><code>&lt;tfoot&gt;</code></a>元素，结尾的标签可以被省略。</td></tr><tr><th scope="row">Permitted parents</th><td>A <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table"><code>&lt;table&gt;</code></a> element. The <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead" aria-current="page"><code>&lt;thead&gt;</code></a> must appear after any <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption"><code>&lt;caption&gt;</code></a> or <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup"><code>&lt;colgroup&gt;</code></a> element, even implicitly defined, but before any <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody"><code>&lt;tbody&gt;</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot"><code>&lt;tfoot&gt;</code></a> and <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr"><code>&lt;tr&gt;</code></a> element.</td></tr><tr><th scope="row">Permitted ARIA roles</th><td>Any</td></tr><tr><th scope="row">DOM interface</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTableSectionElement"><code>HTMLTableSectionElement</code></a></td></tr></tbody></table>

## [属性](#属性)

This element includes the [global attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes).

[`align`](#align)

This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:

-   `left`, aligning the content to the left of the cell
-   `center`, centering the content in the cell
-   `right`, aligning the content to the right of the cell
-   `justify`, inserting spaces into the textual content so that the content is justified in the cell
-   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](#char) and [`charoff`](#charoff) attributes. If this attribute is not set, the `left` value is assumed.

**备注：**Do not use this attribute as it is obsolete (not supported) in the latest standard.

-   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) property on it.
-   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](#char) as the value of the [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) property.

[`bgcolor`](#bgcolor)

This attribute defines the background color of each cell of the column. It is one of the 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB "外部链接（在新标签页中打开）"), prefixed by a '#'. One of the sixteen predefined color strings may be used.

**备注：**Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: the [`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead) element should be styled using [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS). To give a similar effect to the **bgcolor** attribute, use the [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) property [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color), on the relevant [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td) or [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th) elements.

[`char`](#char)

This attribute is used to set the character to align the cells in a column on. Typical values for this include a period (.) when attempting to align numbers or monetary values. If [`align`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr#align) is not set to `char`, this attribute is ignored.

**备注：**Do not use this attribute as it is obsolete (and not supported) in the latest standard. To achieve the same effect as the [`char`](#char), in CSS3, you can use the character set using the [`char`](#char) attribute as the value of the [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) property.

[`charoff`](#charoff)

This attribute is used to indicate the number of characters to offset the column data from the alignment characters specified by the **char** attribute.

**备注：**Do not use this attribute as it is obsolete (and not supported) in the latest standard.

[`valign`](#valign)

This attribute specifies the vertical alignment of the text within each row of cells of the table header. Possible values for this attribute are:

-   `baseline`, which will put the text as close to the bottom of the cell as it is possible, but align it on the [baseline](https://en.wikipedia.org/wiki/Baseline_%28typography%29 "外部链接（在新标签页中打开）") of the characters instead of the bottom of them. If characters are all of the size, this has the same effect as `bottom`.
-   `bottom`, which will put the text as close to the bottom of the cell as it is possible;
-   `middle`, which will center the text in the cell;
-   `top`, which will put the text as close to the top of the cell as it is possible.

**备注：**Do not use this attribute as it is obsolete (and not supported) in the latest standard: instead set the CSS [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/vertical-align) property on it.

## [示例](#示例)

See [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table) for examples on `<thead>`.

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-thead-element](https://html.spec.whatwg.org/multipage/tables.html#the-thead-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   Other table-related HTML Elements: [`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption), [`<col>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/col), [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup), [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table), [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody), [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td), [`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot), [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th), [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr);
-   CSS properties and pseudo-classes that may be specially useful to style the `<thead>` element:
    -   the [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:nth-child) pseudo-class to set the alignment on the cells of the column;
    -   the [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) property to align all cells content on the same character, like '.'.<

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead/contributors.txt)更新。
