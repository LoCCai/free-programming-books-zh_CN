## [Motion paths in action](#motion_paths_in_action)

```
<div id="heart">
  <div id="motion-demo"></div>
</div>
```

```
#motion-demo {
  offset-path: path(
    "M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
  );
  animation: move 3000ms infinite linear;
  width: 10px;
  height: 10px;
  background: red;
}

#heart {
  width: 200px;
  height: 200px;
  background-color: lightpink;
  clip-path: path(
    "M20,70 A40,40,0,0,1,100,70 A40,40,0,0,1,180,70 Q180,130,100,190 Q20,130,20,70 Z"
  );
}

@keyframes move {
  100% {
    offset-distance: 100%;
  }
}
```

In this example, we used [CSS masking](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking) and [CSS shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Shapes) to clip a container with a light pink background into a heart shape. We used a [`path()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/path) function as the value of the [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path) property. Its child is a `10px` by `10px` red box that is made to follow the edge of its parent. We did this by using the same [`<basic-shape>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape) as the path, setting the box's [`offset-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path) property to the same `path()` function value. We used [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) to change the [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-distance) from `0%` to `100%` over three seconds.

## [Reference](#reference)

### [Properties](#properties)

-   [`offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset) shorthand
-   [`offset-anchor`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-anchor)
-   [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-distance)
-   [`offset-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path)
-   [`offset-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-position)
-   [`offset-rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-rotate)

### [Functions](#functions)

-   [`ray()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/ray)

## [Guides](#guides)

[Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using)

Step-by-step tutorial on how to create animations using CSS.

[CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms) module

-   [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform)
-   [`transform-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-origin)
-   [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate)

[CSS masking](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Masking) module

-   [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path)
-   [`clip-rule`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-rule)

[CSS shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Shapes) module

-   [`<basic-shape>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape)
-   [`circle()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/circle)
-   [`ellipse()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/ellipse)
-   [`inset()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/inset)
-   [`path()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/path)
-   [`polygon()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/polygon)
-   [`rect()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/rect)
-   [`shape()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/shape)
-   [`xywh()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/xywh)

[CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) module

-   [`animation`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation) shorthand
-   [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes)

[CSS box model](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model) module

-   [`<coord-box>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path#coord-box)

## [Specifications](#specifications)

| Specification |
| --- |
| [Motion Path Module Level 1](https://drafts.csswg.org/motion-1/) |

## [See also](#see_also)

-   [`<position>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/position_value)
-   [`<easing-function>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function)
-   [`radial-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient) function
-   [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) media query
-   [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change) CSS property

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Mar 17, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Motion_path/contributors.txt).
