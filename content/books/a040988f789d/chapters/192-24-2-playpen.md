## 通过例子学 Rust 中文版

[](https://rustwiki.org/zh-CN/rust-by-example/print.html "Print this book")[](https://github.com/rust-lang-cn/rust-by-example-cn "Git repository")[](https://github.com/rust-lang-cn/rust-by-example-cn/edit/master/src/meta/playpen.md "Suggest an edit")

## [Playpen](#playpen)

[Rust Playpen](https://github.com/rust-lang/rust-playpen) 是一个在线运行 Rust 代码的网络接口。现在该项目通常称为 [Rust Playground](https://play.rust-lang.org/)。

## [在 `mdbook` 使用](#在-mdbook-使用)

在 [`mdbook`](https://github.com/rust-lang/mdBook) 中，你可以让示例代码运行和编辑。

```
fn main() {
    println!("Hello World!");
}
```

这使读者既可以运行你的代码示例，也可以对其进行修改和调整。此处的关键是将单词添加 `editable` 到代码块中，并用逗号分隔。

````
```rust,editable
//...将你的代码写在这里
```
````

此外，如果想要 `mdbook` 在构建和测试时跳过该代码，则可以添加 `ignore`。

````
```rust,editable,ignore
//...将你的代码写在这里
```
````

## [在文档中使用](#在文档中使用)

可能你已经在某些 [Rust 官方文档](https://rustwiki.org/zh-CN/core/)中注意到了一个名为 “Run” 的按钮，该按钮在 Rust Playground 的新选项卡中打开了代码示例。如果使用名为的 [`html_playground_url`](https://doc.rust-lang.org/rustdoc/the-doc-attribute.html#html_playground_url) 的 #\[doc\] 属性，则启用此功能。

### [参见：](#参见)

-   [The Rust Playground](https://play.rust-lang.org/)
-   [下一代 playpen](https://github.com/integer32llc/rust-playground/)
-   [官方文档](https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html)
