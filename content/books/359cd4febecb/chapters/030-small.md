## @small

`@small` 标注是 `@group small` 的别名。小型(small)测试不能依赖于标记为 `@medium` 或 `@large` 的测试。

如果安装了 `PHP_Invoker` 组件包并启用了严格模式，一个执行时间超过1秒的小型(small)测试将会视为失败。这个超时限制可以通过 XML 配置文件的 `timeoutForSmallTests` 属性进行配置。

### Note

默认情况下，所有未标记为 `@medium` 或 `@large` 的测试都视为小型(small)测试。请注意，虽然如此，`--group` 和有关的选项都只会将用恰当的标注显式标记好的测试视为在 `small` 组中。
