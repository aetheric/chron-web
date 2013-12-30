define([
	'sockete',
	'json'
], function(sockete, json) {

	sockete.Server.configure('ws://chron.aetheric.co.nz', function() {

		this.onmessage(json.stringify({
			user: 1,
			key: 'char-list',
			payload: {}
		})).respond(json.stringify({
			user: 1,
			key: 'char-list',
			updated: new Date(),
			payload: [
				{
					display: 'Saint Wolfgang\'s Vampire Hunters',
					characters: [
						{ id: 1, display: 'Father Eric Mathias' }
					]
				},
				{
					display: 'Teonn',
					characters: [
						{ id: 2, display: 'Bartimas' },
						{ id: 3, display: 'Royal Herald' },
						{ id: 4, display: 'Sir Charleston' }
					]
				},
				{
					display: 'Crucible',
					characters: [
						{ id: 5, display: 'Enoch Anderheim' }
					]
				}
			]
		}));

	});

	sockete.mock();

});