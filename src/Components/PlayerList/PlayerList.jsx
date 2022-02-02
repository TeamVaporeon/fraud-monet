import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../App';

const PlayerList = () => {
  const { users, currentUser } = useContext(AppContext);
  const [players, setPlayers] = useState(null);
  const [spectators, setSpectators] = useState(null);
  const [host, setHost] = useState(null);

  useEffect(() => {
    if (users) {
      setPlayers(users.filter(player => (player.role === 'player' && player.host === false)));
      setSpectators(users.filter(player => player.role === 'spectator'));
      setHost(users.filter(player => player.host === true));
    }
  }, [users]);

  // joinTest() {
  //   console.log('I joined the game!');
  // }

  // startTest() {
  //   console.log('Game Started!');
  // }

  return(
      <>
      <div className="total-game-list">
        <div className="players-list">
          <h3 className="player-title">Players:</h3>
          <div className="just-players">
            {host ? host.map((player, index) =>
            <div className="host" key={index}>
              <div style={{ background: player.color }}>{player.username} 👑</div>
            </div>) : null}
            {players ? players.map((player, index) =>
            <div className="each-player" key={index}>
              <div style={{ background: player.color}}>{player.username}</div>
            </div>) : null}
          </div>
          <h3 className="spec-title">Spectators:</h3>
          <div className="just-specs">
            {spectators ? spectators.map((spec, index) =>
            <div className="each-spectator" key={index}>
              <div>{spec.username}</div>
            </div>) : null}
          </div>
        </div>
        <div className="playercount-and-buttons">
          <div className="players-spec-count">
            <div>Players in Game: {players && host ? players.length + host.length : 0}/10</div>
            <div>Number of Spectators: {spectators ? spectators.length : 0}</div>
          </div>
          <div className="join-start-buttons">
            <Button onClick={null} variant="success" size="sm">Join</Button>
            <Button onClick={null} variant="success" size="sm">Start</Button>
          </div>
        </div>
      </div>
      </>
    )
}

export default PlayerList;
