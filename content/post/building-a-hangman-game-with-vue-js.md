+++
title = "Building a Hangman Game with Vue.js"
date = 2018-06-04T13:38:50-04:00
draft = false

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["vuejs", "javascript"]
categories = []
summary = "Working on a project that you are motivated to build is one of the most effective ways to learn how to code. This is a fun little project to learn about Vue.js, HTML and CSS. Vue.js is an extremely powerful and fast Javascript framework that is also easy to learn. You can use it to develop everything from complex single page applications to simple sites."

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
# Use `caption` to display an image caption.
#   Markdown linking is allowed, e.g. `caption = "[Image credit](http://example.org)"`.
# Set `preview` to `false` to disable the thumbnail in listings.
[header]
image = "vue-hangman-game.png"
caption = ""
preview = true
showImageOnPage = false

+++

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript" src="/hangman/in-page.js"></script>

<link as="style" href="/hangman/app.hangmang.css" rel="preload">
<link as="script" href="/hangman/app.hangman.js" rel="preload">
<link as="script" href="/hangman/vendors.hangman.js" rel="preload">
<link href="/hangman/app.hangman.css" rel="stylesheet">
<noscript><strong>We're sorry but hangman-game doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript>
<div style="text-align: center; margin-bottom: 40px;">
    <div id="app"></div>
</div>
<script type="text/javascript" src="/hangman/vendors.hangman.js"></script>
<script type="text/javascript" src="/hangman/app.hangman.js"></script>

Working on a project that you are motivated to build is one of the most effective ways to learn how to code. This is a fun little project to learn about Vue.js, HTML and CSS. Click New Game above to try the finished product.

### Introduction to Vue.js

