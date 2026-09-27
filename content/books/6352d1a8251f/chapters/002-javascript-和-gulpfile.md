Gulp 允许你使用现有 JavaScript 知识来书写 gulpfile 文件，或者利用你所掌握的 gulpfile 经验来书写普通的 JavaScript 代码。虽然gulp 提供了一些实用工具来简化文件系统和命令行的操作，但是你所编写的其他代码都是纯 JavaScript 代码。

## Gulpfile 详解[​](#gulpfile-详解 "Direct link to Gulpfile 详解")

gulpfile 是项目目录下名为 `gulpfile.js` （或者首字母大写 `Gulpfile.js`，就像 Makefile 一样命名）的文件，在运行 `gulp` 命令时会被自动加载。在这个文件中，你经常会看到类似 `src()`、`dest()`、`series()` 或 `parallel()` 函数之类的 gulp API，除此之外，纯 JavaScript 代码或 Node 模块也会被使用。任何导出（export）的函数都将注册到 gulp 的任务（task）系统中。

## Gulpfile 转译[​](#gulpfile-转译 "Direct link to Gulpfile 转译")

你可以使用需要转译的编程语言来书写 gulpfile 文件，例如 TypeScript 或 Babel，通过修改 `gulpfile.js` 文件的扩展名来表明所用的编程语言并安装对应的转译模块。

-   对于 TypeScript，重命名为 `gulpfile.ts` 并安装 [ts-node](https://www.npmjs.com/package/ts-node) 模块。
-   对于 Babel，重命名为 `gulpfile.babel.js` 并安装 [@babel/register](https://www.npmjs.com/package/@babel/register) 模块。

**Node 的大多数新版本都支持 TypeScript 或 Babel 所提供的大多数功能，但 `import`/`export` 语法除外。如果只需要改语法的话，请重命名为 `gulpfile.esm.js` 并安装 [esm](https://www.npmjs.com/package/esm) 模块。**

有关此功能的高级知识和已支持的扩展名的完整列表，请参考 [gulpfile 转译](https://www.gulpjs.com.cn/docs/documentation-missing) 文档。

## Gulpfile 分割[​](#gulpfile-分割 "Direct link to Gulpfile 分割")

大部分用户起初是将所有业务逻辑都写到一个 gulpfile 文件中。随着文件的变大，可以将此文件重构为数个独立的文件。

每个任务（task）可以被分割为独立的文件，然后导入（import）到 gulpfile 文件中并组合。这不仅使事情变得井然有序，而且可以对每个任务（task）进行单独测试，或者根据条件改变组合。

Node 的模块的解析功能允许你将 `gulpfile.js`' 文件替换为同样命名为 `gulpfile.js` 的目录，该目录中包含了一个名为 `index.js` 的文件，该 `index.js` 文件将被当作 `gulpfile.js` 使用。并且，该目录中还可以包含各个独立的任务（task）模块。如果你使用了转译器（transpiler），请给文件夹和目录相应地命名。
