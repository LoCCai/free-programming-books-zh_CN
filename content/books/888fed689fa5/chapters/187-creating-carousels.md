## [Carousel concepts](#carousel_concepts)

**Carousels** are a common feature on the web. They typically take the form of a scrolling content area containing several items, such as presentation slides, ads, headline news stories, or key product features.

Users can move through the items by clicking or activating navigational buttons or by swiping. The navigation usually includes:

[**scroll buttons**](#scroll_buttons)

Generally "previous" and "next" buttons or links.

[**scroll markers**](#scroll_markers)

A series of button or link icons, each representing one or more items depending on how many items are shown at each scroll position within the carousel.

![A carousel with a content area in the middle, previous and next buttons to the left and right, and scroll markers at the bottom](https://developer.mozilla.org/shared-assets/images/diagrams/css/carousels/carousel.svg)

A key feature of carousels is **pagination** — the items feel like separate pieces of content that are moved between rather than forming one continuous section of content. You might show one item at a time or several items on each carousel "page". When several items are visible, you might show an entirely new group of items each time the "next" or "previous" button is pressed. Alternatively, you could add a single new item to one end of the list while moving the item at the other end out of view.

Carousels can be quite brittle and challenging to implement with JavaScript. They require scripts to associate scroll markers with the items they represent while continuously updating the scroll buttons to keep them operating correctly.

Fortunately, we can create carousels with associated controls without the use of JavaScript, using CSS carousel features.

## [CSS carousel features](#css_carousel_features)

The CSS carousel features provide pseudo-elements and pseudo-classes that enable the creation of carousels using only CSS and HTML, with the browser handling most of the scrolling and link references in a flexible and consistent manner. These features are as follows:

[`::scroll-button()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-button)

Generated inside a [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container), these pseudo-elements represent scroll buttons, which scroll the container in a specified direction.

[`::scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker-group)

Generated inside a scroll container; used to collect together and lay out scroll markers.

[`::scroll-marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker)

Generated inside the children of a scroll container ancestor or within a scroll container's columns, to represent their scroll markers. These can be selected to scroll the container to their associated child elements or column, and are collected inside the scroll container's [`::scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker-group) for layout purposes.

[`:target-current`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-current)

Used to select the currently active scroll marker and style it. The ability to style the active scroll marker is important for both usability and accessibility.

[`:target-before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-before) and [`:target-after`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-after)

Used to select and style scroll markers before and after the currently active scroll marker, respectively. They are useful for styling navigation items that come before and after the active navigation position, indicating items the user has already viewed and those that are still to come.

[`::column`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::column)

Represents the individual columns generated when a container is set to display its content in multiple columns via [CSS multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout). The `::column` pseudo-element can be used in conjunction with [`::scroll-marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker) to generate a scroll marker for each column.

## [Carousel with single pages](#carousel_with_single_pages)

Our first demo is a carousel of single pages, with each item taking up the full page. We have [scroll markers](#creating_scroll_markers) as bottom navigation and [scroll buttons](#creating_scroll_buttons) on the sides of the page, enabling the user to move to the next and previous pages.

We'll use [flexbox](#carousel_layout_with_flexbox) to lay out the carousel, [scroll snapping](#setting_up_scroll_snapping_on_the_list) to enforce clear pagination, and anchor positioning to [position the scroll buttons](#positioning_scroll_buttons) and scroll markers relative to the carousel.

The HTML consists of a [heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) and an [unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul), with each [list item](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/li) containing some sample content, along with a custom `data-` attribute (which we explain with the styling):

html

```
<h1>CSS carousel single item per page</h1>
<ul>
  <li data-accName="Item 1">
    <h2>Page 1</h2>
  </li>
  <li data-accName="Item 2">
    <h2>Page 2</h2>
  </li>
  <li data-accName="Item 3">
    <h2>Page 3</h2>
  </li>
  <li data-accName="Item 4">
    <h2>Page 4</h2>
  </li>
</ul>
```

### [Carousel layout with flexbox](#carousel_layout_with_flexbox)

We use [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout) to create a single row of items; the `<ul>` is the flex container, and the `<li>` child list items are displayed horizontally with each item taking up the full width of the carousel.

The unordered list is made to fill the full width of the viewport with a width [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) of `100vw`; it is also given a [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height) of `300px`, and some [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding). We then use flexbox to lay out the list — setting a [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display) value of `flex` to cause the child list items to display in a row (due to the default [`flex-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-direction) value of `row`), with a [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) of `4vw` between each one.

```
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica", "Arial", sans-serif;
}

h1 {
  text-align: center;
  font-size: 1.7rem;
}
```

css

```
ul {
  width: 100vw;
  height: 300px;
  padding: 20px;
  display: flex;
  gap: 4vw;
}
```

Now it's time to style the list items. The first declarations provide rudimentary styling. The important declaration is the [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex) value of `0 0 100%`, which forces each item to be as wide as the container (the `<ul>`). As a result, the content will overflow its container, and the viewport will scroll horizontally.

css

```
li {
  list-style-type: none;
  background-color: #eeeeee;
  border: 1px solid #dddddd;
  padding: 20px;

  flex: 0 0 100%;
}

li:nth-child(even) {
  background-color: cyan;
}
```

In addition, every even-numbered list item is given a different background-color via [`:nth-child()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child), so that it is easier to see the scrolling effect.

### [Setting up scroll snapping on the list](#setting_up_scroll_snapping_on_the_list)

In this section, we will set an overflow value on the `<ul>` to turn it into a [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container), then apply [CSS scroll snapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) to cause the list to snap to the center of each list item as the content is scrolled.

An [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow-x) value of `scroll` is set on the `<ul>` so that its content will scroll horizontally within the list, rather than the entire viewport scrolling. [CSS scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) is then used to snap to each "page" — a [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type) value of `x mandatory` is set to make the list into a [scroll snap container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_snap#scroll_snap_container). The `x` keyword causes the container's [snap targets](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_snap#snap_target) to be snapped to horizontally, while the `mandatory` keyword means that the container will always snap to a snap target at the end of a scrolling action.

css

```
ul {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
```

Next, a [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-align) value of `center` is set on the list items so that, when the list is scrolled, it snaps to the center of each list item.

css

```
li {
  scroll-snap-align: center;
}
```

The code shown so far renders as follows:

Try scrolling the list by swiping or using the scrollbar to see the scroll snapping effect. No matter where you end your scroll motion, an item will always "snap" into place.

**Note:** CSS scroll snapping is not mandatory to use the CSS carousel features. However, carousels work a lot better with scroll snapping included. Without scroll snapping, the scroll buttons and markers will be unlikely to navigate cleanly between pages, and the result will be substandard.

### [Creating scroll buttons](#creating_scroll_buttons)

In this section we add "previous" and "next" scroll buttons to the demo to provide a tool to navigate between carousel pages. This is achieved using the [`::scroll-button()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-button) pseudo-element.

The `::scroll-button()` pseudo-elements generate buttons inside a scroll container only when their [`content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content) properties are set to a value other than `none`. Each `::scroll-button()` represents a scroll button, the scrolling direction of which is specified by the selector's argument. You can generate up to four scroll buttons per scroll container, each scrolling the container's content towards the start or end of the block or inline axis.

You can also specify an argument of `*` to target all of the `::scroll-button()` pseudo-elements with styles.

First, all scroll buttons are targeted with some rudimentary styles, as well as styling based on different states. It is important to set [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus) styles for keyboard users. Also, as scroll buttons are automatically set to [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled) when no more scrolling can occur in that direction, we use the [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:disabled) pseudo-class to target this state.

css

```
ul::scroll-button(*) {
  border: 0;
  font-size: 2rem;
  background: none;
  color: black;
  opacity: 0.7;
  cursor: pointer;
}

ul::scroll-button(*):hover,
ul::scroll-button(*):focus {
  opacity: 1;
}

ul::scroll-button(*):active {
  translate: 1px 1px;
}

ul::scroll-button(*):disabled {
  opacity: 0.2;
  cursor: unset;
}
```

**Note:** We also set a [`cursor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor) value of `pointer` on the scroll buttons to make it more obvious that they can be interacted with (an improvement for both general [UX](https://developer.mozilla.org/en-US/docs/Glossary/UX) and [cognitive accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Cognitive_accessibility)), unsetting it when the scroll buttons are `:disabled`.

Next, an appropriate icon is set on the left and right scroll buttons via the [`content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content) property, which is also what causes the scroll buttons to be generated. That icon must also have a corresponding plain text accessible name, so use the [alternative text](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content#adding_an_image_with_alternative_text) feature of the `content` property (with the caveat that [this may still be insufficient to satisfy WCAG](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content#accessibility)):

css

```
ul::scroll-button(left) {
  content: "◄" / "Previous";
}

ul::scroll-button(right) {
  content: "►" / "Next";
}
```

**Note:** User agents should automatically give an appropriate accessible name to generated scroll buttons so that assistive technologies can appropriately announced them and the buttons should have an implicit [`role`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) of `button`. Providing [alternative text for generated content](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content#alternative_text_string_counter_attr) ensures the buttons have the [accessible names](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) of "scroll left" and "scroll right" in user agents that don't natively include scroll button accessibility features.

### [Positioning scroll buttons](#positioning_scroll_buttons)

We've created the scroll buttons. Now we will position them relative to the carousel using [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning).

First of all, a reference [`anchor-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/anchor-name) is set on the list. Next, each scroll button has its [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) set to `absolute`, and its [`position-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor) property set to the same reference name defined on the list, to associate the two together.

css

```
ul {
  anchor-name: --my-carousel;
}

ul::scroll-button(*) {
  position: absolute;
  position-anchor: --my-carousel;
}
```

To actually position each scroll button, we set values on their [inset properties](https://developer.mozilla.org/en-US/docs/Glossary/Inset_properties). We use [`anchor()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor) functions to position the specified sides of the buttons relative to the sides of the carousel. In each case, the [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc) function is used to add some space between the button edge and the carousel edge. For example, the right-hand edge of the left scroll button is positioned 70 pixels to the right of the carousel's left-hand edge.

css

```
ul::scroll-button(left) {
  right: calc(anchor(left) - 70px);
  bottom: calc(anchor(top) + 13px);
}

ul::scroll-button(right) {
  left: calc(anchor(right) - 70px);
  bottom: calc(anchor(top) + 13px);
}
```

Adding in the scroll button code, we get the following result:

Try pressing the "previous" and "next" scroll buttons to see how the pages are scrolled, respecting the scroll-snapping behavior. Also note how the "previous" button is automatically disabled when the list is scrolled to the start of the content, while the "next" button is automatically disabled when the list is scrolled to the end of the content.

### [Creating scroll markers](#creating_scroll_markers)

Scroll markers are a group of buttons, each one of which scrolls the carousel to a position related to one of the content pages. They provide an additional navigation tool that also indicates your progress through the carousel pages.

In this section, we will add scroll markers to the carousel, which involves three main features:

-   The [`scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-marker-group) property is set on the scroll container element. It needs to be set to a non-`none` value for the [`::scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker-group) pseudo-element to be generated; its value specifies where the scroll marker group appears in the carousel's tab order and layout box order (but not DOM structure) — `before` puts it at the start, before the scroll buttons, while `after` puts it at the end.
-   The [`::scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker-group) pseudo-element exists inside a scroll container, and is used to collect together, contain, and lay out scroll markers as a whole group.
-   [`::scroll-marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker) pseudo-elements exist inside the children and [`::column`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::column) fragments of a scroll container ancestor, and represent their scroll markers. These are collected inside the ancestor's [`::scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker-group) for layout purposes.

To begin with, the list's `scroll-marker-group` property is set to `after`, so the `::scroll-marker-group` pseudo-element is placed after the list's DOM content in the focus and layout box order; this means it comes after the scroll buttons:

css

```
ul {
  scroll-marker-group: after;
}
```

**Note:** Alternatively, a scroll marker group container can be created from an existing element containing a set of [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a) elements using [`scroll-target-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-target-group).

Next, the list's `::scroll-marker-group` pseudo-element is positioned relative to the carousel using CSS anchor positioning, similar to the scroll button's, except that it is horizontally centered on the carousel using a [`justify-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self) value of `anchor-center`. The group is laid out using flexbox, with a [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content) value of `center` and a [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) of `20px` so that its children (the `::scroll-marker` pseudo-elements) are centered inside the `::scroll-marker-group` with a gap between each one.

css

```
ul::scroll-marker-group {
  position: absolute;
  position-anchor: --my-carousel;
  top: calc(anchor(bottom) - 70px);
  justify-self: anchor-center;

  display: flex;
  justify-content: center;
  gap: 20px;
}
```

Next, we handle the look and feel of the scroll markers themselves; they can be styled just like any other [generated content](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Generated_content). It is important to note that we need to set a non-`none` value for the `content` property so the scroll markers are actually generated. A value of `""` produces a blank accessible name (a WCAG SC [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html "External link (opens in new tab)") violation), so it's necessary to provide some text value. Because each scroll marker having the same name may not be useful for users, consider using `attr()` to pull the value from a custom `data-` attribute on the `<li>` (this example looks for an attribute `data-accName`). Understand this value will not be picked up by automated translation services.

We also set some rudimentary styles to make the markers appear as outlined circles while visually hiding the text content we've added:

css

```
li::scroll-marker {
  content: attr(data-accName);
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 50%;
  overflow: hidden;
  text-indent: 16px;
}
```

**Note:** Generated content is inline by default; we can apply `width` and `height` to our scroll markers because they are being laid out as flex items.

Finally for this section, the [`:target-current`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-current) pseudo-class is used to select whichever scroll marker corresponds to the currently visible "page", highlighting how far the user has scrolled through the content. In this case, we set the `background-color` to `black` so it is styled as a filled-in circle.

css

```
li::scroll-marker:target-current {
  background-color: black;
}
```

**Note:** When a scroll marker group container is created on a scroll container using the `scroll-marker-group` property, the scroll container is rendered with [`tablist`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tablist_role)/[`tab`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tab_role) semantics. You can Tab to it with the keyboard, then move between the different "pages" using the left and right (or up and down) cursor keys, which also changes the state of the associated scroll markers and scroll buttons as expected. The scroll markers can also be tabbed between normally, as expected.

## [Single page carousel final result](#single_page_carousel_final_result)

All of the above code combines together to create the following result:

Since the previous live example, the scroll markers have been added — try pressing them to jump straight to each page. Note how the current marker is highlighted so you can see where you are in the pagination. Also try tabbing to the scroll marker group, then use the cursor keys to cycle through each page.

You can also navigate between pages by swiping left and right, dragging the scroll bar, or pressing the scroll buttons.

## [Responsive carousel: multiple items per page](#responsive_carousel_multiple_items_per_page)

The second demo is a carousel with multiple items per page, which again includes [scroll buttons](#creating_scroll_buttons) and [scroll markers](#creating_scroll_markers) for navigating through the pages. This demo is also responsive — different numbers of items appear on each page depending on the viewport width.

This demo is very similar to the [Carousel with single pages](#carousel_with_single_pages) demo, except that instead of using flexbox for layout, it uses [CSS multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout) and the [`::column`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::column) pseudo-element to create arbitrary columns that span the full width of the carousel and may contain multiple items.

**Note:** There is currently no way to provide an accessible name for the scroll markers (there is no corresponding HTML element from which to draw a `data-` value as in the prior example). Using this pattern will create a WCAG SC [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html "External link (opens in new tab)") violation.

Using this approach, we can be sure that if the viewport grows or shrinks, while the item size remains constant, we'll never have a partial item displayed off the edge of the scrollport. In this case, the scroll markers are created on scroll container fragments, per-column, rather than on children, per-item.

The HTML is very similar to that of the previous demo, except that there are significantly more list items and, as multiple items will be visible at a time, we are labeling them as items rather than pages:

html

```
...
  <li>
    <h2>Item 1</h2>
  </li>
...
```

This demo also has very similar CSS, with the exception of the rules explained in the following sections.

```
<h1>CSS carousel multiple items per page</h1>
<ul>
  <li>
    <h2>Item 1</h2>
  </li>
  <li>
    <h2>Item 2</h2>
  </li>
  <li>
    <h2>Item 3</h2>
  </li>
  <li>
    <h2>Item 4</h2>
  </li>
  <li>
    <h2>Item 5</h2>
  </li>
  <li>
    <h2>Item 6</h2>
  </li>
  <li>
    <h2>Item 7</h2>
  </li>
  <li>
    <h2>Item 8</h2>
  </li>
  <li>
    <h2>Item 9</h2>
  </li>
  <li>
    <h2>Item 10</h2>
  </li>
  <li>
    <h2>Item 11</h2>
  </li>
  <li>
    <h2>Item 12</h2>
  </li>
  <li>
    <h2>Item 13</h2>
  </li>
  <li>
    <h2>Item 14</h2>
  </li>
  <li>
    <h2>Item 15</h2>
  </li>
</ul>
```

### [Carousel layout using columns](#carousel_layout_using_columns)

This example uses [CSS multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout), rather than flexbox, to layout the carousel items. The [`columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/columns) value of `1` forces each column to be the full width of the container, with the contents displaying a single column at a time. A [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align) value of `center` is also applied, forcing the contents to align with the center of the list.

```
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica", "Arial", sans-serif;
}

h1 {
  text-align: center;
  font-size: 1.7rem;
}
```

css

```
ul {
  width: 100vw;
  height: 300px;
  padding: 10px;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  columns: 1;
  text-align: center;
}
```

We provide rudimentary box styling for the list items, then apply layout styles to allow one or more items to fit into the single content column, depending on the viewport width. The number dynamically changes as the list gets wider or narrower.

css

```
li {
  list-style-type: none;

  display: inline-block;
  height: 100%;
  width: 200px;

  background-color: #eeeeee;
  border: 1px solid #dddddd;
  padding: 20px;
  margin: 0 10px;

  text-align: left;
}

li:nth-child(even) {
  background-color: cyan;
}
```

The key layout properties are as follows:

-   A [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display) value of `inline-block` has been set to force the list items to sit alongside one another and make the list scroll horizontally.
-   An absolute [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) of `200px` has been set on them to control their sizing, meaning one or more will fit in a column that grows and shrinks along with the width of the viewport.
-   A `text-align` value of `left` is set on them to override the `text-align: center` set on the parent container, so the item content will be left-aligned.

The [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-align) property is now set on the [`::column`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::column) pseudo-elements — which represent the content columns generated by the `columns` property — rather than the list items. We want to snap to each complete column rather than every individual list item, showing all new items with each scroll action.

css

```
ul::column {
  scroll-snap-align: center;
}
```

```
ul::scroll-button(*) {
  border: 0;
  font-size: 2rem;
  background: none;
  color: black;
  opacity: 0.7;
  cursor: pointer;
}

ul::scroll-button(*):hover,
ul::scroll-button(*):focus {
  opacity: 1;
}

ul::scroll-button(*):active {
  translate: 1px 1px;
}

ul::scroll-button(*):disabled {
  opacity: 0.2;
  cursor: unset;
}

ul::scroll-button(left) {
  content: "◄";
}

ul::scroll-button(right) {
  content: "►";
}

ul {
  anchor-name: --my-carousel;
}

ul::scroll-button(*) {
  position: absolute;
  position-anchor: --my-carousel;
}

ul::scroll-button(left) {
  right: calc(anchor(left) - 70px);
  bottom: calc(anchor(top) + 13px);
}

ul::scroll-button(right) {
  left: calc(anchor(right) - 70px);
  bottom: calc(anchor(top) + 13px);
}

ul {
  scroll-marker-group: after;
}

ul::scroll-marker-group {
  position: absolute;
  position-anchor: --my-carousel;
  top: calc(anchor(bottom) - 70px);
  justify-self: anchor-center;
  display: flex;
  justify-content: center;
  gap: 20px;
}
```

### [Column scroll markers](#column_scroll_markers)

The CSS for creating the scroll markers in this demo is nearly identical to the [previous demo](#creating_scroll_markers), except that the selectors are different — the scroll markers are created on the generated `::column` pseudo-elements rather than the list items. Note how we are including two pseudo-elements here to generate scroll markers on the generated columns.

css

```
ul::column::scroll-marker {
  content: "";
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 10px;
}
```

Finally, we use the `:target-current` pseudo-class to mark the active scroll marker, providing the user with an idea of where they are in the navigation. We also use the [`:target-before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-before) and [`:target-after`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:target-after) pseudo-classes to apply some custom styling to the scroll markers before and after the active one. We also set a [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition) on the `ul::column::scroll-marker:target-current` rule so that the style changes between the different states animate smoothly.

css

```
ul::column::scroll-marker:target-before {
  border: 2px solid gray;
}

ul::column::scroll-marker:target-current {
  background-color: black;
  transition: all 0.7s;
}

ul::column::scroll-marker:target-after {
  border: 2px solid red;
  background-color: red;
}
```

## [Responsive carousel final result](#responsive_carousel_final_result)

The Responsive carousel is rendered as follows:

Try navigating between the different pages by swiping left and right, using the scroll bar, pressing the scroll buttons, and pressing the scroll markers. The functionality is similar to the single page flexbox example, except that now there are multiple list items in each navigated position; the scroll markers are set on column fragments, potentially containing multiple items, instead of on each item.

Also, try resizing the screen width and you'll see that the number of list items that can fit inside the list changes — and therefore the number of generated columns changes too. As the number of columns changes, the number of scroll markers dynamically updates so that each column is represented in the scroll marker group.

## [See also](#see_also)

-   [CSS overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow) module
-   [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning) module
-   [CSS scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) module
-   [CSS Carousel Gallery](https://chrome.dev/carousel/ "External link (opens in new tab)") via chrome.dev (2025)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Jan 28, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels/contributors.txt).
