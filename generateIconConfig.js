var path = require('path');
var fs = require('fs');
var req = require('request');

var config = {
    src: path.resolve(
        __dirname, 'node_modules', 'font-awesome', 'scss', '_variables.scss'
    ),
    dest: './icons.json'
};

req.get('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/scss/_variables.scss', function(e, d, data) {
    if (e) console.log(err);

    var lines = data.split('\n').filter(n => {
        return n !== undefined && n !== '' && n.startsWith('$fa-var-');
    });
    var icons = {};

    for (var line of lines) {
        var icon = line.substring(0, line.indexOf(':')).replace('$fa-var-', '');
        var code = line.substring(line.indexOf('\\f'), line.indexOf('";'))
                       .replace('\\f', '');

        icons[icon] = code;
    }

    fs.writeFile(config.dest, JSON.stringify(icons), function (error) {
        if (error) console.log(error);

        console.log('Icons file created');
    });
});
