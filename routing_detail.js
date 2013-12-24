module.exports = function(express) {
	var retrieve = require('./data').indexDetail;

	function detailLink(id, slug) {
		return '/detail/' + id + '/' + slug
	}

	express.get('/detail/:detailId?/:detailSlug?', function(req, res) {

		var requestId = req.params.detailId;
		if (!requestId) {
			res.render('detail_missing', {
				title: 'Details Missing'
			});

			return;
		}

		// Retrieve detail item by req.params.detailId.
		var detailItem = retrieve(requestId);

		if (!detailItem) {
			res.render('detail_missing', {
				itemId: requestId,
				title: 'Details Missing'
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
			title: detailItem.title
		});
	});

};