module.exports = (function() {

	function doRequest() {
		//TODO: Use http client api to fire off requests.
	}

	return {

		indexSearch: function(options) {
			return [

				{
					id: 5,
					title: 'Test Result Item #1',
					slug: 'test-result-item-1',
					description: 'This is a test result item for testing result items',
					status: 'working',
					updated: '21/12/13'
				},

				{
					id: 5,
					title: 'Test Result Item #2',
					slug: 'test-result-item-2',
					description: 'This is a test result item for testing result items',
					status: 'working',
					updated: '21/12/13'
				}

			];
		},

		indexDetail: function(id) {
			if (id == 5) {
				return {
					id: id,
					slug: 'other-slug',
					title: 'Test Detail Item'
				};
			}

			return null;
		},

		registerClassic: function(username, password, email) {

			if (username === 'Dalaraxis') {
				throw 'user';
			}

			if (email === 'special@snowflake.com') {
				throw 'mail';
			}

			if (password === 'poop') {
				throw 'blibble';
			}

			return 1;
		},

		loginClassic: function(username, password) {
			if (username === 'Dalaraxis' && password === 'iamthelichking') {
				return 1;
			}

			return null;
		},

	};
})();