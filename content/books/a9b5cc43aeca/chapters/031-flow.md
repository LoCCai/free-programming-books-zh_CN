## 安装

```
# babel
yarn add --dev babel-cli babel-preset-flow
# flow
yarn add --dev flow-bin
# 初始化
flow init
```

检查执行的命令为:

```
yarn run flow
```

## 配置

### 配置 Eslint

```
// .eslintrc.js
module.exports = {
  // extends: 'dwing',
  parser: 'babel-eslint',
  plugins: ['flowtype']
};
```

### 配置 Visual Studio Code

关闭默认的 js 校验:

```
// .vscode/settings.json
// 将设置放入此文件中以覆盖默认值和用户设置。
{
  "javascript.validate.enable": false
}
```

安装 flow 插件:

[Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)

### 配置项目 package.json

```
"scripts": {
  "build": "babel src/ -d dist/",
  "prepublish": "yarn run build"
}
```

## 常用语法

### 单一类型

```
function square(n: number) {
  return n * n;
}
```

### 多类型可能

```
function stringifyBasicValue(value: string | number) {
  return '' + value;
}
```

### 任意类型

```
// 避免使用 any
function getTypeOf(value: mixed): string {
  return typeof value;
}
```

### 可选参数

```
function method(optionalValue?: string) {
  // ...
}
```

### 解构赋值

```
function foo({ x }: { x?: number } = {}): string {
  if (x) {
    return String(x);
  }
  return 'default string';
}
```

示例项目位于: [https://github.com/willin/start-babel-flow](https://github.com/willin/start-babel-flow)

可以参考该项目进行项目框架的初始化搭建.

[Babel](https://leader.js.cool/basic/node/babel) [Test](https://leader.js.cool/basic/node/test)
