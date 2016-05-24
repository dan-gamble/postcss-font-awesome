var postcss = require('postcss');
var icons = require('./icons');

module.exports = postcss.plugin('postcss-font-awesome', function (opts) {
    opts = opts || {};

    return function (css) {
        css.walkDecls('content', function (decl) {
            var theIcon = '';

            // Test to see if the content's value has an `fa-` in it
            if (/fa-/i.test(decl.value)) {
                var theIconFa = /fa-([a-z\-]*)/i.exec(decl.value);

                // Test to see if the icon actually exists
                if (theIconFa[1]) {
                    theIcon = `\\f${icons[theIconFa[1]]}`;

                    decl.cloneBefore({
                        prop: 'font-family',
                        value: 'FontAwesome'
                    });
                }

                var newValue = decl.value.replace(/(fa-[a-z\-]*)/i, theIcon);

                decl.value = newValue;
            }
        });

        css.walkDecls('font-awesome', function (decl) {
            var iconValue = decl.value;

            // Get our unicode value if it exists
            if (icons[decl.value]) {
                iconValue = `'\\f${icons[decl.value]}'`;
            }

            if (opts.replacement) {
                // Add core properties that are normally on the fa- class
                // https://github.com/FortAwesome/Font-Awesome/blob/master/scss/_core.scss#L5-L10
                decl.cloneAfter({ prop: 'display', value: 'inline-block' });
                decl.cloneAfter({
                    prop: 'font',
                    value: 'normal normal normal FontAwesome'
                });
                decl.cloneAfter({ prop: 'font-size', value: 'inherit' });
                decl.cloneAfter({ prop: 'text-rendering', value: 'auto' });
                decl.cloneAfter({
                    prop: '-webkit-font-smoothing',
                    value: 'antialiased'
                });
                decl.cloneAfter({
                    prop: '-moz-osx-font-smoothing',
                    value: 'grayscale'
                });

                // Since we want the whole font awesome styles involved we need
                // to put the unicode on a pseudo instead of the selector
                var before = decl.parent.cloneAfter({
                    nodes: [],
                    selectors: decl.parent.selectors.map(i => i + '::before')
                });
                before.append('content: ' + iconValue);
            } else {
                decl.cloneAfter({ prop: 'content', value: iconValue });

                // Only add the font family if the icon exists
                if (icons[decl.value]) {
                    decl.cloneAfter({
                        prop: 'font-family',
                        value: 'FontAwesome'
                    });
                }
            }

            // We don't want the font-awesome property persisting
            decl.remove();
        });
    };
});
