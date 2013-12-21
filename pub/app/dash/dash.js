define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function controller($scope) {
		_.extend($scope, {
			//
		});
	}

	return chron.controller('DashController', [
		'$scope',
		controller
	]);

});
