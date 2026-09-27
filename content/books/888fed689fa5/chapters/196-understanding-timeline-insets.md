## [Animation timelines: a primer](#animation_timelines_a_primer)

[CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) are created by defining named [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes) animations, which specify an animation's behavior, and then attaching the keyframe animation to an element using the animation's name.

The element's animation timeline, defined by the [`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) property, determines how and when the element progresses through those keyframes. By default, the timeline is time-based, using the document's default time-based [`DocumentTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentTimeline).

The [CSS scroll-driven animation](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) module defines scroll progress and view progress timelines, which are methods for animating property values along a scroll-based timeline rather than the default time-based document timeline. In this article, we'll only discuss view progress timelines, as [scroll progress timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines#scroll_progress_timelines) are not relevant to timeline insets.

### [View progress timelines](#view_progress_timelines)

With [view progress timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines#view_progress_timelines), the animation's timeline, or progress, is driven by element visibility instead of the passage of time, with keyframe progression tied to the subject element position and visibility within the scroll container. The animation advances and reverses as the element advances or reverses through the scrollport. The animation only occurs when at least part of the element is visible within its scrollport, pausing when scrolling pauses.

css

```
.animated_element {
  animation-name: nameOfAnimation;
  animation-timeline: view();
}
```

Setting an [`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-name) applies the animation to the selected element.

**Note:** The `animation-timeline` property should always come after any `animation` shorthand declarations. While the shorthand property can't be used to set the `animation-timeline` property, it does reset the timeline to the default time-based document timeline.

As you scroll up, the animation progresses. As you scroll down, the animation reverses.

In this example, whenever any part of the subject element is visible in the scrollport, the animation occurs. By default, view progress animations begin just as the top edge of the subject element aligns with the bottom edge of the scroll container and end, reaching `100%` progress, when the end edge aligns with the start edge of the container, no matter the size of the subject element. By default, the animation is applied when any part of the subject is visible within the scrollport.

### [Animation attachment ranges](#animation_attachment_ranges)

In a [view progress timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines#view_progress_timelines), when no animation range properties are defined, the `<timeline-range-name>` is `normal`, which defaults to `cover`. The animation is applied whenever any portion of the subject element is visible, meaning the default **animation attachment range** is the sum of the height of the scroll container and the height of the subject element, with that extra height being at the scroll end edge. In our example, as the scroll container is `250px` tall, and the subject is `50px`, `250px`, or `500px` tall, with the vertical animation attachment range being `300px`, `500px`, or `750px` respectively.

The `0%` progression occurs when the subject element's start edge intersects the scrollport at the end edge, reaching `100%` progress when the subject's end edge exits via the scrollport's start edge. These are the subject and scrollport's top and bottom edges when scrolling vertically, and the left and right or right and left edges when scrolling horizontally, depending on the writing mode.

The following diagram illustrates the position of the subject at the `0%` and `100%` progress points for the three subject sizes:

```
<div>
  <svg viewBox="-1 -1 462 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="125" y="250" />
    <rect class="large end" width="100" height="500" x="240" y="0" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="125" y="750" />
    <rect class="large start" width="100" height="500" x="240" y="750" />
    <text y="520" x="360">100%</text>
    <line x1="0" x2="350" y1="500" y2="500" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

The yellow subject elements represents the position of the element when the `from` keyframe is applied, which is the animation range's `0%` progress mark. The red represents the location of the animated element relative to the scrollport when the `to` keyframe is applied, which is the end of the animation, or the `100%` progress mark. The gray represents the scrollport.

By default, the element animates while it is "in view", but this default definition of "in view" may not fit your needs. Fortunately, we can control which edges define the edges of the animation attachment range and then offset the start and end of that range with the animation range properties.

### [Animation range properties](#animation_range_properties)

The [`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range) properties enable specifying a named timeline range, such as `contain` or `exit-crossing`, which changes the range used from the default `cover` range. You can also include a [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage) value, which insets the attachment range from the start of the range. Percentages are relative to the named or default timeline range.

