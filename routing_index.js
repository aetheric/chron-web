module.exports = function(express) {

	express.get('/index', function(req, res) {

		// Get results based on search terms
		var results = [

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

		res.render('index', {
			items: results,
			title: 'Index'
		});
	});

}