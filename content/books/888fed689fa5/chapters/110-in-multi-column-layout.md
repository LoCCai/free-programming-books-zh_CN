## [align-content and justify-content](#align-content_and_justify-content)

The [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-content) property applies to the block axis and [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content) to the inline axis. Any spacing added to the columns due to use of space distribution will be added to the gap between the columns, therefore making the gap larger than might be specified by the [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap) (or [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) shorthand) property.

Using a value of `justify-content` other than `normal` or `stretch` will cause column boxes to display at the [`column-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-width) specified on the multicol container, and the remaining space distributed according to the value of `justify-content`.

## [column-gap](#column-gap)

The [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap) property was originally specified in the multiple-column layout specification and then later unified with the gap properties for other layout methods in box alignment. While other layout methods treat the initial value of `column-gap` as `0`, multi-column layout treats it as `1em` — you generally want a gap between columns.

## [See also](#see_also)

-   [CSS box alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment) module
-   [Box alignment overview](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/Overview)
-   [Box alignment in flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_flexbox)
-   [Box alignment in grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_grid_layout)
-   [Box alignment for block, absolutely positioned, and table layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_block_abspos_tables)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Nov 20, 2025 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_alignment/In_multi-column_layout/contributors.txt).
