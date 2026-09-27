## [Description](#description)

A `DisposableStack` is not exactly a "stack" in terms of its interface. It has several methods for pushing disposers to it, but it has no way to pop one disposer off. Rather, _all_ disposers are popped and executed one-by-one when the stack is disposed.

You register [disposable resources](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management) to the `DisposableStack` using its [`use()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/use), [`adopt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/adopt), or [`defer()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/defer) methods.

js

```
using disposer = new DisposableStack();
const reader = disposer.use(stream.getReader());
```

Then, when the `disposer` goes out of scope, all resources registered to it are disposed in reverse order of registration, unless they have been moved out with `move()`.

It is good practice to _not_ extract the resource acquisition expression to a separate statement, no matter how long the expression is. You should always wrap the `use()` or `adopt()` call around the resource acquisition expression to ensure that the resource is registered to the stack immediately.

js

```
using disposer = new DisposableStack();
const reader = stream.getReader();
disposer.use(reader);
```

Functionally, these two code snippets are equivalent. However, the first one is less error-prone because the resource is declared and registered in a single line. If someone puts more code between the second and third lines of the second snippet, an error could occur, causing the resource to leak.

## [Constructor](#constructor)

[`DisposableStack()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/DisposableStack)

Creates a new `DisposableStack` object.

## [Instance properties](#instance_properties)

These properties are defined on `DisposableStack.prototype` and shared by all `DisposableStack` instances.

[`DisposableStack.prototype.constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

The constructor function that created the instance object. For `DisposableStack` instances, the initial value is the [`DisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/DisposableStack) constructor.

[`DisposableStack.prototype.disposed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/disposed)

Read-only. Returns `true` if the `DisposableStack` has been disposed, or `false` if not.

[`DisposableStack.prototype[Symbol.toStringTag]`](#disposablestack.prototypesymbol.tostringtag)

The initial value of the [`[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property is the string `"DisposableStack"`. This property is used in [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).

## [Instance methods](#instance_methods)

[`DisposableStack.prototype.adopt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/adopt)

Registers a value that doesn't implement the disposable protocol to the stack by providing a custom disposer function.

[`DisposableStack.prototype.defer()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/defer)

Takes a callback function to be called when the stack is disposed.

[`DisposableStack.prototype.dispose()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/dispose)

Disposes this stack by calling all disposers registered to it in reverse order of registration.

[`DisposableStack.prototype.move()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/move)

Creates a new `DisposableStack` instance that contains the same disposers as this stack, and then marks this stack as disposed, without calling any disposers.

[`DisposableStack.prototype.use()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/use)

Registers a value that implements the disposable protocol to the stack.

[`DisposableStack.prototype[Symbol.dispose]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/Symbol.dispose)

An alias for the `dispose()` method.

## [Specifications](#specifications)

| Specification |
| --- |
| [ECMAScript Async Explicit Resource Management  
\# sec-disposablestack-objects](https://tc39.es/proposal-async-explicit-resource-management/#sec-disposablestack-objects) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [Polyfill of `DisposableStack` in `core-js`](https://github.com/zloirock/core-js#explicit-resource-management "External link (opens in new tab)")
-   [JavaScript resource management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management)
-   [`Symbol.dispose`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/dispose)
-   [`using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using)
-   [`AsyncDisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Jul 29, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/contributors.txt).
