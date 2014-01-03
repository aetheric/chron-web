define([
	'underscore',
	'app/chron',
	'text!view/char-view-story.html'
], function(_, chron, view) {

	function controller($scope) {

		_.extend($scope, {

			selectedItem: null,

			select: function($event, item) {
				$event.preventDefault();

				if (!item || item === $scope.selectedItem) {
					return;
				}

				if ($scope.selectedItem) {
					$scope.selectedItem.active = false;
				}

				$scope.selectedItem = item;
				$scope.selectedItem.active = true;
			}

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