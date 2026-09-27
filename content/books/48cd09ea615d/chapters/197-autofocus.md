基线

广泛可用

自 2023年3月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes) **`autofocus`** 是一个布尔属性，表示元素应在页面加载时或其所属的 [`<dialog>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dialog) 显示时被聚焦。

html

```
<input name="q" autofocus />
```

在文档或对话框中，最多只能有一个元素具有 autofocus 属性。如果应用于多个元素，第一个元素将获得焦点。

## [无障碍考虑](#无障碍考虑)

自动聚焦表单控件会让使用屏幕阅读技术的视障人士和有认知障碍的人士感到困惑。当指定 `autofocus` 时，屏幕阅读器会将用户“传送”到表单控件上，而不会事先向他们发出警告。

在应用 `autofocus` 属性时，请仔细考虑无障碍性。自动聚焦于控件会导致页面在加载时滚动。在某些触摸设备上，焦点还会导致动态键盘的显示。虽然屏幕阅读器会公布收到焦点的表单控件的标签，但屏幕阅读器不会公布标签之前的任何内容，而使用小型设备的视力正常的用户同样会错过前面内容所创建的上下文。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-autofocus-attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-autofocus-attribute) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autofocus/contributors.txt)更新。
