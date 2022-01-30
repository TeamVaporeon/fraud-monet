const dummyList = {
	room_id: 'fightclub',
	players: [
		{
			username: 'firstloser',
			role: 'player', // player, spectator or host -> can only have 1 host
			color: 'red',
			score: null
		},
		{
			username: 'secondloser',
			role: 'player', // player, spectator or host -> can only have 1 host
			color: 'green',
			score: null
		},
		{
			username: 'thirdloser',
			role: 'player', // player, spectator or host -> can only have 1 host
			color: 'blue',
			score: null
		}
	],
};

export default dummyList;