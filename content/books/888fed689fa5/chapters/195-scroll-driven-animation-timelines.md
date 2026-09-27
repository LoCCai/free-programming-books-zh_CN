The [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) module defines properties that enable [CSS keyframe animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using#defining_an_animation_sequence_using_keyframes) to be linked to scrolling.

### [Timeline progression](#timeline_progression)

Animations can be set to progress along a _scroll-based timeline_ instead of the default time-based document timeline, without needing JavaScript. CSS enables us to [define which animation timeline](#animation_timelines) to use, including animating elements by scrolling a scrollable element rather than by the passing of time.

### [Performance benefits](#performance_benefits)

CSS scroll-driven animations are performant. JavaScript scroll-driven animations require [`scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event) event listeners and [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) objects on the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread) to track elements across the [scrollport](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container#scrollport). Any time you rely on the main thread to render effects with JavaScript, you run the risk of blocking the main thread, which can lead to an unresponsive page and a bad user experience, or [jank](https://developer.mozilla.org/en-US/docs/Glossary/Jank).

## [Foundations](#foundations)

Scroll-driven animations build upon [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) and the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). Before creating scroll-driven animations, you must have an understanding of CSS [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes) animations. See the [using CSS animations guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using) to learn more.

In CSS, animations are created by attaching keyframe animations to an element using the [`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-name) property (or [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation) shorthand). By default, animations run on the default document timeline, moving from the `from` keyframe to the `to` keyframe as time passes by, with the animation lasting as long as the time defined by the [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-duration) property value. When set to run on the default document timeline, animations play through to completion unless prevented from doing so, for example, by having the [`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-play-state) set to `paused` or by removing the `animation-name` from the element.

Scroll-driven animations are CSS animations that are not run on the default [DocumentTimeline](https://developer.mozilla.org/en-US/docs/Web/API/DocumentTimeline). Instead, they run on a scroll-progress or view-progress timeline, which is driven by the scrolling of an element's contents. There's a direct link between the user's scrolling action and the animation's progress along the `@keyframe` keyframes. As the user scrolls up, down, left, or right, the animation moves forward or backward through the keyframe progression. When scrolling is paused, the animation pauses, as if `animation-play-state` were set to `pause`.

## [Animation timelines](#animation_timelines)

The [`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) property, defined in the [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) module, is used to set the timeline used for the animation.

The [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) module defines features for setting the `animation-timeline` as a scroll-progress or view-progress timeline. You can explicitly [name an element as a timeline controller](#named_scroll_progress_timelines) using the `scroll-timeline-*` and `view-timeline-*` properties, then set that name as the `animation-timeline` of a descendant element. You can also define _anonymous scroll progress timelines_ and _anonymous view progress timelines_ using the [`scroll()`](#scroll_progress_timelines) and [`view()`](#view_progress_timelines)) functions.

Alternatively, the `animation-timeline` property can be used to explicitly state that the [default document timeline be used](#regular_css_animations_default_document_timeline) or to specify that the [animation doesn't have a timeline](#removing_an_animations_timeline), and therefore shouldn't occur at all.

### [Regular CSS animations: default document timeline](#regular_css_animations_default_document_timeline)

Setting `animation-timeline` explicitly to `auto`, or omitting the property and allowing it to default to `auto`, sets the timeline to be the default document timeline. When set to this default value, the animation's progress is determined by the [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-duration), the [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-delay), and how much time has passed since the animation was associated with the element via the `animation-name` property. The time-based document timeline is the timeline traditionally associated with CSS animations.

css

```
:checked ~ .container > .item {
  animation-name: action;
  animation-duration: 3s;
  animation-delay: 500ms;
  animation-timeline: auto;
}
```

We create a rotation keyframe animation called `action`:

css

```
@keyframes action {
  from {
    rotate: 45deg;
  }
  to {
    rotate: 765deg;
  }
}
```

```
<input type="checkbox" id="i" />
<label for="i">
  Check to apply the animation. Uncheck to remove the animation
</label>
<div class="container">
  <span class="item"></span>
</div>
```

```
div {
  width: 400px;
  height: 100px;
  border: 1px solid;
  background-color: palegoldenrod;
  position: relative;
}
span {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  position: absolute;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

When the checkbox is checked, the `action` animation is applied to the element. When unchecked, the animation is not applied to the `<div>`.

Try checking the checkbox. Nothing will happen during the half-second animation delay. Then, once the animation starts, the box will jump to a 45-degree rotation, and then it will take 3 seconds to rotate an additional 720 degrees, or two additional full rotations. After a total of three and a half seconds, the animation concludes, and the `<div>` will return to its default non-rotated state.

**Note:** The `animation-timeline` is reset to the default `auto` value by the [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation) shorthand property, but cannot be set using the shorthand. Therefore, when creating scroll-driven animations, always declare the `animation-timeline` after any `animation` shorthand declarations to achieve the desired effect.

With _scroll progress timeline_, the timeline progresses based on the scrolling of the scrollable element (_scroller_) from top to bottom (or left to right) and back again. By default, the position in the scroll range is converted into a percentage of progress — `0%` at the start and `100%` at the end.

To create a scroll progress timeline, the `animation-timeline` value must reference the scroller, which can be named or anonymous.

### [Named scroll progress timelines](#named_scroll_progress_timelines)

A _named scroll progress timeline_ is one where the scroller is explicitly named using the [`scroll-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-timeline-name) property (or the [`scroll-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-timeline) shorthand). The name is a [`<dashed-ident>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/dashed-ident). The scroller is linked to the element to be animated by specifying its `scroll-timeline-name` as the value of that element's `animation-timeline` property.

Our HTML includes three elements: the `item`, which we will animate; its `container`, which we will scroll; and the scroller. The `container` needs to be large enough to overflow its `scroller` parent: If there is no scrolling, there will be no scroll timeline.

html

```
<main class="scroller">
  <div class="container">
    <span class="item"></span>
  </div>
</main>
```

We provide some basic styles. The important ones include setting a height on the container that is taller than the scroller, and then setting the overflow to allow scrolling:

css

```
.scroller {
  width: 400px;
  height: 100px;
  overflow: scroll;
}
.container {
  height: 200px;
}
```

Setting an `animation-timeline` on the animated element that matches the `scroll-timeline-name` of an ancestor element is what creates the named scroll progress timeline. We also have to include an animation, which we do by setting the value of the `animation-name` component of the [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation) shorthand to the [`<custom-ident>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/custom-ident) name of our keyframe animation:

css

```
.scroller {
  scroll-timeline-name: --rotate;
}
.item {
  animation: action 1ms linear;
  animation-timeline: --rotate;
}
```

```
main {
  border: 1px solid;
  background-color: palegoldenrod;
}
div {
  position: relative;
}
span {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  position: absolute;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

In this case, we don't have a checkbox, as the `action` animation progression is controlled by the scrolling of the overflowing scroller, which, unlike time, does not expire.

Before any scrolling occurs, the container's position is at the top of the scroller, and the animation is at the 0% keyframe. Try scrolling down. As you scroll, the animation progresses through the timeline, rotating an additional 720 degrees. When you can no longer scroll, the animation's progression is at the 100%, or `to`, keyframe. The animated item doesn't return to its default rotation unless the scroller is scrolled back up to the top.

#### Animation duration

You may have noticed that the [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-duration) component of the `animation` shorthand was set to `1ms`. When creating [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), specifying an `animation-duration` value does not affect the duration of the animation, and shouldn't be necessary. However, durations can affect non-linear view progress animation timelines, and Firefox requires a non-zero `animation-duration` to apply an animation to an element. For these reasons, it is common practice to set `animation-duration` to `1ms`.

Setting `animation-duration: 1ms` ensures that the animation works in Firefox, the animation effect is consistent across all browsers, and the animation is hidden if a browser doesn't support view progress animation timelines. If the browser supports keyframe animations, the animation will not be visible to the user. However, the animation still happens, and animation events are fired.

### [Anonymous scroll progress timelines](#anonymous_scroll_progress_timelines)

You don't have to name your scroll progress timeline. Instead, you can associate an _anonymous scroll progress timeline_ with the animation. In this case, the `animation-timeline` of the element to animate is set to a [`scroll()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/scroll) function. The function selects the scroller that provides the scroll progress timeline and the scroll axis to use based on the optional arguments you pass to it. One parameter is a [`<scroller>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/scroll#scroller) keyword defining the relationship of the scroller element to the current element (`nearest`, `root`, or `self`). The other is the scrollbar [`<axis>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/scroll#axis) value (`block`, `inline`, `y`, or `x`).

This example uses all the same CSS as the previous example, except for the `animation-timeline`, which we set to a `scroll()` function. We are also overriding the size of the container to change the direction of the scroll:

css

```
.item {
  animation: action 1ms linear;
  animation-timeline: scroll(nearest inline);
}
.container {
  inline-size: 800px;
  block-size: 100%;
}
```

We set an [`inline-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inline-size) on the container so that it overflows in the inline direction, and set the [`block-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/block-size) to `100%` so it no longer overflows in the block direction. Try scrolling in the inline direction.

## [View progress timelines](#view_progress_timelines)

You can also progress an animation based on the change in visibility of an element inside a scroller — this is done via _view progress timelines_. Instead of tracking the scroll offset of a scroll container, view progress timelines track the relative position of an element, called the _subject_, within a scrollport. The progression of an animation's keyframes is based on the _visibility_ of the subject inside the scroller. Unlike scroll progress timelines, with view progress timelines, you can't specify the scroller — the subject's visibility is always tracked within its nearest ancestor scroller.

A view progress timeline animation only occurs when the element is visible within its scrollport. Timeline progress starts at `0%` when the tracked subject starts intersecting the scrollport at the block or inline end edge. The `100%` occurs when the subject exits the scrollport at the block or inline start edge.

Because the `100%` is generally reached when the element leaves the viewport, you likely want to set the final effect of your animation in a keyframe block that occurs well before the end of the animation. You can set your completed effect within the `20%`, `50%`, or `80%` keyframe block rather than using the `to` or `100%` keyframe to ensure the element finishes animating while still in view.

With view progress timelines, you can adjust the view progress visibility range. Use [`view-timeline-inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-inset), part of the [`view-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline) shorthand, to adjust when the subject is considered to be in view. The default value is `auto`. The effect of any non-`auto` inset value is as if you moved the edges of the scroll port: a positive inset value creates an inward adjustment, and a negative value creates an outward adjustment.

Similar to scroll progress timelines, the view progress timeline can be named or anonymous.

### [Named view progress timeline](#named_view_progress_timeline)

A _named view progress timeline_ is one where the subject is explicitly named using the [`view-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-name) property, a component of the `view-timeline` shorthand. The `<dashed-ident>` name is then linked to the element to animate by specifying it as the value of that element's `animation-timeline` property.

With named view progress timelines, the element to animate does not have to be the same as the subject. In other words, the element controlling the timeline doesn't have to be the same as the element being animated. This means you can animate one element based on another element's movement within its scrollable container.

Here we use the [`view-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-name) property to name an element, identifying the element itself as the source of a view progress timeline. We then set that name as the value of the `animation-timeline` property.

css

```
.item {
  animation: action 1ms linear;

  view-timeline-name: --a-name;
  animation-timeline: --a-name;
}
```

We applied the animation **before** the animation timeline, as the `animation` resets the `animation-timeline` to `auto`.

The animation is slightly different from the previous examples in that the spinning effect starts at `20%` and ends at `80%` of the way through the animation; this means the element will not be actively spinning when it first comes into view and will stop spinning before it is completely out of view.

css

```
@keyframes action {
  0%,
  20% {
    rotate: 45deg;
  }
  80%,
  100% {
    rotate: 720deg;
  }
}
```

```
.scroller {
  width: 400px;
  height: 200px;
  line-height: 2;
  overflow: scroll;
  border: 1px solid;
  background-color: palegoldenrod;
}
.item {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

```
<main class="scroller">
  <p>Scroll down to view the animation</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <div class="item"></div>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>Scroll up to view the animation</p>
</main>
```

Scroll the element into view. Note that the element animates through the `@keyframes` animation as it moves through the visible area of its ancestor scroller.

### [Anonymous view progress timeline: the `view()` function](#anonymous_view_progress_timeline_the_view_function)

Alternatively, a [`view()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/view) function can be set as the value of the `animation-timeline` property to specify that an element's animation timeline is an _anonymous view progress timeline_. This causes the element to be animated based on its position inside its nearest parent scroller.

The `view()` function creates a view timeline. You attach the timeline to the element you want to animate using the `animation-timeline` property. The function creates a view timeline for each element matched by the selector.

In this example, we again define the `animation` before the `animation-timeline`, so the timeline is not reset. We then include an argument-less `view()` function. We don't specify a scroller, as, by definition, the subject's visibility is tracked by its nearest ancestor scroller.

css

```
.item {
  animation: action 1ms linear;
  animation-timeline: view();
}
```

### [Parameters of the `view()` function](#parameters_of_the_view_function)

The `view()` function takes up to three optional values as arguments:

-   Zero or one `<axis>` parameters. If set, this specifies the scroll axis along which the animation progresses.
-   Either the keyword `auto` or zero, one, or two [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length-percentage) inset values. If set, these values specify offsets for the scrollport start and/or end.

Declaring `view()` is equivalent to `view(block auto)`, which defines `block` as the axis of the parent element that supplies the timeline and the [`scroll-padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding), which generally defaults to `0`, as the insets within the visible area at which the animation starts and ends.

The function sets the values of the [`view-timeline-axis`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-axis) and [`view-timeline-inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-inset) properties.

The [`view-timeline-inset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline-inset) arguments specify insets (if positive) or outsets (if negative) that adjust the start and end of the scrollport. They are used to determine the scroll positions at which the element is considered "in view", which determines the length of the animation timeline. In other words, instead of starting at the start edge and ending at the end edge of the scrollport, the animation occurs at the start and end of the inset-adjusted view.

Unlike the scroll timeline's `scroll()` function, there is no `<scroller>` argument in the `view()` function, as the view timeline always tracks the subject within its nearest ancestor scroll container.

In this example, as we are using inset values, we can use the `from` and `to` [keyframe selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Keyframe_selectors).

css

```
@keyframes action {
  from {
    rotate: 45deg;
  }
  to {
    rotate: 720deg;
  }
}

.item {
  animation: action 1ms linear;
  animation-timeline: view(block 20% 20%);
}
```

## [Accessibility concerns](#accessibility_concerns)

As with all animations and transitions, always take any user's [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) preference into account.

### [Removing an animation's timeline](#removing_an_animations_timeline)

Setting `animation-timeline: none` disassociates the element from all animation timelines, including the default time-based document timeline, meaning the element will not animate. While some animations may be necessary, you can remove animations based on the user's `prefers-reduced-motion` setting with:

css

```
@media (prefers-reduced-motion: reduce) {
  .optionalAnimations {
    animation-timeline: none;
  }
}
```

Because the `animation` shorthand sets the `animation-timeline` to `auto`, use a selector with enough specificity to ensure your `animation-timeline` isn't overridden by your `animation` shorthand declarations.

## [See also](#see_also)

-   [Understanding timeline range names](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timeline_range_names)
-   [Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) module
-   [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) module
-   [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Mar 29, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines/contributors.txt).