[Vue.js](https://vuejs.org/) is an extremely powerful and fast Javascript framework that is also easy to learn. You can use it to develop everything from complex single page applications to simple sites.

To build the Hangman game, we will explore a few of Vue's core features:

- **Declarative Rendering and Template Syntax**. This simply means that if we declare a Javascript property to be set to a value, Vue will render it on the page. Then if the property is changed later, Vue will detect the change and reactively update the page.
- **List Rendering**. You can use the `v-for` Vue directive to iterate an array and render individual items from a list.
- **Event Handling and Methods**. With Vue you can listen for events, such as a button click and then handle those events with Javascript methods.
- **Conditional Rendering**. Showing and hiding things based on `v-if` conditionals is also easily accomplished with Vue.

### Building the Hangman Game

You can find the source code for building the Hangman game at [github.com/30platforms/vue-hangman-game](https://github.com/30platforms/vue-hangman-game) and at [codepen/30platforms](https://codepen.io/30platforms/pen/MGNaOm).

The following sections look at these core Vue concepts in a little more detail and explain how they are used in the Hangman game.

### Declarative Rendering with Lists

We use Vue's declarative rendering and template syntax to render lists throughout the Hangman game. This is accomplished by using double mustache brackets like `{{ someData }}` in our HTML template and referring to data from our Vue instance.

Here's a basic example of declarative rendering.

```html
<div id="app">
  {{message}}
</div>
```

```js
new Vue({
  el: '#app',
  data: {
      message: 'Lets build a game'
  }
})
```

The above will render the text `Lets build a game` in the `<div>` on the page.

If the underlying data is stored in an array, then a `v-for` directive can be used to iterate the array and render HTML elements for each position. A good example from the Hangman game is the list of possible letters.

```html
<div id="vfor">
  <!-- the v-for directive loops the array giving us access to each
  letter, which we can then render in the template -->
  <div v-for="letter in possibleLetters" class="possibleLetter">
    {{letter}}
  </div>
</div>
```

```js
new Vue({
  el: '#vfor',
  data: {
    possibleLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  }
})
```
This will render the letters shown below. If you right click an inspect the letters below, you will see that each letter is an individual `<div>{{letter}}</div>` that was rendered by the `v-for` loop.

<div id="vfor" class="text-center">
  <div class="possibleLetter" v-for="letter in possibleLetters">
    {{letter}}
  </div>
</div>

### Event Handling and Methods

Vue.js provides a convenient syntax for attaching event listeners to HTML elements. Event listeners usually call methods defined in the Vue instance. Event listeners are added by using the `@` symbol + event name. For instance, `@click`.

In the Hangman game, we use event listeners on the possible letter choices. Each letter choice div has a click event listener which calls a `tryLetter` method declared as `<div @click="tryLetter(letter)">`. 

If the tryLetter method finds a match in `wordLetters`, then the `displayLetters` array is updated with a `splice` and Vue renders the updates on the page. See [this caveat](https://vuejs.org/v2/guide/list.html#Caveats) from the Vue docs if you are wondering why splice is used.

Here's an example from the Hangman game. Click the letters below to see if you can complete the word.

```html
<div id="eventlistener">
  <!-- the @click listener will call the tryLetter method after the click event
  on one of the letters -->
  <div>
    <div v-for="letter in displayLetters" class="letter">
      {{letter}}
    </div>
  </div>
  <div>
    <div @click="tryLetter(letter)" v-for="letter in possibleLetters" class="possibleLetter">
      {{letter}}
    </div>
  </div>
  <div>
   {{console}}
  </div>
</div>
```

```js
new Vue({
  el: '#eventlistener',
  data: {
    displayLetters: ['','','',''],
    wordLetters: ['C','O','O','L'],
    possibleLetters: ['A', 'B', 'C', 'L', 'O'],
    console: 'Click a letter above to see the result'
  },
  methods: {
    tryLetter(letter) {
      for (let i = 0; i < this.displayLetters.length; i++) {
        if (letter === this.wordLetters[i]) {
          this.displayLetters.splice(i, 1, letter)
        }
      }
      this.console = 'I tried letter ' + letter
    }
  }
})
```

<div id="eventlistener" class="text-center">
  <div>
  <div v-for="letter in displayLetters" class="letter">
    {{letter}}
  </div>
  </div>
  <div>
  <div @click="tryLetter(letter)" v-for="letter in possibleLetters" class="possibleLetter">
    {{letter}}
  </div>
  </div>
  <div>
   {{console}}
  </div>
</div>

### Conditional Rendering

You can conditionally add or remove elements from a page using a `v-if` directive. A `v-if` directive refers to a boolean data property, a conditional expression or to a method which returns a boolean.

In the Hangman game, each time a letter is chosen which is not found in the word, we record a strike and conditionally render part of the SVG drawing with a `v-if` directive.

Here's a simplified example. Click the button to record a strike and see it in action.

```html
<div id="conditionalrendering">
  <!-- The divs will be automatically rendered when the v-if condition becomes true -->
  <button @click="addStrike">
    Add Strike
  </button>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="275px" viewBox="0 0 350 300" preserveAspectRatio="xMidYMid meet">
    <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:black;" />
    <line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:black;" />
    <line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:black;" />
    <line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:black;" />
    <line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:black;" />
    <circle v-if="strikes > 5" cx="230" cy="90" style="fill:khaki;stroke:black;" r="20" />
    <line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:black;" />
    <line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="120" style="stroke:black;" />
    <line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="120" style="stroke:black;" />
    <line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="200" style="stroke:black;" />
    <line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="200" style="stroke:black;" />
  </svg>
</div>
```

```js
new Vue({
  el: '#conditionalrendering',
  data: {
    strikes: 0
  },
  methods: {
    addStrike() {
      this.strikes++
    }
  }
})
```

<div id="conditionalrendering" class="text-center">
  <button @click="addStrike">
    Add Strike
  </button>
  <div style="margin-top: 10px">
<svg v-if="strikes > 0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350px" height="275px" viewBox="0 0 350 300"
      preserveAspectRatio="xMidYMid meet">
      <line v-if="strikes > 0" x1="80" y1="257" x2="260" y2="257" style="stroke:black;" />
      <line v-if="strikes > 1" x1="100" y1="257" x2="100" y2="40" style="stroke:black;" />
      <line v-if="strikes > 2" x1="100" y1="40" x2="230" y2="40" style="stroke:black;" />
      <line v-if="strikes > 3" x1="100" y1="80" x2="130" y2="40" style="stroke:black;" />
      <line v-if="strikes > 4" x1="230" y1="40" x2="230" y2="80" style="stroke:black;" />
      <circle v-if="strikes > 5" cx="230" cy="90" style="fill:khaki;stroke:black;stroke-width:2px;" r="20" />
      <line v-if="strikes > 6" x1="230" y1="110" x2="230" y2="170" style="stroke:black;" />
      <line v-if="strikes > 7" x1="230" y1="140" x2="250" y2="120" style="stroke:black;" />
      <line v-if="strikes > 8" x1="230" y1="140" x2="210" y2="120" style="stroke:black;" />
      <line v-if="strikes > 9" x1="230" y1="170" x2="250" y2="200" style="stroke:black;" />
      <line v-if="strikes > 10" x1="230" y1="170" x2="210" y2="200" style="stroke:black;" />
    </svg>
  </div>
</div>

### Wrapping Up

Thank you, I hope you enjoyed this article. If you have any questions or feedback, I'd love to hear from you. Hit me up [@30Platforms](https://www.twitter.com/30platforms) or drop in your email below.