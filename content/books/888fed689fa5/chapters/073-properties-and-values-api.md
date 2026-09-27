## [Properties and values API in action](#properties_and_values_api_in_action)

To see how custom properties and values can be used via API, hover over the box below.

```
CSS.registerProperty({
  name: "--stop-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "cornflowerblue",
});
```

```
.box {
  padding: 1rem;
  width: 90%;
  height: 4rem;
  font-family: sans-serif;
  font-size: large;
  color: white;
  border-radius: 0.5rem;
}

.box {
  background: linear-gradient(to right, var(--stop-color), lavenderblush);
  transition: --stop-color 2s;
}

.box:hover {
  --stop-color: aquamarine;
}
```

```
<div class="box"><p>Linear gradient with transition</p></div>
```

The box has a [background](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background) consisting of a [linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient) from `--stop-color` (the custom property) to [`lavenderblush`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color). The value of `--stop-color` is set to `cornflowerblue` at first, but when you hover over the box, `--stop-color` [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition) to `aquamarine` over two seconds (`linear-gradient(to right, aquamarine, lavenderblush)`).

## [Reference](#reference)

### [At-rules and descriptors](#at-rules_and_descriptors)

-   [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property)
    -   [syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property#descriptors) descriptor
        -   [`+` and `#`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property#descriptors) multipliers
        -   [`|`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property#descriptors) combinator
    -   [inherits](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property#descriptors) descriptor
    -   [initial-value](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property#descriptors) descriptor

### [Interfaces and APIs](#interfaces_and_apis)

-   [`CSSPropertyRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSPropertyRule)
-   [`CSS.registerProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static "CSS.registerProperty()")

## [Guides](#guides)

[Registering CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Registering_properties)

Covers how to register CSS custom properties with the `@property` at-rule and explains the benefits of doing so.

[Using the CSS properties and values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API/guide)

Explains how to register custom properties in CSS and JavaScript, with hints on handling undefined and invalid values, fallbacks, and inheritance.

[CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Houdini)

Reference guide to Houdini resources including the CSS modules, API guides, and external resources.

[Houdini APIs](https://developer.mozilla.org/en-US/docs/Web/API/Houdini_APIs)

Explains what CSS Houdini is and its advantages, along with a list of available APIs and their statuses.

-   [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var)
-   [CSSRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule)
-   [CSSStyleValue](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleValue)
-   [CSS scoping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scoping)
-   [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
-   [CSS Typed Object Model API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API)
-   [CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API)
-   [Worklet](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api-1/) |

## [See also](#see_also)

-   [CSS cascading and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade)
-   [CSS scoping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scoping) module
-   [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
-   [CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API) module
-   [Worklet](https://developer.mozilla.org/en-US/docs/Web/API/Worklet) interface
-   [CSS `env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env)
-   [CSS Typed Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Feb 2, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/contributors.txt).
