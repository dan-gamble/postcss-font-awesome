import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('converts icon name into unicode', t => {
    return run(t, 'a{ font-awesome: camera }', 'a{ content: \'\f030\' }');
});

test('converts icon name into unicode', t => {
    return run(t, 'a{ font-awesome: facebook }', 'a{ content: \'\f09a\' }');
});

test('if icon name doesn\'t exist just use the input value', t => {
    return run(t, 'a{ font-awesome: doesnt-exist }',
                  'a{ content: doesnt-exist }');
});
