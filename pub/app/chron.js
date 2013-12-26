define([
	'angular',
	'angular_ui',
	'angular_route',
	'angular_mocks',
	'angular_websocket'
], function(angular) {

	return angular.module('chron', [
		'ngRoute',
		'angular-websocket',
		'ngMockE2E'
	]);

});
