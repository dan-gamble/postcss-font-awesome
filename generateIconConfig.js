var path = require('path');
var fs = require('fs');
var https = require('https');

var config = {
    src: path.resolve(
        __dirname, 'node_modules', 'font-awesome', 'scss', '_variables.scss'
    ),
    dest: './icons.json'
};

var varsUrl = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/';
varsUrl += 'master/scss/_variables.scss';

https.request(varsUrl, function (res) {
    if (res.statusCode !== 200) {
        throw new Error(
            'Failed to fetch variables from Github, got HTTP ' + res.statusCode
        );
    }

    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        data += chunk;
    });

    res.on('end', function () {
        var lines = data.split('\n').filter(n => {
            return n !== undefined && n !== '' && n.startsWith('$fa-var-');
        });
        var icons = {};

        for (var line of lines) {
            var icon = line.substring(0, line.indexOf(':'))
                    .replace('$fa-var-', '');

            var code = line.substring(line.indexOf('\\f'), line.indexOf('";'))
                    .replace('\\f', '');

            icons[icon] = code;
        }

        fs.writeFile(config.dest, JSON.stringify(icons), function (error) {
            if (error) {
                throw error;
            }

            console.log('Icons file created');
        });
    });
}).end();
