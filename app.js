'use strict';

// initialise the context and port vars
var port = process.env.PORT || 8012;

// init and set up express.
var Express = require('express');
var express = Express();

// init and set up pound assets
var pound = require('./assets');

// configure the express server
express.configure(function() {
	express.set('views', __dirname + '/web/view');
	express.set('view engine', 'jade');
	express.set('view options', { layout: false });

	express.use(Express.cookieParser());
	express.use(Express.bodyParser());
	express.use(Express.methodOverride());

	pound.configure(express);

	express.use(Express.static(__dirname + '/web/pub'));
});

express.get('/', function(req, res) {
	res.render('chron');
});

// Start the server
express.listen(port, function() {
	console.log("Express listening on port ", port);
});
