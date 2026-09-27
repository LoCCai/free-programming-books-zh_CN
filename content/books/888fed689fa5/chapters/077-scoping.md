## [Reference](#reference)

### [Selectors](#selectors)

-   [`:host`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host)
-   [`:host()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host_function)
-   [`:host-context()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host-context)
-   [`::slotted`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::slotted)

## [Guides](#guides)

[Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

An introduction to the different technologies used to create reusable web components — custom elements whose functionality is encapsulated away from the rest of your code.

[Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

Shadow DOM fundamentals, including attaching a shadow DOM to an element, adding to the shadow DOM tree, and styling.

[Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)

Defining reusable HTML structure using [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) and [`<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot) elements, and using that structure inside web components.

[Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)

Introduction to the Custom Elements API, the JavaScript API used to create custom elements that encapsulate functionality.

-   CSS [`:defined`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:defined) pseudo-class
    
-   CSS [`::part`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part) pseudo-element
    
-   HTML [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) element
    
-   HTML [`<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot) element
    
-   HTML [`slot`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/slot) attribute
    
-   [Shadow tree](https://developer.mozilla.org/en-US/docs/Glossary/Shadow_tree) glossary term
    
-   [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) glossary term
    
-   [Compound selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selector_structure#compound_selector) term
    
-   [Selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Selector_list) term
    
-   [Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) interfaces, properties, and methods
    
    -   [`CustomElementRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) interface
    -   [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) API
        -   [`Element.slot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/slot) property
        -   [`Element.assignedSlot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/assignedSlot) property
        -   [`Element.attachShadow()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) method
    -   [`HTMLSlotElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) interface
    -   [`HTMLTemplateElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement) interface
    -   [`ShadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) interface

**Note:** Despite the name, the [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:scope) pseudo-class, which represents elements that are a reference point (or scope) for selectors to match against, is defined in the [Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors) module. It is otherwise unrelated to the CSS scoping module, which is focused on scoping as it pertains to the Shadow DOM scoping mechanism.

## [Specifications](#specifications)

| Specification |
| --- |
| [CSS Scope](https://drafts.csswg.org/css-scoping/) |

## [See also](#see_also)

-   [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors) module
-   [CSS pseudo elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Pseudo-elements) module
-   [CSS namespaces](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Namespaces) module
-   [CSS shadow-parts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Shadow_parts) module
-   [Template, slot, and shadow](https://web.dev/learn/html/template/ "External link (opens in new tab)") on web.dev (2023)
-   [Custom element best practices](https://web.dev/articles/custom-elements-best-practices "External link (opens in new tab)") on web.dev (2019)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Dec 16, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scoping/contributors.txt).
