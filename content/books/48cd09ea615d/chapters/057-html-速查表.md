使用 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 时，若能有一种简单的方法记住如何正确使用和应用 HTML 标签，将会非常方便。MDN 提供了丰富的 [HTML 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements)和一套深入的 [HTML 指南](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content)。但是，许多情况下我们只需要一些快速的提示。这便是速查表的初衷——为常见用法提供一些快速、准确、现成的代码片段。

**备注：**HTML 标签应根据其语义价值而非外观使用。完全可以使用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 改变特定标签的外观和特性。因此使用 HTML 时，要花时间留意标签的语义，而非它们的外观。

## [行内元素](#行内元素)

“元素”是网页的一个单独部分。一些元素较大，作为容器包裹较小的元素。一些元素较小，“嵌入”到更大的元素中。默认情况下，“行内元素”会在网页中并排显示。它们会在网页中按需占用宽度，并且水平排列，就像句子中的词语或同行并列摆放的书本。所有行内元素都可以放置在 `<body>` 元素内。

行内元素：用法和示例
| 用法 | 元素 | 示例 |
| --- | --- | --- |
| 链接 | [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a) | 
html

```
<a href="https://example.org">
至 example.org 的链接</a>。
```



 |
| 图片 | [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) | 

html

```
<img src="https://developer.mozilla.org/zh-CN/docs/Web/beast.png" width="50" />
```



 |
| 内联容器 | [`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/span) | 

html

```
用于对元素进行分组：例如，用于<span style="color:blue">添加样式
</span>。
```



 |
| 强调文本 | [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/em) | 

html

```
<em>我很时髦</em>。
```



 |
| 斜体文本 | [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i) | 

html

```
用<i>斜体</i>标记短语。
```



 |
| 粗体文本 | [`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b) | 

html

```
加粗<b>单词或短语</b>。
```



 |
| 重要文本 | [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strong) | 

html

```
<strong>我很重要！</strong>
```



 |
| 高亮文本 | [`<mark>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/mark) | 

html

```
<mark>注意这里！</mark>
```



 |
| 删除线文本 | [`<s>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/s) | 

html

```
<s>我无关紧要。</s>
```



 |
| 下标 | [`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub) | 

html

```
H<sub>2</sub>O
```



 |
| 小文本 | [`<small>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small) | 

html

```
用于表示文档的<small>小字</small>。
```



 |
| 地址 | [`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address) | 

html

```
<address>主大街 67 号</address>
```



 |
| 文献引用 | [`<cite>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/cite) | 

html

```
欲了解更多怪物，请参阅<cite>《怪物书》</cite>。
```



 |
| 上标 | [`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup) | 

html

```
x<sup>2</sup>
```



 |
| 内联引用 | [`<q>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/q) | 

html

```
<q>我？</q>，她说道。
```



 |
| 换行 | [`<br>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/br) | 

html

```
第 1 行<br>第 2 行
```



 |
| 换行机会 | [`<wbr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/wbr) | 

html

```
<div style="width: 200px">
  Llanfair<wbr>pwllgwyngyll<wbr>gogerychwyrndrobwllllantysiliogogogoch
</div>
```



 |
| 日期 | [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time) | 

html

```
用于格式化日期。例如：<time datetime="2020-05-24"
>发布于 2020 年 5 月 23 日</time>。
```



 |
| 代码格式 | [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code) | 

html

```
这段文字是正常格式，但<code>这段文字是代码格式</code>。
```



 |
| 音频 | [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) | 

html

```
<audio controls>
  <source src="https://developer.mozilla.org/shared-assets/audio/t-rex-roar.mp3" type="audio/mpeg">
</audio>
        
```



 |
| 视频 | [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) | 

html

```
<video controls width="250"
  src="https://developer.mozilla.org/shared-assets/videos/flower.webm" >
  <a href="/shared-assets/videos/flower.webm">下载 WebM 视频</a>
</video>
```



 |

## [区块元素](#区块元素)

相反，“区块元素”，会占用整个网页宽度。它们也会占用网页的一整行；它们无法并列排列。相反，它们会像文章里的段落或像积木塔那样堆叠在一起。

**备注：**由于本速查表仅包含少数几个代表特定结构或具备特殊语义的元素，因此 [`div`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 元素被特意排除————因为 `div` 元素不代表任何内容，也不具备任何特殊语义。

| 用法 | 元素 | 示例 |
| --- | --- | --- |
| 简单段落 | [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) | 
html

```
<p>我是一个段落</p>
<p>我是另一个段落</p>
```



 |
| 扩展引用 | [`<blockquote>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/blockquote) | 

html

```
他们说：
<blockquote>blockquote 元素表示扩展引用。</blockquote>
```



 |
| 附加信息 | [`<details>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/details) | 

html

```
<details>
  <summary>HTML 速查表</summary>
  <p>行内元素</p>
  <p>区块元素</p>
</details>
```



 |
| 无序列表 | [`<ul>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ul) | 

html

```
<ul>
  <li>我是一个元素</li>
  <li>我是另一个元素</li>
</ul>
```



 |
| 有序列表 | [`<ol>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/ol) | 

html

```
<ol>
  <li>我是第一个元素</li>
  <li>我是第二个元素</li>
</ol>
```



 |
| 定义列表 | [`<dl>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/dl) | 

html

```
<dl>
  <dt>一个术语</dt>
  <dd>术语的定义</dd>
  <dt>另一个术语</dt>
  <dd>另一个术语的定义</dd>
</dl>
```



 |
| 水平分割线 | [`<hr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hr) | 

html

```
之前<hr>之后
```



 |
| 文本标题 | [<h1>—<h6>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements) | 

html

```
<h1>这是 1 号标题</h1>
<h2>这是 2 号标题</h2>
<h3>这是 3 号标题</h3>
<h4>这是 4 号标题</h4>
<h5>这是 5 号标题</h5>
<h6>这是 6 号标题</h6>
```



 |

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月15日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Cheatsheet/contributors.txt)更新。
