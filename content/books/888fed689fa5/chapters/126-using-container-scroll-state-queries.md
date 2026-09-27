There are three `@container` descriptors you can use in a `scroll-state()` query:

-   `scrollable`: Queries whether a container can be scrolled in the given direction via user-initiated scrolling (for example by dragging the scrollbar or using a trackpad gesture). In other words, is there any overflowing content in the given direction that can be scrolled to? This is useful for applying styling related to the scroll position of a scroll container. For example, you could display a hint that encourages people to scroll down and see more content when the scrollbar is up at the top, and hide it when the user has actually started scrolling.
-   `scrolled`: Queries whether a container was most recently scrolled in the given direction. This allows you to selectively apply styles based on the user's scroll direction, for example a top menu bar that only displays when the user is scrolling upwards.
-   `snapped`: Queries whether a container is going to be snapped to a [scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) container ancestor along a given axis. This is useful for applying styles when an element is snapped to a scroll snap container. For example, you might want to highlight a snapped element in some way, or reveal some of its content that was previously hidden.
-   `stuck`: Queries whether a container with a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `sticky` is stuck to an edge of its scroll container ancestor. This is useful for styling `position: sticky` elements differently when stuck — for example, you could give them a different color scheme or layout.

## [Syntax overview](#syntax_overview)

To establish a container element as a scroll-state query container, set the [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) property on it with a value of `scroll-state`. You can optionally also give it a [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name), so that you can target it with a specific container query:

css

```
.container {
  container-type: scroll-state;
  container-name: my-container;
}
```

You can then create a [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) block that specifies the query, the rules that are applied to children of the container if the test passes, and optionally, the `container-name` of the container(s) you want to query. If you don't specify a `container-name`, the container query will be applied to all scroll-state query containers on the page.

Here, we query only containers named `my-container` to determine whether the container can be scrolled towards its top edge:

css

```
@container my-container scroll-state(scrollable: top) {
  /* CSS rules go here */
}
```

**Note:** To separate scroll-state queries from other container queries, the scroll-state descriptors and value are placed inside parentheses, preceded by `scroll-state` (`scroll-state( ... )`). These constructs look like functions, but they're not.

