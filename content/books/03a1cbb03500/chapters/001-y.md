* * *

[关于](#about) · [安装](#install) · [变更](#changes) · [许可证](#license) · [参考手册](http://cloudwu.github.io/lua53doc/contents.html) · [中英术语对照表](http://cloudwu.github.io/lua53doc/glossary.html)

## 关于 Lua

Lua 是一门强大、快速、轻量的嵌入式脚本语言。它由巴西里约热内卢 Pontifical Catholic 大学的 [PUC-Rio](http://www.puc-rio.br/) [团队](http://www.lua.org/authors.html) 开发。 Lua 是一个 [自由软件](#license)， 广泛应用于世界上无数产品和项目。

Lua 的 [官方网站](http://www.lua.org/) 上提供了关于 Lua 的完整信息， 包括 [综合概要](http://www.lua.org/about.html) 和最新的 [文档](http://www.lua.org/docs.html)， 需要注意的是 [参考手册](http://www.lua.org/manual/5.3/) 可能和 [这里的版本](http://cloudwu.github.io/lua53doc/contents.html) 有所不同。

## 安装 Lua

Lua 以 [源代码](http://www.lua.org/ftp/) 的形式发布，使用之前，你需要构建它。 构建 Lua 非常简单，因为 Lua 是用纯粹的 ANSI C 实现的，在所有具备 ANSI C 编译器的平台都可以直接编译。 同时，Lua 也可以直接以 C++ 形式编译。 下面介绍了类 Unix 平台上的构建流程，另有 [其它系统构建介绍](#other) 与 [配置选项](#customization) 以作参考。

如果你没有时间或兴趣自己编译 Lua， 可以从 [LuaBinaries](http://lua-users.org/wiki/LuaBinaries) 获取编译后的二进制文件 或者从 [LuaDist](http://luadist.org/) 这里获取 Lua 的多平台发布版（自带电池）。

### 构建 Lua

在大多数类 Unix 平台上，输入 "make" 加上合适的平台名即可。步骤如下：

1.  打开一个控制台窗口，切换到 lua-5.3.0 目录。 目录下的 Makefile 文件内包含了构建与安装流程。
    
2.  运行 "make" 并查看你的平台是否列在其中。 当前支持的平台有：
    
    aix bsd c89 freebsd generic linux macosx mingw posix solaris
    
    如果你的平台在其中，运行 "make xxx" 即可，xxx 代表你的平台名。
    
    如果你的平台不在其中，先尝试最相近的平台，再按 posix generic c89 顺序依次尝试。
    
3.  编译过程很短，最终在 src 目录下生成三个文件： lua (解释器), luac (编译器)和 liblua.a (静态库) 。
    
4.  构建完成后，可以运行 "make test" 来检查是否成功。 它会运行解释器并打印版本号。

如果你是 Linux 系统并出现了编译错误，请确认你是否安装了 readline （也可能叫 libreadline-dev 或者 readline-devel）开发包。 之后，如果还有链接错误，尝试 "make linux MYLIBS=-ltermcap" 。

### 安装 Lua

一旦你构建完毕，可能希望把 Lua 安装到系统默认位置， 那么执行 "make install" 即可。 系统默认位置以及如何安装都定义在 Makefile 中。 这个过程可能需要有相关的权限。

运行 "make xxx install" 可以构建和安装一步到位，xxx 指你的平台名。

如果你想把 Lua 安装在本地，运行 "make local"。 它会创建一个 install 目录，内有 bin, include, lib, man, share, 子目录，并将下列文件安装在其中。 如果你想安装到本地其它目录， 运行 "make install INSTALL\_TOP=xxx"，xxx 指你选择的目录。 由于安装过程中会切换到 src 以及 doc 目录进行， 所以当 INSTALL\_TOP 不是绝对路径时务必小心。

bin:

lua luac

include:

lauxlib.h lua.h lua.hpp luaconf.h lualib.h

lib:

liblua.a

man/man1:

lua.1 luac.1

这些是开发时需要的目录。 如果你仅仅想运行一些 Lua 程序， 那么只需要 bin 和 man 下的文件。 include 和 lib 下的文件用于将 Lua 嵌入 C 或 C++ 程序。

### 定制

有三类定制，可以通过编辑文件完成：

-   怎样安装 Lua 以及安装到哪里 — 编辑 Makefile。
-   怎样构建 Lua — 编辑 src/Makefile。
-   Lua 特性 — 编辑 src/luaconf.h。

其实你不必编辑 Makefile 文件，make 的时候在命令行指定相关变量即可。 当然，编辑保存 Makefile 可以给定制留个记录。

另一方面，如果你需要定制一些 Lua 特性，那就需要在构建安装 Lua 前 编辑 src/luaconf.h 。 编辑过的文件必须确保一致性，也就是只安装在一个地方， 让所有你编译出来的用到 Lua 的程序都使用这唯一的这一份。 专家可以通过编辑 Lua 源代码来定制更多的东西。

### 在其它系统上构建 Lua

如果你不使用常规的 Unix 工具，那么构建 Lua 的流程就取决于你使用的编译器。 你需要创建若干工程来构建库，解释器以及编译器等。请把下列源文件加入相关工程：

库:

lapi.c lcode.c lctype.c ldebug.c ldo.c ldump.c lfunc.c lgc.c llex.c lmem.c lobject.c lopcodes.c lparser.c lstate.c lstring.c ltable.c ltm.c lundump.c lvm.c lzio.c lauxlib.c lbaselib.c lbitlib.c lcorolib.c ldblib.c liolib.c lmathlib.c loslib.c lstrlib.c ltablib.c lutf8lib.c loadlib.c linit.c

解释器:

library, lua.c

编译器:

library, luac.c

把 Lua 以一个库形式用于你的程序，你需要知道如何用你的编译器创建库和使用库。 比如，以动态加载的 C 库形式使用 Lua，你需要了解如何创建动态库并让 Lua API 函数 在动态库中可见 — _不要_ 将 Lua 库链入每个动态库。 在 Unix 下，我们建议把 Lua 库静态链入宿主程序，然后将符号导出用于动态链接； src/Makefile 就是这样处理 Lua 解释器的。 在 Windows 下，我们建议把 Lua 库编译成一个 DLL 。 无论怎样，编译器 luac 都应该静态链接。

正如上面所述，你可以在构建 Lua 前编辑 src/luaconf.h 以定制一些特性。

## 自 Lua 5.2 以来的变更

这里列出了 Lua 5.3 引入的主要变更。 [参考手册](http://cloudwu.github.io/lua53doc/contents.html) 中列出了 [不兼容的地方](http://cloudwu.github.io/lua53doc/manual.html#8)。

### 主要变化

-   整数 (默认 64 位)
-   32 位整数的官方支持
-   位操作符
-   基本的 utf-8 支持
-   值的打包及解包函数

这些是 Lua 5.3 引入的其它变更：

### 语言

-   用户数据可以是任意 Lua 值
-   整数除法
-   某些元方法有了更加灵活的规则

### 库

-   `ipairs` 以及表处理库都会考虑元方法
-   `string.dump` 多了裁减选项
-   表处理库考虑了元方法
-   新函数 `table.move`
-   新函数 `string.pack`
-   新函数 `string.unpack`
-   新函数 `string.packsize`

### C API

-   简化了延续点 API
-   `lua_gettable` 以及类似函数会返回结果的值类型
-   `lua_dump` 增加了裁减选项
-   新函数： `lua_geti`
-   新函数： `lua_seti`
-   新函数： `lua_isyieldable`
-   新函数： `lua_numbertointeger`
-   新函数： `lua_rotate`
-   新函数： `lua_stringtonumber`

### Lua 独立解释器

-   可以做计算器使用；不再需要前置 '='
-   `arg` 表对所有代码都可用

## License

[![\[osi certified\]](http://cloudwu.github.io/lua53doc/osi-certified-72x60.png)](http://www.opensource.org/docs/definition.php)

Lua is free software distributed under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.html) reproduced below; it may be used for any purpose, including commercial purposes, at absolutely no cost without having to ask us. The only requirement is that if you do use Lua, then you should give us credit by including the appropriate copyright notice somewhere in your product or its documentation. For details, see [this](http://www.lua.org/license.html).

> Copyright © 1994–2015 Lua.org, PUC-Rio.
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

* * *

最后修改时间: 2015年1月13日15:16
