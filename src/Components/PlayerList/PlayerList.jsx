import React, { useEffect, useContext, useState } from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';
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
    currentUser.color = e.target.attributes.color.value;
    currentUser.id = socket.id;
    socket.emit('update', currentUser);
  };

  // const kick = (e) => {
  //   let kickedPlayer = users.filter(
  //     (player) => player.id === e.target.attributes.playerId.value
  //   );
  //   console.log(kickedPlayer[0]);
  //   kickedPlayer[0].role = 'spectator';
  //   socket.emit('update', kickedPlayer[0]);
  // };

  return (
    <>
      <div className='total-game-list'>
        <div className='players-list'>
          <h3 className='player-title'>Players:</h3>
          <div className='just-players'>
            {players
              ? players.map((player, index) => (
                  <div className='each-player' key={index}>
                    <div style={{ background: player.color }}>
                      <span>
                        {`${player.username} ${player.host ? '👑' : ''}`}
                      </span>
                      {player.id === currentUser.id ? (
                        <span
                          onClick={(e) => update(e, 'spectator')}
                          color='#000'
                          style={{ float: 'right', marginRight: '5px' }}
                        >
                          ❌
                        </span>
                      ) : currentUser.host ? (
                        <span
                          // onClick={kick}
                          playerId={player.id}
                          style={{ float: 'right', marginRight: '5px' }}
                        >
                          ❌
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <h3 className='spec-title'>Spectators:</h3>
          <div className='just-specs'>
            {spectators
              ? spectators.map((spec, index) => (
                  <div className='each-spectator' key={index}>
                    <div>{spec.username}</div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className='playercount-and-buttons'>
          <div className='players-spec-count'>
            <div>Players in Game: {players ? players.length : 0}/10</div>
            <div>
              Number of Spectators: {spectators ? spectators.length : 0}
            </div>
          </div>
          <div className='join-start-buttons'>
            {currentUser.role === 'spectator' ? (
              <Button onClick={() => setColorModal(true)} variant='success'>
                Join
              </Button>
            ) : (
              <Button disabled>Join</Button>
            )}
            {currentUser.host ? (
              <Button onClick={handleStart} variant='success'>
                Start
              </Button>
            ) : null}
          </div>
          {colorModal ? (
            <div className='colorModal'>
              {availColors.map((color) => {
                return (
                  <svg width='20' height='20'>
                    <rect
                      width='20'
                      height='20'
                      color={color}
                      style={{ fill: color, cursor: 'pointer' }}
                      onClick={(e) => update(e, 'player')}
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