Scroll-state [`scrollable`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#scrollable) queries, written as `scroll-state(scrollable: <keyword>)`, test whether a container's scrolling ancestor can be scrolled in the given direction via user-initiated scrolling. If not, the query returns false.

The keyword value indicates the direction you are testing for scrolling availability in, for example:

-   `top`: Tests whether the container can be scrolled towards its top edge.
-   `inline-end`: Tests whether the container can be scrolled towards its inline-end edge.
-   `y`: Tests whether the container can be scrolled in either or both directions along its y axis.

If the test passes, the rules inside the `@container` block are applied to descendants of the matching scroll container.

Let's look at an example in which we have a scrolling container full of content, and a handy little link to scroll back to the top if wished. We will use a `scrollable` query to only show the link when the user has started to scroll down through the content.

### [HTML](#html)

In the HTML we have an [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) element containing enough content to cause the document to scroll, preceded by a [back-to-top link](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#result_8):

html

```
<a class="back-to-top" href="#" aria-label="Top of page">↑</a>
<article>
  <h1>Reader with container query-controlled "back-to-top" link</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    ...
  </section>

  ...
</article>
```

We have hidden most of the HTML for brevity.

```
<a class="back-to-top" href="#" aria-label="Scroll back to top">↑</a>
<article>
  <h1>Reader with container query-controlled "back-to-top" link</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    <p>
      Mauris non malesuada est, sed vestibulum nibh. Duis vestibulum iaculis
      lectus, eu sagittis dolor dignissim iaculis. Nunc et orci sed sapien
      eleifend placerat. Curabitur dapibus risus eget odio sollicitudin, sit
      amet luctus justo pellentesque.
    </p>

    <p>
      <strong>Morbi non pharetra quam.</strong> Fusce vestibulum sem diam, ac
      consequat augue consectetur ut. Donec at augue viverra, tempus urna sit
      amet, porta augue.
      <em>Phasellus fringilla tincidunt sem ullamcorper varius.</em> Aenean
      gravida feugiat sem nec ultricies.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed pellentesque placerat mi sed maximus. Sed vitae dui vitae mi pulvinar
      gravida sed et libero.
      <a href="#">Duis nec venenatis dolor, sed tristique felis.</a>
      Integer dapibus facilisis leo elementum vulputate. Curabitur a urna quis
      nulla vulputate tincidunt quis ac enim.
    </p>

    <p>
      Cras non elit vel leo dignissim convallis. Duis eros urna, varius sit amet
      lorem vel, feugiat euismod est.
      <strong>Aliquam ornare eu elit ut iaculis.</strong>
      Suspendisse vulputate tempor leo, non rhoncus risus aliquam vel.
    </p>
  </section>
  <section>
    <header>
      <h2>This one, not so much</h2>

      <p>Suspendisse varius est ac turpis mollis cursus.</p>
    </header>

    <p>
      <strong
        >Curabitur faucibus condimentum eros, ut auctor felis lacinia
        sed.</strong
      >
      Praesent vitae scelerisque eros.
    </p>

    <p>
      <em>Ut vitae suscipit augue.</em> Cras et orci condimentum ante dignissim
      iaculis. Sed consectetur quis est sed dignissim. Nulla egestas orci erat,
      et commodo arcu feugiat ut.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed non tempor massa, at accumsan ante. Pellentesque habitant morbi
      <a href="#">tristique senectus</a> et netus et malesuada fames ac turpis
      egestas.
    </p>

    <p>
      Pellentesque placerat luctus tempor. Nunc congue dapibus eros, at
      vulputate nulla. Sed rutrum eleifend magna vel porta. Integer cursus orci
      faucibus turpis scelerisque, nec pharetra arcu molestie.
    </p>
  </section>
  <section>
    <header>
      <h2>Hopefully this section provides some clarity?</h2>

      <p>Curabitur facilisis ornare lorem et eleifend.</p>
    </header>

    <p>
      <strong>Aenean mollis non neque sed finibus.</strong> Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse sagittis viverra urna.
      In hac habitasse platea dictumst. Vestibulum neque orci, mollis sagittis
      augue et, pharetra vehicula diam.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      <a href="#">Pellentesque sollicitudin</a> nunc quis nisl condimentum, ac
      iaculis libero feugiat.
      <strong>Nullam ultrices purus a nulla dignissim hendrerit.</strong> In
      molestie consectetur est quis pulvinar.
    </p>

    <p>
      Vivamus ac erat eu est lobortis commodo. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. In nulla turpis,
      <strong>mollis et est tempor</strong>, dignissim aliquam metus. Proin eu
      arcu quis erat mollis pulvinar. Vivamus at facilisis neque.
    </p>

    <p>
      Integer bibendum laoreet erat, quis vulputate mauris bibendum nec. Class
      aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Nam ut est in arcu interdum hendrerit.
    </p>
  </section>
  <section>
    <header>
      <h2>A summary of sorts</h2>

      <p>Nunc facilisis augue quis ex porta aliquam.</p>
    </header>

    <img src="#" alt="Placeholder" />

    <p>
      <strong
        >Fusce nisi enim, venenatis a est vel, varius placerat lacus.</strong
      >
      Nunc tempus rutrum nisl bibendum aliquet. Pellentesque vitae nunc sed nisl
      tincidunt elementum a sit amet nisi. Morbi pretium at dolor in pulvinar.
      Curabitur dapibus eleifend accumsan.
    </p>

    <p>
      Donec rhoncus, leo vitae mollis maximus, tellus lorem interdum arcu, eu
      <em>tempor lectus libero in risus</em>. Ut sit amet magna vitae mauris
      tempor bibendum. <a href="#">Integer id mauris ut ex mattis finibus.</a>
    </p>

    <p>
      Curabitur dui felis, elementum et tellus id, blandit facilisis lorem.
      Aliquam sed posuere ligula, at auctor ipsum. Morbi dignissim accumsan
      tellus pretium iaculis.
    </p>
  </section>
</article>
```

### [CSS](#css)

The `.back-to-top` link is given a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `fixed`, placed at the bottom-right corner of the viewport, and moved off the viewport using a [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate) value of `80px 0`. A [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition) value will animate the `translate` and [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color) when either value changes.

```
/* General styling */

* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial", sans-serif;
  height: 100%;
}

body {
  height: inherit;
  width: 100%;
  max-width: 540px;
  padding: 20px;
  margin: 0 auto;
}

p {
  line-height: 1.5;
}

img {
  display: block;
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid gray;
  aspect-ratio: 3/2;
}
```

css

```
.back-to-top {
  width: 64px;
  height: 64px;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  translate: 80px 0;
  transition:
    0.4s translate,
    0.2s background-color;
}
```

```
.back-to-top {
  text-decoration: none;
  border-radius: 50%;
  border: 1px solid #00000077;
  background-color: #00000077;
  color: white;
  font-size: 3rem;
  text-shadow: 0 0 2px black;
  padding-bottom: 10px;
}

.back-to-top:hover,
.back-to-top:focus {
  background: #00000099;
}
```

The [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container) in this example is the `<html>` element itself, denoted as a scroll-state query container with a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) value of `scroll-state`. The [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name) isn't strictly necessary but is useful in cases where the code is added to a codebase with multiple scroll-state query containers targeted with different queries.

css

```
html {
  container-type: scroll-state;
  container-name: scroller;
}
```

Next, we define a [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) block that sets the container name targeted by this query, and the query itself — `scrollable: top`. This query applies the rules contained inside the block only if the `<html>` element can be scrolled toward its top edge — in other words, if the container has previously been scrolled downwards. If that is the case, `translate: 0 0` is applied to the `.back-to-top` link, which transitions it back on-screen.

css

```
@container scroller scroll-state(scrollable: top) {
  .back-to-top {
    translate: 0 0;
  }
}
```

We've hidden the rest of the example CSS for brevity.

### [Result](#result)

Try scrolling the document down, and note how the "back-to-top" link appears as a result, animating smoothly from the right side of the viewport due to the `transition`. If you scroll back to the top by activating the link or manually scrolling, the "back-to-top" link transitions off-screen.

Scroll-state [`scrolled`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#scrolled) queries, written as `scroll-state(scrolled: <keyword>)`, test whether a container's scrolling ancestor was most recently scrolled in the given direction. If not, the query returns false.

The keyword value indicates the direction you are testing. For example:

-   `block-start`: Tests whether the container was most recently scrolled towards its block-start edge.
-   `right`: Tests whether the container was most recently scrolled towards its right-hand edge.
-   `y`: Tests whether the container was most recently scrolled up or down along the y axis.
-   `none`: Tests whether the container is not a [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container) or has not been scrolled in any direction since rendering.

If the test returns true, the rules inside the `@container` block are applied to the descendants of the matching scroll container.

Let's look at an example of a scroll container with a `scrolled` query that displays top and bottom content "bars" only when the user is scrolling up or down, respectively.

### [HTML](#html_2)

In our HTML, we have an [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) element containing enough content to cause the document to scroll, preceded by two [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div) elements that represent our top and bottom "bars":

html

```
<div class="bar" id="top-bar">You're currently scrolling towards the top.</div>
<div class="bar" id="bottom-bar">
  You're currently scrolling towards the bottom.
</div>
<article>
  <h1>Document with scrolled container query</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    ...
  </section>

  ...
</article>
```

We have hidden most of the HTML for brevity.

```
<div class="bar" id="top-bar">You're currently scrolling towards the top.</div>
<div class="bar" id="bottom-bar">
  You're currently scrolling towards the bottom.
</div>
<article>
  <h1>Document with scrolled container query</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    <p>
      Mauris non malesuada est, sed vestibulum nibh. Duis vestibulum iaculis
      lectus, eu sagittis dolor dignissim iaculis. Nunc et orci sed sapien
      eleifend placerat. Curabitur dapibus risus eget odio sollicitudin, sit
      amet luctus justo pellentesque.
    </p>

    <p>
      <strong>Morbi non pharetra quam.</strong> Fusce vestibulum sem diam, ac
      consequat augue consectetur ut. Donec at augue viverra, tempus urna sit
      amet, porta augue.
      <em>Phasellus fringilla tincidunt sem ullamcorper varius.</em> Aenean
      gravida feugiat sem nec ultricies.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed pellentesque placerat mi sed maximus. Sed vitae dui vitae mi pulvinar
      gravida sed et libero.
      <a href="#">Duis nec venenatis dolor, sed tristique felis.</a>
      Integer dapibus facilisis leo elementum vulputate. Curabitur a urna quis
      nulla vulputate tincidunt quis ac enim.
    </p>

    <p>
      Cras non elit vel leo dignissim convallis. Duis eros urna, varius sit amet
      lorem vel, feugiat euismod est.
      <strong>Aliquam ornare eu elit ut iaculis.</strong>
      Suspendisse vulputate tempor leo, non rhoncus risus aliquam vel.
    </p>
  </section>
  <section>
    <header>
      <h2>This one, not so much</h2>

      <p>Suspendisse varius est ac turpis mollis cursus.</p>
    </header>

    <p>
      <strong
        >Curabitur faucibus condimentum eros, ut auctor felis lacinia
        sed.</strong
      >
      Praesent vitae scelerisque eros.
    </p>

    <p>
      <em>Ut vitae suscipit augue.</em> Cras et orci condimentum ante dignissim
      iaculis. Sed consectetur quis est sed dignissim. Nulla egestas orci erat,
      et commodo arcu feugiat ut.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed non tempor massa, at accumsan ante. Pellentesque habitant morbi
      <a href="#">tristique senectus</a> et netus et malesuada fames ac turpis
      egestas.
    </p>

    <p>
      Pellentesque placerat luctus tempor. Nunc congue dapibus eros, at
      vulputate nulla. Sed rutrum eleifend magna vel porta. Integer cursus orci
      faucibus turpis scelerisque, nec pharetra arcu molestie.
    </p>
  </section>
  <section>
    <header>
      <h2>Hopefully this section provides some clarity?</h2>

      <p>Curabitur facilisis ornare lorem et eleifend.</p>
    </header>

    <p>
      <strong>Aenean mollis non neque sed finibus.</strong> Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse sagittis viverra urna.
      In hac habitasse platea dictumst. Vestibulum neque orci, mollis sagittis
      augue et, pharetra vehicula diam.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      <a href="#">Pellentesque sollicitudin</a> nunc quis nisl condimentum, ac
      iaculis libero feugiat.
      <strong>Nullam ultrices purus a nulla dignissim hendrerit.</strong> In
      molestie consectetur est quis pulvinar.
    </p>

    <p>
      Vivamus ac erat eu est lobortis commodo. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. In nulla turpis,
      <strong>mollis et est tempor</strong>, dignissim aliquam metus. Proin eu
      arcu quis erat mollis pulvinar. Vivamus at facilisis neque.
    </p>

    <p>
      Integer bibendum laoreet erat, quis vulputate mauris bibendum nec. Class
      aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Nam ut est in arcu interdum hendrerit.
    </p>
  </section>
  <section>
    <header>
      <h2>A summary of sorts</h2>

      <p>Nunc facilisis augue quis ex porta aliquam.</p>
    </header>

    <img src="#" alt="Placeholder" />

    <p>
      <strong
        >Fusce nisi enim, venenatis a est vel, varius placerat lacus.</strong
      >
      Nunc tempus rutrum nisl bibendum aliquet. Pellentesque vitae nunc sed nisl
      tincidunt elementum a sit amet nisi. Morbi pretium at dolor in pulvinar.
      Curabitur dapibus eleifend accumsan.
    </p>

    <p>
      Donec rhoncus, leo vitae mollis maximus, tellus lorem interdum arcu, eu
      <em>tempor lectus libero in risus</em>. Ut sit amet magna vitae mauris
      tempor bibendum. <a href="#">Integer id mauris ut ex mattis finibus.</a>
    </p>

    <p>
      Curabitur dui felis, elementum et tellus id, blandit facilisis lorem.
      Aliquam sed posuere ligula, at auctor ipsum. Morbi dignissim accumsan
      tellus pretium iaculis.
    </p>
  </section>
</article>
```

### [CSS](#css_2)

The "bars" are given some rudimentary styling. Most significantly, they are given a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `fixed`, which we offset from either side using [`left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/left) and [`right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/right) values.

```
/* General styling */

* {
  box-sizing: border-box;
}

html {
  font-family: "Arial", sans-serif;
  height: 100%;
}

body {
  height: inherit;
  width: 90%;
  margin: 0 auto;
}

p {
  line-height: 1.5;
}

img {
  display: block;
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid gray;
  aspect-ratio: 3/2;
}
```

css

```
.bar {
  border-radius: 10px;
  border: 1px solid black;
  background-color: #00000099;
  padding: 10px;
  color: white;
  text-shadow: 1px 1px 1px black;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 5px;
  right: 5px;
}
```

Next, we set negative [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top) and [`bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/bottom) length values on the top and bottom bars so they are hidden above and below the viewport by default. We add a [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition) to smoothly animate them into view when their [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate) values change.

css

```
#top-bar {
  top: -50px;
  transition: 0.6s translate;
}

#bottom-bar {
  bottom: -50px;
  transition: 0.6s translate;
}
```

The [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container) in this example is the `<html>` element itself, denoted as a scroll-state query container with a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) value of `scroll-state`. The [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name) isn't strictly necessary, but it is useful when a codebase has multiple scroll-state query containers targeted with different queries.

css

```
html {
  container-type: scroll-state;
  container-name: scroller;
}
```

Next, we define two [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) blocks, both of which target the `scroller` container name. The first block defines a query `scrolled: block-end` and the second defines a query `scrolled: block-start`. Respectively, these queries apply the rules contained within their block only if the `<html>` element was most recently scrolled toward its block-end edge or block-start edge. In other words, when the container is scrolled down or up. When either condition becomes true, the bar referenced inside the block has a `translate` value set to cause it to transition on-screen. The bar referenced in the `@condition` that is no longer true transitions off-screen.

css

```
@container scroller scroll-state(scrolled: block-start) {
  #top-bar {
    translate: 0 55px;
  }
}

