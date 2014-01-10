define([
	'underscore',
	'app/chron',
	'text!view/char-list.html',

	'app/service/socket',
	'app/service/utils'
], function(_, chron, view) {

	function controller($scope, $routeParams, _utils, _socket) {

		_.extend($scope, {

			/** The list data provided by the server */
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

				if (!character) {
					if ($scope.selectedCharacter) {
						$scope.selectedCharacter.active = false;
					}

					$scope.selectedCharacter = null;
					return;
				}

				if ($scope.selectedCharacter === character) {
					return; // do nothing if the same.
				}

				if ($scope.selectedCharacter) {
					$scope.selectedCharacter.active = false;
				}

				$scope.selectedCharacter = character;
				$scope.selectedCharacter.active = true;
			}

		});

		_utils.watch($scope, {

			'$locationChangeSuccess': function() {
				var characterId = parseInt($routeParams['charId']);

				if (characterId && characterId !== $scope.selected) {
					$scope.selected = characterId;
				}
			},

			'selected': function(newval) {
				$scope.select($scope.characters[newval]);
			}

		});

		_socket.listen('char_list', function(list) {
			$scope.list = list;

			_.extend($scope.flags, {
				loading: list == null,
				empty: list && !list.length
			});

			$scope.characters = {};
			_.each(list, function(game) {
				_.each(game.characters, function(character) {
					$scope.characters[character.id] = character;
				});
			});

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
			'$routeParams',
			'_utils',
			'_socket',
			controller
		]

	};

	return chron.directive('chronCharList', function() {
		return directive;
	});

});
