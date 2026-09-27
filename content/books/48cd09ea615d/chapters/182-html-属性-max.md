## [语法](#语法)

各输入类型的 `max` 值语法
| 输入类型 | 语法 | 示例 |
| --- | --- | --- |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date) | `yyyy-mm-dd` | `<input type="date" max="2019-12-25" step="1">` |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month) | `yyyy-mm` | `<input type="month" max="2019-12" step="12">` |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week) | `yyyy-W##` | `<input type="week" max="2019-W23" step="">` |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time) | `HH:mm` | `<input type="time" max="17:00" step="900">` |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local) | `yyyy-mm-ddTHH:mm` | `<input type="datetime-local" max="2019-12-25T23:59">` |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<input type="number" min="0" step="5" max="100">` |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<input type="range" min="60" step="5" max="100">` |

请参阅[客户端验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)和 [`rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow "rangeOverflow") 了解更多信息。

对于 [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) 元素，`max` 属性描述了 `progress` 元素所表示的任务一共需要完成多少工作。如果该属性存在，必须具有大于零的值，并且是有效的浮点数。对于 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) 元素，`max` 属性定义了测量范围的上限值。此值必须大于最小值（如果指定了[`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min) 属性）。在这两种情况下，如果省略，默认值为 1。

其他元素的 `max` 值语法
| 元素类型 | 语法 | 示例 |
| --- | --- | --- |
| [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<progress id="file" max="100" value="70"> 70% </progress>` |
| [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="40"> at 40/100</meter>` |

## [无障碍考虑](#无障碍考虑)

提供帮助用户了解如何填写表单并使用各个表单控件的指引。标明任何必填和可选的输入项、数据格式以及其他相关信息。在使用 `max` 属性时，确保用户理解最大值的要求。可以通过 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 提供说明。如果需要在标签之外提供上述说明以实现更灵活的布局设计，请考虑使用 [`aria-labelledby`](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) 或 [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-max](https://html.spec.whatwg.org/multipage/input.html#attr-input-max) |
| [HTML  
\# attr-meter-max](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-max) |
| [HTML  
\# attr-progress-max](https://html.spec.whatwg.org/multipage/form-elements.html#attr-progress-max) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.max](#html.elements.input.max)

### [html.elements.meter.max](#html.elements.meter.max)

### [html.elements.progress.max](#html.elements.progress.max)

## [参见](#参见)

-   [`step`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/step)
-   [`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min)
-   其他 meter 属性：`low`、`high`、`optimum`
-   [约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [表单校验](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation)
-   [`validityState.rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow)
-   [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:out-of-range)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)、[month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month)、[week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week)、[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)、[datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)、[number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) 和 [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) 类型，以及 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max/contributors.txt)更新。
