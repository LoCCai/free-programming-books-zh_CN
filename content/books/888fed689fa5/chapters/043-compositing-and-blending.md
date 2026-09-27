## [Compositing and blending in action](#compositing_and_blending_in_action)

In this example, each box has a border, two striped background images, and a solid color background. The common background for all the boxes contains a pattern of circles. The three boxes in the second row are set to blend with the background of the container.

```
<section>
  <div><span>Normal, with no blending</span></div>
  <div><span>Multiplies colors</span></div>
  <div><span>Multiplies based on background color</span></div>
  <div>Normal, with no blending</div>
  <div>Multiplies colors</div>
  <div>Multiplies based on background color</div>
</section>
```

```
/* Creates a div with two offset striped background images and a background color. */
div {
  width: 200px;
  height: 200px;
  background-image:
    repeating-linear-gradient(45deg, red 0 15px, pink 15px 30px),
    repeating-linear-gradient(-45deg, blue 0 15px, lightblue 15px 30px);
  background-size: 150px 150px;
  background-repeat: no-repeat;
  background-position:
    top left,
    bottom right;
  background-color: palegoldenrod;
  text-align: center;
  padding-top: 150px;
  font-family: sans-serif;
  box-sizing: border-box;
  border: 5px solid black;
}
div:nth-of-type(3n + 1) {
  background-blend-mode: normal;
}
div:nth-of-type(3n + 2) {
  background-blend-mode: multiply;
}
div:nth-of-type(3n + 3) {
  background-blend-mode: overlay;
}
div:nth-of-type(n + 4) {
  mix-blend-mode: difference;
}
/* Put a pink background with transparent round holes that covers the 
  entire element, and lay the examples in two rows with three columns each */
section {
  padding: 0.75em;
  background: radial-gradient(
    circle,
    transparent 0 20px,
    rgb(255 200 200) 20px
  );
  background-size: 60px 60px;
  background-position: center;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
}
/* Make some of the text more legible */
span {
  background-color: #ffffff99;
}
```

Notice how the background, border, and the content are all impacted as a result of the blending. Click "Play" in the example above to see or edit the code for the animation in the MDN Playground.

## [Reference](#reference)

### [Properties](#properties)

-   [`background-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-blend-mode)
-   [`isolation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation)
-   [`mix-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode)

-   [`<blend-mode>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/blend-mode) data type
-   [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) CSS property
-   [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/filter) CSS property
-   [`mask-composite`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-composite) CSS property
-   [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color) CSS property
-   [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-image) CSS property
-   [stacking context](https://developer.mozilla.org/en-US/docs/Glossary/Stacking_context) glossary term
-   [`<feBlend>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feBlend) SVG filter primitive
-   [`<feComposite>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComposite) SVG filter primitive

## [Specifications](#specifications)

| Specification |
| --- |
| [Compositing and Blending Level 1](https://drafts.csswg.org/compositing-1/) |

## [See also](#see_also)

-   Properties in the [CSS filter effects](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Filter_effects) module enable applying filters effects, such as blurring and changing color intensity, to images, backgrounds, and borders.
-   [Compositing And Blending In CSS](https://www.sarasoueidan.com/blog/compositing-and-blending-in-css/ "External link (opens in new tab)") (2015)
-   [Editing Images in CSS: Blend Modes](https://webdesign.tutsplus.com/editing-images-in-css-blend-modes--cms-26058t "External link (opens in new tab)") (2022)
-   [web.dev: blend modes](https://web.dev/learn/css/blend-modes "External link (opens in new tab)") (2021)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Mar 17, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Compositing_and_blending/contributors.txt).
