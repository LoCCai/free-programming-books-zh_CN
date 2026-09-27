## [Syntax](#syntax)

js

```
import.defer(moduleName)
import.defer(moduleName, options)
```

`import.defer()` is special syntax (a "meta property"), not a method on an `import` object.

### [Parameters](#parameters)

See [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#parameters).

### [Return value](#return_value)

Returns a promise that fulfills with a [deferred module namespace object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/defer#deferred_module_namespace_object) after the module graph is loaded and linked, and any eagerly evaluated [top-level `await` dependencies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/defer#top-level_await) have finished evaluating.

Like regular [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#return_value), the promise rejects if the module or its dependencies cannot be loaded, parsed, or linked. It also rejects if an eagerly evaluated module throws. Errors from evaluation that remains deferred are instead thrown synchronously by the namespace operation that triggers evaluation.

## [Examples](#examples)

### [Using import.defer()](#using_import.defer)

**Note:** It's guaranteed that awaiting the resulting promise never accidentally calls an exported `then` method—a gotcha associated with the [regular module namespace object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object)—because the deferred module namespace object never exposes a property called `then`.

js

```
const ts = await import.defer("typescript");

function compilePath(path) {
  // Evaluation of the typescript module subgraph starts here
  const program = ts.createProgram([path], {});
}
```

Never immediately destructure the returned namespace, because it triggers evaluation:

js

```
const { createProgram } = await import.defer("typescript");
// The typescript module has now been evaluated.
```

## [Specifications](#specifications)

| Specification |
| --- |
| [Deferred Imports Evaluation  
\# sec-left-hand-side-expressions](https://tc39.es/proposal-defer-import-eval/#sec-left-hand-side-expressions) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) guide
-   [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
-   [`import defer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/defer)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Sep 18, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import/defer/contributors.txt).
