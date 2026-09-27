## [Feature summary](#feature_summary)

When positioning a tooltip relative to a UI element using anchor positioning, it is useful to provide `position-try` fallback options, via the [`position-try-fallbacks`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-try-fallbacks) property. These can be used to ensure that the tooltip is displayed on-screen for as long as possible.

For example, if the tooltip is placed above the UI element it is anchored to by default, if the user scrolls upward you can use fallbacks to move the tooltip below the element just before the tooltip goes off-screen.

One problem this doesn't solve on its own is updating the styling of the anchor-positioned element to suit the different fallback options. For example, it is common to include a small arrow on the tooltip that points to the anchor element it is associated with, improving UX by making the visual association clearer. When the tooltip moves to a different position, the position and orientation of the arrow must also change, otherwise it will look wrong.

To solve this problem, you can use anchored container queries. These extend the functionality of [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) to enable you to detect when a specific fallback option is applied to an anchor-positioned element, and apply CSS to its descendants as a result. Specifically, anchored container queries rely on two features:

-   The [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) property `anchored` value: Apply this to the anchor-positioned element to start detecting when different fallback options are applied to it.
-   The [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) at-rule `anchored()` function: This is given a [`fallback` descriptor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#fallback) as an argument. The descriptor's value is a `position-try-fallbacks` value.

For example, let's say we have a tooltip element that is positioned above its anchor by default via a [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-area) value of `top`, but has a [`position-try-fallbacks`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-try-fallbacks) value of `flip-block` specified. This will cause the tooltip to flip in the block direction to the bottom of its anchor when it starts to overflow the top of the viewport. If we want to detect when the fallback is applied to the tooltip, we first need to set `container-type: anchored` on it to turn it into an anchored query container.

css

```
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: flip-block;
  container-type: anchored;
}
```

With this in place, we can now write a container query like so:

css

```
@container anchored(fallback: flip-block) {
  /* Descendant styles here */
}
```

The query test — `anchored(fallback: flip-block)` — will return true when the `flip-block` fallback option is applied to the tooltip, in which case the styles specified within the `@container` block will be applied. You might for example want to change the position and orientation of an arrow so that it points upwards rather than downwards, or change the direction of a gradient.

**Note:** Bear in mind that, as with all container queries, the applied styles can only affect descendants of the container, not the container itself. This might require you to apply some of your positioned element styles to a wrapper element inside it, rather than to the element itself, as demonstrated in [Multiple fallbacks example](#multiple_fallbacks_example).

## [Basic usage example](#basic_usage_example)

This example includes an anchor element that has an infobox positioned relative to it. Initially, the infobox is positioned above the anchor and includes an arrow pointing down towards the anchor. We include a position try fallback so that the infobox moves below the anchor when the content scrolls up enough that the infobox starts to scroll off the top of the viewport. In addition, we use an anchored container query to change styles once the fallback kicks in, moving the arrow and pointing it upwards instead.

The anchor and infobox are represented by two [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div) elements, as shown below. They are surrounded by text content in the final rendering to cause the page to scroll, but we've hidden it for brevity:

html

```
<div class="anchor">⚓︎</div>

<div class="infobox">Infobox</div>
```

```
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox">Infobox</div>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

In our CSS, we start by specifying the `anchor` `<div>` as an anchor element by giving it an [`anchor-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/anchor-name) of `--my-anchor`.

```
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

p {
  font-size: 1.4em;
  line-height: 1.5;
}

.anchor {
  font-size: 2em;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: blue;
  width: fit-content;
  padding: 5px 10px;
}

.infobox {
  color: white;
  background-color: black;
  font-size: 1.4em;
  padding: 10px;
  margin: 1rem;
  border-radius: 10px;
}

.infobox::before {
  color: black;
  font-size: 1rem;
  margin: 0;
  line-height: 0.5;
  left: 0;
  width: 100%;
  text-align: center;
}

@supports not (container-type: anchored) {
  body::before {
    content: "Your browser does not support anchored container queries.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

css

```
.anchor {
  anchor-name: --my-anchor;
}
```

Next, we give the `infobox` `<div>` a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `fixed` and a [`position-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-anchor) value of `--my-anchor` to associate it with the anchor element. We then give the infobox a [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-area) value of `top` to position it above the anchor element and a [`position-try-fallbacks`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position-try-fallbacks) value of `bottom` so that the infobox will be moved below the anchor when it starts to overflow the top of the viewport as the content is scrolled upwards.

