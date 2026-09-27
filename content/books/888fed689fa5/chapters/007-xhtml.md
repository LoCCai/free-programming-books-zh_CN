**XHTML**（可扩展超文本标记语言）是曾经被用来描述按照 [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML) 语法规则编写的 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 文档的术语。

下面的例子显示了一个 HTML 文档和相应的“XHTML”文档，以及应当搭配使用的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Content-Type) 标头。

### [HTML 文档](#html_文档)

html

```
<!-- Content-Type: text/html -->

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML</title>
  </head>
  <body>
    <p>我是 HTML 文档</p>
  </body>
</html>
```

### [XHTML 文档](#xhtml_文档)

xml

```
<!-- Content-Type: application/xhtml+xml -->

<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN">
  <head>
    <title>XHTML</title>
  </head>
  <body>
    <p>我是 XHTML 文档</p>
  </body>
</html>
```

在实践中，很少有“XHTML”文档在网络上以 `Content-Type: application/xhtml+xml` 标头提供。即使这些文件是按照 XML 语法规则编写的，它们也是以 `Content-Type: text/html` 标头提供的——因此浏览器使用 HTML 解析器而不是 XML 解析器来解析这些文件。

## [参见](#参见)

-   [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)
-   [HTML5](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML5)
-   [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG)
-   [MathML](https://developer.mozilla.org/zh-CN/docs/Glossary/MathML)
-   [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Glossary/XHTML/contributors.txt)更新。
