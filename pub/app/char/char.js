define([
	'underscore',
	'app/chron',

	'app/char/char-list',
	'app/char/char-view'
], function(_, chron) {

	function controller($scope, _routeParams) {

		_.extend($scope, {

			/** The currently selected character */
			selected: null

		});

	}

	return chron.controller('CharController', [
		'$scope',
		'$routeParams',
		controller
	]);

});
