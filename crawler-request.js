console.log('crawler executando..');

var request = require("request");
var cheerio = require("cheerio");
var uri = "http://ms.olx.com.br";

var limit = 0;

var start = function (page){

	console.log(page);

	var req = request({
	  uri: page,
	  encoding: 'binary'
	}, function(error, response, body) {

	  if(response.statusCode != 200){

	  	 setTimeout(start(page), 10000);

	  }else{

		  var $ = cheerio.load(body);

		  var nextPage = $("a[rel='next']").attr("href");
		  var title = stringFormat($($("h3.OLXad-list-title")[0]).text());

		  console.log(title);

		  if((limit <= 0 || limit > 1) && nextPage.length > 0){

			  limit -= 1;

			  start(nextPage);

		  }else{

		  	  console.log('crawler finalizado!');

		  }

	  }

	});
}

var stringFormat = function (value) {
      return (typeof value === 'string' ? value.trim().replace(/[\n\t\r]/g,"") : value);
}

start(uri);