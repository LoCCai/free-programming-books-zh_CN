## [Reference](#reference)

### [At-rules and descriptors](#at-rules_and_descriptors)

-   none

**Note:** The module explicitly states that [`@charset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@charset) is not an actual at-rule, but rather an unrecognized legacy rule that should be omitted when a stylesheet is grammar-checked. The only valid `@charset` usage is at the very beginning of a stylesheet, where it is interpreted as a special byte sequence stripped before processing the content.

### [Key concepts](#key_concepts)

-   [At-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/At-rules)
-   [character escaping](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/custom-ident#escaping_characters)
-   [CSS comments](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Comments)
-   [CSS declaration](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/CSS_Declaration)
-   [CSS declaration block](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/CSS_Declaration_Block)
-   [CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/Functions)
-   [Invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling)
-   [Style rule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule)

### [Glossary terms](#glossary_terms)

-   [CSS descriptor](https://developer.mozilla.org/en-US/docs/Glossary/CSS_Descriptor)
-   [Parse](https://developer.mozilla.org/en-US/docs/Glossary/Parse)
-   [Style sheet](https://developer.mozilla.org/en-US/docs/Glossary/Style_sheet)
-   [Whitespace](https://developer.mozilla.org/en-US/docs/Glossary/Whitespace)

## [Guides](#guides)

[Introduction to CSS syntax: declarations, rulesets, and statements](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Introduction)

Explains the overall CSS syntax and how declarations, declaration blocks, rulesets, and statements form the style rules.

[Value definition syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax)

Explains the formal grammar for defining valid values for CSS properties and functions, along with semantic constraints. A guide for understanding CSS component value types, combinators, and multipliers.

[CSS error handling](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling)

Overview of how browsers handle invalid CSS.

[Learn CSS first steps: CSS syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS#css_syntax_basics)

Introductory guide to CSS, including an introduction to CSS syntax.

[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors) module:

-   [CSS specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity)

[CSS cascading and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade) module:

-   [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import) at-rule
-   [`important`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/important) flag
-   [Initial values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#initial_value)
-   [Computed values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#computed_value)
-   [Used values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#used_value)
-   [Actual values](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#actual_value)
-   [CSS inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance)
-   [CSS property](https://developer.mozilla.org/en-US/docs/Glossary/Property/CSS)

[CSS custom properties for cascading variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables) module:

-   [custom property (`--*`)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*)
-   [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var) function

[CSS conditional rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules) module:

-   [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media) at-rule
-   [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports) at-rule

[CSS Object Model (CSSOM)](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) API:

-   [`cssText`](https://developer.mozilla.org/en-US/docs/Web/API/CSSValue/cssText "cssText") property
-   [`insertRule(rule)`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule "insertRule(rule)") method
-   [`replace(text)`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/replace "replace(text)") method

[WHATWG](https://developer.mozilla.org/en-US/docs/Glossary/WHATWG) specification:

-   [`<style>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style) element
-   [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) element
-   [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/class) attribute
-   [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel#stylesheet) attribute

## [Specifications](#specifications)

| Specification |
| --- |
| [Unknown specification](https://drafts.csswg.org/css-syntax) |

## [See also](#see_also)

-   [CSS at-rule functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/At-rule_functions)
-   [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors) module
-   [CSS values and units](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units) module

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on May 12, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/contributors.txt).
