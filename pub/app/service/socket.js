define([
	'underscore',
	'app/chron'
], function(_, chron) {

	function service(socket) {

		var user = null;
		var data = {};

		function needsUpdate(key, updated) {
			var entry = data[key];
			return !_.isObject(entry)
				|| _.isNull(entry.payload)
			    || _.isUndefined(entry.payload)
				|| !_.isDate(entry.updated)
				|| ( _.isDate(updated) && entry.updated < updated )
		}

		function ensure(key) {
			if (!_.isObject(data[key])) {
				data[key] = {
					payload: null,
					updated: null,
					targets: []
				}
			}

			return data[key];
		}

		function update(key, payload, updated) {
			if (!key || !payload || !updated || !needsUpdate(key, updated)) {
				return;
			}

			var entry = ensure(key);

			_.extend(entry, {
				payload: payload,
				updated: updated
			});

			_.each(entry.targets, function(target) {
				target.scope[target.target] = payload;
			});
		}

		socket.on('message', function(event) {
			var message = _.fromJson(event.data);
			if (message && _.isNumber(message.user)) {
				user = message.user;
			}

			update(message.key, message.payload, message.updated);
		});

		function link($scope, target, id, initial) {
			var entry = ensure(id);
			entry.targets.push({
				scope: $scope,
				target: target
			});

			if (_.isFunction(initial) && needsUpdate(id)) {
				socket.on('open', initial);
			}
		}

		function send(key, message) {
			socket.send(_.toJson({
				user: user,
				key: key,
//				updated: new Date(),
				payload: message
			}));
		}

		return {
			link: link,
			send: send
		}
	}

	return chron.service('_socket', [
		'WebSocket',
		service
	]);

});