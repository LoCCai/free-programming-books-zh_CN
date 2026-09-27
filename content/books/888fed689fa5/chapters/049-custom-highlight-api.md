## [Custom highlight API in action](#custom_highlight_api_in_action)

To enable styling text ranges on a webpage using the CSS Custom Highlight API, you create a [`Range`](https://developer.mozilla.org/en-US/docs/Web/API/Range) object, then a [`Highlight`](https://developer.mozilla.org/en-US/docs/Web/API/Highlight) object for the range. After registering the highlight using the [`HighlightRegistry.set()`](https://developer.mozilla.org/en-US/docs/Web/API/HighlightRegistry/set) method, you can then select the range using the [`::highlight()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::highlight) pseudo-element. The name defined in the `set()` method is used as the parameter of the `::highlight()` pseudo-element selector to select that range. The range selected by the `::highlight()` pseudo-element can be styled using a [limited number of properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::highlight#allowable_properties).

```
<h1>Directions</h1>
<h2>Lincoln Memorial to Martin Luther King, Jr. Memorial</h2>
<ol><li>Head south on Lincoln Memorial Circle</li
  ><li>Turn right toward Independence Ave</li
  ><li>Turn left onto Independence Ave</li
  ><li>Turn right onto West Basin Dr</li
  ><li>Look up when you reach 64 Independence Ave!</li>
</ol>
<hr />
<label
  >Number of steps completed:
  <input type="number" min="0" max="5" value="0" id="currentStep" />
</label>
```

This example uses the [`text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration) property to strike through the `steps` highlight range defined by our JavaScript:

css

```
::highlight(steps) {
  text-decoration: line-through;
  color: blue;
}
```

We create a `Range` with a start and end node (which is the same node in this case). We then set this range as the `Highlight` using the `set()` method of the CSS `HighlightRegistry` interface.

js

```
const rangeToHighlight = new Range();
const list = document.querySelector("ol");
rangeToHighlight.setStart(list, 0);
rangeToHighlight.setEnd(list, 0);

CSS.highlights.set("steps", new Highlight(rangeToHighlight));
```

An event listener updates the end of the highlighted range when the number of completed steps changes:

js

```
const currentPositionSlider = document.querySelector("input");
currentPositionSlider.addEventListener("change", (e) => {
  rangeToHighlight.setEnd(list, e.target.value);
});
```

## [Reference](#reference)

### [Pseudo-elements](#pseudo-elements)

-   [`::highlight()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::highlight)

### [Interfaces](#interfaces)

-   [`Highlight`](https://developer.mozilla.org/en-US/docs/Web/API/Highlight)
-   [`HighlightRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/HighlightRegistry)

### [Interface extensions](#interface_extensions)

This module adds properties and methods to interfaces defined in other specifications.

-   [`CSS`](https://developer.mozilla.org/en-US/docs/Web/API/CSS)
    -   [`CSS.highlights`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/highlights_static)

## [Guides](#guides)

[CSS custom highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API#concepts_and_usage)

The concepts and usage of the CSS custom highlight API, including creating `Range` and `Highlight` objects, registering the highlights using the `HighlightRegistry`, and styling the highlights using the `::highlight()` pseudo-element.

-   [`::grammar-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::grammar-error)
-   [`::selection`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::selection)
-   [`::spelling-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::spelling-error)
-   [`::target-text`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::target-text)
-   [`AbstractRange`](https://developer.mozilla.org/en-US/docs/Web/API/AbstractRange) interface
-   [`Range`](https://developer.mozilla.org/en-US/docs/Web/API/Range) interface and [`Range()`](https://developer.mozilla.org/en-US/docs/Web/API/Range/Range "Range()") constructor
-   [Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments)
-   [`FragmentDirective`](https://developer.mozilla.org/en-US/docs/Web/API/FragmentDirective) interface

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Custom Highlight API Module Level 1](https://drafts.csswg.org/css-highlight-api-1/) |

## [See also](#see_also)

-   [CSS pseudo-element module](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Pseudo-elements)
-   [CSS Object Model (CSSOM)](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) APIs

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Sep 4, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_highlight_API/contributors.txt).
