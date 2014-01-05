module.exports = function(express) {

	var sitemap = require('sitemap').createSitemap({
		hostname: 'http://chron.aetheric.co.nz',
		urls: [
			{ url: '/home', changefreq: 'monthly', priority: '1.0' },
			{ url: '/index', changefreq: 'always', priority: '0.9' },
			{ url: '/register', changefreq: 'yearly', priority: '0.8' },
			{ url: '/about', changefreq: 'yearly', priority: '0.6' },
			{ url: '/login', changefreq: 'yearly', priority: '0.7' },
			{ url: '/app', changefreq: 'monthly', priority: '0.0' }
		]
	});

	express.get('/sitemap.xml', function(req, res) {
		sitemap.toXML(function(xml) {
			res.header('Content-Type', 'application/xml');
			res.send(xml);
		});
	});

};