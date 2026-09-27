## [Custom properties in action](#custom_properties_in_action)

To see how custom properties can be used, move the input slider left to right.

```
<div class="container">
  <div id="color-1">--hue</div>
  <div id="color-2">--hue + 10</div>
  <div id="color-3">--hue + 20</div>
  <div id="color-4">--hue + 30</div>
  <div id="color-5">--hue + 40</div>
  <div id="color-6">--hue + 50</div>
  <div id="color-7">--hue + 60</div>
  <div id="color-8">--hue + 70</div>
</div>
<input type="range" min="0" max="360" value="0" step="0.1" id="hue" />
```

```
const hue = document.querySelector("#hue");

const updateHue = () => {
  document.documentElement.style.setProperty("--hue", hue.value);
};

hue.addEventListener("input", updateHue);
```

```
.container {
  display: grid;
  font-family: sans-serif;
  color: white;
  gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 1rem;
}
.container div {
  border-radius: 0.5rem;
  padding: 1rem;
}

input {
  width: 100%;
  margin: 0;
}

:root {
  --hue: 0;
}

#color-1 {
  background-color: hsl(var(--hue) 50% 50%);
}
#color-2 {
  background-color: hsl(calc(var(--hue) + 10) 50% 50%);
}
#color-3 {
  background-color: hsl(calc(var(--hue) + 20) 50% 50%);
}
#color-4 {
  background-color: hsl(calc(var(--hue) + 30) 50% 50%);
}
#color-5 {
  background-color: hsl(calc(var(--hue) + 40) 50% 50%);
}
#color-6 {
  background-color: hsl(calc(var(--hue) + 50) 50% 50%);
}
#color-7 {
  background-color: hsl(calc(var(--hue) + 60) 50% 50%);
}
#color-8 {
  background-color: hsl(calc(var(--hue) + 70) 50% 50%);
}
```

In these color swatches, the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color) is set using the [`hsl()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/hsl) [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value) function as `hsl(var(--hue) 50% 50%)`. Each color swatch increments the [`<hue>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hue) value by 10 degrees like `calc(var(--hue) + 10)`, `calc(var(--hue) + 20)` etc. As the slider's value changes from 0 up to 360, the value of the `--hue` [custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) is updated using [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc), and the background color of each box inside the grid is updated, also.

## [Reference](#reference)

### [Properties](#properties)

-   [`--*`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*)

### [Functions](#functions)

-   [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var)

## [Guides](#guides)

[Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)

Explains how to use custom properties in CSS and JavaScript, with hints on handling undefined and invalid values, fallbacks, and inheritance.

[Invalid custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling#invalid_custom_properties)

Explains how browsers handle property values when a custom property's value is an invalid data type for that property.

-   [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Properties_and_values_API) module
    -   [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property) at-rule
    -   [`CSS.registerProperty()`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static) method

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Custom Properties for Cascading Variables Module Level 1](https://drafts.csswg.org/css-variables/) |

## [See also](#see_also)

-   [CSS cascading and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade) module
-   [CSS `env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env) function
-   [CSS `calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc) function
-   [`getPropertyValue()`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue) method

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Dec 16, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/contributors.txt).
