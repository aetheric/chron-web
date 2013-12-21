'use strict';

// initialise the context and port vars
var port = process.env.PORT || 8012;

// init and set up express.
var express = require('./express')();

// Configure assets and routing
require('./assets')(express);
require('./routing')(express);

// Start the server
express.listen(port, function() {
	console.log("Express listening on port ", port);
});
