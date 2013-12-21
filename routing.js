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
	express.get('/auth', renderView('auth', 'Login/Signup', null));
	express.get('/index', renderView('index', 'Index', null));
	express.get('/app', renderView('app', null, '/pub/assets.js'));
	
	// Detail page rendering
	express.get('/detail/:detailId?/:detailSlug?', function(req, res) {

		var requestId = req.params.detailId;
		if (!requestId) {
			res.render('detail_missing', {
				itemId: null,
				title: 'Details Missing'
			});

			return;
		}

		// Retrieve detail item by req.params.detailId.
		var detailItem = ( requestId == 5 ? {
			id: req.params.detailId,
			slug: 'other-slug',
			title: 'Test Detail Item'
		} : null );

		if (!detailItem) {
			res.render('detail_missing', {
				itemId: requestId,
				title: 'Details Missing',
				script: null
			});

			return;
		};
		
		// if detail slug is missing / incorrect, permanent redirect to correct slug.
		var requestSlug = req.params.detailSlug;
		if (!requestSlug || requestSlug !== detailItem.slug) {
			res.redirect(301, detailLink(detailItem.id, detailItem.slug));
			return;
		}

		res.render('detail', {
			item: detailItem,
			title: detailItem.title,
			script: null
		});
	});

	// Set up generic view renderer.
	express.get('/view/:viewName', function(req, res) {
		res.render(req.params.viewName);
	});

};