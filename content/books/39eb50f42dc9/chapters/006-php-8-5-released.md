发布于 2025 年 11 月 20 日

## 更智能、更快速，为未来而生。

**PHP 8.5 是 PHP 语言的一次重大更新**，新增了 **URI 扩展**、**管道操作符**，以及对**克隆时修改属性**的支持。

**更快**、**更简洁**、**为开发者而生**。

[URI 扩展](https://www.php.net/releases/8.5/zh.php#new-uri-extension)

PHP 8.5 增加了内置的 URI 扩展，用于按照 _RFC 3986_ 和 _WHATWG URL_ 标准解析、规范化和处理 URL。

[管道操作符](https://www.php.net/releases/8.5/zh.php#pipe-operator)

`|>` 操作符允许从左到右连接可调用项，让数值在多个函数间顺畅传递，无需中间变量。

[Clone With](https://www.php.net/releases/8.5/zh.php#clone-with)

使用新的 `clone()` 语法可以克隆对象并更新属性，让 `readonly` 类的 "with-er" 模式变得简单。

[`#[\NoDiscard]` 属性](https://www.php.net/releases/8.5/zh.php#no-discard-attribute)

`#[\NoDiscard]` 属性会在返回值未被使用时发出警告，有助于避免错误，提高 API 安全性。

[常量表达式中的闭包和 First-class 可调用](https://www.php.net/releases/8.5/zh.php#closures-in-const-expr)

静态闭包和 First-class 可调用现在可以用于常量表达式，例如属性参数。

[持久化 cURL Share 句柄](https://www.php.net/releases/8.5/zh.php#persistent-curl-share-handles)

句柄现在可以在多个 PHP 请求之间保持，不再需要重复初始化到同一主机的连接。

```
$components = parse_url('https://php.net/releases/8.4/en.php');

var_dump($components['host']);
// string(7) "php.net"
```

```
use Uri\Rfc3986\Uri;

$uri = new Uri('https://php.net/releases/8.5/en.php');

var_dump($uri->getHost());
// string(7) "php.net"
```

```
$title = ' PHP 8.5 Released ';

$slug = strtolower(
    str_replace('.', '',
        str_replace(' ', '-',
            trim($title)
        )
    )
);

var_dump($slug);
// string(15) "php-85-released"
```

```
$title = ' PHP 8.5 Released ';

$slug = $title
    |> trim(...)
    |> (fn($str) => str_replace(' ', '-', $str))
    |> (fn($str) => str_replace('.', '', $str))
    |> strtolower(...);

var_dump($slug);
// string(15) "php-85-released"
```

## Clone With

现在可以在对象克隆时通过向 `clone()` 传递关联数组来更新属性。这让 `readonly` 类的 with-er 模式变得简单明了。

```
readonly class Color
{
    public function __construct(
        public int $red,
        public int $green,
        public int $blue,
        public int $alpha = 255,
    ) {}

    public function withAlpha(int $alpha): self
    {
        $values = get_object_vars($this);
        $values['alpha'] = $alpha;

        return new self(...$values);
    }
}

$blue = new Color(79, 91, 147);
$transparentBlue = $blue->withAlpha(128);
```

```
readonly class Color
{
    public function __construct(
        public int $red,
        public int $green,
        public int $blue,
        public int $alpha = 255,
    ) {}

    public function withAlpha(int $alpha): self
    {
        return clone($this, [
            'alpha' => $alpha,
        ]);
    }
}

$blue = new Color(79, 91, 147);
$transparentBlue = $blue->withAlpha(128);
```

## `#[\NoDiscard]` 属性

为函数添加 `#[\NoDiscard]` 属性后，PHP 会检查返回值是否被使用，若未使用则发出警告。这样可以提高 API 的安全性，避免关键返回值被忽略。

可以使用 `(void)` 来显式表示“我就是不使用这个结果”。

```
function getPhpVersion(): string
{
    return 'PHP 8.4';
}

getPhpVersion(); // No warning
```

```
#[\NoDiscard]
function getPhpVersion(): string
{
    return 'PHP 8.5';
}

getPhpVersion();
// Warning: The return value of function getPhpVersion() should
// either be used or intentionally ignored by casting it as (void)
```

## 常量表达式中的闭包和 First-class 可调用

静态闭包和 First-class 可调用现在可以用于常量表达式，包括属性参数、属性和参数默认值以及常量等。

```
final class PostsController
{
    #[AccessControl(
        new Expression('request.user === post.getAuthor()'),
    )]
    public function update(
        Request $request,
        Post $post,
    ): Response {
        // ...
    }
}
```

```
final class PostsController
{
    #[AccessControl(static function (
        Request $request,
        Post $post,
    ): bool {
        return $request->user === $post->getAuthor();
    })]
    public function update(
        Request $request,
        Post $post,
    ): Response {
        // ...
    }
}
```

与 `curl_share_init()` 不同，由 `curl_share_init_persistent()` 创建的句柄在请求结束时不会销毁。如果发现具有相同共享选项的持久化句柄，将会复用，从而避免每次初始化 cURL 句柄的开销。

```
$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_CONNECT);

$ch = curl_init('https://php.net/');
curl_setopt($ch, CURLOPT_SHARE, $sh);

curl_exec($ch);
```

```
$sh = curl_share_init_persistent([
    CURL_LOCK_DATA_DNS,
    CURL_LOCK_DATA_CONNECT,
]);

$ch = curl_init('https://php.net/');
curl_setopt($ch, CURLOPT_SHARE, $sh);

// This may now reuse the connection from an earlier SAPI request
curl_exec($ch);
```

## `array_first()` 与 `array_last()` 函数

`array_first()` 与 `array_last()` 分别返回数组的第一个或最后一个值。若数组为空，则返回 `null`（方便与 `??` 操作符组合）。

```
$lastEvent = $events === []
    ? null
    : $events[array_key_last($events)];
```

```
$lastEvent = array_last($events);
```

## 更多特性与改进

-   致命错误（如超出最大执行时间）现在会包含回溯信息。
-   属性现在可以作用于常量。
-   [`#[\Override]`](https://www.php.net/manual/zh/class.override.php) 属性现在可以用于类属性。
-   [`#[\Deprecated]`](https://www.php.net/manual/zh/class.deprecated.php) 属性现在可以用于 traits 和常量。
-   静态属性现在支持不对称可见性。
-   属性在构造器属性提升中可以被标记为 `final`。
-   新增 `Closure::getCurrent()` 方法，简化匿名函数的递归。
-   函数 [`setcookie()`](https://www.php.net/manual/zh/function.setcookie.php) 和 [`setrawcookie()`](https://www.php.net/manual/zh/function.setrawcookie.php) 现在支持 "partitioned" 键。
-   新增 [`get_error_handler()`](https://www.php.net/manual/zh/function.get-error-handler.php) 与 [`get_exception_handler()`](https://www.php.net/manual/zh/function.get-exception-handler.php) 函数。
-   新增 `Dom\Element::getElementsByClassName()` 与 `Dom\Element::insertAdjacentHTML()` 方法。
-   新增 `grapheme_levenshtein()` 函数。
-   新增 `#[\DelayedTargetValidation]` 属性，可用于抑制在无效目标上使用核心/扩展属性时的编译期错误。

## 弃用和向后不兼容

-   作为 [`shell_exec()`](https://www.php.net/manual/zh/function.shell-exec.php) 别名的反引号操作符已被弃用。
-   非标准强制转换名称 `(boolean)`、`(integer)`、`(double)` 和 `(binary)` 已弃用，请改用 `(bool)`、`(int)`、`(float)` 和 `(string)`。
-   `disable_classes` INI 选项已被移除，因为它会破坏引擎的一些基本假设。
-   以分号而非冒号结束 `case` 语句已被弃用。
-   使用 `null` 作为数组偏移量或调用 [`array_key_exists()`](https://www.php.net/manual/zh/function.array-key-exists.php) 时已被弃用，请改用空字符串。
-   在 [`class_alias()`](https://www.php.net/manual/zh/function.class-alias.php) 中不再允许将 "array" 和 "callable" 用作类别名。
-   [`__sleep()`](https://www.php.net/manual/zh/language.oop5.magic.php#object.sleep) 与 [`__wakeup()`](https://www.php.net/manual/zh/language.oop5.magic.php#object.wakeup) 魔术方法已被软弃用，请改用 [`__serialize()`](https://www.php.net/manual/zh/language.oop5.magic.php#object.serialize) 与 [`__unserialize()`](https://www.php.net/manual/zh/language.oop5.magic.php#object.unserialize)。
-   将 `NAN` 转换为其他类型时现在会发出警告。
-   对非数组值（除 `null`）使用 `[]` 或 `list()` 进行解构现在会触发警告。
-   当浮点数（或看起来像浮点数的字符串）无法表示为 `int` 时，强制转换为 `int` 会发出警告。
