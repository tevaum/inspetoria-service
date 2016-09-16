/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
import bodyparser = require('body-parser');

var APIRouter = express.Router();

APIRouter.use(function (req, res, done) {
    if (req.user) {
	done ();
    } else {
	console.log('logging user in');
	req.session.returnTo = '/api' + req.path;
	res.redirect('/login');
    }
});

APIRouter.get('/escolas', function (req, res) {
    console.log('[API] escolas');
    var models = req.app.get('models');
    models.School.findAll({
	where: {year: 2016},
	include: [{model: models.User}]
    }).then(function (schools) {
	res.status(200).json(schools);
    });
});

APIRouter.post('/escolas', bodyparser.json(), function (req, res) {
    console.log('[API] nova escola:', req.body);
    var models = req.app.get('models');
    models.School.upsert(req.body).then((school) => {
	console.log('[API] nova escola result:', school);
	res.status(200).end();
    });
});

APIRouter.get('/usuarios', function (req, res) {
    console.log('[API] usuarios');
    var models = req.app.get('models');
    models.User.findAll({
	include : [{ model: models.School }]
    }).then(function (users) {
	res.status(200).json(users);
    });
});

APIRouter.post('/usuarios', bodyparser.json(), function (req, res) {
    console.log('[API] novo usuario:', req.body);
    var models = req.app.get('models');
    models.User.upsert(req.body).then((user) => {
	console.log('[API] novo usuario result:', user);
	res.status(200).end();
    });
});

APIRouter.get('/atendimentos', function (req, res) {
    console.log('[API] atendimentos');
    var models = req.app.get('models');
    models.Attend.findAll({
	include : [{ model: models.School }]
    }).then(function (users) {
	res.status(200).json(users);
    });
});

APIRouter.get('/atendimentos/:data', function (req, res) {
    console.log('[API] atendimentos', req.params);
    var models = req.app.get('models');
    models.Attend.findAll({
	where: {
	    date: req.params.data
	},
	include: [{ model: models.School }],
	order: 'date'
    }).then(function (users) {
	res.status(200).json(users);
    });
});

APIRouter.get('/atendimentos/periodo/:inicio/:fim', function (req, res) {
    console.log('[API] atendimentos', req.params);
    var models = req.app.get('models');
    models.Attend.findAll({
	where: {
	    date: {
		$gte: req.params.inicio,
		$lte: req.params.fim
	    }
	},
	include: [{ model: models.School }],
	order: 'date'
    }).then(function (users) {
	res.status(200).json(users);
    });
});

APIRouter.post('/atendimentos', bodyparser.json(), function (req, res) {
    console.log('[API] novo atendimento:', req.body);
    var models = req.app.get('models');
    models.Attend.upsert(req.body).then((att) => {
	console.log('[API] novo atendimento result:', att);
	res.status(200).end();
    });
});

APIRouter.delete('/atendimentos/:id', bodyparser.json(), function (req, res) {
    console.log('[API] remover atendimento:', req.body);
    var models = req.app.get('models');
    models.Attend.destroy({where: {id: req.params.id}}).then((att) => {
	console.log('[API] atendimento removido:', att);
	res.status(200).end();
    });
});

export = APIRouter;
