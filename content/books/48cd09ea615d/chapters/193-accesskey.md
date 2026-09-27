基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**accesskey** [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes) 提供了为当前元素生成快捷键的方式。属性值必须包含一个可打印字符。

## [尝试一下](#尝试一下)

```
<p>If you need to relax, press the <b>S</b>tress reliever!</p>
<button accesskey="s">Stress reliever</button>
```

```
b {
  text-decoration: underline;
}
```

**备注：**在 WHATWG 规范中，它说你可以指定多个空格分隔的字符，浏览器将使用它所支持的第一个字符。然而，这在大多数浏览器中是行不通的。在 IE/Edge 中，它将使用它支持的第一个没有问题的，只要没有与其他命令冲突。

激活 accesskey 的操作取决于浏览器及其平台。

|  | Windows | Linux | Mac |
| --- | --- | --- | --- |
| Firefox | Alt + Shift + _key_ | On Firefox 57 or newer, Control + Option + _key_ -OR- Control + Alt + _key_  
On Firefox 14 or newer, Control + Alt + _key_  
On Firefox 13 or older, Control + _key_ |
| Internet Explorer | Alt + _key_ | N/A |
| Google Chrome | Alt + _key_ | Control + Alt + _key_ |
| Safari | Alt + _key_ | N/A | Control + Alt + _key_ |
| Opera 15+ | Alt + _key_ | Control + Alt + _key_ |
| Opera 12 | 
Shift + Esc opens a contents list which are accessible by accesskey, then, can choose an item by pressing _key_

 |

要注意 Firefox 可以通过用户偏好，自定义所需的修饰键。

## [无障碍](#无障碍)

除了糟糕的浏览器支持之外， `accesskey`属性还有很多问题：

-   `accesskey` 值可能与系统或浏览器键盘快捷键或辅助技术功能相冲突。对于一个操作系统来说，辅助技术和浏览器组合可能无法与其他操作系统协同工作。
-   某些 `accesskey` 值可能不会出现在某些键盘上，特别是在国际化是一个问题的时候。
-   依赖于数字的 `accesskey` 值可能会让那些经历认知问题的人感到困惑，因为他们的数字与它触发的功能没有逻辑关联。
-   通知用户`accesskey`s 存在，这样他们就能意识到该功能。如果没有公开这些信息的方法，`accesskey`s 可能会被意外激活。

由于这些问题，一般建议不要在大多数通用的网站和 web 应用程序中使用`accesskey` 属性。

-   [WebAIM: Keyboard Accessibility - Accesskey](https://webaim.org/techniques/keyboard/accesskey#spec "外部链接（在新标签页中打开）")

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-accesskey-attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`Element.accessKey`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/accessKey)
-   [`HTMLElement.accessKeyLabel`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/accessKeyLabel)
-   所有 [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/accesskey/contributors.txt)更新。
