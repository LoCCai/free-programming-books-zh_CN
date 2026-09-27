## [Syntax](#syntax)

js

```
import.source(moduleName)
import.source(moduleName, options)
```

`import.source()` is special syntax (a "meta property"), not a method on an `import` object.

### [Parameters](#parameters)

See [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#parameters).

### [Return value](#return_value)

Returns a promise that fulfills with an [`AbstractModuleSource`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AbstractModuleSource) object representing the module's compiled source after the module is loaded and compiled successfully.

Like regular [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#return_value), the promise rejects if the module cannot be loaded or parsed. It also rejects with a [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the module type does not support source phase imports. The import does not load dependencies, link, or evaluate the module, so errors from those later steps are not reported.

## [Examples](#examples)

### [Using import.source()](#using_import.source)

js

```
const myModuleSource = await import.source("./my-module.wasm");

const instance = await WebAssembly.instantiate(myModuleSource, {
  env: { log: console.log },
});
const { exports } = instance;
```

## [Specifications](#specifications)

| Specification |
| --- |
| [Source Phase Imports  
\# sec-left-hand-side-expressions](https://tc39.es/proposal-source-phase-imports/#sec-left-hand-side-expressions) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) guide
-   [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
-   [`import source`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/source)
-   [`AbstractModuleSource`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AbstractModuleSource)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Sep 18, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import/source/contributors.txt).