Named timeline ranges define the portions of a [`ViewTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline) that define an animation's range, specifying the start and end of the animations's attachment range.

The `animation-range` property is a shorthand property, defining the [`animation-range-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range-start) and [`animation-range-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range-end) properties. The `animation-range-start` defines the position of the subject element when the animation starts. The `animation-range-end` defines the position of the subject element when the animation ends.

See the [timeline range names guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timeline_range_names) to learn about the different named timeline ranges. This guide focuses on how the [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage) inset values work.

## [Setting insets using lengths](#setting_insets_using_lengths)

The `animation-range-start` and `animation-range-end` properties each accept a named animation range, a [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage) offset value, or both. Any length or percentage offset is measured from the _start_ of the animation attachment range.

When a [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) is set, the offset is fairly intuitive. Here we use the `animation-range-start` and `animation-range-end` properties to inset the animation timeline. This defines a subsection of the element's full animation attachment range as the active interval, with the `<length>` values specifying distances from the start of the default `normal` animation attachment range.

css

```
.animated_element {
  animation-range-start: 1em;
  animation-range-end: 125px;
}
```

The start and end of the animation range are `1em` and `125px` from the start of the animation attachment range, respectively. Because the timeline range default is `normal`, which resolves to `cover`, the start of the animation attachment range is the block end edge of the container.

```
:root {
  --start: 1em;
  --end: 125px;
}

article {
  background-image: linear-gradient(
    to top,
    transparent calc(var(--start) - 1px),
    #cccccc calc(var(--start) - 1px) calc(var(--start) + 1px),
    transparent calc(var(--start) + 1px) calc(var(--end) - 1px),
    #cccccc calc(var(--end) - 1px) calc(var(--end) + 1px),
    transparent calc(var(--end) + 1px)
  );
}
```

We've added lines `1em` and `125px` from the block end edge of the scroll container. The animation starts when the block start edge of the subject element reaches the `1em` line and ends when it reaches the `125px` line.

In this case, as the animation attachment range resolves to `cover` for both the start and end inset values, the location of the insets is fairly straightforward.

### [Effect of named ranges on length offsets](#effect_of_named_ranges_on_length_offsets)

The offset distance is always from the start of the associated animation range. In this example, we set the `animation-range-start` to be `50px` from the start of the default `normal` range and set the `animation-range-end` to be `100px` from the start of the explicitly set `entry` range:

css

```
.animated_element {
  animation-range-start: 50px;
  animation-range-end: entry 100px;
}
```

```
<main>
  <article>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll down ⇩</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <section class="triple">
      <div>
        <i id="A" class="animated_element">50px</i>
        <i id="B" class="animated_element">250px</i>
        <i id="C" class="animated_element">500px</i>
      </div>
    </section>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll up ⇧</p>
  </article>
</main>
```

As the start edge of both the `normal` and `entry` ranges is the container's end edge, the animation begins when the subject start edge is `50px` from the bottom of the scrollport and ends, reaching `100%` progress, when the subject start edge is `100px` from the bottom of the scrollport, irrespective of the subject size. While the size of the `entry` range is different for the three different subject sizes, in this case, the size of the underlying range didn't matter.

### [Length offsets with varying ranges](#length_offsets_with_varying_ranges)

The size of range matters when the range doesn't start at the element's end edge, as is the case with `exit` and `exit-crossing`, or if the offset is a percentage value. This fact, and the fact that you can mix and match animation range names, make view progress timeline offsets a bit more complicated to understand than non-offsetted [timeline range names](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timeline_range_names).

For example, when setting `exit` as the timeline range name, the subject size matters as it determines the location of the range's end edge.

css

```
.animated_element {
  animation-range-start: entry 60px;
  animation-range-end: exit 75px;
}
```

With both `entry` and `exit`, the range is the size of the subject, with the size clamped to the size of the scrollport. This means that the height of the `entry` and `exit` ranges are the height of the box in both the `50px` and `250px` examples, while in the `500px` example, the range is clamped to the height of the scrollport, which is `250px` tall.

We added a few lines to facilitate the explanations that follow: the bottom blue line is `60px` from the end edge of the scrollport, and the top red line is `75px` from that same edge. These are where the animation range start and end respectively.

This example demonstrates several important features, which we'll explain in greater detail, including:

-   Offsets are [measured from their respective named ranges](#measured_from_the_start_edge_of_the_range)
-   Offsets can occur [beyond the edges of the scrollport](#beyond_the_scrollport_edges)
-   [Ranges may be clamped](#effects_of_clamping) if the subject is larger than the scrollport

#### Measured from the start edge of the range

As the offset position is always relative to the start of the declaration's animation range, the start of the animation for all three elements occurs when the elements start edge crosses the point that is `60px` from the start of the `entry` range.

The `animation-range-end` value defines the position where the animation. The `exit 75px` value basically means "when `75px` of the subject has exited the start edge of the scrollport." This varies for each subject. For the `50px` subject, this only occurs `25px` after it has left the scrollport; when the element is not visible. The animation range end for both the `250px` and `500px` subjects occurs when their bottom end edge intersects the top blue line; 75 pixels from the end edge of the scrollport. Why are their end offsets the same? Because of [clamping](#effects_of_clamping)! The maximum size of the named animation range is clamped to the size of the scrollport. The `exit` range for both subjects is the same, so the range end offsets are the same.

#### Beyond the scrollport edges

For our `50px` tall subject, the `exit` range is 50px tall abutting the start edge of the scroll port. Setting `animation-range-end: exit 75px` for any element less than `75px` tall means the end of the range is outside the scrollport, as the point `75px` from the start of the `exit` range is past the start edge of the scrollport. In our example, the end of the animation range for the `50px` subject occurs when the subject's start edge is `75px` past the scrollport's start edge. The animation ends, reaching the `to` keyframe and the [`animationend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event "animationend") event, only when (and if) the element is scrolled `25px` out of view.

