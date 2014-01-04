define([
	'underscore',
	'app/chron',
	'text!view/char-view-story.html'
], function(_, chron, view) {

	function controller($scope, _socket, $routeParams) {

		_.extend($scope, {

			story: null,
			entries: null,
			selectedItem: null,

			select: function(item, $event) {
				$event && $event.preventDefault();

				if ($scope.selectedItem) {
					$scope.selectedItem.active = false;
				}

				if (!item || item === $scope.selectedItem) {
					$scope.selectedItem = null;
					return;
				}

				$scope.selectedItem = item;
				$scope.selectedItem.active = true;
			}

		});

		_socket.link($scope, 'story', 'char-view-story');

		$scope.$watch('story', function() {

			if ($scope.story && $scope.story.entries) {
				$scope.entries = {};

				_.each($scope.story.entries, function(entry) {
					$scope.entries[entry.id] = entry;
				});

				var entry = $scope.entries[$routeParams['entryId']];
				$scope.select(entry);
			}

		});

		$scope.$watch('selected', function() {
			_socket.send('char-view-story', {
				id: $scope.selected
			})
		});

		$scope.$watch('$locationChangeSuccess', function() {
			if ($routeParams.paneId === 'story') {
				var entryId = parseInt($routeParams['entryId']) || null;

				if (!entryId || !$scope.entries) {
					return;
				}

				if (entryId && !$scope.selectedItem || entryId !== $scope.selectedItem.id) {
					$scope.select($scope.entries[entryId]);
				}
			}
		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {

			/** The currently selected character */
			selected: '='

		},

		controller: [
			'$scope',
			'_socket',
			'$routeParams',
			controller
		]

	};

	return chron.directive('chronCharViewStory', function() {
		return directive;
	});
});