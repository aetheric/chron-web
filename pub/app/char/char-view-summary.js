define([
	'underscore',
	'app/chron',
	'text!view/char-view-summary.html'
], function(_, chron, view) {

	function controller($scope, _socket) {

		_.extend($scope, {

			summary: null

		});

		_socket.listen('char_view_summary');

		$scope.$watch('selected', function() {
			_socket.send('char_view_summary', {
				id: $scope.selected
			});
		});

		$scope.$root.$watch('data.char_view_summary.payload', function(summary) {
			$scope.summary = summary;
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