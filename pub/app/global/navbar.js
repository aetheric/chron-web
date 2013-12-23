define([
	'underscore',
	'app/chron',
	'text!view/navbar.html'
], function(_, chron, view) {

	function controller($scope, $location) {

		_.extend($scope, {

			navigation: {

				primary: [

					{
						path: '/dash',
						display: 'Dashboard',
						active: false
					},

					{
						path: '/char',
						display: 'Characters',
						active: false
					}

				]

			},

			goTo: function($event, path) {
				$event.preventDefault();
				$location.path(path);
			}

		});

		$scope.$watch('$locationChangeSuccess', function() {
			var newPath = $location.path();
			_.each($scope.navigation.primary, function(value) {
				value.active = _(value.path).startsWith(newPath);
			});
		});

	}

	var directive = {
		restrict: 'A',
		template: view,

		scope: {
			//
		},

		controller: [
			'$scope',
			'$location',
			controller
		]

	};

	return chron.directive('chronNavbar', function() {
		return directive;
	});

});