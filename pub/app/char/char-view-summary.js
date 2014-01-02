define([
	'underscore',
	'app/chron',
	'text!view/char-view-summary.html'
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
			summary: '='

		},

		controller: [
			'$scope',
			controller
		]

	};

	return chron.directive('chronCharViewSummary', function() {
		return directive;
	});
});