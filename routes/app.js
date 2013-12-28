module.exports = function(express) {

	express.get('/app', function(req, res) {
		res.render('app', {
			script: '/pub/assets.js'
		});
	});

};