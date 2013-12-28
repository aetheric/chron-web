define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function _determineCode(status) {
		switch(status){
			case 302: return 'redirect';
			case 403: return 'forbidden';
			case 404: return 'missing';
			case 405: return 'method';
			case 418: return 'teapot';
			case 500: return 'server';
			default:  return '' + status;
		}
	}

	function service($http, $rootScope, $location, $window) {
	
		function request(method, endpoint, parameters, payload, complete, error) {
			if (typeof(complete) === "undefined") {
				console.error('No `complete` callback specified; won\'t bother executing something that isn\'t '
						+ 'being handled at all');
				return null;
			}

			var originalRequest = {
				endpoint: endpoint,
				parameters: parameters,
				method: method
			};
			
			var responseContext = {
				request: null,
				status: null,
				headers: null,
				config: null
			};
			
			var httpRequestFunc = function() {
				$http.defaults.headers.common['X-Angular-Referer'] = $location.absUrl();
				$http({
					method: method,
					url: endpoint,
					params: parameters,
					data: payload
				}).success(function(data, status, headers, config) {
					_.extend(responseContext, {
						request: originalRequest,
						status: status,
						headers: headers,
						config: config
					});

					complete(data, responseContext);
				}).error(function(data, status, headers, config) {
					_.extend(responseContext, {
						request: originalRequest,
						status: status,
						headers: headers,
						config: config
					});
					
					switch(status){
						case 0:
						case 302:
						case 403:
						case 404:
							$window.document.location.reload();
							break;
						default:
							if (typeof(error) === "undefined") {
								console.log("No error handler was assigned, debug information below: ");
								console.log({
									payload: data,
									context: responseContext
								});
								
								break;
							}
							
							error(data, responseContext);
							break;											
					}
				});
			};
			
			if($rootScope.$$phase === '$digest' || $rootScope.$$phase === '$apply') {
				$rootScope.$evalAsync(function(scope){
					httpRequestFunc();
				});
			} else {
				httpRequestFunc();
			}
			
			return responseContext;
		}
	
		function send(endpoint, parameters, success, failure) {
			return request('post', endpoint, null, parameters, function(response, context) {
				if(response.error) {
					failure(response,context);
				} else {
					success(response,context);
				}
			}, function(response,context){
				failure({
					error: 'http.error.' + _determineCode(context.status),
					context: {
						payload: response,
						context: context
					}
				}, context);
			});
		}
	
		return {
			send: send,
			request: request
		};
	}

	return chron.service('_http', [
		'$http',
		'$rootScope',
		'$location',
		'$window',
		service
	]);

});