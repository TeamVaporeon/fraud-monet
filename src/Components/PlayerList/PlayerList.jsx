import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { AppContext } from '../../App';

const PlayerList = () => {
  const { users, currentUser, socket, availColors, setStart } =
    useContext(AppContext);
  const [players, setPlayers] = useState(null);
  const [spectators, setSpectators] = useState(null);
  const [colorModal, setColorModal] = useState(false);

  const handleStart = (e) => {
    setStart(true);
    socket.emit('start');
  };

  useEffect(() => {
    if (users) {
      setPlayers(users.filter((player) => player.role === 'player'));
      setSpectators(users.filter((player) => player.role === 'spectator'));
    }
  }, [users]);

  const update = (e, role) => {
    setColorModal(false);
    currentUser.role = role;
    if (e.target.attributes.color.value !== '#000') {
      currentUser.color = e.target.attributes.color.value;
    }
    currentUser.id = socket.id;
    socket.emit('update', currentUser);
  };

  const kick = (e) => {
    let kickedPlayer = users.filter(
      (player) => player.id === e.target.attributes.playerId.value
    );
    console.log(kickedPlayer[0]);
    kickedPlayer[0].role = 'spectator';
    socket.emit('update', kickedPlayer[0]);
  };
  // const kick = (e) => {
  //   setColorModal(false);
  //   let kickedPlayer = users.filter(
  //     (player) => player.id === e.target.attributes.playerId.value
  //   );
  //   console.log(kickedPlayer[0]);
  //   kickedPlayer[0].role = 'spectator';
  //   socket.emit('update', kickedPlayer[0]);
  // };

  // const claim = () => {
  //   currentUser.host = true;
  //   socket.emit('update', currentUser);
  // };

  return (
    <>
      {/* <button onClick={claim}>Claim Host</button> */}
      <div className='total-game-list'>
        <div className='players-list'>
          <h3 className='player-title'>Players:</h3>
          <div className='just-players'>
            {players ? players.map((player) =>
              (<div className='each-player' key={player.id}>
                <div style={{ background: player.color }}>
                  <span>
                    {`${player.username} ${player.host ? '👑' : ''}`}
                  </span>
                    {player.id === currentUser.id ?
                        (<span
                          onClick={(e) => update(e, 'spectator')}
                          color='#000'
                          style={{ float: 'right', marginRight: '5px' }}>❌
                        </span>) : currentUser.host ?
                          (<span
                          onClick={kick}
                          playerId={player.id}
                          style={{ float: 'right', marginRight: '5px' }}>❌
                        </span>) : null}
                    </div>
                </div>)): null}
          </div>
          {spectators && spectators.length ?
          <div className="entire-spec-container">
            <h3 className='spec-title'>Spectators:</h3>
            <div className='just-specs'>
              {spectators ? spectators.map((spec, index) =>
              (<div className='each-spectator' key={index}>
                <div>{spec.username}</div>
              </div>)): null}
            </div>
          </div>: null}
        </div>
        <div className='playercount-and-buttons'>
          <div className='players-spec-count'>
            <div>Players in Game: {players ? players.length : 0}/10</div>
            <div>Number of Spectators: {spectators ? spectators.length : 0}</div>
          </div>
          <Stack className="join-start-buttons" direction="horizontal" gap={2}>
            {currentUser.role === 'spectator' ? (
              <Button Button onClick={() => setColorModal(true)} variant='success' size="sm">
                Join
              </Button>
            ) : (
              <Button variant="success" size="sm" disabled>Join</Button>
            )}
            {currentUser.host ? (
              <Button onClick={handleStart} variant='success' size="sm">
                Start
              </Button>
            ) : null}
            </Stack>
          </div>
          {colorModal ? (
            <div className='colorModal'>
              {Object.keys(availColors).map((color) => {
                return availColors[color] ? (
                  <svg width='20' height='20'>
                    <rect
                      width='20'
                      height='20'
                      color={color}
                      style={{
                        fill: color,
                        stroke: 'darkslategray',
                        strokeWidth: 2,
                        cursor: 'pointer',
                      }}
                      onClick={(e) => update(e, 'player')}
                    ></rect>
                  </svg>
                ) : (
                  <svg width='20' height='20'>
                    <rect
                      width='20'
                      height='20'
                      color={color}
                      style={{
                        fill: color,
                        opacity: '30%',
                        stroke: 'darkslategray',
                        strokeWidth: 2,
                      }}
                    ></rect>
                  </svg>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PlayerList;