Finally, we set a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) value of `anchored` on the infobox to designate it as an anchored query container, meaning that we can now detect when different `position-try-fallbacks` are active on the infobox via [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) at-rules, and update styles on its descendants as a result.

css

```
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: bottom;
  container-type: anchored;
}
```

Now we'll add the arrow to the infobox using generated content on its [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::before) pseudo-element. We set the pseudo-element's [`content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content) property to a suitable down arrow icon, position it absolutely, and set its [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top) property to `105%` to position it at the bottom of the infobox (we set it to more than `100%` so that it visually matches up with the position of the corresponding up arrow).

css

```
.infobox::before {
  content: "▼";
  position: absolute;
  top: 105%;
}
```

Next we add the anchored container query. We include a `@container` at-rule with its test defined as `anchored(fallback: bottom)`. This means that when the `bottom` position-try fallback is applied to the infobox, the CSS inside the at-rule is applied to the document. Inside, we define alternative styling for the infobox `::before` pseudo-element that swaps out the down arrow icon for an up arrow and positions it at the top of the infobox.

css

```
@container anchored(fallback: bottom) {
  .infobox::before {
    content: "▲";
    bottom: 100%;
    top: auto;
  }
}
```

**Note:** There is more CSS included in this example to handle the basic styling of all the elements, but we've only shown you the parts relevant to anchored container queries. To see the full code, open the example in the MDN Playground by pressing the "Play" button on one of the code blocks or the live rendering.

This example renders like so:

Try scrolling the demo so that the anchor moves near to the top of the viewport and note how, not only does the infobox move below the anchor to remain on the screen, but the styling also updates so that the arrow icon still works for the new infobox position.

If you scroll the anchor back down towards the bottom of the viewport, the infobox will move back up above it again. We don't need to specify an additional `position-try-fallbacks` value of `top` to achieve this because `position-area: top` is the infobox's default provided position. If the provided fallbacks don't stop the anchor-positioned element from overflowing, the browser will revert to its default position.

## [Multiple fallbacks example](#multiple_fallbacks_example)

This example shows multiple position-try fallbacks and anchored container queries in action, and also addresses the problem of what to do if you want to use anchored container queries to set styles on the anchor-positioned element itself, rather than its descendants, using an extra wrapper element. The example also includes some JavaScript that allows you to move the anchor element around the screen using the mouse or the keyboard to check out the different fallbacks.

The HTML for this example includes two [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div) elements to represent the anchor and infobox. The `anchor` `<div>` includes a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex) attribute to make it keyboard-focusable, while the `infobox` `<div>` includes an extra wrapper `<div>` to apply the infobox styles to, so we can style it via `@container` at-rules.

html

```
<div class="anchor" tabindex="0">⚓︎</div>

<div class="infobox">
  <div>Infobox</div>
</div>
```

We start off our styles by specifying the `anchor` `<div>` as an anchor element, again by giving it an `anchor-name` of `--my-anchor`. We also absolutely position it so that we can move it around by setting different [inset property](https://developer.mozilla.org/en-US/docs/Glossary/Inset_properties) values on it via JavaScript.

```
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  height: 100%;
}

body {
  height: inherit;
}

p {
  font-size: 1.4em;
  line-height: 1.5;
}

.anchor {
  font-size: 2em;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: blue;
  width: fit-content;
  padding: 5px 10px;
}

