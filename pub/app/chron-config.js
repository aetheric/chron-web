define([
	'app/chron',
	'app/dash/dash',
	'text!view/dash.html',
	'app/char/char',
	'text!view/char.html'
], function(chron, dashCtrl, dashView, charCtrl, charView) {
	
	function chronConfig($routeProvider, WebSocketProvider) {

		$routeProvider

			// Routing for the dashboard view.
			.when('/dash', {
				template: dashView,
				controller: 'DashController'
			})

			// Routing for the character manager.
			.when('/char', {
				template: charView,
				controller: 'CharController'
			})

			// Just redirect to the dashboard in all other cases.
			.otherwise({
				redirectTo: '/dash'
			});

		WebSocketProvider
			.prefix('')
			.uri('ws://echo.websocket.org/');

	}
	
	return chron.config([
		'$routeProvider',
		'WebSocketProvider',
		chronConfig
	]);

});
