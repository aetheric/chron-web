module.exports = function(express) {

	function renderView(viewName, title, script) {
		return function(req, res) {
			res.render(viewName, {
				title: title,
				script: script
			});
		};
	}

	// Redirect root requests to the home page.
	express.get('/', function(req, res) {
		res.redirect(301, '/home');
	});
	
	// Basic page rendering
	express.get('/home', renderView('home', 'Home', null));
	express.get('/about', renderView('about', 'About', null));
	express.get('/app', renderView('app', null, '/pub/assets.js'));
	
	// Index page rendering
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
			title: 'Index',
			script: null
		});
	});

	express.get('/register', function(req, res) {
		res.render('register', {
			title: 'Register',
			script: null,
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

	express.get('/login', function(req, res) {
		res.render('login', {
			title: 'Log-in',
			script: null,
			error: req.query.error,
			user: req.query.user
		});
	});
	
	express.post('/login', function(req, res) {
		var user = req.body.username;
		if (!user) {
			res.redirect('/login?error=user');
			return;
		}

		var pass = req.body.password;
		if (!pass) {
			res.redirect('/login?error=pass&user=' + user);
			return;
		}

		if (user !== 'Dalaraxis' || pass !== 'iamthelichking') {
			res.redirect('/login?error=cred&user=user');
			return;
		}
		
		res.redirect('/app');
	});
	
	// Detail page rendering
	require('./routing_detail')(express);
	
	express.use(function(req, res) {
		res.status(404);
		
		if (req.accepts('html')) {
			res.render('404', {
				title: 'Missing',
				path: req.url,
				script: null
			});
			
			return;
		}
		
		if (req.accepts('json')) {
			res.json({
				error: 'Not found',
				path: req.url
			});
			
			return;
		}
		
		res.type('txt')
		   .send('Can\'t find ' + req.url);
	});

};