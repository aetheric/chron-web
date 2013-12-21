define([
	'app/chron',
	'app/dash/dash',
	'text!view/dash.html',
	'app/char/char',
	'text!view/char.html'
], function(chron, dashCtrl, dashView, charCtrl, charView) {
	
	function chronConfig($routeProvider) {

		$routeProvider

			// Routing for the dashboard view.
			.when('/dash', {
				template: dashView,
				controller: dashCtrl
			})

			// Routing for the character manager.
			.when('/char', {
				template: charView,
				controller: charCtrl
			})

			// Just redirect to the dashboard in all other cases.
			.otherwise({
				redirectTo: '/dash'
			});

	}
	
	return chron.config([
		'$routeProvider',
		chronConfig
	]);

});
