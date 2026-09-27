This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

Subversion 具有模块化的设计: 它由众多由 C 编写而成的库函数实现. 每一个 库函数都有一个定义良好的目标和应用程序编程接口 (Application Programming Interface, 简称 API), 这种接口不仅可以被 Subversion 使用, 还能被任意一个希 望通过编程接口控制 Subversion 的软件使用. 另外, Subversion 的 API 不仅能被 C 程序使用, 也能被其他高级语言编写的程序使用, 例如 Python, Perl, Java 和 Ruby.

本章的目标读者是那些希望通过 Subversion API 或它的各种语言绑定来控制 Subversion 的人. 如果你希望围绕 Subversion 编写健壮的包装脚本来简化 你的工作, 或者正在开发 Subversion 与其他软件之间更加复杂的集成, 或者仅仅 是对 Subversion 的库函数感到好奇, 那你应该认真阅读本章. 但是如果你觉得 自己没必要从开发的层次上使用 Subversion, 那你完全可以跳过本章, 这并不会 影响到你作为一个 Subversion 普通用户的体验.
