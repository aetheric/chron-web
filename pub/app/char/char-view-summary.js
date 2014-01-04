define([
	'underscore',
	'app/chron',
	'text!view/char-view-summary.html'
], function(_, chron, view) {

	function controller($scope, _socket) {

		_.extend($scope, {

			summary: null

		});

		_socket.link($scope, 'summary', 'char-view-summary');

		$scope.$watch('selected', function() {
			_socket.send('char-view-summary', {
				id: $scope.selected
			});
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
			controller
		]

	};

	return chron.directive('chronCharViewSummary', function() {
		return directive;
	});
});