@container scroller scroll-state(scrolled: block-end) {
  #bottom-bar {
    translate: 0 -55px;
  }
}
```

We've hidden the rest of the example CSS for brevity.

### [Result](#result_2)

Try scrolling the document up and down, and note how the different bars appear as a result, animating smoothly on- and off-screen.

## [Using `snapped` queries](#using_snapped_queries)

Relevant only when [scroll snapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) is implemented, scroll-state [`snapped`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#snapped) queries, written as `scroll-state(snapped: <keyword>)`, test whether a container is going to be snapped to a [scroll snap container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_snap#scroll_snap_container) ancestor along the given axis. If not, the query returns false.

The keyword value in this case indicates the direction you are testing the element's ability to snap in, for example:

-   `x`: Tests whether the container is snapping horizontally to its scroll-snap container ancestor.
-   `inline`: Tests whether the container is snapping to its scroll-snap container ancestor in the inline direction.
-   `y`: Tests whether the container is snapping to its scroll-snap container ancestor in both directions.

To evaluate a container with a non-`none` `snapped` scroll-state query, it must be a container with a scroll-snap container ancestor, that is, the ancestor has a [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type) value other than `none`. The container query `scroll-state(snapped: none)` matches scroll-state containers that do not have a scroll container ancestor.

Evaluation will occur when the [`scrollsnapchanging`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollsnapchanging_event) event fires on the scroll snap container.

If the test passes, the rules inside the `@container` block are applied to descendants of the matching scroll snap target container.

In this example, we'll look at a scroll snap container with children that snap to it vertically and use a `snapped` query to style the children only when they are snapped or about to be snapped.

### [HTML](#html_3)

The HTML consists of a [`<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main) element that will be a scroll snap container. Inside are several [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) elements that will be snap targets. Each `<section>` contains a wrapper [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div) and an `<h2>` [heading](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements). The wrappers are included to create a style target as container queries enable styling a container's descendants, not the container itself.

