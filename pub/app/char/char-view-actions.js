define([
	'underscore',
	'app/chron',
	'text!view/char-view-actions.html'
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
			actions: '='

		},

		controller: [
			'$scope',
			controller
		]

	};

	return chron.directive('chronCharViewActions', function() {
		return directive;
	});
});