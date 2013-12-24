module.exports = function(express) {

	express.get('/register', function(req, res) {
		res.render('register', {
			title: 'Register',
			error: req.query.error,
			user: req.query.user,
			mail: req.query.mail
		});
	});

	express.post('/register', function(req, res) {

		var user = req.body.username;
		var mail = req.body.email;

		if (!user) {
			var target = '/register?error=user';

			if (mail) {
				target += '&mail=' + mail;
			}

			res.redirect(target);
			return;
		}
		
		if (!mail) {
			res.redirect('/register?error=mail&user=' + user);
			return;
		}

		var pass = req.body.password;
		if (!pass) {
			res.redirect('/register?error=pass&user=' + user + '&mail=' + mail);
			return;
		}

		if (user === 'Dalaraxis') {
			res.redirect('/register?error=cred-user&email=' + mail);
			return;
		}

		if(mail === 'special@snowflake.com') {
			res.redirect('/register?error=cred-mail&user=' + user);
			return;
		}

		res.redirect('/app');
	});

}