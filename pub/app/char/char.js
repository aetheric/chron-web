define([
	'underscore',
	'app/chron',
	'app/char/char-list'
], function(_, chron) {

	function controller($scope) {
		_.extend($scope, {

			/** Used to store api-dependant data */
			data: {

				/** Options for ordering results */
				orderingOptions: [],

				/** The selected ordering for characters */
				characterOrdering: [],

				/** The selected ordering for chronicles */
				chronicleOrdering: [],

				// List of characters the user has
				characterList: []

			},

			// The currently selected character
			selectedCharacter: null

		});
	}

	return chron.controller('CharController', [
		'$scope',
		controller
	]);

});
