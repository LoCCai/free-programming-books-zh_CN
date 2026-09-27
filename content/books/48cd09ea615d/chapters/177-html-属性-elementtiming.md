## [使用方法](#使用方法)

为 `elementtiming` 给出的值将成为被观测元素的标识符。

html

```
<img alt="alt" src="https://developer.mozilla.org/zh-CN/docs/Web/img.jpg" elementtiming="label for element" />
```

可能需要观察的元素包括：

-   文章的主要图像。
-   博客文章标题。
-   购物网站中的轮播图像。
-   页面中主要视频的海报图像。

## [示例](#示例)

html

```
<img
  alt="博文主要图片的替代文字"
  src="https://developer.mozilla.org/zh-CN/docs/Web/my-massive-image.jpg"
  elementtiming="Main image" />

<p elementtiming="important-text">一些非常重要的信息。</p>
```

## [参见](#参见)

-   [`PerformanceElementTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming)
-   [`Element.elementTiming`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/elementTiming)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/elementtiming/contributors.txt)更新。
