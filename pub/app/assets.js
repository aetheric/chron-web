require.config({
	baseUrl: '/',

	paths: {

		angular: [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min',
			'lib/angular'
		],

		underscore: [
			'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
			'lib/underscore'
		],

		underscore_string: [
			'//cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.3/underscore.string.min',
			'lib/underscore.string'
		],

		angular_ui: [
			'//cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.min',
			'lib/angular-ui'
		],

		angular_route: [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular-route.min',
			'lib/angular-route'
		],

		angular_mocks: [
			'//ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular-mocks',
			'lib/angular-mocks'
		],

		angular_websocket: [
			'//raw.github.com/gdi2290/angular-websocket/master/angular-websocket',
			'lib/angular-websocket'
		],

		text: [
			'//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',
			'lib/text'
		],

		json: [
			'//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min',
			'lib/json2'
		],

		sockete: [
//			'//raw.github.com/ismasan/Sockete/master/dist/0.0.1/sockete.min',
			'lib/sockete'
		]

	},

	shim: {

		angular: {
			exports: 'angular'
		},

		angular_ui: {
			deps: [ 'angular' ],
			init: function(angular) {
				return angular.module('ui');
			}
		},

		angular_route: {
			deps: [ 'angular'],
			init: function(angular) {
				return angular.module('ngRoute');
			}
		},

		angular_mocks: {
			deps: [ 'angular' ],
			init: function(angular) {
				return angular.module('ngMock');
			}
		},

		angular_websocket: {
			deps: [ 'angular' ],
			init: function(angular) {
				return angular.module('angular-websocket')
			}
		},

		underscore: {
			exports: '_'
		},

		underscore_string: {
			deps: [ 'underscore' ],
			init: function(underscore) {
				return underscore.str;
			}
		},

		json: {
			exports: 'JSON'
		},

		sockete: {
			exports: 'Sockete'
		}

	},

	deps: [

		//underscore bootstrapping
		'underscore',
		'underscore_string',
		'json',

		// Angular bootstrapping
		'angular',
		'app/chron-config',

		// Global directives
		'app/global/navbar',

		// Dev code
		'app/dev/mocks'

	],

	callback: function(underscore, underscore_string, json, angular, chron) {
		underscore.mixin(underscore_string.exports());
		underscore.mixin({
			toJson: json.stringify,
			fromJson: json.parse
		});

		angular.bootstrap(document, [ 'chron' ]);
	}

});
