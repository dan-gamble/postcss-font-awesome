# PostCSS Font Awesome [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.svg">

[PostCSS] plugin to pull in a Font Awesome's icon unicode using `content`.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dan-gamble/postcss-font-awesome.svg
[ci]:      https://travis-ci.org/dan-gamble/postcss-font-awesome

#### Before
```css
.foo::before {
  font-awesome: camera;
}
```

#### After
```css
.foo::before {
  font-family: FontAwesome;
  content: '\f030';
}
```

## Options

### Replacement
By default the plugin just searches for the icon you want and adds the Font Awesome font family as well as the unicode characters relative to that icon inside a `content: `.

With the replacement option you can use it as a full class replacement.

#### Before
```css
.foo {
  font-awesome: camera;
}
```

#### After
```css
.foo {
  display: inline-block;
  font: normal normal normal FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.foo::before {
  font-family: FontAwesome;
  content: '\f030';
}
```

This means you won't have to add have `<i class="fa fa-camera"></i>` you can just use `<i class="foo"></i>`.

There is 1 downside to this method though, it creates a bit more CSS duplication as
```css
  display: inline-block;
  font: normal normal normal FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
```

Gets added everytime you use it instead of being on a single `.fa` class.

## Usage

```js
postcss([ require('postcss-font-awesome') ])
```

See [PostCSS] docs for examples for your environment.
