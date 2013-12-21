define([
	'app/chron'
], function(chron) {
	var config = {
		baseUrl: require.baseUrl
	};
	
	chron.constant('_config', config);
	return config;
});
