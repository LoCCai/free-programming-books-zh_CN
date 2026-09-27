The **CSS viewport** module enables specifying the size, zoom factor, and orientation of the user-agent's initial containing block, or _viewport_.

Content designed for large viewports may exhibit a variety of bugs when viewed in smaller viewports, including unintended wrapping, clipped content, and incorrectly sized [scroll containers](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container). HTML provides a [viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport), `<meta name="viewport">`, to provide hints about the initial size of the viewport. If the site isn't designed to work well on small viewports and this tag is omitted, some mobile browsers render the site using a fixed initial containing block width, typically `980px`. The content is then scaled down, making the CSS pixel size smaller than an actual pixel. The resulting page fits into the available screen space but is illegible, requiring the user to zoom and pan to view the content.

The [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport) initial containing block for continuous media has the dimensions of the viewport. Since the viewport is generally no larger than the display, devices with smaller displays, such as phones or tablets, typically present a smaller viewport than larger devices like desktops or laptops.

## [Reference](#reference)

### [Properties](#properties)

-   [`zoom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/zoom)

### [Interfaces](#interfaces)

-   [`Window.Viewport`](https://developer.mozilla.org/en-US/docs/Web/API/Window/viewport)
-   [`Viewport`](https://developer.mozilla.org/en-US/docs/Web/API/Viewport)
    -   [`Viewport.segments`](https://developer.mozilla.org/en-US/docs/Web/API/Viewport/segments)

### [Glossary terms and definitions](#glossary_terms_and_definitions)

-   [Viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport)
-   [Actual viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view/Viewport_concepts#actual_viewport)
-   [Initial viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view/Viewport_concepts#initial_viewport)

## [Guides](#guides)

[Viewport concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view/Viewport_concepts)

The concept of the viewport — what it is, its impact in terms of CSS, SVG, and mobile devices — and the difference between the visual viewport and the layout viewport.

[Using environment variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables/Using)

An overview of what environment variables are, browser-defined environment variables, and how to use the `env()` function.

[Using the Viewport Segments API](https://developer.mozilla.org/en-US/docs/Web/API/Viewport_segments_API/Using)

Create responsive designs optimized for different viewport segment sizes and arrangements with the API and environment variables.

-   [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries) module
    
    -   [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media)
    -   [`horizontal-viewport-segments`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/horizontal-viewport-segments) descriptor
    -   [`vertical-viewport-segments`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/vertical-viewport-segments) descriptor
-   [CSS environment variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables)
    
    -   [`env()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env)
    -   [`<environment-variable-name>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables/Using#browser-defined_environment_variables)
-   [Device Posture API](https://developer.mozilla.org/en-US/docs/Web/API/Device_Posture_API)
    

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Viewport Module Level 1](https://drafts.csswg.org/css-viewport/) |

## [See also](#see_also)

-   [CSSOM view](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view) module

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Nov 7, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Viewport/contributors.txt).
