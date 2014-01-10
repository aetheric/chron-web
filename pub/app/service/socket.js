define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function service($rootScope, socket) {

		_.extend($rootScope, {
			data: {}
		});

		var listeners = {
			open: [],
			message: [],
			close: []
		};

		function needsUpdate(key, updated) {
			var entry = $rootScope.data[key];
			return !_.isObject(entry)
				|| _.isNull(entry.payload)
			    || _.isUndefined(entry.payload)
				|| !_.isDate(entry.updated)
				|| ( _.isDate(updated) && entry.updated < updated )
		}

		function update(key, payload, updated) {
			if (!key || !updated || !needsUpdate(key, updated)) {
				return;
			}

			_.extend(listen(key), {
				payload: payload,
				updated: updated
			});
		}

		on('message', function(event) {
			var message = _.fromJson(event.data);
			update(_.underscored(message.key), message.payload, message.updated);
		});

		function listen(key, watch) {
			var underkey = _.underscored(key);

			if (!_.isObject($rootScope.data[underkey])) {
				$rootScope.data[underkey] = {
					payload: null,
					updated: null
				}
			}

			if (_.isFunction(watch)) {
				$rootScope.$watch('data.' + underkey + '.payload', watch);
			}

			if (needsUpdate(underkey)) {
				on('open', function() {
					send(underkey, {});
				});
			}

			return $rootScope.data[underkey];
		}

		function send(key, message) {
			var msg = _.toJson({
				user: null,
				key: key,
				updated: new Date(),
				payload: message
			});

			if (socket.readyState() !== WebSocket.OPEN) {
				on('open', _.partial(socket.send, msg));
				return;
			}

			socket.send(msg);
		}

		function on(event, callback) {
			listeners[event].push(callback);
		}

		_.each(listeners, function(listeners, event) {
			socket.on(event, function() {
				var socket_args = arguments;

				_.each(listeners, function(listener) {
					listener.apply(null, socket_args);
				});
			});
		});

		on('open', function() {
			console.log('WebSocket opened.')
		});

		return {
			listen: listen,
			send: send,
			on: on
		}
	}

	return chron.service('_socket', [
		'$rootScope',
		'WebSocket',
		service
	]);

});