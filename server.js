const express = require('express')
const bodyParser = require('body-parser')

const server = express()
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

let listCervejas = [
	{
		"id": 1,
		"nome": "Indica",
		"familia": "IPA",
		"litragem": 600,
		"preco": 15.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/169389-1000-1000/ColoradoIndica1000x1000.jpg?v=636542262631100000",
		"data": "2010-10-10",
		"ranking": 4.9
	},
	{
		"id": 2,
		"nome": "Cauim ",
		"familia": "ALE",
		"litragem": 300,
		"preco": 6.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/171330-1000-1000/Cauim.gif?v=636643219616730000",
		"data": "2010-10-10",
		"ranking": 3.8
	},
	{
		"id": 3,
		"nome": "Appia ",
		"familia": "ALE",
		"litragem": 600,
		"preco": 11.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/169375-1000-1000/ColoradoAppia1000x1000.jpg?v=636538020330630000",
		"data": "2010-10-10",
		"ranking": 2
	},
	{
		"id": 4,
		"nome": "Gabiru",
		"familia": "IPA",
		"litragem": 600,
		"preco": 17.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/172094-1000-1000/01.jpg?v=636704778305900000",
		"data": "2010-10-10",
		"ranking": 1
	}
];


server.get('/api/beers', function (req, res) {
	console.log('get')
	res.json(listCervejas);
});

server.get('/api/beer/:id', function (req, res) {
	console.log('get', req.params.id)
	var id = req.params.id;
	var beer = listCervejas.find(x => x.id == id);
	if (!beer)
		res.json('nao encontrado').status(404)
	res.json(beer);
});

server.delete('/api/beer/:id', function (req, res) {
	console.log('delete', req.params.id)
	var id = req.params.id;

	var cerveja = listCervejas.find(x => x.id == id);
	const position = listCervejas.indexOf(cerveja);

	listCervejas.pop(listCervejas.indexOf(cerveja))

	res.json(listCervejas);
})

server.post('/api/beer', function (req, res) {
	console.log('post', req.body)

	let last = listCervejas[listCervejas.length - 1]

	cerveja = {
		"id": last.id + 1,
		"nome": req.body.nome,
		"familia": req.body.familia,
		"litragem": req.body.litragem,
		"preco": req.body.preco,
		"foto": req.body.foto,
		"data": req.body.data,
		"ranking": req.body.ranking
	}
	//console.log(cerveja)

	listCervejas.push(cerveja)

	res.json(listCervejas);
});


server.listen(3000, function () {
	console.log("NEW API - port " + 3000)
});