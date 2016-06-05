'use strict'

console.log('Server iniciando..');

const fs = require('fs');
const gerarCrawlerData = require('./crawler-xray.js');
const http = require('http');
const port = 3000;
const servicos = ["/gerar", "/items"];
const fileName = "results.json";

var first = true;

http.createServer(function(req, res) {

	var uri = req.url;

	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); 

	console.info("Remote ip: " + req.connection.remoteAddress + " url: " + uri);

	switch(uri) {
	    case servicos[0]:
	        gerarCrawlerData();
			res.write("Crawler data gerando em background, verificar no console o andamento! \n\n");
			res.write("Para obter os dados após gerados acessar: \n\n");
			res.write("GET /items \n");
			res.end();
	        break;
	    case servicos[1]:
	        enviarCrawlerData(res);
	        break;
	    default:
	        res.write("Crawler OLX \n\n");
			res.write("Serviços: \n\n");

			for(var i = 0; i < servicos.length; i++){
				res.write("GET " + servicos[i] +" \n");
			}

			res.end();
	} 	


}).listen(port, function(){
    console.log('Server iniciado em localhost:' + port);
    console.log('');
});

var enviarCrawlerData = function(response){
	console.log('Iniciando envio crawlerData');

	carregarCrawlerData(response);

	console.log('CrawlerData enviado!');
}

var carregarCrawlerData = function(response){
	fs.readFile(fileName, 'utf8', function(err, data) {
	  	response.end(data);
	});
}