html

```
<main>
  <section>
    <div class="wrapper">
      <h2>Section 1</h2>
    </div>
  </section>

  ...
</main>
```

We have hidden most of the HTML for brevity.

```
<main>
  <section>
    <div class="wrapper">
      <h2>Section 1</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 2</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 3</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 4</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 5</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 6</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 7</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 8</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 9</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 10</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 11</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 12</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 13</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 14</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 15</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 16</h2>
    </div>
  </section>
</main>
```

### [CSS](#css_3)

```
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

/* body and main sizing */

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}

main {
  gap: 50px;
}
```

We set an [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow) value of `scroll` and a fixed [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height) on the `<main>` element to turn it into a vertical scroll container. We also set a [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type) value of `y mandatory` to turn `<main>` into a scroll snap container that snap targets will snap to along the y axis; `mandatory` means that a snap target will _always_ be snapped to.

css

```
main {
  overflow: scroll;
  scroll-snap-type: y mandatory;
  height: 450px;
  width: 250px;
  border: 3px solid black;
}
```

The `<section>` elements are designated as snap targets by setting a non-`none` [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-align) value. The `center` value means that they will snap to the container at their center points.

css

```
section {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 150px;
  height: 150px;
  margin: 50px auto;

  scroll-snap-align: center;
}
```

