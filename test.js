import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = {}) {
    return postcss([plugin(opts)]).process(input)
        .then(result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('converts icon name into unicode', t => {
    return run(t, 'a{ font-awesome: camera }', 'a{ font-family: FontAwesome; content: \'\\f030\' }');
});

test('converts icon name into unicode with comma seperated selectors', t => {
    return run(t, 'a, b{ font-awesome: camera }', 'a, b{ font-family: FontAwesome; content: \'\\f030\' }');
});

test('options', t => {
    return run(
        t,
        'a{ font-awesome: camera }',
        'a{ -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; text-rendering: auto; font-size: inherit; font: normal normal normal FontAwesome; display: inline-block }\na::before{ content: \'\\f030\' }', { // eslint-disable-line max-len
            replacement: true
        }
    );
});

test('options with comma seperated selectors', t => {
    return run(
        t,
        'a, b{ font-awesome: camera }',
        'a, b{ -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; text-rendering: auto; font-size: inherit; font: normal normal normal FontAwesome; display: inline-block }\na::before, b::before{ content: \'\\f030\' }', { // eslint-disable-line max-len
            replacement: true
        }
    );
});

test('if icon name doesn\'t exist just use the input value', t => {
    return run(t, 'a{ font-awesome: doesnt-exist }', 'a{ content: doesnt-exist }');
});

test('extending the content, replacing inline fa- tags after', t => {
    return run(t,
        'a::before{ content: \'Test fa-camera\'}',
        'a::before{ font-family: FontAwesome; content: \'Test \\f030\'}'
    );
});

test('extending the content, replacing inline fa- tags before', t => {
    return run(t,
        'a::before{ content: \'fa-camera Test\'}',
        'a::before{ font-family: FontAwesome; content: \'\\f030 Test\'}'
    );
});

test('extending the content, replacing inline fa- tags middle', t => {
    return run(t,
        'a::before{ content: \'Test fa-camera Test\'}',
        'a::before{ font-family: FontAwesome; content: \'Test \\f030 Test\'}'
    );
});

