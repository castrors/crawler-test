console.log('server iniciando..');


var http = require('http');
var port = 3000;

http.createServer(function(req,res) {

	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); 
	res.end('Crawler');

}).listen(port);


console.log('server iniciado em localhost:' + port);