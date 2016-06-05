'use strict'

const Xray = require('x-ray');
const fs = require('fs');
const uri = "http://ms.olx.com.br/imoveis";
const fileName = "results.json";

const x = Xray({
  filters: {
    clearString: function (value) {
      return clearString(value);
    },
    number: function (value) {
      return number(value);
    },
    amount: function (value) {
      return amount(value);
    }
  }
});

var gravarCrawlerData = function(obj){
  fs.writeFile(fileName, JSON.stringify(obj), 'utf8'); 
}

var clearString = function(value){
  return (typeof value === 'string' ? value.trim().replace(/[\n\t\r]/g,"") : value);
} 

var number = function(value){
  return (value != null ? Number(value) : value);
} 

var amount = function(value){
  return number(clearString(value.replace("R$","").replace(".","").replace(",",".").trim()));
}

var gerarCrawlerData = function(){

  var id = "[" + Date.now() + "]";

  console.log(id + 'Crawler executando..');

  x(uri, '#main-ad-list li.item', [{
          id: 'a.OLXad-list-link@id | number',
          url: 'a.OLXad-list-link@href',
          amount: 'p.OLXad-list-price | amount',
          tags: ['.OLXad-list-line-2 p | clearString']
  }])
  (function(err, obj) {

    if (err){ 
      console.log(id + 'Crawler erro: ');
      console.log(err);
    }

    gravarCrawlerData(obj);

    console.log(id + 'Crawler finalizado com sucesso, itens obtidos: ' + obj.length);

  })
  .paginate('.next a.link@href');
//  .limit(2);

}

//Ao iniciar ja executa o gerar, para executar apenas via comando do server basta comentar esta chamada
gerarCrawlerData();

module.exports = gerarCrawlerData;