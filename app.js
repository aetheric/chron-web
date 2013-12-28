'use strict';

// initialise the context and port vars
var port = process.env.PORT || 8012;

// init and set up express.
var express = require('./express')();

// Configure assets and routing
require('./assets')(express);
require('./routing')(express);

// Start the server
console.log("Express starting on port ", port);

if ('prod'.indexOf(process.env.NODE_ENV) < 0) {

	var server = require('http')
		.createServer(express)
		.listen(port);

	console.log("Starting REPL...");

	// Start a repl for easy eval/shutdown
	require('repl').start({
		input: process.stdin,
		output: process.stdout
	}).on('exit', function () {
		server.close();
	});

} else {
	// When running on production...
	express.listen(port);
}