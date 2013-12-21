module.exports = function() {

	var Express = require('express');
	var express = Express();
	
	// configure the express server
	express.configure(function() {
		express.set('views', __dirname + '/view');
		express.set('view engine', 'jade');
		express.set('view options', { layout: false });

		express.use(Express.cookieParser());
		express.use(Express.bodyParser());
		express.use(Express.methodOverride());

		express.use(Express.static(__dirname + '/pub'));
	});

	return express;
};