The animation ends even if the animation range end is outside of the scrollport, as long as there is room to scroll to that point. Had we set `animation-range-end: exit 250px`, the animation would have ended when the end edge of the medium and tall subjects exited the scrollport at the container's start edge.

With the end set to `exit 250px`, the small subject's animation might not end, as there might not be `450px` of content after the subject for the user to scroll to before the end point is reached.

#### Effects of clamping

With our `250px` tall container, when the subject is `250px` or `500px` tall, the `exit` range is the size of the container, with the start being the scroll container's end edge. With a `75px` offset, the end of the animation occurs when the end edge of the subject is `75px` from the end edge of the scroll container (denoted by the top red line).

As the offset position is always relative to the start of the named or default animation range, in our example, clamping impacts the large subject's `animation-range-end`. We set the end of the range to `exit 75px` which is `75px` from the start edge of the `exit` range. When the subject is the same size as the scrollport (our `250px` subject) or larger (our `500px` subject), the animation range end is `75px` from the end edge of the scrollport, which is `75px` from the start of the scrollport-clamped `exit` range.

```
article {
  background-image: linear-gradient(
    to top,
    transparent 59.5px,
    blue 59.5px 60.5px,
    transparent 60.5px 74.5px,
    red 74.5px 75.5px,
    transparent 75.5px /* 174.5px,
    green 174.5px 154.5px,
    transparent 175.5px*/
  );
}
.animated_element {
  align-self: flex-end;
}
```

