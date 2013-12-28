module.exports = function(express) {

	express.get('/app', function(req, res) {
		res.render('about', {
			script: '/pub/assets.js'
		});
	});

};