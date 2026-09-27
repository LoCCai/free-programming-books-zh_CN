## [Basic example](#basic_example)

A regular [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) consists of a property name and a value. Therefore I might create a custom property called `--background-color` and expect it to be given a color value. The value is then used in the CSS as if it were the color value.

css

```
:root {
  --background-color: blue;
}

.box {
  background-color: var(--background-color);
}
```

In the above example however, there is nothing to stop someone using some other value for this property, perhaps setting it to a length. Having done so, anywhere that the property is used would have no background color as `background-color: 12px` is not valid. When browsers come across CSS they don't recognize as valid they throw that line away.

Using [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property) however, we can declare the custom property with a [`syntax`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property/syntax) of `<color>`. This shows that we need this property to have a value which is a valid color.

css

```
@property --background-color {
  syntax: "<color>";
  inherits: false;
  initial-value: blue;
}
```

## [Houdini worklets](#houdini_worklets)

A feature of Houdini is the [`Worklet`](https://developer.mozilla.org/en-US/docs/Web/API/Worklet). A worklet is a module, written in JavaScript, that extends CSS using one of the Houdini APIs. You can see an example worklet on the [`PaintWorkletGlobalScope.registerPaint()`](https://developer.mozilla.org/en-US/docs/Web/API/PaintWorkletGlobalScope/registerPaint) page. Once a worklet has been registered you can use it in CSS just like any other value. This means that even if you are not a JavaScript developer, you can access Houdini APIs by using worklets other people have created.

## [Reference](#reference)

### [CSS at-rule and descriptors](#css_at-rule_and_descriptors)

The [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property) at-rule allows you to register an advanced custom property.

-   [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property)
-   [`inherits`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property/inherits)
-   [`initial-value`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property/initial-value)
-   [`syntax`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property/syntax)

### [Houdini API references](#houdini_api_references)

-   [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API)
-   [CSS Typed Object Model API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API)
-   [CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API)
-   [`Worklet`](https://developer.mozilla.org/en-US/docs/Web/API/Worklet) reference

### [Houdini guides](#houdini_guides)

-   [Properties and Values API Guide](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API/guide)
-   [Typed OM API Guide](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API/Guide)
-   [Using the CSS Painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API/Guide)

## [See also](#see_also)

-   [A Practical Overview of CSS Houdini](https://www.smashingmagazine.com/2020/03/practical-overview-css-houdini/ "External link (opens in new tab)")
-   [Smarter custom properties with Houdini's new API](https://web.dev/articles/css-props-and-vals "External link (opens in new tab)")

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Dec 15, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API/Houdini/contributors.txt).
