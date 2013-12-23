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
var server = require('http')
	.createServer(express)
	.listen(port);

// Start a repl for easy eval/shutdown
require('repl').start({
	input: process.stdin,
	output: process.stdout
}).on('exit', function() {
	server.close();
});