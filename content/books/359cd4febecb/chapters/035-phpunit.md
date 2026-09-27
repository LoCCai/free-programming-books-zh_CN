## PHPUnit

`<phpunit>` 元素的属性用于配置 PHPUnit 的核心功能。

```
<phpunit
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://schema.phpunit.de/4.5/phpunit.xsd"
         backupGlobals="true"
         backupStaticAttributes="false"
         <!--bootstrap="/path/to/bootstrap.php"-->
         cacheTokens="false"
         colors="false"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         forceCoversAnnotation="false"
         mapTestClassNameToCoveredClassName="false"
         printerClass="PHPUnit_TextUI_ResultPrinter"
         <!--printerFile="/path/to/ResultPrinter.php"-->
         processIsolation="false"
         stopOnError="false"
         stopOnFailure="false"
         stopOnIncomplete="false"
         stopOnSkipped="false"
         stopOnRisky="false"
         testSuiteLoaderClass="PHPUnit_Runner_StandardTestSuiteLoader"
         <!--testSuiteLoaderFile="/path/to/StandardTestSuiteLoader.php"-->
         timeoutForSmallTests="1"
         timeoutForMediumTests="10"
         timeoutForLargeTests="60"
         verbose="false">
  <!-- ... -->
</phpunit>
```

以上 XML 配置对应于在[the section called “命令行选项”](#)描述过的 TextUI 测试执行器的默认行为。

其他那些不能用命令行选项来配置的选项有：

`convertErrorsToExceptions`  
默认情况下，PHPUnit 将会安插一个错误处理函数来将以下错误转换为异常：

-   `E_WARNING`
-   `E_NOTICE`
-   `E_USER_ERROR`
-   `E_USER_WARNING`
-   `E_USER_NOTICE`
-   `E_STRICT`
-   `E_RECOVERABLE_ERROR`
-   `E_DEPRECATED`
-   `E_USER_DEPRECATED`

将 `convertErrorsToExceptions` 设为 `false` 可以禁用此功能。

`convertNoticesToExceptions`  
此选项设置为 `false` 时，由 `convertErrorsToExceptions` 安插的错误处理函数不会将 `E_NOTICE`、`E_USER_NOTICE`、`E_STRICT` 错误转换为异常。

`convertWarningsToExceptions`  
此选项设置为 `false` 时，由 `convertErrorsToExceptions` 安插的错误处理函数不会将 `E_WARNING` 或 `E_USER_WARNING` 错误转换为异常。

`forceCoversAnnotation`  
只记录使用了 `@covers` 标注（文档参见[the section called “@covers”](#)）的测试的代码覆盖率。

`timeoutForLargeTests`  
如果实行了基于测试规模的时间限制，那么此属性为所有标记为 `@large` 的测试设定超时限制。在配置的时间限制内未执行完毕的测试将视为失败。

`timeoutForMediumTests`  
如果实行了基于测试规模的时间限制，那么此属性为所有标记为 `@medium` 的测试设定超时限制。在配置的时间限制内未执行完毕的测试将视为失败。

`timeoutForSmallTests`  
如果实行了基于测试规模的时间限制，那么此属性为所有未标记为 `@medium` 或 `@large` 的测试设定超时限制。在配置的时间限制内未执行完毕的测试将视为失败。
