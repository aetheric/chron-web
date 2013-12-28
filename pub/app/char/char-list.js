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

			flags: {

				/** The application is currently loading data */
				loading: true,

				/** The character results are empty */
				empty: false

			},

			select: function($event, character) {
				$event.preventDefault();

				$scope.selectedCharacter.active = false;

				character.active = true;
				$scope.selectedCharacter = character;
			}

		});

		$scope.$watch('list', function() {
			_.extend($scope.flags, {

				loading: $scope.list == null,

				empty: ( $scope.list && !$scope.list.length )

			});
		});

		_socket.listen($scope, 'list', 'char-list', function() {
			_socket.send('char-list', [
				{
					display: 'Saint Wolfgang\'s Vampire Hunters',
					characters: [
						{ id: 1, display: 'Father Eric Mathias' }
					]
				},
				{
					display: 'Teonn',
					characters: [
						{ id: 2, display: 'Bartimas' },
						{ id: 3, display: 'Royal Herald' },
						{ id: 4, display: 'Sir Charleston' }
					]
				},
				{
					display: 'Crucible',
					characters: [
						{ id: 5, display: 'Enoch Anderheim' }
					]
				}
			]);
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

	return chron.directive('chronCharList', function() {
		return directive;
	});

});
