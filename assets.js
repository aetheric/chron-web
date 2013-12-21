module.exports = function(express) {
	return; // Don't do anything at the moment.

	var BundleUp = require('bundle-up2');
	BundleUp(express, function(assets) {
		assets.addJs('/lib/angular.js');
		assets.addJs('/lib/angular-route.js');
		assets.addJs('/app/chron.js');

		assets.addCss('/lib/bootstrap.css');
	}, {
		staticRoot: __dirname + '/pub',
		staticUrlRoot: '/',
		bundle: false,
		minifyCss: false,
		minifyJs: false
	});

};