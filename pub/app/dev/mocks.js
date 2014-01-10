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
			return message.key === 'char_list';
		})).respond(_.toJson({
			user: 1,
			key: 'char_list',
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
			return message.key === 'char_view'
				&& message.payload
				&& message.payload.id === 1;
		})).respond(_.toJson({
			user: 1,
			key: 'char_view',
			updated: new Date(),
			payload: {
				id: 1,
				panes: [
					{ id: 'summary' },
					{ id: 'crunch' },
					{ id: 'story' },
					{ id: 'actions' }
				]
			}
		}));

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char_view'
				&& message.payload
				&& message.payload.id === 2;
		})).respond(_.toJson({
			user: 1,
			key: 'char_view',
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
			return message.key === 'char_view';
		})).respond(_.toJson({
			user: 1,
			key: 'char_view',
			updated: new Date(),
			payload: {}
		}));

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char_view_summary'
				&& message.payload
				&& message.payload.id === 1;
		})).respond(_.toJson({
			user: 1,
			key: 'char_view_summary',
			updated: new Date(),
			payload: {
				id: 1,
				name: 'Father Eric Mathias',
				type: 'player',
				game: {
					id: 1,
					name: 'St. Wolfgang\'s Vampire Hunters'
				}
			}
		}));

		this.onmessage(jsonPredicate(function(message) {
			return message.key === 'char_view_story'
				&& message.payload
				&& message.payload.id === 1;
		})).respond(_.toJson({
			user: 1,
			key: 'char_view_story',
			updated: new Date(),
			payload: {
				id: 1,
				entries: [
					{
						id: 1,
						title: 'Backstory',
						date: '1626',
						text: 'It was a dark and stormy night. The night was dark, and the sky was stormy.'
					},
					{
						id: 2,
						title: 'Investigation',
						date: '1628',
						text: 'There was some stuff I did. It turned out better than expected.'
					},
					{
						id: 3,
						title: 'The next day',
						date: '1628.1'
					}
				]
			}
		}));

	});

	sockete.mock();

});