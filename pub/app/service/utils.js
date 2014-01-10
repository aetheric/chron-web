define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function service() {

		return {

			watch: function($scope, map) {
				_.each(map, function(action, trigger) {
					$scope.$watch(trigger, action);
				});
			}

		}
	}

	return chron.service('_utils', [
		service
	]);

});