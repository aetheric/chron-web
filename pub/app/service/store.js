define([
	'underscore',
	'chron',
	'amplify_store'
], function(_, chron, store) {

	function service() {
		store.type = store.types.sessionStorage
			? 'sessionStorage'
			: 'memory';

		var methods = {

			set: function(key, value) {
				store(key, value);
				return methods;
			},

			get: function(key) {
				return store(key);
			}

		};

		return methods;
	}

	return chron.service('_store', [
		service
	]);

});