define([
	'underscore',
	'app/chron',
	'text!view/char-view-crunch.html'
], function(_, chron, view) {

	function controller($scope) {

		_.extend($scope, {
			//
		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {

			/** The summary data to use */
			crunch: '='

		},

		controller: [
			'$scope',
			controller
		]

	};

	return chron.directive('chronCharViewCrunch', function() {
		return directive;
	});
});