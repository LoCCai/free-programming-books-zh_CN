当没有在任何元素上指定 [`z-index`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/z-index) 属性时，元素的堆叠顺序如下（从下到上）：

1.  根元素的背景和边框。
2.  后代非定位元素，按在 HTML 中出现的顺序排列。
3.  后代定位元素，按在 HTML 中出现的顺序排列。

请参阅[定位类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/position#%E5%AE%9A%E4%BD%8D%E7%B1%BB%E5%9E%8B)以了解定位元素和非定位元素的解释。

请记住，当 [`order`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/order) 属性在 [`flex`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/flex) 容器内改变渲染顺序（_基于 HTML 中的出现顺序_）时，它也会影响层叠上下文的顺序。

## [示例](#示例)

在这个例子中，DIV #1 到 DIV #4 是定位元素。DIV #5 是静态定位的，因此它绘制在其他四个元素下面，即使它在 HTML 标记中出现在后面。

### [HTML](#html)

html

```
<div id="abs1" class="absolute">
  <strong>DIV #1</strong><br />position: absolute;
</div>
<div id="rel1" class="relative">
  <strong>DIV #2</strong><br />position: relative;
</div>
<div id="rel2" class="relative">
  <strong>DIV #3</strong><br />position: relative;
</div>
<div id="abs2" class="absolute">
  <strong>DIV #4</strong><br />position: absolute;
</div>
<div id="sta1" class="static">
  <strong>DIV #5</strong><br />position: static;
</div>
```

### [CSS](#css)

css

```
strong {
  font-family: sans-serif;
}

div {
  padding: 10px;
  border: 1px dashed;
  text-align: center;
}

.static {
  position: static;
  height: 80px;
  background-color: #ffc;
  border-color: #996;
}

.absolute {
  position: absolute;
  width: 150px;
  height: 350px;
  background-color: #fdd;
  border-color: #900;
  opacity: 0.7;
}

.relative {
  position: relative;
  height: 80px;
  background-color: #cfc;
  border-color: #696;
  opacity: 0.7;
}

#abs1 {
  top: 10px;
  left: 10px;
}

#rel1 {
  top: 30px;
  margin: 0px 50px 0px 50px;
}

#rel2 {
  top: 15px;
  left: 20px;
  margin: 0px 50px 0px 50px;
}

#abs2 {
  top: 10px;
  right: 10px;
}

#sta1 {
  background-color: #ffc;
  margin: 0px 50px 0px 50px;
}
```

## [结果](#结果)

## [参见](#参见)

-   [堆叠浮动元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_floating_elements)：浮动元素如何与堆叠一起处理。
-   [使用 z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Using_z-index)：如何使用 `z-index` 来更改默认堆叠。
-   [层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_context)：关于堆叠上下文的说明。
-   [层叠上下文示例 1](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_context/Example_1)：2 级 HTML 层级，z-index 在最后一级
-   [层叠上下文示例 2](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_context/Example_2)：2 级 HTML 层级，z-index 在所有层级
-   [层叠上下文示例 3](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_context/Example_3)：3 级 HTML 层级，z-index 在第二级

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Positioned_layout/Stacking_without_z-index/contributors.txt)更新。
