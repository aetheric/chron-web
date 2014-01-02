define([
	'underscore',
	'app/chron',
	'text!view/char-view.html',

	'app/service/socket',
	'app/char/char-view-summary'
], function(_, chron, view) {

	function controller($scope, _socket) {

		_.extend($scope, {

			character: null,

			flags: {

				/** Whether to show the selected character details */
				showDetail: false,

				/** Whether to show the 'missing entry' text */
				showMissing: false,

				/** Whether to show the intro text */
				showIntro: true

			},

			selectedPane: null,

			select: function($event, pane) {
				$event.preventDefault();

				if (!pane || pane === $scope.selectedPane) {
					return;
				}

				if ($scope.selectedPane) {
					$scope.selectedPane.active = false;
				}

				$scope.selectedPane = pane;
				$scope.selectedPane.active = true;
			}

		});

		$scope.$watch('selected', function() {
			_socket.send('char-view', {
				id: $scope.selected
			});
		});

		_socket.link($scope, 'character', 'char-view');

		$scope.$watch('character', function() {

			_.extend($scope.flags, {
				showDetail: !_.isNull($scope.character) && !_.isUndefined($scope.character.id),
				showMissing: !_.isNull($scope.character) && _.isUndefined($scope.character.id),
				showIntro: _.isNull($scope.character)
			});

			if ($scope.character && $scope.character.summary) {
				$scope.selectedPane = $scope.character.summary;
				$scope.selectedPane.active = true;
			} else if ($scope.selectedPane) {
				$scope.selectedPane.active = false;
				$scope.selectedPane = null;
			}

		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {

			/** The currently selected character (if any) */
			selected: '='

		},

		controller: [
			'$scope',
			'_socket',
			controller
		]

	};

	return chron.directive('chronCharView', function() {
		return directive;
	});
});