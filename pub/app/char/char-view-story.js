define([
	'underscore',
	'app/chron',
	'text!view/char-view-story.html'
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
			story: '='

		},

		controller: [
			'$scope',
			controller
		]

	};

	return chron.directive('chronCharViewStory', function() {
		return directive;
	});
});