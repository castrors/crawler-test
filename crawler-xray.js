console.log('crawler executando..');

var Xray = require('x-ray');

var uri = "http://ms.olx.com.br";

var x = Xray({
  filters: {
    trim: function (value) {
      return (typeof value === 'string' ? value.trim().replace(/[\n\t\r]/g,"") : value);
    }
  }
});

x(uri, 'body', [{
  pageRequest: '.module_pagination li.active@text | trim',
  itens: x('li.item', [{
				id: 'a.OLXad-list-link@id',
				url: 'a.OLXad-list-link@href',
				value: 'p.OLXad-list-price',
				title: 'h3.OLXad-list-title | trim',
				detail: 'p.detail-specific | trim',
				region: 'p.detail-region | trim'
		 }])
}])
// (function(err, obj) {

// 	if(err != null){
// 		console.log(err);
// 	}

// 	console.log('crawler finalizado!');
// })
.paginate('.next a.link@href')
.limit(2)
.write('results.json');