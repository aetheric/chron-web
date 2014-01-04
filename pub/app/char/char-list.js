define([
	'underscore',
	'app/chron',
	'text!view/char-list.html',
	'app/service/socket'
], function(_, chron, view) {

	function controller($scope, _socket) {

		_.extend($scope, {

			/** A list of lists of characters */
			list: null,

			/** The collected characters of the list */
			characters: null,

			/** The currently selected character */
			selectedCharacter: null,

			flags: {

				/** The application is currently loading data */
				loading: true,

				/** The character results are empty */
				empty: false

			},

			select: function(character, $event) {
				$event && $event.preventDefault();

				if (!character || $scope.selectedCharacter === character) {
					return; // do nothing if the same.
				}

				if ($scope.selectedCharacter) {
					$scope.selectedCharacter.active = false;
				}

				$scope.selectedCharacter = character;
				$scope.selectedCharacter.active = true;
			}

		});

		$scope.$watch('selectedCharacter', function() {
			if ($scope.selectedCharacter && $scope.selectedCharacter.id) {
				$scope.selected = $scope.selectedCharacter.id;
			}
		});

		$scope.$watch('list', function() {

			_.extend($scope.flags, {
				loading: $scope.list == null,
				empty: $scope.list && !$scope.list.length
			});

			$scope.characters = {};
			_.each($scope.list, function(game) {
				_.each(game.characters, function(character) {
					$scope.characters[character.id] = character;
				});
			});

		});

		_socket.link($scope, 'list', 'char-list', function() {
			_socket.send('char-list', {});
		});

		$scope.$watch('selected', function() {
			$scope.select($scope.characters[$scope.selected]);
		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {

			/** The currently selected character id (if any) */
			selected: '='

		},

		controller: [
			'$scope',
			'_socket',
			controller
		]

	};

	return chron.directive('chronCharList', function() {
		return directive;
	});

});
