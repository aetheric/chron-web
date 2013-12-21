define([
	'underscore',
	'app/chron'
], function(_, chron) {

	// http://code.angularjs.org/1.2.5/docs/api/ngMockE2E.$httpBackend
	function mocks($httpBackend) {
		//
	}

	return chron.run([
		'$httpBackend',
		mocks
	]);

})