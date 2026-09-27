基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`step`** 属性是值必须遵循的粒度数值，或关键字 `any`。此属性对数值输入类型有效，包括 [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)、[month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month)、[week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week)、[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)、[datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)、[number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) 和 [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) 类型。

`step` 设置了点击上下旋转按钮、在范围上左右移动滑块以及验证不同日期类型时的_步进间隔_。如果没有明确指定，`number` 和 `range` 的 `step` 默认为 1，日期/时间输入类型的 `step` 默认为 1 个单位类型（分、周、月、日）。值必须是正数（整数或浮点数）或特殊值 `any`，这意味着不隐含步进，允许任何值（除其他限制外，如 [`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min) 和 [`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max)）。

`number` 输入类型的默认步进值为 1，只允许输入整数，_除非_步进基数不是整数。`time` 的默认步进值为 60 秒，值 900 等同于 15 分钟。

## [语法](#语法)

step 的默认值
| 输入类型 | 值 | 示例 |
| --- | --- | --- |
| [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date) | 1（天） | `<input type="date" min="2019-12-25" step="1">` |
| [month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month) | 1（个月） | `<input type="month" min="2019-12" step="12">` |
| [week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week) | 1（周） | `<input type="week" min="2019-W23" step="2">` |
| [time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time) | 60（秒） | `<input type="time" min="09:00" step="900">` |
| [datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local) | 60（秒） | `<input type="datetime-local" min="2019-12-25T19:30" step="900">` |
| [number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) | 1 | `<input type="number" min="0" step="0.1" max="10">` |
| [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) | 1 | `<input type="range" min="0" step="2" max="10">` |

如果未明确设置 `any`，则 `number`、日期/时间输入类型和 `range` 输入类型的有效值等于步进的基础值（[`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min) 值）和步进值的增量，如果指定了 [`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max) 值，则增量最大为 `max`。以下示例的结果是对任何 10 或更大的偶整数都有效：

html

```
<input type="number" min="10" step="2" />
```

如果省略了 `step` 值，任何整数均有效，但对像 4.2 这样的浮点数无效，因为 `step` 默认为 1。要使得 4.2 成为有效值：

-   将 `step` 设置为 `any`、0.1 或 0.2
-   `min` 值以 `.2` 结束，如 0.2、1.2 或 -5.2

## [示例](#示例)

### [step 中 `min` 的影响](#step_中_min_的影响)

即使不包含 `step` 属性，`min` 的值也能定义有效值。这是因为对于 `number` 输入类型，`step` 的默认值是 `1`。

在本例中，我们会在无效输入的周围添加一个大红边框：

css

```
input:invalid {
  border: solid red 3px;
}
```

然后，我们定义一个最小值为 1.2、步长值为 2 的输入：

html

```
<input id="myNumber" name="myNumber" type="number" step="2" min="1.2" />
```

有效值包括 1.2、3.2、5.2、7.2、9.2、11.2 等。只有整数部分为奇数、小数部分为 0.2 的浮点数才有效。数字旋转器（如果存在）会生成 1.2 或更大的有效浮点数值，增量为 2。

参见[客户端验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)和 [`stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch "stepMismatch") 以了解更多信息。

## [无障碍考虑](#无障碍考虑)

提供说明，帮助用户了解如何填写表单和使用各个表单控件。说明任何必需和可选的输入、数据格式以及其他相关信息。使用 `min` 属性时，应确保用户理解这一最低要求。在 [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label) 中提供说明可能就足够了。如果在标签之外提供说明，这样可以更灵活地定位和设计，可以考虑使用 [`aria-labelledby`](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) 或 [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby)。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-step](https://html.spec.whatwg.org/multipage/input.html#attr-input-step) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`max`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/max)
-   [`min`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/min)
-   [约束验证](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Constraint_validation)
-   [表单验证](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Forms/Form_validation)
-   [`validityState.stepMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch)
-   [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:out-of-range)
-   [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)
-   [date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)、[month](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/month)、[week](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/week)、[time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)、[datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)、[number](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/number) 和 [range](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/range) 输入类型，[`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter) 元素

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/step/contributors.txt)更新。
