# PostCSS Fontawesome [![Build Status][ci-img]][ci]

[PostCSS] plugin to pull in a Font Awesome's icon unicode.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dan-gamble/postcss-fontawesome.svg
[ci]:      https://travis-ci.org/dan-gamble/postcss-fontawesome

```css
.foo::before {
    font-awesome: camera;
}
```

```css
.foo {
  content: '\f030';
}
```

## Usage

```js
postcss([ require('postcss-font-awesome') ])
```

See [PostCSS] docs for examples for your environment.
