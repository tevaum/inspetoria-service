/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

var SiteRouter = express.Router();

SiteRouter.use(function (req, res, done) {
    if (req.user) {
	done ();
    } else {
	console.log('logging user in');
	req.session.returnTo = req.path;
	res.redirect('/login');
    }
});

SiteRouter.use(function (req, res) {
    var page = {title: 'Status'};
    res.render('home', {page: page});
});

// SiteRouter.get('/usuarios', function (req, res) {
//     var page = {title: 'Phones'};
//     res.render('usuarios', {page: page});
// });

// SiteRouter.get('/escolas', function (req, res) {
//     var page = {title: 'Settings'};
//     req.app.get('models').School.findAll().then((schools) => {
// 	res.render('escolas', {page: page, schools: schools});
//     });
// });

// SiteRouter.get('/agenda', function (req, res) {
//     var page = {title: 'Settings'};
//     res.render('agenda', {page: page});
// });

export = SiteRouter;