```
@layer setup {
  #A {
    height: 50px;
  }
  #B {
    height: 250px;
  }
  #C {
    height: 500px;
  }
  div {
    display: flex;
    gap: 1em;
  }
  main {
    padding: 20px 0 0 20px;
    margin-bottom: 2em;
  }
  article {
    outline: 3px dashed;
    width: 475px;
    margin: auto;
    overflow: scroll;
    position: relative;
    height: 250px;
    box-sizing: content-box;
    background-image: linear-gradient(
      to top,
      transparent 49.5px,
      #666666 49.5px 50.5px,
      transparent 50.5px 99.5px,
      #666666 99.5px 100.5px,
      transparent 100.5px
    );
    background-origin: content-box;
  }

  p {
    padding: 10px;
    margin: 10px;
  }

  .animated_element {
    --clr: yellow;
    background-color: hsl(from var(--clr) h s calc(l * 1.4));
    display: block;
    animation: showAnim step-end 1 forwards;
    animation-timeline: view();
    flex: 1 0 auto;
  }

  i {
    font-family: sans-serif;
    font-size: 1.5rem;
  }

  @keyframes showAnim {
    from {
      --clr: green;
    }
    to {
      --clr: red;
    }
  }
  @layer no-support {
    @supports not (animation-timeline: view()) {
      body::before {
        content: "Your browser doesn't support view progress scrolling.";
        background-color: wheat;
        display: block;
        text-align: center;
      }
    }
  }
}
```

### [Negative lengths](#negative_lengths)

Up to this point, all the offsets have been greater than zero. It's important to note that negative lengths are valid. A negative offset on the `animation-range-start` makes the range longer while a negative offset on the `animation-range-end` makes the range shorter.

Let's compare the negative insets compared to the `0` values:

css

```
#A {
  animation-range-start: contain -25px;
  animation-range-end: exit -25px;
}
#B {
  animation-range-start: contain 0;
  animation-range-end: exit 0;
}
```

The first animation range is offset by `25px` toward the container end edge.

```
fieldset.double {
  display: none;
}
#A::after {
  content: " (-25px)";
}
#B::after {
  content: " (0)";
}
```

## [Setting insets using percentages](#setting_insets_using_percentages)

