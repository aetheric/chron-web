define([
	'underscore',
	'app/chron',

	'app/char/char-list',
	'app/char/char-view'
], function(_, chron) {

	function controller($scope, $location, _routeParams) {

		_.extend($scope, {

			/** The currently selected character */
			selected: null

		});

		$scope.$watch('$locationChangeSuccess', function() {
			var characterId = parseInt(_routeParams['charId']);

			if (characterId && characterId !== $scope.selected) {
				$scope.selected = characterId;
			}
		});

		$scope.$watch('selected', function() {
			var selectedId = $scope.selected;
			var characterId = parseInt(_routeParams['charId']) || null;

			if (selectedId !== characterId) {
				$location.path(selectedId ? '/char/' + selectedId : '/char');
			}
		});

	}

	return chron.controller('CharController', [
		'$scope',
		'$location',
		'$routeParams',
		controller
	]);

});