```
.wrapper {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #eeeeee;
  box-shadow:
    inset 1px 1px 4px rgb(255 255 255 / 0.5),
    inset -1px -1px 4px rgb(0 0 0 / 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    0.6s background,
    0.6s color;
}

h2 {
  font-size: 1rem;
  letter-spacing: 1px;
}
```

We want to enable the `<section>` elements to be queried. Specifically, we want to test whether the `<section>` elements are in the process of snapping to their container, so we denote them as scroll-state query containers by setting a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) value of `scroll-state` on them. We also give them a [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name), which isn't strictly necessary, but will be useful if our code gets more complex later and we have multiple scroll-state query containers that we want to target with different queries.

css

```
section {
  container-type: scroll-state;
  container-name: snap-container;
}
```

Next, we define a [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) block that sets the container name we are targeting with this query, and the query itself — `snapped: y`. This query applies the rules contained inside the block only if a `<section>` element is being snapped vertically to its container. If that is the case, we apply a new [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background) and [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color) to the `<section>` element's child `.wrapper` `<div>` to highlight it.

css

```
@container snap-container scroll-state(snapped: y) {
  .wrapper {
    background: purple;
    color: white;
  }
}
```

### [Result](#result_3)

The rendered result is shown below. Try scrolling the container up and down, and note how the `<section>` style changes when it becomes snapped to its container.

