angular.module('chron', [ 'ngRoute' ]).config([
	'$locationProvider',
	function($locationProvider) {

		$locationProvider

			.when('/dash', {
				templateUrl: '/app/view/dash.html',
				controller: 'DashController'
			});

	}
]);