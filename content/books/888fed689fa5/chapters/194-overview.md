## [How does it work?](#how_does_it_work)

Scroll anchoring adjusts the scroll position to compensate for the changes outside of the viewport. This means that the point in the document the user is looking at remains in the viewport, which may mean their scroll position actually changes in terms of how _far_ they have moved through the document.

You don't! The feature is enabled by default in supporting browsers. In most cases anchored scrolling is exactly what you want — content jumping is a poor experience for anyone.

## [What if I need to debug it?](#what_if_i_need_to_debug_it)

If your page is not behaving well with scroll anchoring enabled, it is probably because some `scroll` event listener is not handling the extra scrolling to compensate for the anchor node movement.

You can check whether disabling scroll anchoring fixes the issue in Firefox by changing `layout.css.scroll-anchoring.enabled` to `false` in `about:config`. You can also check what node Firefox is using as the anchor using the `layout.css.scroll-anchoring.highlight` switch. That will show a purple overlay on top of the anchor node.

If a node doesn't seem to be an appropriate anchor, you can exclude it using [`overflow-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-anchor), as described below.

## [What if I need to disable it?](#what_if_i_need_to_disable_it)

The [CSS scroll anchoring module](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_anchoring) provides the [`overflow-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-anchor) property, which can be used to disable scroll anchoring on all or part of the document. It's essentially a way to opt out of the behavior.

The only possible values are `auto` or `none`:

-   `auto` is the initial value; as long as the user's browser supports scroll anchoring, the behavior will happen, and they should see fewer content jumps.
-   `none` means that you have explicitly opted the document, or part of the document, out of scroll anchoring.

To opt out the entire document, you can set it on the [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body) element:

css

```
body {
  overflow-anchor: none;
}
```

To opt out of scroll anchoring for a section of the document, set `overflow-anchor: none` on the section's container element:

css

```
.container {
  overflow-anchor: none;
}
```

If opting out of scroll anchoring on the document or a section thereof, a descendant of an opted-out area cannot be opted back in. For example, if you opt out the entire document, you can't set `overflow-anchor: auto` on a descendant node to turn scroll anchoring back on for a subsection.

### [Suppression triggers](#suppression_triggers)

There are some _suppression triggers_, which disable scroll anchoring in places where it might be problematic. If any of the triggers happen on the anchor node, or an ancestor of it, anchoring is suppressed.

These suppression triggers are changes to the computed value of any of the following properties:

-   [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top), [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/left), [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/right), or [`bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/bottom)
-   [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin) or [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding)
-   Any [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) or [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height)\-related properties
-   [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform) and the individual transform properties [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate), [`scale`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scale), and [`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rotate)

Additionally, [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) changes anywhere inside the [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container) also disable scroll anchoring.

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Scroll Anchoring Module Level 1  
\# exclusion-api](https://drafts.csswg.org/css-scroll-anchoring/#exclusion-api) |

## [Browser compatibility](#browser_compatibility)

To conditionally apply styles based on whether scroll anchoring can be disabled, use [`@supports` feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports) to test support for the `overflow-anchor` property.

## [See also](#see_also)

-   [Original scroll anchoring explainer](https://github.com/WICG/ScrollAnchoring/blob/master/explainer.md "External link (opens in new tab)") via WICG (2016)
-   [Scroll anchoring for web developers](https://blog.chromium.org/2017/04/scroll-anchoring-for-web-developers.html "External link (opens in new tab)") via Chromium (2017)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Nov 7, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_anchoring/Overview/contributors.txt).
