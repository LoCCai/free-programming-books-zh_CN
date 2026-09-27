-   [Docs](https://websec.readthedocs.io/zh/latest/index.html) »
-   [5\. 语言与框架](https://websec.readthedocs.io/zh/latest/language/index.html) »
-   5.5. Golang
-   [Edit on GitHub](https://github.com/LyleMi/Learn-Web-Hacking/blob/master/source/language/golang.rst)

* * *

## 5.5.1. Golang Runtime[¶](#golang-runtime "永久链接至标题")

Go中的线程被称为Goroutine或G，内核线程被称为M。这些G被调度到M上，即所谓的G：M线程模型，或更常用的M：N线程模型，用户空间线程或green线程模型。

## 5.5.2. 字符串处理[¶](#section-1 "永久链接至标题")

-   Go 源代码始终为 UTF-8
-   代表 Unicode 码点的字节序列称为 `rune`
-   Go 不保证字符串中的字符被规范化
-   字符串可以包含任意字节
-   字符串中不包含字节级转义符时，字符串始终包含有效的 UTF-8 序列

## 5.5.3. 参考链接[¶](#section-2 "永久链接至标题")

-   [Strings, bytes, runes and characters in Go](https://blog.golang.org/strings)
