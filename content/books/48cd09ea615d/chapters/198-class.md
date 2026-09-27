## [尝试一下](#尝试一下)

```
<p>Narrator: This is the beginning of the play.</p>

<p class="note editorial">Above point sounds a bit obvious. Remove/rewrite?</p>

<p>Narrator: I must warn you now folks that this beginning is very exciting.</p>

<p class="note">[Lights go up and wind blows; Caspian enters stage right]</p>
```

```
.note {
  font-style: italic;
  font-weight: bold;
}

.editorial {
  background: rgb(255, 0, 0, 0.25);
  padding: 10px;
}

.editorial:before {
  content: "Editor: ";
}
```

尽管对 class 的命名没有要求，但 web 开发者最好使用可以表达元素语义目的的名称，而不是描述元素展现的名称（即使一个元素是斜体，但是 class 的命名也不应该是 italics）。**语义化**命名即使在页面展现发生改变时仍能合乎逻辑。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# classes](https://html.spec.whatwg.org/multipage/dom.html#classes) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   所有[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月4日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/class/contributors.txt)更新。
