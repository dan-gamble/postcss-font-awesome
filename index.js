var postcss = require('postcss');
var icons = require('./icons');

module.exports = postcss.plugin('postcss-fontawesome', function () {
    return function (css) {
        css.walkDecls('font-awesome', function (decl) {
            var iconValue = decl.value;

            if (icons[decl.value]) {
                iconValue = `'\f${icons[decl.value]}'`;
            }

            decl.cloneAfter({ prop: 'content', value: iconValue });
            decl.remove();
        });
    };
});
