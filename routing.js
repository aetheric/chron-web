module.exports = function(express) {

	function renderView(viewName, title, script) {
		return function(req, res) {
			res.render(viewName, {
				title: title,
				script: script
			});
		};
	}
	
	function detailLink(id, slug) {
		return '/detail/' + id + '/' + slug
	}

	// Redirect root requests to the home page.
	express.get('/', function(req, res) {
		res.redirect(301, '/home');
	});
	
	// Basic page rendering
	express.get('/home', renderView('home', 'Home', null));
	express.get('/about', renderView('about', 'About', null));
	express.get('/register', renderView('register', 'Register', null));
	express.get('/login', renderView('login', 'Log-in', null));
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
	
	// Detail page rendering
	require('./routing_detail')(express);

	// Set up generic view renderer.
	express.get('/view/:viewName', function(req, res) {
		res.render(req.params.viewName);
	});
	
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