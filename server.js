const express = require('express')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var morgan  = require('morgan')

const server = express()
server.use(morgan())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
});

let listCervejas = [
	{
		"id": 1,
		"nome": "Indica Colorado",
		"familia": "IPA",
		"litragem": 600,
		"preco": 15.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/169389-1000-1000/ColoradoIndica1000x1000.jpg?v=636542262631100000",
		"data": "2010-10-10",
		"ranking": 4.9,
		"unidade": "M"
	},
	{
		"id": 2,
		"nome": "Cauim Colorado",
		"familia": "ALE",
		"litragem": 300,
		"preco": 6.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/171330-1000-1000/Cauim.gif?v=636643219616730000",
		"data": "2010-10-10",
		"ranking": 3.8,		
		"unidade": "M"
	},
	{
		"id": 3,
		"nome": "Appia Colorado",
		"familia": "ALE",
		"litragem": 600,
		"preco": 11.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/169375-1000-1000/ColoradoAppia1000x1000.jpg?v=636538020330630000",
		"data": "2010-10-10",
		"ranking": 2,
		"unidade": "M"
	},
	{
		"id": 4,
		"nome": "Gabiru Colorado",
		"familia": "IPA",
		"litragem": 1,
		"preco": 17.90,
		"foto": "https://emporiodacerveja.vteximg.com.br/arquivos/ids/172094-1000-1000/01.jpg?v=636704778305900000",
		"data": "2010-10-10",
		"ranking": 1,		
		"unidade": "L"
	}
];
let chaveSecreta = "chaveSecreta"

server.get('/api/beers', function (req, res) {
	var token = req.headers.token
	jwt.verify(token, chaveSecreta, function(error, decoded) {
		if (error) {
			return res.status(401).json("Falha ao autenticar token.")
		}
		return res.json(listCervejas)
	})
})

server.get('/api/beer/:id', function (req, res) {
	var token = req.headers.token

	jwt.verify(token, chaveSecreta, function(error, decoded) {
		if (error) {
			return res.status(401).json("Falha ao autenticar token.")
		}
		var id = req.params.id
		var beer = listCervejas.find(x => x.id == id)
		if (!beer)
			res.json('nao encontrado').status(404)
		return res.status(200).json(beer)
	})
})

server.delete('/api/beer/:id', function (req, res) {
	var token = req.headers.token

	jwt.verify(token, chaveSecreta, function(error, decoded) {
		if (error) {
			return res.status(401).json("Falha ao autenticar token.")
		}
		var id = req.params.id
		var cerveja = listCervejas.find(x => x.id == id)
		const position = listCervejas.indexOf(cerveja)
		listCervejas.pop(listCervejas.indexOf(cerveja))
		return res.status(200).json(listCervejas)
	})
})

server.put('/api/beer/:id', function (req, res) {
	var token = req.headers.token
	jwt.verify(token, chaveSecreta, function(error, decoded) {
		if (error) {
			return res.status(401).json("Falha ao autenticar token.")
		}
		var id = req.params.id
		var cerveja = listCervejas.find(x => x.id == id)	
		cerveja.data = req.body.data
		cerveja.familia = req.body.familia
		cerveja.foto = req.body.foto
		cerveja.litragem = req.body.litragem
		cerveja.nome = req.body.nome
		cerveja.preco = req.body.preco
		cerveja.ranking = req.body.ranking
		cerveja.unidade = req.body.unidade	
		return res.status(200).json(cerveja)
	})
})

server.post('/api/beer', function (req, res) {
	var token = req.headers.token
	jwt.verify(token, chaveSecreta, function(error, decoded) {
		if (error) {
			return res.status(401).json("Falha ao autenticar token.");
		}
		let last = listCervejas[listCervejas.length - 1]
		cerveja = {
			"id": last.id + 1,
			"nome": req.body.nome,
			"familia": req.body.familia,
			"litragem": req.body.litragem,
			"preco": req.body.preco,
			"foto": req.body.foto,
			"data": req.body.data,
			"ranking": req.body.ranking,
			"unidade": req.body.unidade
		}
		listCervejas.push(cerveja)
		return res.status(200).json(listCervejas)
	})
})

server.post('/api/login', function(req, res){	
	email = req.body.email,
	password = req.body.password

	if(email == 'albert.bit8@gmail.com' && password == '123qwe'){
		token = jwt.sign({ email }, chaveSecreta, {
			expiresIn: 3000
		});
		return res.status(200).json(token)
	}

	return res.status(401).json("senha ou email invalidos")
})


server.listen(3000, function () {
	console.log("NEW API - port " + 3000)
})

