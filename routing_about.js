module.exports = function(express) {

	express.get('/about', function(req, res) {
		res.render('about', {
			title: 'About'
		});
	});

}