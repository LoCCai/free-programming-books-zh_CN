## [Basic example](#basic_example)

In this example using [grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts), there is extra space in the [grid container](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) after laying out the fixed-width tracks on the inline [main axis](https://developer.mozilla.org/en-US/docs/Glossary/Main_Axis). This space is distributed using [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content). On the block [cross axis](https://developer.mozilla.org/en-US/docs/Glossary/Cross_Axis) the alignment of the items inside their grid areas is controlled with [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items). The first item overrides the `align-items` value set on the group by setting [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self) to `center`.

html

```
<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three <br />has <br />extra <br />text</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
</div>
```

```
body {
  font-family: sans-serif;
}
.box > * {
  padding: 20px;
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
}
```

css

```
.box {
  display: grid;
  grid-template-columns: 120px 120px 120px;
  align-items: start;
  justify-content: space-between;
  border: 2px dotted rgb(96 139 168);
}

.box :first-child {
  align-self: center;
}
```

## [Grid axes](#grid_axes)

As a two-dimensional layout method, when working with grid layout we always have two axes on which to align our items. We have access to all of the box alignment properties to help us achieve this.

The inline axis is the axis that corresponds to the direction that words in a sentence would run in the writing mode used. Therefore, in a horizontal language such as English or Arabic, the inline direction runs horizontally. Should you be in a vertical writing mode, the inline axis will run vertically.

![Inline axes are horizontal.](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_grid_layout/inline_axis.png)

To align things on the inline axis you use the properties that start with `justify-`: [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content), [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-items) and [`justify-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self).

The block axis crosses the inline axis in the direction that blocks are displayed down the page — for example, paragraphs in English are displayed one below the other vertically. This is the block dimension.

To align things on the block axis you use the properties that start with `align-`, [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content), [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items) and [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self).

![The block axes are vertical.](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_grid_layout/block_axis.png)

## [Self alignment](#self_alignment)

These properties deal with aligning the item inside the grid area it is placed into:

-   [`justify-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self)
-   [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self)
-   [`place-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-self)
-   [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-items)
-   [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items)
-   [`place-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-items)

The `*-items` properties, `align-items` and `justify-items`, are applied to the grid container and set alignment for all grid items as a group. The `*-self` properties, `align-self` and `justify-self`, are instead set on grid items. This means that you can set alignment on all grid items, and then override any items that need a different alignment by applying the `align-self` or `justify-self` property to the rules for the individual grid items.

The initial value for `align-items` and `justify-items` is `stretch`, and the initial value for `align-self` and `justify-self` is `auto`, so the item will stretch over the entire grid area. The exception to this rule is where the item has an intrinsic [aspect ratio](https://developer.mozilla.org/en-US/docs/Glossary/Aspect_ratio), for example an image. In this case the item will be aligned to `start` in both dimensions in order that the image is not distorted.

## [Content alignment](#content_alignment)

These properties deal with aligning the tracks of the grid when there is extra space to distribute:

-   [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content)
-   [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content)
-   [`place-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/place-content)

This scenario will occur if the tracks that you have defined total less than the total width of the grid container.

## [Gap and legacy grid-gap properties](#gap_and_legacy_grid-gap_properties)

These properties define the spacing between grid items within a grid container:

-   [`row-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/row-gap)
-   [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap)
-   [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap)

The grid specification originally contained the definition for the properties [`grid-row-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/row-gap), [`grid-column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap) and [`grid-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap). These have since been moved into the Box Alignment specification and aliased to [`row-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/row-gap), [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap), and [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap). This allows them to be used for other layout methods where a gap between items makes sense.

## [See also](#see_also)

-   [CSS box alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment) module
-   [Box alignment overview](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/Overview)
-   [Box alignment in flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_flexbox)
-   [Box alignment in multiple-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_multi-column_layout)
-   [Box alignment for block, absolutely positioned, and table layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_block_abspos_tables)
-   [Aligning items in CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Box_alignment)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Nov 20, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_grid_layout/contributors.txt).
