module.exports = function(express) {
	var register = require('./data').registerClassic;

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

		try {
			var id = register(user, pass, mail);
			if (!id) {
				res.redirect('/register?error=miss&user=' + user + '&mail=' + mail);
				return;
			}
			
			res.redirect('/app');
		} catch (error) {
			switch(error) {
				case 'user':
					res.redirect('/register?error=cred-user&mail=' + mail);
					return;
				case 'mail':
					res.redirect('/register?error=cred-mail&user=' + user);
					return;
				default:
					res.redirect('/register?error=' + error + '&user=' + user + '&mail=' + mail);
					return;
			}
		}
	});

};