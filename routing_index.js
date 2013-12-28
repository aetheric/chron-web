module.exports = function(express) {
	var search = require('./data').indexSearch;

	express.get('/index', function(req, res) {

		// Get results based on search terms
		var results = search({});

		res.render('index', {
			items: results,
			title: 'Index'
		});
	});

};