基线

广泛可用

自 2017年10月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML `<data>` 元素**将一个指定内容和机器可读的翻译联系在一起。但是，如果内容是与时间或者日期相关的，则一定要使用 [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time)。

## [尝试一下](#尝试一下)

```
<p>New Products:</p>
<ul>
  <li><data value="398">Mini Ketchup</data></li>
  <li><data value="399">Jumbo Ketchup</data></li>
  <li><data value="400">Mega Jumbo Ketchup</data></li>
</ul>
```

```
data:hover::after {
  content: " (ID " attr(value) ")";
  font-size: 0.7em;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">Content categories</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">Flow content</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Phrasing_content">phrasing content</a>, palpable content.</td></tr><tr><th scope="row">Permitted content</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Phrasing_content">Phrasing content</a>.</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">Permitted parents</th><td>Any element that accepts <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Phrasing_content">phrasing content</a>.</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDataElement"><code>HTMLDataElement</code></a></td></tr></tbody></table>

## [属性](#属性)

该元素支持[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`value`](#value)

该属性指定元素内容所对应的数据，或者说“机器可读的翻译”。

## [示例](#示例)

下面的示例展示了一些产品名称，而且每个名称都和一个产品编码相关联。

html

```
<p>新产品</p>
<ul>
  <li><data value="398">迷你番茄酱</data></li>
  <li><data value="399">巨无霸番茄酱</data></li>
  <li><data value="400">超级巨无霸番茄酱</data></li>
</ul>
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-data-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-data-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   HTML [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time) 元素。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/data/contributors.txt)更新。