@supports not (container-type: anchored) {
  body::before {
    content: "Your browser does not support anchored container queries.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

css

```
.anchor {
  anchor-name: --my-anchor;
  position: absolute;
}
```

Next, we position our infobox relative to our anchor by absolutely positioning it and giving it a `position-anchor` value of `--my-anchor`. This time we position it at the top-left of the anchor with a `position-area` value of `top left`. We then set three `position-try-fallbacks` — `flip-block`, `flip-inline`, and `flip-block flip-inline` — this causes the infobox to flip its position along its block axis, inline axis, or both, to stay on-screen when the anchor gets near to the different edges of the viewport.

Finally, we turn the infobox into an anchored query container by setting `container-type: anchored`.

css

```
.infobox {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top left;
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
  container-type: anchored;
}
```

At this point, we will show you the basic visual styles set on the infobox, to illustrate the fact that, in this case, we are setting these styles on the wrapper `<div>` inside the infobox rather than the infobox itself. As mentioned earlier, we are doing this so we can manipulate these styles via anchored container queries. This wouldn't be possible if they were set directly on the infobox, as it is the anchored query container.

Most notably, here we are setting a [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius) value that creates a rounded corner on every corner of the infobox except for the bottom-right corner. Since the infobox is positioned to the top-left of the anchor, this corner acts as an arrow, pointing at the anchor.

css

```
.infobox div {
  color: white;
  background-color: black;
  font-size: 1.4em;
  padding: 10px;
  margin: 1px;

  border-radius: 10px 10px 0 10px;
}
```

Finally, we define an anchored container query for each position-try fallback that may be applied to the infobox using `@container` at-rules. In each case, we alter the rounded corners applied to the infobox wrapper `<div>` so that the nearest corner to the anchor is always not rounded.

css

```
@container anchored(fallback: flip-block) {
  .infobox div {
    border-radius: 10px 0 10px 10px;
  }
}

@container anchored(fallback: flip-inline) {
  .infobox div {
    border-radius: 10px 10px 10px 0;
  }
}

@container anchored(fallback: flip-block flip-inline) {
  .infobox div {
    border-radius: 0 10px 10px 10px;
  }
}
```

**Note:** Again, we've hidden most of the basic styling for brevity, as well as the JavaScript that provides the movement controls (this isn't relevant to what we are trying to demonstrate here). To see the full code, open the example in the MDN Playground by pressing the "Play" button on one of the code blocks or the live rendering.

```
const anchorDiv = document.querySelector(".anchor");

let xPos = 250;
let yPos = 120;

function setPos() {
  const maxX = document.body.clientWidth - anchorDiv.clientWidth - 25;
  const maxY = document.body.clientHeight - anchorDiv.clientHeight - 25;

  if (xPos < 25) {
    xPos = 25;
  }

  if (xPos > maxX) {
    xPos = maxX;
  }

  if (yPos < 25) {
    yPos = 25;
  }

  if (yPos > maxY) {
    yPos = maxY;
  }

  anchorDiv.style.left = `${xPos}px`;
  anchorDiv.style.top = `${yPos}px`;
}

setPos();

document.body.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    yPos -= 25;
  } else if (e.key === "d") {
    xPos += 25;
  } else if (e.key === "s") {
    yPos += 25;
  } else if (e.key === "a") {
    xPos -= 25;
  }

  setPos();
});

document.body.addEventListener("click", (e) => {
  xPos = e.clientX;
  yPos = e.clientY;

  setPos();
});
```

This example renders like so:

Try moving the anchor element around the viewport by:

-   Clicking the mouse (or tapping the screen if you're on a touchscreen device) in the position you want to move the anchor to.
-   Using the W, A, S, and D keys to move the anchor up, left, down, and right, respectively.

When you move the anchor element near the edges of the screen, note how the infobox moves to different positions around it to stay on-screen, and also how the `border-radius` set on the infobox changes so that the non-rounded corner is always pointing at the anchor. Moving the anchor into the different corners is guaranteed to show you the different effects.

## [See also](#see_also)

-   [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
-   [Using container size and style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries)
-   [Using container scroll-state queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries)
-   [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning) module
-   [Learn: CSS positioning](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Apr 22, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning/Anchored_container_queries/contributors.txt).
