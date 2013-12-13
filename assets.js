'use strict';

var pound = require('pound').create({
	publicDir: __dirname + '/web/pub',
	staticUrlRoot: '/'
});

var bundle = pound.defineAsset;

pound.resolve.app = function(filename) {
	return '/web/app/' + filename + '.js';
};

pound.resolve.css = function(filename) {
	return '/web/css/' + filename + '.css';
};

pound.resolve.lib = function(filename) {
	return '/web/lib/' + filename;
};

bundle('chron', {

	css: [
		'$lib/bootstrap.css'
	],

	js: [
		'$lib/angular.js',
		'$lib/angular-route.js',
		'$lib/angular-mocks.js',
		'$app/chron'
	]
});

module.exports = pound;
