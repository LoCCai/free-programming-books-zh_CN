每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，或者是一个返回 stream、promise、event emitter、child process 或 observable ([后面会详细讲解](https://www.gulpjs.com.cn/docs/getting-started/async-completion)) 类型值的函数。由于某些平台的限制而不支持异步任务，因此 gulp 还提供了一个漂亮 [替代品](https://www.gulpjs.com.cn/docs/getting-started/async-completion#using-async-await)。

## 导出任务[​](#导出任务 "Direct link to 导出任务")

任务（tasks）可以是 **public（公开）** 或 **private（私有）** 类型的。

-   **公开任务（Public tasks）** 从 gulpfile 中被导出（export），可以通过 `gulp` 命令直接调用。
-   **私有任务（Private tasks）** 被设计为在内部使用，通常作为 `series()` 或 `parallel()` 组合的组成部分。

一个私有（private）类型的任务（task）在外观和行为上和其他任务（task）是一样的，但是不能够被用户直接调用。如需将一个任务（task）注册为公开（public）类型的，只需从 gulpfile 中导出（export）即可。

```
const { series } = require('gulp');// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。// 它仍然可以被用在 `series()` 组合中。function clean(cb) {  // body omitted  cb();}// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。// 它也仍然可以被用在 `series()` 组合中。function build(cb) {  // body omitted  cb();}exports.build = build;exports.default = series(clean, build);
```

![ALT TEXT MISSING](https://gulpjs.com/img/docs-gulp-tasks-command.png)

在以前的 gulp 版本中，`task()` 方法用来将函数注册为任务（task）。虽然这个 API 依旧是可以使用的，但是 导出（export）将会是主要的注册机制，除非遇到 export 不起作用的情况。

## 组合任务[​](#组合任务 "Direct link to 组合任务")

Gulp 提供了两个强大的组合方法： `series()` 和 `parallel()`，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。`series()` 和 `parallel()` 可以互相嵌套至任意深度。

如果需要让任务（task）按顺序执行，请使用 `series()` 方法。

```
const { series } = require('gulp');function transpile(cb) {  // body omitted  cb();}function bundle(cb) {  // body omitted  cb();}exports.build = series(transpile, bundle);
```

对于希望以最大并发来运行的任务（tasks），可以使用 `parallel()` 方法将它们组合起来。

```
const { parallel } = require('gulp');function javascript(cb) {  // body omitted  cb();}function css(cb) {  // body omitted  cb();}exports.build = parallel(javascript, css);
```

当 `series()` 或 `parallel()` 被调用时，任务（tasks）被立即组合在一起。这就允许在组合中进行改变，而不需要在单个任务（task）中进行条件判断。

```
const { series } = require('gulp');function minify(cb) {  // body omitted  cb();}function transpile(cb) {  // body omitted  cb();}function livereload(cb) {  // body omitted  cb();}if (process.env.NODE_ENV === 'production') {  exports.build = series(transpile, minify);} else {  exports.build = series(transpile, livereload);}
```

`series()` 和 `parallel()` 可以被嵌套到任意深度。

```
const { series, parallel } = require('gulp');function clean(cb) {  // body omitted  cb();}function cssTranspile(cb) {  // body omitted  cb();}function cssMinify(cb) {  // body omitted  cb();}function jsTranspile(cb) {  // body omitted  cb();}function jsBundle(cb) {  // body omitted  cb();}function jsMinify(cb) {  // body omitted  cb();}function publish(cb) {  // body omitted  cb();}exports.build = series(  clean,  parallel(    cssTranspile,    series(jsTranspile, jsBundle)  ),  parallel(cssMinify, jsMinify),  publish);
```

当一个组合操作执行时，这个组合中的每一个任务每次被调用时都会被执行。例如，在两个不同的任务（task）之间调用的 `clean` 任务（task）将被执行两次，并且将导致不可预期的结果。因此，最好重构组合中的 `clean` 任务（task）。

如果你有如下代码：

```
// This is INCORRECTconst { series, parallel } = require('gulp');const clean = function(cb) {  // body omitted  cb();};const css = series(clean, function(cb) {  // body omitted  cb();});const javascript = series(clean, function(cb) {  // body omitted  cb();});exports.build = parallel(css, javascript);
```

重构为：

```
const { series, parallel } = require('gulp');function clean(cb) {  // body omitted  cb();}function css(cb) {  // body omitted  cb();}function javascript(cb) {  // body omitted  cb();}exports.build = series(clean, parallel(css, javascript));
```
