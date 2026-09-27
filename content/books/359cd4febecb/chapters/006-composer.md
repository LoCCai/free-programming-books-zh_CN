## Composer

如果用 [Composer](https://link.w3cschool.cn/?target=https%3A%2F%2Fgetcomposer.org%2F) 来管理项目的依赖关系，只要在项目的 `composer.json` 文件中简单地加上对 `phpunit/phpunit` 的依赖关系即可。下面是一个最小化的 `composer.json` 文件的例子，只定义了一个对 PHPUnit 5.0 的开发时(development-time)依赖：

```
{
    "require-dev": {
        "phpunit/phpunit": "5.0.*"
    }
}
```

要通过 Composer 完成系统级的安装，可以运行：

```
composer global require "phpunit/phpunit=5.0.*"
```

请确保 path 变量中包含有 `~/.composer/vendor/bin/`。