## [Using `stuck` queries](#using_stuck_queries)

Scroll-state [`stuck`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container#scrollable) queries, written as `scroll-state(stuck: <keyword>)`, test whether a container with a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `sticky` is stuck to an edge of its scroll container ancestor. If not, the query returns false.

The keyword value in this case indicates the scroll container edge you are testing, for example:

-   `top`: Tests whether the container is stuck to the top edge of its scroll container ancestor.
-   `block-end`: Tests whether the container is stuck to the block-end edge of its scroll container ancestor.
-   `none`: Tests whether the container is not stuck to any edges of its scroll container ancestor. Note that `none` queries will match even if the container does not have `position: sticky` set on it.

If the query returns true, the rules inside the `@container` block are applied to descendants of the matching `position: sticky` container.

Let's look at an example where we have a scrolling container with overflowing content, in which the headings are set to `position: sticky` and stick to the top edge of the container when they scroll to that position. We will use a `stuck` scroll-state query to style the headings differently when they are stuck to the top edge.

### [HTML](#html_4)

In the HTML, we have an [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) element containing enough content to cause the document to scroll. It is structured using several [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) elements, each containing a [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header) with nested content:

html

```
<article>
  <h1>Sticky reader with scroll-state container query</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    ...
  </section>

  <section>
    <header>
      <h2>This one, not so much</h2>

      <p>Confecta res esset.</p>
    </header>

    ...
  </section>

  ...
</article>
```

We have hidden most of the HTML for brevity.

```
<article>
  <h1>Sticky reader with scroll-state container query</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    <p>
      Id deserunt exercitation in incididunt in dolor ipsum enim occaecat quis
      officia et. In dolore Lorem anim enim. Dolor nulla deserunt laboris irure
      incididunt labore tempor amet consectetur. Commodo eu tempor qui laboris
      duis ipsum adipisicing sunt. Do anim laboris commodo aliquip consequat ut
      eiusmod mollit sint nostrud sunt exercitation do.
    </p>

    <p>
      <strong>Est proident voluptate dolore.</strong> Aute irure ea culpa mollit
      <em>anim aute proident consectetur.</em> Duis deserunt consequat elit non.
      Cupidatat et amet anim labore est. Incididunt aute incididunt ex amet
      sint.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Ullamco duis qui amet sunt eu nulla deserunt dolore officia irure nulla.
      <a href="#">Qui enim dolore est virtus;</a>
      Erat enim consectetur.
    </p>

    <p>
      Dolor aliquip officia id esse Lorem ullamco ea veniam.
      <strong>Voluptate cillum commodo anim veniam;</strong>
      Ad nulla amet anim eu incididunt reprehenderit proident in aliqua sit
      commodo magna.
    </p>
  </section>
  <section>
    <header>
      <h2>This one, not so much</h2>

      <p>Confecta res esset.</p>
    </header>

    <p>
      <strong>Nam quid possums facere delius?</strong> Tu quidem reddes; Omnis
      peccant para dicts.
    </p>

    <p>
      <em>Pariatur ex cupidatat exercitation</em> reprehenderit quis culpa est
      proident pariatur ut.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Non nulla pariatur cillum pariatur.
      <a href="#">Ipsum magna proident fugiat qui duis et.</a>
      Reprehenderit sit ipsum ut adipisicing aliqua eiusmod nulla consectetur
      deserunt dolor dolor.
    </p>

    <p>
      Cupidatat deserunt adipisicing adipisicing occaecat voluptate duis laboris
      excepteur labore et in aliquip aute. Quis aliquip reprehenderit dolor
      nostrud cupidatat nostrud nisi occaecat elit. Magna dolor ullamco eiusmod
      deserunt elit cillum qui amet. Dolor ad consequat anim commodo eu sunt do
      tempor eu velit est.
    </p>
  </section>
  <section>
    <header>
      <h2>Hopefully this section provides some clarity?</h2>

      <p>Dolor consectetur esse aute eiusmod ex reprehenderit cupidatat.</p>
    </header>

    <p>
      <strong>Ipsum quis sint incididunt aliquip</strong>. Duis tempor sunt enim
      Lorem ut officia cillum magna.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      <a href="#">Sint modo partes vitae beatae.</a>
      Ipsum esse nostrud incididunt ipsum ipsum esse aliquip Lorem enim.
      <strong>Sed hoc sane concedays.</strong> Voluptate qui consequat dolor
      dolor dolore ex. Enim dolor enim sit proident. Ad laborum incididunt
      dolore aliquip exercitation exercitation. Sunt cupidatat esse enim duis
      proident.
    </p>

    <p>
      Labore dolor cupidatat ut velit in minim cupidatat enim nisi proident
      eiusmod.
      <strong
        >Non nostrud consectetur est occaecat ut esse esse tempor eiusmod
        non.</strong
      >
      Cupidatat aliqua dolore est sit ad exercitation nostrud nostrud eu. Qui
      consequat et aliquip ea labore.
    </p>

    <p>
      Pariatur quis quis nostrud exercitation pariatur magna veniam Lorem
      commodo cupidatat irure reprehenderit. Nostrud pariatur est pariatur elit
      sit ea voluptate minim mollit. Aliqua pariatur cupidatat et cillum. Velit
      exercitation adipisicing laboris ullamco. Incididunt id eiusmod id cillum
      qui anim. Aliquip minim nostrud excepteur dolore deserunt pariatur eu
      eiusmod reprehenderit ullamco magna.
    </p>
  </section>
  <section>
    <header>
      <h2>A summary of sorts</h2>

      <p>Irure adipisicing occaecat dolore in ex voluptate.</p>
    </header>

    <img src="#" alt="Placeholder" />

    <p>
      <strong>An quidem modi?</strong>
      <strong
        >Excepteur non Lorem ex aliqua est reprehenderit incididunt sunt in
        ullamco in et;</strong
      >
      Aliqua veniam nulla magna anim labore amet proident nisi mollit non.
      Consequat incididunt exercitation nisi consequat culpa officia aliqua
      veniam. Anim aliqua consectetur pariatur mollit proident incididunt id.
    </p>

    <p>
      Non labore, inquit, de nomin. <em>Fall igniter possimus.</em>
      <a href="#">Preterits, inquit, gaud.</a>
      Est commodo adipisicing qui duis excepteur sit ea irure amet voluptate
      deserunt anim deserunt.
    </p>

    <p>
      Ad mollit laboris reprehenderit magna tempor. Consequat pariatur esse
      ipsum duis laboris.
    </p>
  </section>
</article>
```

### [CSS](#css_4)

Each `<header>` has a [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) value of `sticky` and a [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top) value of `0`, which sticks them to the top edge of the scroll container. To test whether the `<header>` elements are stuck to the container top edge, they are denoted as scroll-state query containers with a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type) value of `scroll-state`. The [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name) isn't strictly necessary but will be useful if this code gets added to a code base with multiple scroll-state query containers targeted with different queries.

