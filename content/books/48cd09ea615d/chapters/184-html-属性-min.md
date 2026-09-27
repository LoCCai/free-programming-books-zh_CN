## [语法](#语法)

不同输入类型的 `min` 值语法
| 输入类型 | 语法 | 示例 |
| --- | --- | --- |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date) | `yyyy-mm-dd` | `<input type="date" min="2019-12-25" step="1">` |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month) | `yyyy-mm` | `<input type="month" min="2019-12" step="12">` |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week) | `yyyy-W##` | `<input type="week" min="2019-W23" step="">` |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time) | `HH:mm` | `<input type="time" min="09:00" step="900">` |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local) | `yyyy-mm-ddTHH:mm` | `<input type="datetime-local" min="2019-12-25T19:30">` |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<input type="number" min="0" step="5" max="100">` |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<input type="range" min="60" step="5" max="100">` |

参阅[客户端验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)和 [`rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow "rangeUnderflow") 获取更多信息。

对于 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) 元素，`min` 属性定义了测量范围的最小数值边界。若指定，则该值必须小于最大值（[`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max) 属性）。在两种情况下，如果省略，则默认值为 1。

其他元素的 `min` 值语法
| 输入类型 | 语法 | 示例 |
| --- | --- | --- |
| [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) | [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/number) | `<meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="40"> at 40/100</meter>` |

### [对 step 的影响](#对_step_的影响)

`min` 和 `step` 的值决定了有效的值范围，即使未包含 `step` 属性，`step` 也会默认取值为 `1`。

我们可以为无效输入添加一个红色边框：

css

```
input:invalid {
  border: solid red 3px;
}
```

然后定义一个最小值为 7.2 且省略了 step 属性的输入元素，此时 step 默认值为 1。

html

```
<input id="myNumber" name="myNumber" type="number" min="7.2" value="8" />
```

由于 `step` 的默认值为 1，因此有效值包括 `7.2`、`8.2`、`9.2` 等。而值 8 是无效的。由于我们包含了无效值，支持的浏览器将显示该值为无效。

如果没有明确指定，`number` 和 `range` 类型的 `step` 默认值为 1，而日期、时间输入类型的 `step` 默认值为 1 个单位（秒、周、月、天）。

## [无障碍考虑](#无障碍考虑)

提供说明以帮助用户理解如何填写表单及使用各个表单控件。指明必填和可选输入、数据格式及其他相关信息。在使用 `min` 属性时，确保用户理解该最小值要求。将说明放置在 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 标签内通常即可满足需求。如果需要在标签之外提供上述说明以实现更灵活的布局设计，请考虑使用 [`aria-labelledby`](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) 或 [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-min](https://html.spec.whatwg.org/multipage/input.html#attr-input-min) |
| [HTML  
\# attr-meter-max](https://html.spec.whatwg.org/multipage/form-elements.html#attr-meter-max) |

## [浏览器兼容性](#浏览器兼容性)

### [html.elements.input.min](#html.elements.input.min)

### [html.elements.meter.min](#html.elements.meter.min)

## [参见](#参见)

-   [`step`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/step)
-   [`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max)
-   其他 meter 属性：`low`、`high`、`optimum`
-   [约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [表单验证](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation)
-   [`validityState.rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow)
-   [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:out-of-range)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)、[month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month)、[week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week)、[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)、[datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)、[number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) 和 [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) 类型，以及 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min/contributors.txt)更新。
