**CSS Scrollbars** 标准化了由 ie5 引入的废弃的滚动条颜色属性

## [示例](#示例)

在这个例子里 我们选择使用一个比较细的 滚动轨道为绿色，滚动块为紫色的滚动条

css

```
.scroller {
  width: 300px;
  height: 100px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
```

### [HTML](#html)

html

```
<div class="scroller">
  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
  daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens
  corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts
  fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber
  earthnut pea peanut soko zucchini.
</div>
```

### [结果](#结果)

## [参考](#参考)

### [CSS 属性](#css_属性)

-   [`scrollbar-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/scrollbar-width)
-   [`scrollbar-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/scrollbar-color)

## [规范](#规范)

| 规范 |
| --- |
| [CSS Scrollbars Styling Module Level 1](https://drafts.csswg.org/css-scrollbars/) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Scrollbars_styling/contributors.txt)更新。
