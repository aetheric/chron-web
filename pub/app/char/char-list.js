define([
	'underscore',
	'app/chron',
	'text!view/char-list.html'
], function(_, chron, view) {

	function controller($scope) {

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

		$scope.$watch('list', function(oldVal, newVal) {
			_.extend($scope.flags, {

				loading: newVal == null,

				empty: newVal && !newVal.length

			});
		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {

			/** The currently selected character (if any) */
			selectedCharacter: '='

		},

		controller: [
			'$scope',
			controller
		]

	};

	return chron.directive('chronCharList', function() {
		return directive;
	});

});