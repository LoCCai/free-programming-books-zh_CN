## [Attributes](#attributes)

This element includes the [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes).

[`autolocate`](#autolocate)

A boolean attribute that, when set to `true`, specifies that the browser should immediately retrieve location data when the `<geolocation>` element is rendered, provided permission was previously granted. If set to `false`, location data is not retrieved until the user activates the control. Defaults to `false`.

If permission was not previously granted, this attribute has no effect.

[`watch`](#watch)

A boolean attribute that, when set to `true`, specifies that the browser should retrieve location data whenever the position of the user's device changes. If set to `false`, location data is only retrieved once. Defaults to `false`.

## [Description](#description)

The `<geolocation>` element provides a declarative browser-defined control for sharing location data. In Chrome, for example, the button features a "map pin" icon and intuitive text ("Use location" in English content).

It also allows for intuitive management of user permissions. For example, in Chrome, if the user previously denied permission to access location data, or dismissed the permission dialog without making a choice, they are free to press the button again to update their choice. In cases where they previously denied permission, subsequent dialogs will inform them that they previously didn't allow location data to be shared, and ask them whether they want to continue not allowing it, or to allow it.

A key aspect of the `<geolocation>` element is that it reflects the user's conscious choice, and blocks possible usage that might trick the user into providing their location data unwittingly (see [`<geolocation>` blocking](#geolocation_blocking) for more information).

The element's DOM API interface, [`HTMLGeolocationElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement), provides features to access returned position data, current permission status, and errors if the data retrieval was unsuccessful, reducing the amount of JavaScript logic that needs to be written. It also has events available to run code in response to location data being received, changes in permission status, and user interactions with the permission dialog.

**Note:** For performance reasons, a maximum of three `<geolocation>` elements are allowed on any one page. If this quota is exceeded, all `<geolocation>` elements have their functionality disabled.

### [Relationship with the Geolocation API](#relationship_with_the_geolocation_api)

The [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) provides an older alternative for handling location data. This API has some shortcomings that the `<geolocation>` element aims to solve, most notably that the UI and underlying logic for requesting the data needs to be implemented from scratch each time, and the handling of permissions can be unintuitive.

The `<geolocation>` element uses features of the Geolocation API in the background. By default, the browser requests location data once, as if the [`Geolocation.getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) method was called. However, if the `watch` attribute is set to `true`, the browser updates the data whenever the device position changes, as if [`Geolocation.watchPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) was called.

If data is successfully retrieved, it is available in the [`HTMLGeolocationElement.position`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/position) property, which contains a [`GeolocationPosition`](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition) object. If data retrieval is unsuccessful, error information is available in the [`HTMLGeolocationElement.error`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/error) property, which contains a [`GeolocationPositionError`](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError) object.

### [Setting the button language](#setting_the_button_language)

The global [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang) attribute is used by the `<geolocation>` element to select a language for its rendered text. This means that you can set a `lang` attribute directly on the `<geolocation>` element or on one of its ancestors to tell the browser what language to use for the button label.

If no suitable `lang` attribute is set, the browser's preferred language setting is used.

### [Including fallback content](#including_fallback_content)

You can include fallback content between the `<geolocation>` element's opening and closing tags that will be displayed if it isn't supported. For example, you might include a "Not supported" message:

html

```
<geolocation>
  <p>Your browser doesn't support the Geolocation element.</p>
</geolocation>
```

However, a better real-world solution might be to include a regular [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) element that uses the Geolocation API to retrieve location data:

html

```
<geolocation>
  <button id="fallback">Use location</button>
</geolocation>
```

### [`<geolocation>` blocking](#geolocation_blocking)

One key idea behind the design of the `<geolocation>` element is that it should reflect a user's conscious choice to expose position information, and prevent bad actors from tricking users into activating it, for example via [clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Clickjacking). Because of this, the browser keeps a record of so-called **blocker reasons** for each rendered element.

When a blocker is active on a `<geolocation>` element, it is prevented from functioning (blocked), either temporarily or permanently, depending on the reason. When a `<geolocation>` element is blocked, it is said to be invalid. You can check whether it is invalid by querying the [`HTMLGeolocationElement.isValid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/isValid) property. You can also return the reason why it is invalid via the [`HTMLGeolocationElement.invalidReason`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/invalidReason) property — see that page for a full list of possible reasons.

### [Styling restrictions](#styling_restrictions)

The `<geolocation>` element has several constraints on the CSS styles that can be applied to it. Some of these constraints are designed to enforce fundamental accessibility, and will result in the button being deactivated if they are not adhered to. Some enforce certain values or value ranges for various properties.

Any properties that are not listed in the following sub-sections, or logically equivalent to a physical property listed in the following sub-sections, are ignored when set on the `<geolocation>` element.

#### Accessibility restrictions

The rendered `<geolocation>` button is deactivated (meaning that pressing it will have no effect) if the following constraints are not adhered to:

-   The [color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast) ratio between [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color) and [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color) must be at least 3:1.
-   The [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size) must not be smaller than the `small` value (in the case of keyword values), or its computed value (in the case of other value types).

#### Value constraints

The following CSS property value constraints are applied to the `<geolocation>` element. If an attempt is made to set these properties to values outside the listed constraints on the `<geolocation>` element, the value is adjusted to equal the constraint (in the case of an exact value constraint) or to equal to nearest computed value upper or lower bound (in the case of a range constraint).

[`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/opacity)

`1.0`

[`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height)

`normal`

[`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/white-space)

`nowrap`

[`user-select`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/user-select)

`none`

[`appearance`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/appearance)

`auto`

[`box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)

`content-box`

[`vertical-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vertical-align)

`middle`

[`text-emphasis`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-emphasis)

`initial`

[`text-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-shadow)

`initial`

[`outline-offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-offset)

`0` or greater.

[`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-weight)

`200` or greater.

[`word-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/word-spacing)

Between `0` and `0.5em`, inclusive.

[`letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/letter-spacing)

Between `-0.05em` and `0.2em`, inclusive.

[`letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/letter-spacing)

Between `-0.05em` and `0.2em`, inclusive.

[`min-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-height)

`1em` or greater.

[`max-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/max-height)

`3em` or less. `none` is an accepted value.

[`min-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/min-width)

The computed value of `fit-content` or less.

[`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-width)

`1em` or less.

#### Complex constraints

The following constraints are more complex than simple value constraints:

[Block direction padding](#block_direction_padding)

If the [`block-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/block-size) is set to `auto`, the [`padding-block-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-start) and [`padding-block-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-end) (and equivalent physical properties for the current [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/writing-mode)) are constrained to a maximum of `1em` and must be equal.

[Inline direction padding](#inline_direction_padding)

If the [`inline-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inline-size) is set to `auto`, the [`padding-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-start) and [`padding-inline-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-end) (and equivalent physical properties for the current [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/writing-mode)) are constrained to a maximum of `5em` and must be equal.

#### Properties that can be set normally

The following CSS properties can be used normally:

-   [`font-kerning`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-kerning)
-   [`font-optical-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-optical-sizing)
-   [`font-stretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-stretch)
-   [`font-synthesis-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-synthesis-weight)
-   [`font-synthesis-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-synthesis-style)
-   [`font-synthesis-small-caps`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps)
-   [`font-feature-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-feature-settings)
-   [`forced-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/forced-color-adjust)
-   [`text-rendering`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-rendering)
-   [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self)
-   [`anchor-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/anchor-name)
-   [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio)
-   [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border), [`border-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-top), [`border-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-right), [`border-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-bottom), and [`border-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-left)
-   [`clear`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clear)
-   [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
-   [`contain-intrinsic-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-width)
-   [`contain-intrinsic-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-height)
-   [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name)
-   [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type)
-   [`counter-reset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/counter-reset), [`counter-increment`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/counter-increment), and [`counter-set`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/counter-set)
-   [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex), [`flex-grow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-grow), [`flex-shrink`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-shrink), and [`flex-basis`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-basis)
-   [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/float)
-   [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height)
-   [`isolation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation)
-   [`justify-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self)
-   [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/left)
-   [`order`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/order)
-   [`orphans`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/orphans)
-   [`outline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline), [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-color), and [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/outline-style)
-   [`overflow-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-anchor)
-   [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior), [`overscroll-behavior-inline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior-inline), [`overscroll-behavior-block`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior-block), [`overscroll-behavior-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior-x), and [`overscroll-behavior-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior-y)
-   [`page`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/page)
-   [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
-   [`position-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor)
-   [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/right)
-   [`scroll-margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin), [`scroll-margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-top), [`scroll-margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-right), [`scroll-margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-bottom), and [`scroll-margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-margin-left)
-   [`scroll-padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding), [`scroll-padding-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-top), [`scroll-padding-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-right), [`scroll-padding-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-bottom), [`scroll-padding-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-left), [`scroll-padding-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start), [`scroll-padding-block-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-block-start), [`scroll-padding-block-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-block-start), [`scroll-padding-inline-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end), and [`scroll-padding-block-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-block-end)
-   [`text-spacing-trim`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-spacing-trim)
-   [`text-transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-transform)
-   [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top)
-   [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/visibility)
-   [`x`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/x)
-   [`y`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/y)
-   [`ruby-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/ruby-position)
-   [`user-select`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/user-select)
-   [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width)
-   [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change)
-   [`z-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index)

## [Accessibility](#accessibility)

The `<geolocation>` element has an accessible name written in the [language it is set to](#setting_the_button_language). It also has a [`role`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) of [`button`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role) so that it is recognized as a button by screen readers.

In addition, the `<geolocation>` element has a default [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex) value of `0`, so it behaves like a real `<button>` with respect to keyboard focus.

Finally, refer back to the [Accessibility restrictions](#accessibility_restrictions) section for information on styling constraints applied to the `<geolocation>` element to enforce fundamental accessibility requirements.

## [Examples](#examples)

### [Basic usage example](#basic_usage_example)

This example uses the `<geolocation>` element to retrieve your current location, which is printed out below the button in a [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p) element. The example also uses a regular `<button>` fallback to retrieve the location data in non-supporting browsers.

#### HTML

We include a `<geolocation>` element with a `<button>` fallback nested inside it, which will be rendered in browsers that do not support `<geolocation>`. We also include a `<p>` to output location data and errors into.

html

```
<geolocation>
  <button id="fallback">Use location</button>
</geolocation>
<p id="output"></p>
```

#### JavaScript

In our script, we start off by grabbing a reference to the output `<p>` element. We then detect whether the `<geolocation>` element is supported by testing `typeof HTMLGeolocationElement === "function"`:

-   If it is supported, we first grab a reference to the `<geolocation>` element and then add a [`location`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/location_event "location") event listener. When the button is pressed and the data is retrieved, the listener prints the (lat, long) coordinates to the output `<p>` (retrieved via the [`position`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/position "position") property), or an error message if the data retrieval was unsuccessful (retrieved via the [`error`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement/error "error") property).
-   If it isn't supported, we grab a reference to the fallback `<button>` element and retrieve and print the same data, except that this time we are using a `click` event listener on the button, and a [`Geolocation.getCurrentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) call to retrieve the data.

js

```
const outputElem = document.querySelector("#output");

if (typeof HTMLGeolocationElement === "function") {
  const geo = document.querySelector("geolocation");
  geo.addEventListener("location", () => {
    if (geo.position) {
      outputElem.textContent += `(${geo.position.coords.latitude},${geo.position.coords.longitude}), `;
    } else if (geo.error) {
      outputElem.textContent += `${geo.error.message}, `;
    }
  });
} else {
  const fallback = document.querySelector("#fallback");
  fallback.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        outputElem.textContent += `(${position.coords.latitude}, ${position.coords.longitude}), `;
      },
      (error) => {
        outputElem.textContent += `${error.message}, `;
      },
    );
  });
}
```

#### Result

See this code [running live](https://mdn.github.io/dom-examples/geolocation-element/basic-example/ "External link (opens in new tab)") ([source code](https://github.com/mdn/dom-examples/tree/main/geolocation-element/basic-example "External link (opens in new tab)")). You can also find a version of this example that includes the `watch` attribute on the `<geolocation>` element and therefore fetches location data each time the user's device position changes (see it [running live](https://mdn.github.io/dom-examples/geolocation-element/basic-watch-example/ "External link (opens in new tab)"), and the [source code](https://github.com/mdn/dom-examples/tree/main/geolocation-element/basic-watch-example "External link (opens in new tab)")).

Try viewing the demos in a supported browser and an unsupported browser if possible, and note the difference in permissions dialog flow when you choose to allow or deny permission to use `geolocation`.

For a walkthrough of a more complete example that uses location data to create a map of your local area, see the [`HTMLGeolocationElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement) reference page.

## [Technical summary](#technical_summary)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories">Content categories</a></th><td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#flow_content">Flow content</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#phrasing_content">phrasing content</a>, interactive content, palpable content.</td></tr><tr><th scope="row">Permitted content</th><td>Any suitable transparent fallback content.</td></tr><tr><th scope="row">Tag omission</th><td>None, both the starting and ending tag are mandatory.</td></tr><tr><th scope="row">Permitted parents</th><td>Any element that accepts phrasing content.</td></tr><tr><th scope="row">Implicit ARIA role</th><td><a href="https://w3c.github.io/html-aria/#dfn-no-corresponding-role" target="_blank" title="External link (opens in new tab)">No corresponding role</a></td></tr><tr><th scope="row">Permitted ARIA roles</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role"><code>button</code></a></td></tr><tr><th scope="row">DOM interface</th><td><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement"><code>HTMLGeolocationElement</code></a></td></tr></tbody></table>

## [Specifications](#specifications)

| Specification |
| --- |
| [The HTML Geolocation Element  
\# elementdef-geolocation](https://wicg.github.io/PEPC/geolocation-element.html#elementdef-geolocation) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   [`HTMLGeolocationElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLGeolocationElement)
-   The [`geolocation`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/geolocation) [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy)
-   [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
-   [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
-   [Introducing the `<geolocation>` HTML element](https://developer.chrome.com/blog/geolocation-html-element "External link (opens in new tab)") on developer.chrome.com (2026)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Apr 24, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/geolocation/contributors.txt).
