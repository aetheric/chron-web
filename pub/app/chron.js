define([
	'angular',
	'angular_ui',
	'angular_route',
	'angular_mocks',
], function(angular) {

	return angular.module('chron', [
		'ngRoute',
		'ngMockE2E'
	]);

});
