define([
	'underscore',
	'app/chron',
	'text!view/char-view.html',

	'app/service/socket'
], function(_, chron, view) {

	function controller($scope, _socket) {

		_.extend($scope, {

			character: null

		});

		$scope.$watch('selected', function() {
			_socket.send('char-view', {
				id: $scope.selected
			});
		});

		_socket.link($scope, 'character', 'char-view');

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