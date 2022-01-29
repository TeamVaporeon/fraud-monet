const Players = () => {
  const playerList= [
    {
      username: 'Flareon',
      role: 'player',
      color: 'candy pink',
      score: 0
    },
    {
      username: 'Jolteon',
      role: 'player',
      color: 'green yellow crayola',
      score: 1
    },
    {
      username: 'Vaporeon',
      role: 'host',
      color: 'wild blue yonder',
      score: 0
    },
    {
      username: 'Eevee',
      role: 'spectator',
      color: 'sandy brown',
      score: 0
    }

  ]

  return (<div className="players">
    <h3>Players</h3>
    {playerList.map(player => <div>{player.username}</div>)}
  </div>)
}

export default Players;