define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function service($http) {
		return {
			//
		};
	}

	return chron.service('_data', [
		'$http',
		service
	]]);

});