Like length values, percentage values define offsets from the _start_ of the animation attachment range. The percentage offsets are relative to the timeline range dimension, not relative to the scrollport. For this reason, percentage values are not as intuitive as length values for most people (realizing length values weren't that intuitive either).

Here, we use `animation-range-start` and `animation-range-end` to inset the animation timeline. While we are using the same properties, we set `<percentage>` values instead of `<length>` values:

css

```
.animated_element {
  animation-range-start: 20%;
  animation-range-end: 60%;
}
```

```
i {
  background-image: linear-gradient(
    to bottom,
    transparent calc(20% - 1px),
    #33333333 calc(20% - 1px) calc(20% + 1px),
    transparent calc(20% + 1px) calc(60% - 1px),
    #33333333 calc(60% - 1px) calc(60% + 1px),
    transparent calc(60% + 1px)
  );
}
article {
  --total: calc(var(--animElHeight) + 250px);
  background-image:
    linear-gradient(
      to top,
      transparent 0 calc(var(--total) * 0.2 - 1px),
      green calc(var(--total) * 0.2 - 1px) calc((var(--total) * 0.2) + 1px),
      transparent calc(var(--total) * 0.2 + 1px)
    ),
    linear-gradient(
      to top,
      transparent 0 calc(var(--total) * 0.6 - 1px),
      red calc(var(--total) * 0.6 - 1px) calc((var(--total) * 0.6) + 1px),
      transparent calc(var(--total) * 0.6 + 1px)
    ),
    linear-gradient(
      to top,
      transparent 0 calc(var(--containerHeight) * 0.2 - 0.5px),
      #33333333 calc(var(--containerHeight) * 0.2 - 0.5px)
        calc(var(--containerHeight) * 0.2 + 0.5px),
      transparent calc(var(--containerHeight) * 0.2 + 0.5px)
        calc(var(--containerHeight) * 0.6 - 0.5px),
      #33333333 calc(var(--containerHeight) * 0.6 - 0.5px)
        calc(var(--containerHeight) * 0.6 + 0.5px),
      transparent 0 calc(var(--containerHeight) * 0.6 + 0.5px)
    );
  background-position: local, local, fixed;
}
```

This defines the active interval to begin `20%` into the default attachment range and end `60%` through that same range. The default `normal` animation attachment range, which behaves as [`cover`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timeline_range_names#cover), is the height of the scroll container plus the height of the subject element, meaning the range will differ based on which radio button is selected.

For illustrative purposes, there are two dark lines crossing the container at the `20%` and `60%` points of the full animation range. The animation starts when the block-start edge reaches the `20%` point, which is the bottom green line. The animation ends when the start block edge is 60% of the way through the normal range, which is the top red line.

Only when the element is `50px` tall is the top of the subject still in the scrollport when the end of the animation is reached; there are no top red lines when `250px` or `500px` are selected, as the end of the animation range is outside of the scrollport.

Based on the height of our subjects, the `20%` mark is either `60px`, `100px`, or `150px` from the end edge of the scrollport (marked by the green line, which is always in the scrollport), and the `60%` mark is `180px`, `300px`, or `450px` from the same point (marked with a red line, but only visible for the `50px` subject).

For illustrative purposes, there are two light gray lines crossing the container `20%` and `60%` of the way through the scrollport, which are `50px` and `150px` from the bottom of the scrollport, respectively. As the `animation-range-*` percentages are relative to the timeline range, not the scrollport, these lines only show how the percentages **don't** align. We've also included two horizontal light gray lines going across each subject at their own `20%` and `60%` marks. These lines align with the scrollport's light gray lines when each subjects animation starts and ends.

The following image demonstrates where the subject elements are located when the animation starts (the `0%` keyframe) and ends (the `100% keyframe`). This image includes the insets from the animation timeline in the previous demonstration and the timeline without insets for comparison.

```
<div>
  <svg viewBox="-1 -1 482 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline with insets</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="571" />
    <rect class="medium end" width="100" height="250" x="120" y="450" />
    <rect class="large end" width="100" height="500" x="230" y="300" />
    <rect class="small start" width="100" height="50" x="10" y="689" />
    <rect class="medium start" width="100" height="250" x="120" y="649" />
    <rect class="large start" width="100" height="500" x="230" y="600" />
    <rect width="96" height="48" x="122" y="602" fill="url(#g)" />
    <rect width="96" height="198" x="232" y="527" fill="url(#g)" />
    <text y="610" x="385">60%</text>
    <line x1="0" x2="385" y1="600" y2="600" />
    <line x1="0" x2="385" y1="700" y2="700" />
    <text y="710" x="385">20%</text>
  </svg>
  <svg viewBox="-1 -1 482 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="125" y="250" />
    <rect class="large end" width="100" height="500" x="240" y="0" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="125" y="750" />
    <rect class="large start" width="100" height="500" x="240" y="750" />
    <text y="520" x="385">100%</text>
    <line x1="0" x2="385" y1="500" y2="500" />
    <line x1="0" x2="385" y1="750" y2="750" />
    <text y="760" x="390">0%</text>
  </svg>
</div>
```

As before, the yellow represents the position of the element when the `from` keyframe is applied, the red represents the location when the `to` keyframe is applied, and the gray represents the scrollport. The striped areas are where the red and yellow element representations overlap. For illustrative purposes, we've added dashed black horizontal lines `20%` and `60%` way through the scrollport, starting from the bottom.

The animation only begins when the element reaches the `20%` mark along the animation attachment range. This point is `60px`, `100px`, or `150px` from the bottom edge of the scroll port, depending on the size of the element. The location of the subject element at this point, representing the position of the element when the `from` or `0%` keyframe is applied, is shown in yellow.

The red represents the location of the animated element relative to the scrollport when the `to` or `100%` keyframe is applied, which is the end of the animation. This point is either `180px`, `300px`, or `450px` from the bottom edge of the scrollport, depending on the subject size. The animation occurs when the element is between the `to` and the `from` positions.

You may have noticed something interesting about the dashed horizontal lines: when the animation starts, the line that is `20%` from the end edge of the viewport is `20%` from the _top_ of the subject element and the line that is `60%` from the end edge of the viewport is `60%` from the _top_ of the subject element when the animation ends. This is what was illustrated by the very light gray lines in the live demo for this example.

### [Subject size matters](#subject_size_matters)

As we saw when we [set insets with lengths](#setting_insets_using_lengths), the size of the subject can make a difference. When setting animation ranges, percentage values are relative to the size of animation attachment range, not the scrollport. For most named ranges, the size of the attachment range depends partially on the subject size. As percentages are based on the size of the range, the named range impacts the resolved size of the insets. Depending on the name, the start position may also change, impacting the location of the range and therefore the location of progress points.

In this example, we define an active range that is `40%` of the size of the subject:

css

```
.animated_element {
  animation-range-start: exit-crossing -20%;
  animation-range-end: exit-crossing 20%;
}
```

```
article {
  background-image: none;
}
body .animated_element {
  align-self: start;
}
```

The animation lasts `40%` of the animation-attachment range. As you scroll, note how the larger the subject, the longer the range. With exit-crossing, the animation range is not cropped; it is the size of the subject even if the subject is larger than the viewport, with the range abutting the start edge of the scrollport, and extending off the end edge if the subject is larger than the scrollport.

With the `-20%` and `20%` insets, the `50px` subject's will animation over `20px`: the animation starts when the subject's end is `-10px` from range start, or `60px` from exiting the screen, and ends when the subject's end is `40px` from exiting the screen. The middle subject will animate over `100px`: the animation starts when the subject end is `-50px` from range start, which is `50px` off of the scrollport's end edge, and ends when the subject's end is `50px` into the scrollport. The large subject animates over `200px`, starting when the bottom is `600px` from the container's start edge, with only `150px` in view, and ends when the bottom is 400px from that start edge, when `100px` have scrolled off the start edge.

### [Percentages equal to the scrollport](#percentages_equal_to_the_scrollport)

When it comes to offsetting with percentages, the least complicated named timeline range is `contain`. With `contain`, the animation range is the size of the scrollport, meaning the start and end percentages are relative to the scrollport. For this reason, when using offsets, you may want to use `contain` instead of letting the range default and resolve to `cover`.

The `contain` range fully _contains_ the animation within the scrollport. It represents the range during which the principal box is either fully contained by, or fully covers, its view progress visibility range within the scrollport. With `contain`, if the subject is the same size or smaller than the scrollport, it can be fully visible. If the element is the same size as the container, however, the animation occurs over `0px`. This means that it runs, but it is not visible to the user.

In other words, without needing to know the size of the container or the subjects, we are able to limit our animation to the middle of scrollport, though the animation will happen over `0px` if the subject is the same size as the scrollport.

css

```
.animated_element {
  animation-range-start: contain 25%;
  animation-range-end: contain 75%;
}
```

```
article {
  background-image: linear-gradient(
    transparent 25%,
    #ededed 25% 75%,
    transparent 75%
  );
}
body .animated_element {
  align-self: center;
}

.animated_element {
  background-image:
    linear-gradient(black, black), linear-gradient(black, black);
  background-size: 1px 1px;
  background-position:
    center 25%,
    center 75%;
  background-repeat: repeat-x;
```

The horizontal lines denote the middle half of the scrollport and the middle half of each subject.

```
<svg class="gradient">
  <title>Striped repeating gradient</title>
  <defs>
    <linearGradient
      id="g"
      x1="0"
      y1="0"
      x2="20"
      y2="20"
      spreadMethod="repeat"
      gradientUnits="userSpaceOnUse">
      <stop offset="50%" stop-color="red" />
      <stop offset="50%" stop-color="yellow" />
    </linearGradient>
  </defs>
</svg>
```

```
body::before {
  display: block;
  text-align: center;
  font-family: sans-serif;
  font-size: 1.5rem;
}
div {
  display: flex;
  gap: 20px;
}
svg {
  width: 260px;
}
rect {
  stroke: black;
  stroke-width: 3;
}
.start {
  fill: yellow;
}
.end {
  fill: red;
}
.container {
  fill: #dedede;
}
text {
  font: 40px monospace;
  fill: black;
}
line {
  stroke: black;
  stroke-width: 2;
  stroke-dasharray: 7;
}
.gradient {
  height: 1px;
  width: 1px;
  position: absolute;
  top: -100px;
}
```

```
<main>
  <article>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll down ⇩</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <section class="one animated_element">
      <div>
        <i>Animated Element</i>
        <span></span>
      </div>
    </section>
    <section class="double">
      <div>
        <i id="A" class="animated_element">A</i>
        <i id="B" class="animated_element">B</i>
      </div>
    </section>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll up ⇧</p>
  </article>
</main>
```

```
<fieldset>
  <legend>Select the height of the animated element</legend>

  <label><input name="height" value="50" type="radio" checked /> 50px</label>
  <label><input name="height" value="250" type="radio" /> 250px</label>
  <label><input name="height" value="500" type="radio" /> 500px</label>
</fieldset>
<fieldset class="double">
  <legend>Select the animation range</legend>

  <label><input name="range" value="20" type="radio" checked />20% / 60%</label>
  <label><input name="range" value="0" type="radio" /> 0% / 100%</label>
</fieldset>
```

```
@layer {
  :root {
    --animElHeight: 50px;
    --animElHeightWord: "50px";
    --barColor: black;
    padding-top: 20px;
    --containerHeight: 250px;
  }
  body:has(input[value="250"]:checked) {
    --animElHeight: 250px;
    --animElHeightWord: "250px";
  }
  body:has(input[value="500"]:checked) {
    --animElHeight: 500px;
    --animElHeightWord: "500px";
  }
  main {
    padding: 20px 0 0 20px;
    margin-bottom: 2em;
  }
  article {
    outline: 3px dashed;
    width: 475px;
    margin: auto;
    overflow: scroll;
    position: relative;
    height: var(--containerHeight);
    box-sizing: content-box;
  }

  p {
    padding: 10px;
    margin: 10px;
  }

  section {
    --clr: yellow;
    --words: "Animation not started";
    position: relative;
    margin: 20px;
    text-align: center;
  }
  .one,
  .double i {
    animation: showAnim step-end 1 forwards;
    animation-timeline: view();
  }
  i,
  .animated_element {
    background-color: hsl(from var(--clr) h s calc(l * 1.4));
    display: block;
    height: var(--animElHeight);
    line-height: var(--animElHeight);
  }
  span {
    background-color: hsl(from var(--clr) h s 90%);
    border: 5px solid hsl(from var(--clr) h s 20%);
    min-width: 250px;
    height: 30px;
    line-height: 30px;
  }
  span,
  i {
    font-family: sans-serif;
    font-size: 1.5rem;
  }
  span::before {
    content: var(--words);
  }
  span {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 10px;
  }
  i::after {
    content: " ( " var(--animElHeightWord) " )";
  }
  label {
    padding-right: 2em;
  }
  legend {
    margin-top: 2em;
  }

  @keyframes showAnim {
    from {
      --clr: green;
      --words: "Currently animating";
    }
    to {
      --clr: red;
      --words: "Animation complete";
    }
  }
  body::before {
    display: block;
    text-align: center;
    font-family: sans-serif;
    font-size: 1.5rem;
  }

  @layer no-support {
    @supports not (animation-timeline: view()) {
      body::before {
        content: "Your browser doesn't support view progress scrolling.";
        background-color: wheat;
        display: block;
        text-align: center;
      }
    }
  }
}
```

```
.double {
  display: none;
}
```

```
.one {
  display: none;
}
.double div {
  display: flex;
  gap: 10px;
}
```

## [See also](#see_also)

-   [`<timeline-range-name>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/timeline-range-name) data type
-   [Keyframe selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Keyframe_selectors)
-   [Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)
-   [Scroll-driven animation](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) module
-   [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) module
-   [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Aug 27, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timeline_insets/contributors.txt).
