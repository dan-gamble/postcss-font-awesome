# PostCSS Fontawesome [![Build Status][ci-img]][ci]

[PostCSS] plugin to pull in a Font Awesome's icon unicode using `content`.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dan-gamble/postcss-font-awesome.svg
[ci]:      https://travis-ci.org/dan-gamble/postcss-font-awesome

```css
.foo::before {
  font-awesome: camera;
}
```

```css
.foo::before {
  content: '\f030';
}
```

## Usage

```js
postcss([ require('postcss-font-awesome') ])
```

See [PostCSS] docs for examples for your environment.
