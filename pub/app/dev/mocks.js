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
					id: 1,
					display: 'St. Wolfgang\'s Vampire Hunters',
					characters: [
						{ id: 1, display: 'Father Eric Mathias' }
					]
				},
				{
					id: 2,
					display: 'Teonn',
					characters: [
						{ id: 2, display: 'Bartimas' },
						{ id: 3, display: 'Royal Herald' },
						{ id: 4, display: 'Sir Charleston' }
					]
				},
				{
					id: 3,
					display: 'Crucible',
					characters: [
						{ id: 5, display: 'Enoch Anderheim' }
					]
				}
			]
		}));

		this.onmessage(json.stringify({
			user: 1,
			key: 'char-view',
			payload: {
				id: 1
			}
		})).respond(json.stringify({
			user: 1,
			key: 'char-list',
			updated: new Date(),
			payload: {
				id: 1,
				name: 'Father Eric Mathias',
				type: 'player',
				game: {
					id: 1,
					name: 'St. Wolfgang\'s Vampire Hunters'
				},
				data: [
					//
				]
			}
		}))

	});

	sockete.mock();

});