## [Constructor](#constructor)

[`SuppressedError()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/SuppressedError)

Creates a new `SuppressedError` object.

## [Instance properties](#instance_properties)

_Also inherits instance properties from its parent [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)_.

These properties are defined on `SuppressedError.prototype` and shared by all `SuppressedError` instances.

[`SuppressedError.prototype.constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

The constructor function that created the instance object. For `SuppressedError` instances, the initial value is the [`SuppressedError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/SuppressedError) constructor.

[`SuppressedError.prototype.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)

Represents the name for the type of error. For `SuppressedError.prototype.name`, the initial value is `"SuppressedError"`.

**Note:** `SuppressedError` never has the [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) property, because the semantics of `cause` overlaps with `suppressed`.

These properties are own properties of each `SuppressedError` instance.

[`error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/error)

A reference to the error that results in the suppression.

[`suppressed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/suppressed)

A reference to the error that is suppressed by `error`.

## [Instance methods](#instance_methods)

_Inherits instance methods from its parent [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)_.

## [Examples](#examples)

### [Catching a SuppressedError](#catching_a_suppressederror)

A `SuppressedError` is thrown when an error occurs during [resource disposal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management). Throwing an error causes scope cleanup, and each disposer during the cleanup can throw its own error. All these errors are collected into a chain of `SuppressedError` instances, with the original error as the `suppressed` property and the new error thrown by the next disposer as the `error` property.

js

```
try {
  using resource1 = {
    [Symbol.dispose]() {
      throw new Error("resource1 disposal failed");
    },
  };
  using resource2 = {
    [Symbol.dispose]() {
      throw new Error("resource2 disposal failed");
    },
  };
  throw new TypeError("Original error");
} catch (e) {
  console.log(e instanceof SuppressedError); // true
  console.log(e.message); // "An error was suppressed during disposal"
  console.log(e.name); // "SuppressedError"
  console.log(e.error); // Error: resource1 disposal failed
  console.log(e.suppressed); // SuppressedError: An error was suppressed during disposal
  console.log(e.suppressed.error); // Error: resource2 disposal failed
  console.log(e.suppressed.suppressed); // TypeError: Original error
}
```

The chain looks like this:

     SuppressedError --suppressed--> SuppressedError --suppressed--> TypeError
            |                               |
          error                           error
            |                               |
            v                               v
resource1 disposal failed       resource2 disposal failed
 (Disposal happens later)       (Disposal happens earlier)

### [Creating a SuppressedError](#creating_a_suppressederror)

js

```
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e instanceof SuppressedError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "SuppressedError"
  console.log(e.error); // Error: "New error"
  console.log(e.suppressed); // Error: "Original error"
}
```

## [Specifications](#specifications)

| Specification |
| --- |
| [ECMAScript Async Explicit Resource Management  
\# sec-suppressederror-objects](https://tc39.es/proposal-async-explicit-resource-management/#sec-suppressederror-objects) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [Polyfill of `SuppressedError` in `core-js`](https://github.com/zloirock/core-js#explicit-resource-management "External link (opens in new tab)")
-   [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
-   [`using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using)
-   [`await using`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using)
-   [`DisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack)
-   [`AsyncDisposableStack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Sep 17, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SuppressedError/contributors.txt).
