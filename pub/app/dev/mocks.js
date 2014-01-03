define([
	'underscore',
	'sockete',

	'json'
], function(_, sockete) {

	function jsonPredicate(predicate) {
		return function(json) {
			return predicate(_.fromJson(json));
		}
	}

	sockete.Server.configure('ws://chron.aetheric.co.nz', function() {

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char-list';
		})).respond(_.toJson({
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

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char-view'
				&& message.payload
				&& message.payload.id === 1;
		})).respond(_.toJson({
			user: 1,
			key: 'char-view',
			updated: new Date(),
			payload: {
				id: 1,
				summary: {
					name: 'Father Eric Mathias',
					type: 'player',
					game: {
						id: 1,
						name: 'St. Wolfgang\'s Vampire Hunters'
					}
				},
				crunch: {
					//
				},
				story: {
					entries: [
						{
							title: 'Backstory',
							date: '1626',
							text: 'It was a dark and stormy night. The night was dark, and the sky was stormy.'
						},
						{
							title: 'Investigation',
							date: '1628',
							text: 'There was some stuff I did. It turned out better than expected.'
						},
						{
							title: 'The next day',
							date: '1628.1'
						}
					]
				},
				actions: {
					//
				}
			}
		}));

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char-view'
				&& message.payload
				&& message.payload.id === 2;
		})).respond(_.toJson({
			user: 1,
			key: 'char-view',
			updated: new Date(),
			payload: {
				id: 2,
				summary: {
					name: 'Bartimas',
					type: 'crew',
					game: {
						id: 2,
						name: 'Teonn'
					}
				}
			}
		}));

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char-view';
		})).respond(_.toJson({
			user: 1,
			key: 'char-view',
			updated: new Date(),
			payload: {}
		}));

	});

	sockete.mock();

});