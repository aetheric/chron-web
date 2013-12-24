module.exports = function(express) {

	express.get('/home', function(req, res) {
		res.render('home', {
			title: 'Home'
		});
	});

}