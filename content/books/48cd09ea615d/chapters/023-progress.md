基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概述](#概述)

**HTML**中的 **`<progress>`** 元素用来显示一项任务的完成进度。虽然规范中没有规定该元素具体如何显示，浏览器开发商可以自己决定，但通常情况下，该元素都显示为一个进度条形式。

## [尝试一下](#尝试一下)

```
<label for="file">File progress:</label>

<progress id="file" max="100" value="70">70%</progress>
```

```
label {
  padding-right: 10px;
  font-size: 1rem;
}
```

## [使用上下文](#使用上下文)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、可关联标签内容、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>，但其后代元素不能有 <code>&lt;progress&gt;</code> 元素。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E5%8F%AF%E6%84%9F%E7%9F%A5%E5%86%85%E5%AE%B9">可感知内容</a>的任何元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role"><code>progressbar</code></a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>没有允许的角色（<code>role</code>）</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLProgressElement"><code>HTMLProgressElement</code></a></td></tr></tbody></table>

## [属性](#属性)

该元素包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max)

该属性描述了这个 `progress` 元素所表示的任务一共需要完成多少工作。如果 `max` 属性存在，值必须大于 `0` 且为有效浮点数。默认值为 `1`。

[`value`](#value)

该属性用来指定该进度条已完成的工作量，其值必须是从 `0` 到 `max`（如果省略了 `max` 值，则为从 `0` 到 `1`）之间的有效浮点数。如果没有 `value` 属性，则为“不确定”进度条；这意味着一项活动正在进行，但没有说明预计需要多长时间。

**备注：**与 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) 元素不同，`<progress>` 元素的最小值总是 0，且不允许指定 `min` 属性。

## [示例](#示例)

html

```
<progress value="70" max="100">70 %</progress>
```

### [结果](#结果)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-progress-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)
-   [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:indeterminate)
-   [`-moz-orient`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/-moz-orient)
-   [`::-moz-progress-bar`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::-moz-progress-bar)
-   [`::-webkit-progress-bar`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::-webkit-progress-bar)
-   [`::-webkit-progress-value`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::-webkit-progress-value)
-   [`::-webkit-progress-inner-element`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/::-webkit-progress-inner-element)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress/contributors.txt)更新。
