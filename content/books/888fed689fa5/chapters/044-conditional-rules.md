## [Reference](#reference)

### [Properties](#properties)

-   [`container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container)
-   [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name)
-   [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type)

### [At-rules and descriptors](#at-rules_and_descriptors)

-   [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container)
    -   [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#aspect-ratio)
    -   [`block-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#block-size)
    -   [`fallback`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#fallback)
    -   [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#height)
    -   [`inline-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#inline-size)
    -   [`orientation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#orientation)
    -   [`scrollable`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#scrollable)
    -   [`snapped`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#snapped)
    -   [`stuck`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#stuck)
    -   [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#width)
-   [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media)
-   [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports)

The CSS conditional rules module also introduces the `@else` and `@when` at-rules. Currently, no browsers support these features.

### [Functions](#functions)

-   [`anchored()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#anchored_container_descriptors)
-   [`style()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#container_style_queries)
-   [`font-tech()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports#font-tech)
-   [`font-format()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports#font-format)
-   [`scroll-state()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#scroll-state_container_descriptors)
-   [`selector()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports#function_syntax)
-   [`supports()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import#supports-condition)

The CSS conditional rules module also introduces a `media()` CSS function. Currently, no browsers support this feature.

### [data types](#data_types)

-   [`<container-name>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#container-name)
-   [`<style-feature>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#container_style_queries)
-   [Container relative `<length>` units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length#container_query_length_units)
-   [`<media-query>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using#syntax)
-   [`<supports-condition>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import#importing_css_rules_conditional_on_feature_support)
-   `<supports-feature>` (see [`supports()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import#supports-condition))

### [Interfaces](#interfaces)

-   [`CSSConditionRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSConditionRule)
-   [`CSSMediaRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule)
-   [`CSSSupportsRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSSupportsRule)
-   [`supports()`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports_static "supports()") method

### [Terms and glossary definitions](#terms_and_glossary_definitions)

-   [Media](https://developer.mozilla.org/en-US/docs/Glossary/Media/CSS)
-   Supports query (See [feature query](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries))

## [Guides](#guides)

[Using CSS feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Using_feature_queries)

Selectively applying CSS rules after checking browser support for the specified properties and values via feature queries.

[Using CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)

Introduces media queries, their syntax, and the operators and media features that are used to construct media query expressions.

[Supporting older browsers: feature queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Supporting_Older_Browsers#feature_queries)

How to use feature queries to target CSS based on the browser's level of support for web features.

[Browser feature detection: CSS `@supports`](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Feature_detection#supports)

A look at JavaScript and CSS feature detection, including CSS `@supports`.

[Using container scroll-state queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries)

Using container scroll-state queries, with an example of each type.

-   [CSS cascading and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade) module
    
    -   [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import) at-rule
-   [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries) module
    
    -   [`<media-feature>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#media_features)
    -   [`<media-type>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#media_types)
    -   [`<media-condition>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#logical_operators)
    -   [`<media-query-list>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/media)
    -   [CSS logical operators](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media#logical_operators) (`not`, `or`, and `and`)
-   [CSSOM view](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/CSSOM_view) module
    
    -   [`CSS`](https://developer.mozilla.org/en-US/docs/Web/API/CSS) API
    -   [`CSSGroupingRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSGroupingRule) API
    -   [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) API
    -   [`CSSRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule) API
    -   [`MediaList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaList) interface
        -   [`MediaList.mediaText`](https://developer.mozilla.org/en-US/docs/Web/API/MediaList/mediaText) property
-   [CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax) module
    
    -   [`@charset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@charset) declaration
    -   [at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/At-rules) term
    -   [`invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling) term
    -   [parse](https://developer.mozilla.org/en-US/docs/Glossary/Parse) term
    -   [style rule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule) term
-   [CSS namespaces](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Namespaces) module
    
    -   [`@namespace`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@namespace) at-rule
-   [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning) module
    
    -   [Using anchored container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Anchored_container_queries)

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Conditional Rules Module Level 5](https://drafts.csswg.org/css-conditional-5/) |
| [CSS Conditional Rules Module Level 4](https://drafts.csswg.org/css-conditional-4/) |
| [CSS Conditional Rules Module Level 3](https://drafts.csswg.org/css-conditional-3/) |

## [See also](#see_also)

-   [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) module
-   [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries) module
-   [CSS cascading and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade) module

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on May 12, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/contributors.txt).