```
/* General styling */

* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial", sans-serif;
  height: 100%;
}

body {
  height: inherit;
  width: 100%;
  max-width: 540px;
  padding: 20px;
  margin: 0 auto;
}

p {
  line-height: 1.5;
}

img {
  display: block;
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid gray;
  aspect-ratio: 3/2;
}
```

css

```
header {
  background: white;
  position: sticky;
  top: 0;
  container-type: scroll-state;
  container-name: sticky-heading;
}
```

We also give the `<h2>` and `<p>` elements inside the `<header>` elements some basic styling, and a [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition) value so they will smoothly animate when their [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background) values change.

css

```
h2,
header p {
  margin: 0;
  transition: 0.4s background;
}

h2 {
  padding: 20px 5px;
  margin-bottom: 10px;
}

header p {
  font-style: italic;
  padding: 10px 5px;
}
```

Next, we define a [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) block that sets the container name we are targeting with this query, and the query itself — `stuck: top`. This query applies the rules contained inside the block only if a `<header>` element is stuck to the top of its scroll container. When that is the case, a different `background` and a [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow) are applied to the contained `<h2>` and `<p>`.

css

```
@container sticky-heading scroll-state(stuck: top) {
  h2,
  p {
    background: #cccccc;
    box-shadow: 0 5px 2px #00000077;
  }
}
```

```
@supports not (container-type: scroll-state) {
  body::before {
    content: "Your browser does not support `scroll-state` container queries.";
    color: black;
    background-color: wheat;
    position: fixed;
    left: 0;
    right: 0;
    top: 40%;
    text-align: center;
    padding: 1rem 0;
    z-index: 1;
  }
}
```

We have hidden the rest of the CSS for brevity.

### [Result](#result_4)

Try scrolling the document down and up, and note how the `<h2>` and `<p>` elements transition to a new color scheme when they become stuck to the top of their container's top edge.

## [See also](#see_also)

-   [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-name)
-   [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type)
-   [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
-   [`@container`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container)
-   [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
-   [Using container size and style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries)
-   [CSS conditional rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules) module
-   [CSS positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout) module

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Apr 6, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries/contributors.txt).
