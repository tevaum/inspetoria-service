import express = require('express');
import session = require('express-session');
import passport = require('passport');
import bodyparser = require('body-parser');
import LocalStrategy = require('passport-local');

import SiteRouter = require('./routes/siterouter');
import APIRouter = require('./routes/apirouter');

var app = express();

var tpl = 'social';

app.set('views', 'template/' + tpl);
app.set('view engine', 'jade');

app.use((req, res, next) => {
    if (req.query.hasOwnProperty('t')) {
	tpl = req.query.t;
	app.set('views', 'template/' + tpl);
    }
    next();
});

passport.use('local', new LocalStrategy(function (email, pass, done) {
    console.log('checking for auth:', email);
    app.get('models').User
	.findOne({where: {email: email, password: pass}})
	.then(function (user) {
	    if (!user)
		done(null, false);
	    else
		done(null, user);
	});
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var ALL_ROLES = ['Admin', 'Inspetor', 'Diretor', 'Visitante'];

app.locals = {
    pretty: true,
    site: {
	base: '/',
	name: 'Inspetoria Online',
	nav: [
	    {title: 'Escolas', icon: 'graduation-cap', link: '/escolas', roles: ALL_ROLES},
	    {title: 'Usuários', icon: 'users', link: '/usuarios', roles: ['Admin', 'Inspetor']},
	    {title: 'Atendimentos', icon: 'calendar', link: '/atendimentos', roles: ALL_ROLES}
	]
    }
};

app.use(express.static('../insp-frontend'));

app.use(session({
    secret: 'huvsnivs is now or never',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function (req, res) {
    res.status(200).render('login');
});

app.post('/login',
	 bodyparser.urlencoded({extended: false}),
	 (req, res, next) => {
	     console.log('tentativa de login', req.body);
	     next()
	 },
	 passport.authenticate('local'),
	 (req, res) => {
	     res.redirect(req.session.returnTo || '/');
	     delete req.session.returnTo;
	 });

app.use(function (req, res, done) {
    res.locals.user = req.user;
    done();
});

app.use('/api', APIRouter);
app.use(SiteRouter);

export = app;
