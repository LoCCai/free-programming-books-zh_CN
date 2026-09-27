glob 是由普通字符和/或通配字符组成的字符串，用于匹配文件路径。可以利用一个或多个 glob 在文件系统中定位文件。

`src()` 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。glob 或 glob 数组必须至少匹配到一个匹配项，否则 `src()` 将报错。When an array of globs is used, any negative globs will remove matches from any positive glob.

## 字符串片段与分隔符[​](#字符串片段与分隔符 "Direct link to 字符串片段与分隔符")

字符串片段（segment）是指两个分隔符之间的所有字符组成的字符串。在 glob 中，分隔符永远是 `/` 字符 - 不区分操作系统 - 即便是在采用 `\\` 作为分隔符的 Windows 操作系统中。在 glob 中，`\\` 字符被保留作为转义符使用。

如下， \* 被转义了，因此，\* 将被作为一个普通字符使用，而不再是通配符了。

```
'glob_with_uncommon_\\*_character.js'
```

避免使用 Node 的 `path` 类方法来创建 glob，例如 `path.join`。在 Windows 中，由于 Node 使用 `\\` 作为路径分隔符，因此将会产生一个无效的 glob。还要避免使用 `__dirname` 和 `__filename` 全局变量，由于同样的原因，`process.cwd()` 方法也要避免使用。

```
const invalidGlob = path.join(__dirname, 'src/*.js');
```

## 特殊字符： \* (一个星号)[​](#特殊字符--一个星号 "Direct link to 特殊字符： * (一个星号)")

在一个字符串片段中匹配任意数量的字符，包括零个匹配。对于匹配单级目录下的文件很有用。

下面这个 glob 能够匹配类似 `index.js` 的文件，但是不能匹配类似 `scripts/index.js` 或 `scripts/nested/index.js` 的文件。

```
'*.js'
```

## 特殊字符： \*\* (两个星号)[​](#特殊字符--两个星号 "Direct link to 特殊字符： ** (两个星号)")

在多个字符串片段中匹配任意数量的字符，包括零个匹配。 对于匹配嵌套目录下的文件很有用。请确保适当地限制带有两个星号的 glob 的使用，以避免匹配大量不必要的目录。

下面这个 glob 被适当地限制在 `scripts/` 目录下。它将匹配类似 `scripts/index.js`、`scripts/nested/index.js` 和 `scripts/nested/twice/index.js` 的文件。

```
'scripts/**/*.js'
```

在上面的示例中，如果没有 `scripts/` 这个前缀做限制，`node_modules` 目录下的所有目录或其他目录也都将被匹配。

## 特殊字符： ! (取反)[​](#特殊字符--取反 "Direct link to 特殊字符： ! (取反)")

Globs prefixed with the `!` character will "negate" the glob, excluding the match completely. All negative globs are applied to every positive glob, which is a departure from gulp versions before v5.

Here, the `scripts/` directory will be traversed for all files ending in `.js`, but all files from the `scripts/vendor/` directory will be excluded.

```
['scripts/**/*.js', '!scripts/vendor/**']
```

Negative globs can be used as an alternative for restricting double-star globs.

```
['**/*.js', '!node_modules/**']
```

## Ordered globs[​](#ordered-globs "Direct link to Ordered globs")

Versions of gulp before v5 allowed "ordered globs"; however, that has been removed to align with most globbing libraries in the ecosystem.

If you need the "ordered glob" functionality, you can use the [ordered-read-streams](https://github.com/gulpjs/ordered-read-streams#orderedstreams-options) library to combine streams:

```
const order = require("ordered-read-streams");exports.default = function () {  return order([    gulp.src("input/jquery/dist/jquery.js"),    gulp.src("input/detect_swipe/jquery.detect_swipe.js"),  ]).pipe(gulp.dest('output/'));}
```

## 匹配重叠（Overlapping globs）[​](#匹配重叠overlapping-globs "Direct link to 匹配重叠（Overlapping globs）")

两个或多个 glob 故意或无意匹配了相同的文件就被认为是匹配重叠（overlapping）了。如果在同一个 `src()` 中使用了会产生匹配重叠的 glob，gulp 将尽力去除重叠部分，但是在多个 `src()` 调用时产生的匹配重叠是不会被去重的。

## 进阶资料[​](#进阶资料 "Direct link to 进阶资料")

关于如何在 gulp 中使用 glob 的知识都已经在在上面的文档中讲解了。如果你还希望获取更多进阶资料，请参考下面列出的部分：

-   [Micromatch Documentation](https://github.com/micromatch/micromatch)
-   [node-glob's Glob Primer](https://github.com/isaacs/node-glob#glob-primer)
-   [Begin's Globbing Documentation](https://github.com/begin/globbing#what-is-globbing)
-   [Wikipedia's Glob Page](https://en.wikipedia.org/wiki/Glob_\(programming\))
