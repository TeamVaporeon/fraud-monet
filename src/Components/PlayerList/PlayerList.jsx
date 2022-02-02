import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
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

  const joinTest = (e) => {
    e.preventDefault();
    console.log('I joined the game!');
  }

  const startTest = (e) => {
    e.preventDefault();
    console.log('Game Started!');
  }

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
          <Stack className="join-start-buttons" direction="horizontal" gap={2}>
            <Button onClick={joinTest} variant="success" size="sm">Join</Button>
            <Button onClick={null} variant="success" size="sm">Start</Button>
          </Stack>
        </div>
      </div>
      </>
    )
}

export default PlayerList;

{/* <Button variant="success" size="sm" disabled>Join</Button> */}
{/* <Button variant="success" size="sm" disabled>Start</Button>  */}