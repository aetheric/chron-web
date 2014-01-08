define([
	'underscore',
	'chron',
	'protobuf'
], function(_, chron, protobuf) {

	function service() {

		var protobufs = {};

		var methods = {

			create: function(protoname, protostring) {
				protobufs[protoname] = protobuf.loadProto(protostring, protoname);
				return methods;
			},

			encode: function(protoname, protodata) {
				return protobufs[protoname].encode(protodata);
			},

			decode: function(protoname, protodata) {
				return protobufs[protoname].decode(protodata);
			}

		};

		return methods;
	}

	return chron.service('_proto', [
		service
	]);

});