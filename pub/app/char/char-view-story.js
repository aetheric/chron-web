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

		_socket.listen('char_view_story');

		$scope.$root.$watch('data.char_view_story.payload', function(story) {
			$scope.story = story;

			if (!_.isObject(story)) {
				$scope.entries = null;
				return;
			}

			$scope.entries = {};
			_.each(story.entries, function(entry) {
				$scope.entries[entry.id] = entry;
			});

			var entryId = $routeParams.entryId;
			if (entryId) {
				var entry = $scope.entries[entryId];
				$scope.select(entry);
			}
		});

		$scope.$watch('selected', function() {
			_socket.send('char_view_story', {
				id: $scope.selected
			})
		});

		$scope.$watch('$locationChangeSuccess', function() {
			if ($routeParams.paneId === 'story') {
				var entryId = parseInt($routeParams.entryId) || null;

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