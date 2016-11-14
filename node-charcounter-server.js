// CHARACTER COUNTER - SERVER
// PURPOSE: Server-side script to receive a phrase from the client, which will then parse the phrase and output the count of each character in the phrase. NOTE: Character counts will aggregate with each new phrase sent by client, until a 'RESET-CM' is sent which will reset character counts.

var app = require('express')(),
server = require('http').createServer(app).listen(3000),
io = require('socket.io'),
sio = io.listen(server);

var fs = require('fs'),
bodyParser = require('body-parser'),
qs = require('querystring'),
sys = require('util');

// GET ARGUMENT INPUT {bar OR text}
var webpagetype = process.argv[2];

// INITIALIZE CHARACTER MAP
if(global.cm == undefined){
	global.total_hist = [];
	global.total_count = 0;
	global.total_size = 0;
}

// CREATE APP
app.use(bodyParser.urlencoded({extended: false}));

// CONNECT TO OPEN SOCKET
sio.on('connection', function(client){
	client.send('{success": 1}');
});

// MAIN PAGE GET
app.get('/', function(req, res){
	total_hist = [];
	total_count = 0;
	total_size = 0;
	res.writeHead(200, { 'Content-type': 'text/html'});
	res.end(fs.readFileSync(__dirname + '/index.html'));
});

// MAIN PAGE POST
app.post('/send', function (req, res) {
	sys.log("Phrase received!");
	// INITIALIZE CONTENT STRING
    var content = '';
    // ON REQUEST DATA, ADD DATA TO CONTENT STRING
    req.on('data', function (data) {
        content += data;
    });
    // ON REQUEST END...
    req.on('end', function () {
    	// IF CONTENT STRING IS EMPTY...
    	if (content != ''){
    		// GET PHRASE FROM DATA
			var data = qs.parse(content);
			var phrase = data['phrase'];

			// RESET CHARACTER MAP IF 'RESET-CM'
			if(phrase == 'RESET-CM'){
				total_hist = [];
				total_count = 0;
				total_size = 0;
				phrase = '';
			}

			// LOWERCASE PHRASE
			phrase = phrase.toLowerCase();

			// GET SIZE OF PHRASE AND OUTPUT SIZE+PHRASE
			var size = phrase.length;
			
			total_size += size;
			total_count += 1;

			sys.log("Phrase: " + phrase);
			sys.log("Num. of characters: " + size);
			
			// LOOP THROUGH NUM OF CHARACTERS IN PHRASE
			for(var ii = 0; ii < size; ii++){
				// GET INDIVIDUAL CHARACTER
				var chr = phrase.charAt(ii);
				// GET CHARACTER MAP INDEX OF MATCHING CHARACTER
				var cm_idx = total_hist.getIndexBy("letter",chr);

				// CHECK IF CHARACTER MAP INDEX IS UNDEFINED...
				if(cm_idx === undefined){
					// IF YES, THEN CHARACTER MAP COUNT=1
					total_hist.push({"letter": chr, "count": 1});
				}else{
					// IF NO, THEN CHARACTER MAP COUNT+1
					total_hist[cm_idx]['count'] += 1;
				}

			}
			
			// DEFINE OUTPUT OF HISTOGRAM RESULTS
			var hist_i = {
				total_hist: total_hist,
				total_count: total_count,
				total_size: total_size
			}

			if(webpagetype==='text'){
				var output = hist_i['total_hist'];
			}else if(webpagetype==='bar'){
				var output = hist_i;
			}else{
				var output = hist_i['total_hist'];
			}

			// SEND OPEN SOCKET UPDATE
			sio.emit('update', output);
			
			// SEND RESPONSE
			res.writeHead(200);
			res.end();
			return;
		}
    });
});

// DEFINE PROTOTYPE ARRAY FUNCTION FOR GETINDEXBY
Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
}


