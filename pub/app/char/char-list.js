define([
	'underscore',
	'app/chron',
	'text!view/char-list.html'
], function(_, chron, view) {

	function controller($scope, socket) {
		var listUpdated = null;

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

		socket.on('open', function() {
			socket.send({
				key: 'char-list',
				updated: listUpdated,
				payload: [
					[ 'game', 'updated' ],
					[ 'char', 'name' ]
				]
			});
		});

		socket.on('message', function(event) {
			var message = event.data;
			if (message.key && message.key === 'char-list') {
				if ($scope.list == null || listUpdated == null || listUpdated < message.updated) {
					$scope.list = message.payload;
				}
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
			'WebSocket',
			controller
		]

	};

	return chron.directive('chronCharList', function() {
		return directive;
	});

});
