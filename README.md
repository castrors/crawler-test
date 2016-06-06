# crawler-test
Crawler implementado em node-js.

Para testar basta instalar os modulos dependentes: 

  npm install x-ray
  
  npm install superagent-charset

Após, para subir o microservice: 

  node server.js
  
Ou apenas executar o crawler sem expor o serviço:

 node crawler-xray.js

Obs.: Para funcionar o encoding do x-ray basta copiar o arquivo http-driver.js substituindo o que já vem no modulo no diretório:
	./node_modules/x-ray/node_modules/x-ray-crawler/lib

Ao executar o server.js o crawler-xray.js terá sua função de gerarCrawlerData() executada. 
Para não iniciar o crawler ao subir, basta comentar a linha da chamada ao método no crawler-xray.js, onde a função 
pode ser chamada via serviço exposto no server.
