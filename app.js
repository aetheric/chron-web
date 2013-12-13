'use strict';

// initialise the context and port vars
var port = process.env.PORT || 8012;

// initialise the required modules
var express = require('express');
var app = express();

// Set up the minification plugin
var minify = require('express-minify');
var minify_config = {
//	cache: __dirname + '/cache',
	blacklist: [ /\.min\.(css|js)$/ ]
};

app.use(minify(minify_config));
app.use(express.static(__dirname + '/web'));

// Try this: https://npmjs.org/package/bundle-up2

// Start the server
app.listen(port);
