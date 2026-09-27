## [Constructor](#constructor)

[`AsyncDisposableStack()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/AsyncDisposableStack)

Creates a new `AsyncDisposableStack` object.

## [Instance properties](#instance_properties)

These properties are defined on `AsyncDisposableStack.prototype` and shared by all `AsyncDisposableStack` instances.

[`AsyncDisposableStack.prototype.constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

The constructor function that created the instance object. For `AsyncDisposableStack` instances, the initial value is the [`AsyncDisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/AsyncDisposableStack) constructor.

[`AsyncDisposableStack.prototype.disposed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/disposed)

Read-only. Returns `true` if the `AsyncDisposableStack` has been disposed, or `false` if not.

[`AsyncDisposableStack.prototype[Symbol.toStringTag]`](#asyncdisposablestack.prototypesymbol.tostringtag)

The initial value of the [`[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property is the string `"AsyncDisposableStack"`. This property is used in [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString).

## [Instance methods](#instance_methods)

[`AsyncDisposableStack.prototype.adopt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/adopt)

Registers a value that doesn't implement the async disposable protocol to the stack by providing a custom disposer function.

[`AsyncDisposableStack.prototype.disposeAsync()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/disposeAsync)

Disposes this stack by calling all disposers registered to it in reverse order of registration.

[`AsyncDisposableStack.prototype.defer()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/defer)

Takes a callback function to be called when the stack is disposed.

[`AsyncDisposableStack.prototype.move()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/move)

Creates a new `AsyncDisposableStack` instance that contains the same disposers as this stack, and then marks this stack as disposed, without calling any disposers.

[`AsyncDisposableStack.prototype.use()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/use)

Registers a value that implements the async disposable protocol to the stack.

[`AsyncDisposableStack.prototype[Symbol.asyncDispose]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/Symbol.asyncDispose)

An alias for the `disposeAsync()` method.

## [Specifications](#specifications)

| Specification |
| --- |
| [ECMAScript Async Explicit Resource Management  
\# sec-asyncdisposablestack-objects](https://tc39.es/proposal-async-explicit-resource-management/#sec-asyncdisposablestack-objects) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [Polyfill of `AsyncDisposableStack` in `core-js`](https://github.com/zloirock/core-js#explicit-resource-management "External link (opens in new tab)")
-   [JavaScript resource management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management)
-   [`Symbol.asyncDispose`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncDispose)
-   [`await using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using)
-   [`DisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Jul 29, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/contributors.txt).
