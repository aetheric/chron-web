define([
	'app/chron',
	'app/dash/dash',
	'text!view/dash.html',
	'app/char/char',
	'text!view/char.html'
], function(chron, dashCtrl, dashView, charCtrl, charView) {
	
	function chronConfig($routeProvider, WebSocketProvider) {

		function charRoute(defaultParams) {
			return {
				template: charView,
				controller: 'CharController',
				resolve: {
					_routeParams: [
						'$rootScope',
						'$route',
						'$routeParams',
						function($rootScope, $route, $routeParams) {
							$rootScope.$watch('$routeChangeSuccess', function() {
								_.defaults($routeParams, defaultParams || {});
							});

							return true;
						}
					]
				}
			};
		}

		$routeProvider

			// Routing for the dashboard view.
			.when('/dash', {
				template: dashView,
				controller: 'DashController'
			})

			// Routing for the character manager.
			.when('/char/:charId?', charRoute())

			.when('/char/:charId/summary/:entityId?', charRoute({
				paneId: 'summary'
			}))

			.when('/char/:charId/crunch/:entityId?', charRoute({
				paneId: 'crunch'
			}))

			// Routing for the character manager story pane.
			.when('/char/:charId/story/:entryId?', charRoute({
				paneId: 'story'
			}))

			.when('/char/:charId/actions/:entityId?', charRoute({
				paneId: 'actions'
			}))

			// Just redirect to the dashboard in all other cases.
			.otherwise({
				redirectTo: '/dash'
			});

		WebSocketProvider
			.prefix('')
			.uri('ws://chron.aetheric.co.nz');

	}
	
	return chron.config([
		'$routeProvider',
		'WebSocketProvider',
		chronConfig
	]);

});
