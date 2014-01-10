define([
	'underscore',
	'app/chron',
	'text!view/char-view.html',

	'app/service/socket',
	'app/char/char-view-actions',
	'app/char/char-view-crunch',
	'app/char/char-view-story',
	'app/char/char-view-summary'
], function(_, chron, view) {

	function controller($scope, _socket, $routeParams) {

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

			panes: null,

			selectedPane: null,

			select: function(pane, $event) {
				$event && $event.preventDefault();

				var paneRef = _.isString(pane) ? $scope.panes[pane] : pane;
				if (!paneRef || paneRef === $scope.selectedPane) {
					return;
				}

				if ($scope.selectedPane) {
					$scope.selectedPane.active = false;
				}

				$scope.selectedPane = paneRef;
				$scope.selectedPane.active = true;
			}

		});

		$scope.$watch('selected', function() {
			_socket.send('char_view', {
				id: $scope.selected
			});
		});

		_socket.listen('char_view');

		$scope.$root.$watch('data.char_view.payload', function(character) {
			$scope.character = character;

			_.extend($scope.flags, {
				showDetail: !_.isNull(character) && !_.isUndefined(character.id),
				showMissing: !_.isNull(character) && _.isUndefined(character.id),
				showIntro: _.isNull(character)
			});

			if (character && character.panes) {
				$scope.panes = {};

				_.each(character.panes, function(pane) {
					$scope.panes[pane.id] = pane;
				});

				var pane = $scope.panes[$routeParams.paneId] || _.first(character.panes);
				$scope.select(pane);
			}

		});

		$scope.$watch('$locationChangeSuccess', function() {
			var selectedPane = $routeParams.paneId;

			if (!$scope.panes || !selectedPane) {
				return;
			}

			if (!$scope.selectedPane || $scope.selectedPane.id !== selectedPane) {
				$scope.select($scope.panes[selectedPane]);
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
			'$routeParams',
			controller
		]

	};

	return chron.directive('chronCharView', function() {
		return directive;
	});
});