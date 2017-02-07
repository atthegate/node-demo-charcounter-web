var http = require('http'), 
qs = require('querystring'),
sys = require('util');

function send (thePhrase) {
    http.request({
        host: '127.0.0.1'
        , port: 3000
        , path: '/send'
        , method: 'POST'
    }, function (res) {
        res.setEncoding('utf-8');
        res.on('end', function () {
            console.log('\n   \033[090m request complete!\033[39m');
            process.stdout.write('\n   Phrase:  ');
        })
        process.exit();
    }).end(qs.stringify({ phrase: thePhrase}));
}

var phrase = process.argv[2];
sys.log(phrase)

send(phrase.replace('\n', ''));

